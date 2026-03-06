"""
Metis Platform - Ingestion Connectors
"""

from ingestion.connector_base import BaseConnector, ConnectorConfig, IngestedRecord
from ingestion.connectors.rss_connector import RSSConnector

__all__ = [
    "BaseConnector",
    "ConnectorConfig",
    "IngestedRecord",
    "RSSConnector",
]
