"""
Metis Platform - Candidate Event Generator

Generates candidate events from signals and clusters.
"""

import uuid
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional

from analysis.event_clustering import EventCluster
from analysis.signal_detector import Signal
from ingestion.connector_base import IngestedRecord


class CandidateEventGenerator:
    """Generates candidate events from analysis results."""
    
    def __init__(self):
        self.confidence_threshold = 0.4
        self.min_signals = 2
        self.min_records = 1
    
    def generate_from_cluster(
        self,
        cluster: EventCluster,
        signals: Optional[List[Signal]] = None
    ) -> Optional[Dict[str, Any]]:
        """
        Generate a candidate event from a cluster.
        
        Args:
            cluster: Event cluster from clustering engine
            signals: Associated signals
            
        Returns:
            Candidate event dict or None if below threshold
        """
        if len(cluster.records) < self.min_records:
            return None
        
        if cluster.confidence_score < self.confidence_threshold:
            return None
        
        # Determine event type guess
        event_type = self._infer_event_type(cluster, signals or [])
        
        # Generate title
        title = self._generate_title(cluster)
        
        # Calculate composite score
        composite_score = self._calculate_composite_score(cluster, signals or [])
        
        # Determine location
        location_id = self._determine_location(cluster)
        
        # Build geofence if we have coordinates
        geofence = self._build_geofence(cluster)
        
        candidate = {
            "id": str(uuid.uuid4()),
            "title": title,
            "event_type_guess": event_type,
            "first_seen_at": min(r.timestamp for r in cluster.records),
            "current_score": composite_score,
            "confidence": cluster.confidence_score,
            "status": "emerging",
            "location_id": location_id,
            "geofence": geofence,
            "source_count": len(set(r.source_id for r in cluster.records)),
            "source_ids": list(set(str(r.source_id) for r in cluster.records)),
            "narrative_markers": self._extract_narrative_markers(cluster),
            "evidence_count": len(cluster.records),
            "cluster_id": cluster.cluster_id,
            "signals": [
                {
                    "type": s.signal_type,
                    "confidence": s.confidence
                } for s in (signals or [])
            ]
        }
        
        return candidate
    
    def generate_from_signals(
        self,
        signals: List[Signal],
        records: List[IngestedRecord]
    ) -> List[Dict[str, Any]]:
        """
        Generate candidate events from signals.
        
        Args:
            signals: List of detected signals
            records: Associated records
            
        Returns:
            List of candidate events
        """
        if len(signals) < self.min_signals:
            return []
        
        # Group signals by location
        location_groups: Dict[str, List[Signal]] = {}
        for signal in signals:
            for location in signal.location_hints:
                if location not in location_groups:
                    location_groups[location] = []
                location_groups[location].append(signal)
        
        candidates = []
        for location, location_signals in location_groups.items():
            if len(location_signals) >= self.min_signals:
                # Find associated records
                related_records = [
                    r for r in records
                    if any(
                        loc in str(r.entities.get("locations", []))
                        for s in location_signals
                        for loc in s.location_hints
                    )
                ]
                
                if related_records:
                    candidate = {
                        "id": str(uuid.uuid4()),
                        "title": f"Activity detected in {location}",
                        "event_type_guess": self._guess_type_from_signals(location_signals),
                        "first_seen_at": min(s.timestamp for s in location_signals),
                        "current_score": self._score_signals(location_signals),
                        "confidence": min(len(location_signals) / 5, 1.0),
                        "status": "emerging",
                        "location_hints": [location],
                        "source_count": len(set(s.source_record_id for s in location_signals)),
                        "narrative_markers": {
                            "signal_types": list(set(s.signal_type for s in location_signals)),
                            "key_entities": self._extract_key_entities(location_signals)
                        }
                    }
                    candidates.append(candidate)
        
        return candidates
    
    def _infer_event_type(
        self,
        cluster: EventCluster,
        signals: List[Signal]
    ) -> str:
        """Infer the type of event from cluster and signals."""
        # Check signals for type indicators
        signal_types = [s.signal_type for s in signals]
        
        if "escalation_language" in signal_types:
            return "violent_protest"
        elif "coordination_language" in signal_types:
            return "planned_gathering"
        elif "volume_spike" in signal_types:
            return "viral_event"
        
        # Check entities
        text = " ".join(r.extracted_text.lower() for r in cluster.records[:3])
        
        if any(word in text for word in ["protest", "rally", "march"]):
            return "protest"
        elif any(word in text for word in ["meeting", "conference", "summit"]):
            return "meeting"
        elif any(word in text for word in ["incident", "attack", "clash"]):
            return "incident"
        
        return "gathering"
    
    def _generate_title(self, cluster: EventCluster) -> str:
        """Generate a title for the candidate event."""
        if not cluster.records:
            return "Unnamed Event"
        
        # Try to extract from first record
        first_record = cluster.records[0]
        text = first_record.extracted_text
        
        # Use first sentence or first 100 chars
        sentences = text.split('.')
        if sentences:
            title = sentences[0][:100].strip()
            if len(title) > 10:
                return title
        
        # Fallback to generic title with location
        if cluster.locations:
            location = list(cluster.locations)[0]
            return f"Activity in {location}"
        
        return "Emerging Event"
    
    def _calculate_composite_score(
        self,
        cluster: EventCluster,
        signals: List[Signal]
    ) -> float:
        """Calculate composite confidence score."""
        base_score = cluster.confidence_score
        
        # Boost for signal diversity
        signal_types = set(s.signal_type for s in signals)
        signal_boost = min(len(signal_types) * 0.1, 0.3)
        
        # Boost for record count
        record_boost = min(len(cluster.records) * 0.05, 0.2)
        
        return min(base_score + signal_boost + record_boost, 1.0)
    
    def _determine_location(self, cluster: EventCluster) -> Optional[uuid.UUID]:
        """Determine primary location for candidate event."""
        # In production, would match to known locations in database
        # For now, return None - will use location_hints instead
        return None
    
    def _build_geofence(self, cluster: EventCluster) -> Optional[Dict[str, Any]]:
        """Build geofence polygon from cluster locations."""
        # Placeholder - would use actual coordinates from records
        return None
    
    def _extract_narrative_markers(self, cluster: EventCluster) -> Dict[str, Any]:
        """Extract narrative markers from cluster."""
        return {
            "key_entities": dict(cluster.entities),
            "location_count": len(cluster.locations),
            "time_span_hours": self._calculate_time_span(cluster),
            "dominant_themes": self._extract_themes(cluster)
        }
    
    def _calculate_time_span(self, cluster: EventCluster) -> float:
        """Calculate time span of cluster in hours."""
        if not cluster.records:
            return 0.0
        
        times = [r.timestamp for r in cluster.records]
        span = max(times) - min(times)
        return span.total_seconds() / 3600
    
    def _extract_themes(self, cluster: EventCluster) -> List[str]:
        """Extract dominant themes from cluster."""
        # Simple keyword extraction
        themes = []
        text = " ".join(r.extracted_text.lower() for r in cluster.records)
        
        theme_keywords = {
            "protest": ["protest", "demonstration", "march", "rally"],
            "violence": ["violence", "riot", "clash", "attack"],
            "political": ["government", "political", "election", "vote"],
            "social": ["community", "people", "public", "social"]
        }
        
        for theme, keywords in theme_keywords.items():
            if any(kw in text for kw in keywords):
                themes.append(theme)
        
        return themes[:3]
    
    def _guess_type_from_signals(self, signals: List[Signal]) -> str:
        """Guess event type from signals."""
        types = [s.signal_type for s in signals]
        
        if "escalation_language" in types:
            return "violent_incident"
        elif "coordination_language" in types:
            return "planned_event"
        elif "volume_spike" in types:
            return "viral_event"
        
        return "uncategorized"
    
    def _score_signals(self, signals: List[Signal]) -> float:
        """Calculate aggregate score from signals."""
        if not signals:
            return 0.0
        
        avg_confidence = sum(s.confidence for s in signals) / len(signals)
        count_boost = min(len(signals) * 0.1, 0.3)
        
        return min(avg_confidence + count_boost, 1.0)
    
    def _extract_key_entities(self, signals: List[Signal]) -> Dict[str, List[str]]:
        """Extract key entities from signals."""
        entities: Dict[str, set] = {}
        
        for signal in signals:
            for entity_type, entity_list in signal.entities.items():
                if entity_type not in entities:
                    entities[entity_type] = set()
                entities[entity_type].update(entity_list)
        
        return {k: list(v)[:5] for k, v in entities.items()}
