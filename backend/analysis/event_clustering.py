"""
Metis Platform - Event Clustering Engine

Groups related ingested records into unified events.
"""

import uuid
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional, Set
from collections import defaultdict

from ingestion.connector_base import IngestedRecord


@dataclass
class EventCluster:
    """A cluster of related records forming a candidate event."""
    cluster_id: str
    records: List[IngestedRecord] = field(default_factory=list)
    entities: Dict[str, Set[str]] = field(default_factory=lambda: defaultdict(set))
    locations: Set[str] = field(default_factory=set)
    time_range: Optional[tuple] = None
    confidence_score: float = 0.0
    cluster_type: str = "unknown"


class EventClusteringEngine:
    """Engine for clustering related records into events."""
    
    def __init__(self):
        self.similarity_threshold = 0.6
        self.temporal_window_hours = 24
        self.geo_threshold_km = 50
    
    def cluster_records(self, records: List[IngestedRecord]) -> List[EventCluster]:
        """
        Cluster records into related event groups.
        
        Args:
            records: List of ingested records
            
        Returns:
            List of event clusters
        """
        if not records:
            return []
        
        # Sort by timestamp
        sorted_records = sorted(records, key=lambda r: r.timestamp)
        
        # Initialize clusters
        clusters: List[EventCluster] = []
        assigned: Set[str] = set()
        
        for i, record in enumerate(sorted_records):
            record_id = f"{record.source_id}_{record.timestamp.isoformat()}"
            
            if record_id in assigned:
                continue
            
            # Try to match with existing clusters
            best_cluster = None
            best_score = 0.0
            
            for cluster in clusters:
                score = self._calculate_similarity(record, cluster)
                if score > best_score and score > self.similarity_threshold:
                    best_cluster = cluster
                    best_score = score
            
            if best_cluster:
                # Add to existing cluster
                best_cluster.records.append(record)
                self._update_cluster_entities(best_cluster, record)
                assigned.add(record_id)
            else:
                # Create new cluster
                new_cluster = EventCluster(
                    cluster_id=str(uuid.uuid4()),
                    records=[record],
                    confidence_score=0.5
                )
                self._update_cluster_entities(new_cluster, record)
                clusters.append(new_cluster)
                assigned.add(record_id)
        
        # Calculate final confidence scores
        for cluster in clusters:
            cluster.confidence_score = self._calculate_cluster_confidence(cluster)
        
        return clusters
    
    def _calculate_similarity(self, record: IngestedRecord, cluster: EventCluster) -> float:
        """Calculate similarity score between a record and a cluster."""
        scores = []
        
        # Temporal similarity
        temporal_score = self._temporal_similarity(record, cluster)
        scores.append(temporal_score)
        
        # Entity overlap
        entity_score = self._entity_overlap(record, cluster)
        scores.append(entity_score)
        
        # Location proximity
        location_score = self._location_similarity(record, cluster)
        scores.append(location_score)
        
        # Text semantic similarity (simplified)
        text_score = self._text_similarity(record, cluster)
        scores.append(text_score)
        
        # Weighted average
        weights = [0.3, 0.3, 0.2, 0.2]
        final_score = sum(s * w for s, w in zip(scores, weights))
        
        return final_score
    
    def _temporal_similarity(self, record: IngestedRecord, cluster: EventCluster) -> float:
        """Calculate temporal similarity (0.0 to 1.0)."""
        if not cluster.records:
            return 0.0
        
        # Get time range of cluster
        cluster_times = [r.timestamp for r in cluster.records]
        cluster_center = min(cluster_times) + (max(cluster_times) - min(cluster_times)) / 2
        
        time_diff = abs((record.timestamp - cluster_center).total_seconds())
        max_diff = self.temporal_window_hours * 3600
        
        if time_diff > max_diff:
            return 0.0
        
        return 1.0 - (time_diff / max_diff)
    
    def _entity_overlap(self, record: IngestedRecord, cluster: EventCluster) -> float:
        """Calculate entity overlap (0.0 to 1.0)."""
        if not cluster.entities:
            return 0.0
        
        overlap_count = 0
        total_entities = 0
        
        for entity_type, entities in record.entities.items():
            record_set = set(entities)
            cluster_set = cluster.entities.get(entity_type, set())
            
            if record_set and cluster_set:
                overlap_count += len(record_set & cluster_set)
                total_entities += len(record_set)
        
        if total_entities == 0:
            return 0.0
        
        return min(overlap_count / total_entities, 1.0)
    
    def _location_similarity(self, record: IngestedRecord, cluster: EventCluster) -> float:
        """Calculate location similarity (0.0 to 1.0)."""
        record_locations = set()
        if record.location:
            record_locations.add(str(record.location))
        record_locations.update(record.entities.get("locations", []))
        
        if not record_locations or not cluster.locations:
            return 0.5  # Neutral if no location data
        
        # Check for exact location matches
        matches = record_locations & cluster.locations
        if matches:
            return 1.0
        
        # Check for location name similarity
        for rloc in record_locations:
            for cloc in cluster.locations:
                if self._location_name_similarity(rloc, cloc) > 0.8:
                    return 0.8
        
        return 0.0
    
    def _location_name_similarity(self, loc1: str, loc2: str) -> float:
        """Simple location name similarity."""
        # Normalize
        l1 = loc1.lower().strip()
        l2 = loc2.lower().strip()
        
        # Exact match
        if l1 == l2:
            return 1.0
        
        # One contains the other
        if l1 in l2 or l2 in l1:
            return 0.9
        
        # Word overlap
        words1 = set(l1.split())
        words2 = set(l2.split())
        if words1 and words2:
            overlap = len(words1 & words2)
            return overlap / max(len(words1), len(words2))
        
        return 0.0
    
    def _text_similarity(self, record: IngestedRecord, cluster: EventCluster) -> float:
        """Calculate text similarity (simplified)."""
        if not cluster.records:
            return 0.0
        
        # Get sample of cluster text
        cluster_text = " ".join([
            r.extracted_text[:200] for r in cluster.records[:3]
        ]).lower()
        
        record_text = record.extracted_text.lower()
        
        # Simple word overlap
        cluster_words = set(cluster_text.split())
        record_words = set(record_text.split())
        
        if not cluster_words or not record_words:
            return 0.0
        
        overlap = len(cluster_words & record_words)
        return min(overlap / min(len(cluster_words), len(record_words)), 1.0)
    
    def _update_cluster_entities(self, cluster: EventCluster, record: IngestedRecord):
        """Update cluster entity collections with a new record."""
        # Add entities
        for entity_type, entities in record.entities.items():
            cluster.entities[entity_type].update(entities)
        
        # Add locations
        if record.location:
            cluster.locations.add(str(record.location))
        cluster.locations.update(record.entities.get("locations", []))
    
    def _calculate_cluster_confidence(self, cluster: EventCluster) -> float:
        """Calculate overall confidence score for a cluster."""
        if not cluster.records:
            return 0.0
        
        factors = [
            min(len(cluster.records) / 5, 1.0),  # Size factor
            min(len(cluster.entities) / 3, 1.0),  # Entity diversity
            min(len(cluster.locations) / 2, 1.0),  # Location specificity
        ]
        
        return sum(factors) / len(factors)
