"""
Metis Platform - Alert Generator

Generates alerts based on analysis results and watchlists.
"""

import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional

from analysis.candidate_event_generator import CandidateEventGenerator
from analysis.event_clustering import EventCluster
from analysis.signal_detector import Signal


class AlertGenerator:
    """Generates alerts for analysts."""
    
    def __init__(self):
        self.alert_threshold = 0.6
        self.escalation_threshold = 0.8
    
    def generate_from_candidate(
        self,
        candidate: Dict[str, Any],
        watchlist_triggers: Optional[List[Dict]] = None
    ) -> Optional[Dict[str, Any]]:
        """
        Generate an alert from a candidate event.
        
        Args:
            candidate: Candidate event dict
            watchlist_triggers: List of triggered watchlists
            
        Returns:
            Alert dict or None if below threshold
        """
        confidence = candidate.get("confidence", 0.0)
        score = candidate.get("current_score", 0.0)
        
        # Determine if alert should be generated
        if confidence < self.alert_threshold and score < self.alert_threshold:
            return None
        
        # Determine severity
        severity = self._determine_severity(candidate)
        
        # Generate alert
        alert = {
            "id": str(uuid.uuid4()),
            "alert_type": "candidate_event",
            "severity": severity,
            "title": f"Emerging {candidate.get('event_type_guess', 'event')} detected",
            "message": self._generate_message(candidate),
            "related_entity_type": "candidate_event",
            "related_entity_id": candidate.get("id"),
            "candidate_event_id": candidate.get("id"),
            "confidence": confidence,
            "score": score,
            "location_hints": candidate.get("location_hints", []),
            "source_count": candidate.get("source_count", 0),
            "watchlist_triggers": watchlist_triggers or [],
            "created_at": datetime.utcnow(),
            "acknowledged": False,
            "dismissed": False
        }
        
        return alert
    
    def generate_from_signals(
        self,
        signals: List[Signal],
        watchlist_id: Optional[str] = None
    ) -> Optional[Dict[str, Any]]:
        """
        Generate an alert from a cluster of signals.
        
        Args:
            signals: List of related signals
            watchlist_id: Optional triggering watchlist
            
        Returns:
            Alert dict or None
        """
        if len(signals) < 3:
            return None
        
        # Check for high-confidence escalation signals
        escalation_signals = [
            s for s in signals
            if s.signal_type == "escalation_language" and s.confidence > 0.6
        ]
        
        if not escalation_signals:
            return None
        
        # Get locations
        locations = set()
        for signal in signals:
            locations.update(signal.location_hints)
        
        alert = {
            "id": str(uuid.uuid4()),
            "alert_type": "escalation_risk",
            "severity": "high",
            "title": f"Escalation risk detected in {', '.join(locations) if locations else 'multiple locations'}",
            "message": f"{len(escalation_signals)} signals indicate potential escalation",
            "related_entity_type": "signal_cluster",
            "signal_count": len(signals),
            "escalation_signals": len(escalation_signals),
            "locations": list(locations),
            "watchlist_id": watchlist_id,
            "created_at": datetime.utcnow(),
            "acknowledged": False,
            "dismissed": False
        }
        
        return alert
    
    def generate_watchlist_alert(
        self,
        watchlist_id: str,
        watchlist_name: str,
        matched_entities: List[str],
        entity_type: str
    ) -> Dict[str, Any]:
        """
        Generate an alert for a watchlist match.
        
        Args:
            watchlist_id: Watchlist ID
            watchlist_name: Watchlist name
            matched_entities: List of matched entity names
            entity_type: Type of entity (actor, location, etc.)
            
        Returns:
            Alert dict
        """
        return {
            "id": str(uuid.uuid4()),
            "alert_type": "watchlist_match",
            "severity": "medium",
            "title": f"Watchlist '{watchlist_name}' triggered",
            "message": f"Matched {len(matched_entities)} {entity_type}(s): {', '.join(matched_entities[:5])}",
            "related_entity_type": "watchlist",
            "related_entity_id": watchlist_id,
            "watchlist_id": watchlist_id,
            "matched_entities": matched_entities,
            "entity_type": entity_type,
            "created_at": datetime.utcnow(),
            "acknowledged": False,
            "dismissed": False
        }
    
    def _determine_severity(self, candidate: Dict[str, Any]) -> str:
        """Determine alert severity from candidate."""
        confidence = candidate.get("confidence", 0.0)
        score = candidate.get("current_score", 0.0)
        event_type = candidate.get("event_type_guess", "")
        
        # High severity conditions
        if confidence >= self.escalation_threshold or score >= self.escalation_threshold:
            if event_type in ["violent_protest", "violent_incident"]:
                return "critical"
            return "high"
        
        # Medium severity
        if confidence >= self.alert_threshold or score >= self.alert_threshold:
            if event_type in ["violent_protest", "violent_incident"]:
                return "high"
            return "medium"
        
        return "low"
    
    def _generate_message(self, candidate: Dict[str, Any]) -> str:
        """Generate alert message from candidate."""
        parts = [
            f"Confidence: {candidate.get('confidence', 0):.0%}",
            f"Score: {candidate.get('current_score', 0):.2f}",
            f"Type: {candidate.get('event_type_guess', 'unknown')}",
            f"Sources: {candidate.get('source_count', 0)}"
        ]
        
        if candidate.get("location_hints"):
            parts.append(f"Locations: {', '.join(candidate['location_hints'][:3])}")
        
        return " | ".join(parts)
