"""
Metis Platform - X (Twitter) Connector

Ingests content from X/Twitter (tweets, user timelines, search).
Requires X API v2 credentials for production use.
"""

import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional

from ingestion.connector_base import BaseConnector, ConnectorConfig, IngestedRecord


class XConnector(BaseConnector):
    """Connector for X/Twitter ingestion (placeholder)."""
    
    def __init__(self, config: ConnectorConfig):
        super().__init__(config)
        self.connector_type = "x"
        self.bearer_token = config.credentials.get("bearer_token")
        self.api_key = config.credentials.get("api_key")
        self.api_secret = config.credentials.get("api_secret")
        self.search_query = config.filters.get("query", "")
        self.usernames = config.filters.get("usernames", [])
    
    async def collect(self) -> List[Dict[str, Any]]:
        """
        Collect tweets from X.
        
        NOTE: This is a placeholder. Production implementation requires:
        - tweepy library
        - X API v2 credentials (Bearer Token)
        - Rate limit handling (essential vs elevated access)
        - Pagination for large datasets
        """
        if not self.bearer_token:
            print(f"X connector '{self.name}' missing bearer token")
            return []
        
        # Placeholder: In production, use tweepy.Client
        # Example:
        # client = tweepy.Client(bearer_token=self.bearer_token)
        # tweets = tweepy.Paginator(
        #     client.search_recent_tweets,
        #     query=self.search_query,
        #     max_results=100
        # ).flatten(limit=self.config.batch_size)
        
        return []
    
    async def normalize(self, raw_records: List[Dict[str, Any]]) -> List[IngestedRecord]:
        """Normalize tweets to standard format."""
        normalized = []
        
        for tweet in raw_records:
            # Parse tweet creation time
            created_at = datetime.utcnow()
            if tweet.get("created_at"):
                try:
                    created_at = datetime.fromisoformat(tweet["created_at"].replace("Z", "+00:00"))
                except:
                    pass
            
            record = IngestedRecord(
                source_id=self.config.source_id,
                timestamp=created_at,
                raw_content=str(tweet),
                extracted_text=tweet.get("text", ""),
                entities={
                    "author": [tweet.get("author_id", "")],
                    "mentions": tweet.get("mentions", []),
                    "hashtags": tweet.get("hashtags", [])
                },
                url=f"https://twitter.com/i/web/status/{tweet.get('id', '')}",
                metadata={
                    "tweet_id": tweet.get("id"),
                    "author_id": tweet.get("author_id"),
                    "retweet_count": tweet.get("public_metrics", {}).get("retweet_count", 0),
                    "like_count": tweet.get("public_metrics", {}).get("like_count", 0),
                    "reply_count": tweet.get("public_metrics", {}).get("reply_count", 0)
                },
                connector_type=self.connector_type,
                reliability_score=self.calculate_reliability_score()
            )
            normalized.append(record)
        
        return normalized
    
    async def extract_entities(self, records: List[IngestedRecord]) -> List[IngestedRecord]:
        """Extract entities from tweets."""
        for record in records:
            # Extract hashtags as keywords
            hashtags = record.metadata.get("hashtags", [])
            if hashtags:
                record.entities["keywords"] = [f"#{tag}" for tag in hashtags]
        
        return records
    
    def calculate_reliability_score(self) -> float:
        """
        X/Twitter has variable reliability.
        Could be enhanced with account verification checks.
        """
        return 0.5
    
    def health_check(self) -> Dict[str, Any]:
        """Check X connector health."""
        return {
            "connector": self.name,
            "type": self.connector_type,
            "search_query": self.search_query,
            "status": "configured" if self.bearer_token else "missing_credentials",
            "last_check": datetime.utcnow().isoformat()
        }
