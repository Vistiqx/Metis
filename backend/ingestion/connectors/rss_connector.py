"""
Metis Platform - RSS Connector

Ingests content from RSS feeds (news sites, blogs, regional reporting).
"""

import asyncio
import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional

import aiohttp
from aiohttp import ClientTimeout
import feedparser

from ingestion.connector_base import BaseConnector, ConnectorConfig, IngestedRecord


class RSSConnector(BaseConnector):
    """Connector for RSS feed ingestion."""
    
    def __init__(self, config: ConnectorConfig):
        super().__init__(config)
        self.connector_type = "rss"
        self.feed_url = config.url
        self.session: Optional[aiohttp.ClientSession] = None
    
    async def _get_session(self) -> aiohttp.ClientSession:
        """Get or create aiohttp session."""
        if self.session is None or self.session.closed:
            self.session = aiohttp.ClientSession(
                headers={
                    "User-Agent": "Metis-OSINT/0.1.0 (OSINT Platform)"
                }
            )
        return self.session
    
    async def collect(self) -> List[Dict[str, Any]]:
        """
        Collect entries from RSS feed.
        
        Returns:
            List of raw RSS entries
        """
        if not self.feed_url:
            return []
        
        try:
            session = await self._get_session()
            timeout = ClientTimeout(total=30)
            async with session.get(self.feed_url, timeout=timeout) as response:
                if response.status != 200:
                    return []
                
                content = await response.text()
                feed = feedparser.parse(content)
                
                entries = []
                for entry in feed.entries[:self.config.batch_size]:
                    entries.append({
                        "title": entry.get("title", ""),
                        "link": entry.get("link", ""),
                        "description": entry.get("description", ""),
                        "published": entry.get("published", ""),
                        "published_parsed": entry.get("published_parsed"),
                        "author": entry.get("author", ""),
                        "tags": [tag.term for tag in entry.get("tags", [])],
                        "content": entry.get("content", [{}])[0].get("value", "") if entry.get("content") else ""
                    })
                
                return entries
                
        except Exception as e:
            print(f"RSS collection error for {self.feed_url}: {e}")
            return []
    
    async def normalize(self, raw_records: List[Dict[str, Any]]) -> List[IngestedRecord]:
        """
        Normalize RSS entries to standard format.
        """
        normalized = []
        
        for entry in raw_records:
            # Parse publication date
            pub_date = datetime.utcnow()
            if entry.get("published_parsed"):
                try:
                    pub_date = datetime(*entry["published_parsed"][:6])
                except:
                    pass
            
            # Build extracted text from title + description + content
            extracted_text = " ".join([
                entry.get("title", ""),
                entry.get("description", ""),
                entry.get("content", "")
            ]).strip()
            
            record = IngestedRecord(
                source_id=self.config.source_id,
                timestamp=pub_date,
                raw_content=str(entry),
                extracted_text=extracted_text,
                entities={},
                language="en",  # Could detect with langdetect
                url=entry.get("link"),
                metadata={
                    "author": entry.get("author", ""),
                    "tags": entry.get("tags", []),
                    "title": entry.get("title", "")
                },
                connector_type=self.connector_type,
                reliability_score=self.calculate_reliability_score()
            )
            normalized.append(record)
        
        return normalized
    
    async def extract_entities(self, records: List[IngestedRecord]) -> List[IngestedRecord]:
        """
        Basic entity extraction from RSS content.
        This is a placeholder - in production, use NLP services.
        """
        for record in records:
            entities = {
                "persons": [],
                "organizations": [],
                "locations": [],
                "keywords": record.metadata.get("tags", [])
            }
            
            # Simple keyword extraction (placeholder for NLP)
            text = record.extracted_text.lower()
            
            # Extract mentioned countries (simple approach)
            countries = ["usa", "uk", "france", "germany", "china", "russia", "ukraine"]
            for country in countries:
                if country in text:
                    entities["locations"].append(country.title())
            
            record.entities = entities
        
        return records
    
    def calculate_reliability_score(self) -> float:
        """
        RSS feeds have moderate reliability.
        Could be enhanced based on source reputation.
        """
        return 0.7
    
    def health_check(self) -> Dict[str, Any]:
        """Check RSS connector health."""
        return {
            "connector": self.name,
            "type": self.connector_type,
            "feed_url": self.feed_url,
            "status": "healthy" if self.feed_url else "no_url",
            "last_check": datetime.utcnow().isoformat()
        }
    
    async def close(self):
        """Close the HTTP session."""
        if self.session and not self.session.closed:
            await self.session.close()
