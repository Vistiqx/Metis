"""
Metis Platform - Signal Detector

Detects signals from ingested data that may indicate emerging events.
"""

import re
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional

from ingestion.connector_base import IngestedRecord


@dataclass
class Signal:
    """A detected signal from ingested data."""
    signal_type: str
    confidence: float
    source_record_id: str
    timestamp: datetime
    entities: Dict[str, List[str]] = field(default_factory=dict)
    location_hints: List[str] = field(default_factory=list)
    temporal_hints: List[str] = field(default_factory=list)
    evidence_text: str = ""
    metadata: Dict[str, Any] = field(default_factory=dict)


class SignalDetector:
    """Detects signals from ingested records."""
    
    def __init__(self):
        self.coordination_keywords = [
            "protest", "rally", "march", "demonstration", "gathering",
            "meet at", "assemble", "convene", "organize", "mobilize",
            "join us", "show up", "be there", "stand together"
        ]
        
        self.escalation_keywords = [
            "violence", "riot", "clash", "confrontation", "attack",
            "destroy", "burn", "loot", "fight", "storm"
        ]
        
        self.date_patterns = [
            r'\b(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}(?:st|nd|rd|th)?\b',
            r'\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b',
            r'\btomorrow\b', r'\btonight\b', r'\bthis weekend\b',
            r'\bnext week\b', r'\b\d{1,2}\s*(?:am|pm)\b'
        ]
    
    def analyze_records(self, records: List[IngestedRecord]) -> List[Signal]:
        """
        Analyze a batch of records and extract signals.
        
        Args:
            records: List of ingested records to analyze
            
        Returns:
            List of detected signals
        """
        signals = []
        
        for record in records:
            record_signals = self._analyze_single_record(record)
            signals.extend(record_signals)
        
        # Detect cross-record signals
        volume_signal = self._detect_volume_spike(records)
        if volume_signal:
            signals.append(volume_signal)
        
        return signals
    
    def _analyze_single_record(self, record: IngestedRecord) -> List[Signal]:
        """Analyze a single record for signals."""
        signals = []
        text = record.extracted_text.lower()
        
        # Check for coordination language
        coord_score = self._score_coordination_language(text)
        if coord_score > 0.3:
            signals.append(Signal(
                signal_type="coordination_language",
                confidence=coord_score,
                source_record_id=str(record.source_id),
                timestamp=record.timestamp,
                entities=record.entities,
                location_hints=record.entities.get("locations", []),
                evidence_text=record.extracted_text[:500]
            ))
        
        # Check for escalation language
        escalation_score = self._score_escalation_language(text)
        if escalation_score > 0.3:
            signals.append(Signal(
                signal_type="escalation_language",
                confidence=escalation_score,
                source_record_id=str(record.source_id),
                timestamp=record.timestamp,
                entities=record.entities,
                location_hints=record.entities.get("locations", []),
                evidence_text=record.extracted_text[:500]
            ))
        
        # Check for temporal references
        temporal_hints = self._extract_temporal_references(text)
        if temporal_hints:
            signals.append(Signal(
                signal_type="temporal_reference",
                confidence=0.6,
                source_record_id=str(record.source_id),
                timestamp=record.timestamp,
                temporal_hints=temporal_hints,
                evidence_text=record.extracted_text[:500]
            ))
        
        # Check for location mentions
        if record.location or record.entities.get("locations"):
            signals.append(Signal(
                signal_type="location_mention",
                confidence=0.7,
                source_record_id=str(record.source_id),
                timestamp=record.timestamp,
                location_hints=record.entities.get("locations", []),
                evidence_text=record.extracted_text[:500]
            ))
        
        # Check for organizer accounts
        if self._is_likely_organizer(record):
            signals.append(Signal(
                signal_type="organizer_account",
                confidence=0.5,
                source_record_id=str(record.source_id),
                timestamp=record.timestamp,
                entities=record.entities,
                metadata={"connector_type": record.connector_type}
            ))
        
        return signals
    
    def _score_coordination_language(self, text: str) -> float:
        """Score text for coordination language (0.0 to 1.0)."""
        matches = sum(1 for keyword in self.coordination_keywords if keyword in text)
        return min(matches * 0.25, 1.0)
    
    def _score_escalation_language(self, text: str) -> float:
        """Score text for escalation/violence language (0.0 to 1.0)."""
        matches = sum(1 for keyword in self.escalation_keywords if keyword in text)
        return min(matches * 0.3, 1.0)
    
    def _extract_temporal_references(self, text: str) -> List[str]:
        """Extract temporal references from text."""
        hints = []
        for pattern in self.date_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            hints.extend(matches)
        return hints
    
    def _is_likely_organizer(self, record: IngestedRecord) -> bool:
        """Check if record appears to be from an organizer account."""
        # Placeholder logic - would use follower counts, posting patterns, etc.
        text = record.extracted_text.lower()
        organizer_indicators = [
            "organizer", "host", "contact", "dm for details",
            "message me", "reach out", "coordinate"
        ]
        return any(indicator in text for indicator in organizer_indicators)
    
    def _detect_volume_spike(self, records: List[IngestedRecord]) -> Optional[Signal]:
        """Detect if there's a volume spike in the records."""
        if len(records) < 10:
            return None
        
        # Group by time windows
        time_windows: Dict[str, int] = {}
        for record in records:
            window_key = record.timestamp.strftime("%Y-%m-%d %H")
            time_windows[window_key] = time_windows.get(window_key, 0) + 1
        
        # Check for spike (simple threshold-based)
        if time_windows:
            max_volume = max(time_windows.values())
            avg_volume = sum(time_windows.values()) / len(time_windows)
            
            if max_volume > avg_volume * 3 and max_volume > 5:
                return Signal(
                    signal_type="volume_spike",
                    confidence=min(max_volume / (avg_volume * 5), 1.0),
                    source_record_id="aggregate",
                    timestamp=datetime.utcnow(),
                    metadata={
                        "max_volume": max_volume,
                        "avg_volume": avg_volume,
                        "time_windows": len(time_windows)
                    }
                )
        
        return None
