"""
Metis Platform - Connector Base Class

All ingestion connectors must inherit from this base class
and implement the required methods.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Dict, List, Optional
import uuid


@dataclass
class IngestedRecord:
    """Standardized output format for all connectors."""
    source_id: uuid.UUID
    timestamp: datetime
    raw_content: str
    extracted_text: str
    entities: Dict[str, List[str]] = field(default_factory=dict)
    location: Optional[Dict[str, Any]] = None
    language: str = "en"
    url: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)
    connector_type: str = ""
    reliability_score: float = 0.5


@dataclass
class ConnectorConfig:
    """Configuration for a connector."""
    source_id: uuid.UUID
    source_name: str
    source_type: str
    url: Optional[str] = None
    api_key: Optional[str] = None
    api_secret: Optional[str] = None
    poll_interval: int = 3600  # seconds
    batch_size: int = 100
    filters: Dict[str, Any] = field(default_factory=dict)
    credentials: Dict[str, str] = field(default_factory=dict)


class BaseConnector(ABC):
    """Base class for all ingestion connectors."""
    
    def __init__(self, config: ConnectorConfig):
        self.config = config
        self.name = config.source_name
        self.connector_type = "base"
    
    @abstractmethod
    async def collect(self) -> List[Dict[str, Any]]:
        """
        Collect raw data from the source.
        
        Returns:
            List of raw records from the source
        """
        pass
    
    @abstractmethod
    async def normalize(self, raw_records: List[Dict[str, Any]]) -> List[IngestedRecord]:
        """
        Normalize raw records into standardized format.
        
        Args:
            raw_records: Raw data from collect()
            
        Returns:
            List of standardized IngestedRecord objects
        """
        pass
    
    @abstractmethod
    async def extract_entities(self, records: List[IngestedRecord]) -> List[IngestedRecord]:
        """
        Extract entities from records (people, locations, organizations, etc.)
        
        Args:
            records: Normalized records
            
        Returns:
            Records with extracted entities
        """
        pass
    
    async def emit_records(self, records: List[IngestedRecord]) -> List[IngestedRecord]:
        """
        Emit records to the ingestion queue.
        Override for custom emission logic.
        
        Args:
            records: Processed records ready for storage
            
        Returns:
            List of successfully emitted records
        """
        # Default implementation - can be overridden
        return records
    
    async def run(self) -> List[IngestedRecord]:
        """
        Run the full ingestion pipeline.
        
        Returns:
            List of fully processed records
        """
        # Step 1: Collect
        raw_data = await self.collect()
        
        # Step 2: Normalize
        normalized = await self.normalize(raw_data)
        
        # Step 3: Extract entities
        enriched = await self.extract_entities(normalized)
        
        # Step 4: Emit
        emitted = await self.emit_records(enriched)
        
        return emitted
    
    def calculate_reliability_score(self) -> float:
        """
        Calculate source reliability score (0.0 to 1.0).
        Override based on connector-specific logic.
        """
        return 0.5
    
    def health_check(self) -> Dict[str, Any]:
        """
        Check connector health.
        
        Returns:
            Health status dict
        """
        return {
            "connector": self.name,
            "type": self.connector_type,
            "status": "unknown",
            "last_check": datetime.utcnow().isoformat()
        }
