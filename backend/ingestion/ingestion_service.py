"""
Metis Platform - Ingestion Service

Central service for managing ingestion connectors and processing pipelines.
"""

import asyncio
from datetime import datetime
from typing import Any, Dict, List, Optional

from sqlalchemy.orm import Session

from core.database import SessionLocal
from ingestion.connector_base import ConnectorConfig, IngestedRecord
from ingestion.connectors import RSSConnector
from models.source import Source


class IngestionService:
    """Service for managing data ingestion from multiple sources."""
    
    def __init__(self):
        self.connectors: Dict[str, Any] = {}
        self.running = False
    
    def register_connector(self, source: Source) -> bool:
        """
        Register a connector for a source.
        
        Args:
            source: Source model instance
            
        Returns:
            True if connector was registered successfully
        """
        config = ConnectorConfig(
            source_id=source.id,
            source_name=source.name,
            source_type=source.source_type,
            url=source.url,
            credentials=source.credentials or {},
            filters=source.configuration or {},
            poll_interval=self._parse_interval(source.ingest_frequency)
        )
        
        connector = None
        
        if source.source_type == "rss":
            connector = RSSConnector(config)
        elif source.source_type == "reddit":
            from ingestion.connectors.reddit_connector import RedditConnector
            connector = RedditConnector(config)
        elif source.source_type == "x":
            from ingestion.connectors.x_connector import XConnector
            connector = XConnector(config)
        else:
            return False
        
        self.connectors[str(source.id)] = {
            "connector": connector,
            "config": config,
            "last_run": None,
            "records_ingested": 0
        }
        
        return True
    
    async def run_connector(self, source_id: str) -> List[IngestedRecord]:
        """
        Run a single connector and return ingested records.
        
        Args:
            source_id: UUID of the source to run
            
        Returns:
            List of ingested records
        """
        if source_id not in self.connectors:
            return []
        
        connector_data = self.connectors[source_id]
        connector = connector_data["connector"]
        
        try:
            records = await connector.run()
            
            # Update stats
            connector_data["last_run"] = datetime.utcnow()
            connector_data["records_ingested"] += len(records)
            
            # Store records (placeholder - would queue to Kafka/Redis)
            await self._process_records(records)
            
            return records
            
        except Exception as e:
            print(f"Error running connector {source_id}: {e}")
            return []
        finally:
            # Close connector resources
            if hasattr(connector, 'close'):
                await connector.close()
    
    async def run_all_connectors(self) -> Dict[str, int]:
        """
        Run all registered connectors.
        
        Returns:
            Dict mapping source_id to record count
        """
        results = {}
        
        for source_id in self.connectors:
            records = await self.run_connector(source_id)
            results[source_id] = len(records)
        
        return results
    
    async def _process_records(self, records: List[IngestedRecord]):
        """
        Process ingested records.
        
        In production, this would:
        - Queue to Kafka/Redis for processing
        - Trigger entity extraction
        - Run candidate event detection
        - Store to database
        """
        # Placeholder for record processing
        for record in records:
            print(f"Processed record from {record.connector_type}: {record.url}")
    
    def get_connector_status(self, source_id: str) -> Optional[Dict[str, Any]]:
        """Get status of a connector."""
        if source_id not in self.connectors:
            return None
        
        data = self.connectors[source_id]
        connector = data["connector"]
        
        return {
            "source_id": source_id,
            "source_name": data["config"].source_name,
            "source_type": data["config"].source_type,
            "last_run": data["last_run"],
            "records_ingested": data["records_ingested"],
            "health": connector.health_check()
        }
    
    def get_all_statuses(self) -> List[Dict[str, Any]]:
        """Get status of all connectors."""
        statuses = []
        for source_id in self.connectors:
            status = self.get_connector_status(source_id)
            if status:
                statuses.append(status)
        return statuses
    
    def _parse_interval(self, frequency: str) -> int:
        """Parse frequency string to seconds."""
        intervals = {
            "5min": 300,
            "15min": 900,
            "30min": 1800,
            "hourly": 3600,
            "2hours": 7200,
            "6hours": 21600,
            "12hours": 43200,
            "daily": 86400
        }
        return intervals.get(frequency, 3600)
    
    async def load_sources_from_db(self):
        """Load all active sources from database and register connectors."""
        db = SessionLocal()
        try:
            sources = db.query(Source).filter(Source.is_active == True).all()
            
            for source in sources:
                success = self.register_connector(source)
                if success:
                    print(f"Registered connector: {source.name} ({source.source_type})")
                else:
                    print(f"Failed to register connector: {source.name} ({source.source_type})")
                    
        finally:
            db.close()
