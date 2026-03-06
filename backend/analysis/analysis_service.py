"""
Metis Platform - Analysis Service

Central service for running intelligence analysis pipelines.
"""

from typing import Any, Dict, List, Optional

from analysis.alert_generator import AlertGenerator
from analysis.candidate_event_generator import CandidateEventGenerator
from analysis.event_clustering import EventCluster, EventClusteringEngine
from analysis.signal_detector import Signal, SignalDetector
from ingestion.connector_base import IngestedRecord


class AnalysisService:
    """Service for running analysis pipelines on ingested data."""
    
    def __init__(self):
        self.signal_detector = SignalDetector()
        self.clustering_engine = EventClusteringEngine()
        self.candidate_generator = CandidateEventGenerator()
        self.alert_generator = AlertGenerator()
    
    async def analyze_records(
        self,
        records: List[IngestedRecord],
        generate_candidates: bool = True,
        generate_alerts: bool = True
    ) -> Dict[str, Any]:
        """
        Run full analysis pipeline on a batch of records.
        
        Args:
            records: List of ingested records
            generate_candidates: Whether to generate candidate events
            generate_alerts: Whether to generate alerts
            
        Returns:
            Analysis results dictionary
        """
        results = {
            "records_processed": len(records),
            "signals": [],
            "clusters": [],
            "candidates": [],
            "alerts": []
        }
        
        if not records:
            return results
        
        # Step 1: Signal Detection
        signals = self.signal_detector.analyze_records(records)
        results["signals"] = [self._signal_to_dict(s) for s in signals]
        
        # Step 2: Event Clustering
        clusters = self.clustering_engine.cluster_records(records)
        results["clusters"] = [self._cluster_to_dict(c) for c in clusters]
        
        # Step 3: Generate Candidate Events (if enabled)
        if generate_candidates:
            candidates = self._generate_candidates(clusters, signals)
            results["candidates"] = candidates
        
        # Step 4: Generate Alerts (if enabled)
        if generate_alerts:
            alerts = self._generate_alerts(clusters, signals, results["candidates"])
            results["alerts"] = [self._alert_to_dict(a) for a in alerts if a]
        
        return results
    
    def _generate_candidates(
        self,
        clusters: List[EventCluster],
        signals: List[Signal]
    ) -> List[Dict[str, Any]]:
        """Generate candidate events from clusters and signals."""
        candidates = []
        
        # Generate from clusters
        for cluster in clusters:
            # Find related signals for this cluster
            cluster_signals = [
                s for s in signals
                if s.source_record_id in [str(r.source_id) for r in cluster.records]
            ]
            
            candidate = self.candidate_generator.generate_from_cluster(cluster, cluster_signals)
            if candidate:
                candidates.append(candidate)
        
        return candidates
    
    def _generate_alerts(
        self,
        clusters: List[EventCluster],
        signals: List[Signal],
        candidates: List[Dict[str, Any]]
    ) -> List[Optional[Dict[str, Any]]]:
        """Generate alerts from analysis results."""
        alerts = []
        
        # Generate alerts from candidates
        for candidate in candidates:
            alert = self.alert_generator.generate_from_candidate(candidate)
            if alert:
                alerts.append(alert)
        
        # Generate alerts from high-confidence signal clusters
        if len(signals) >= 5:
            escalation_alert = self.alert_generator.generate_from_signals(signals)
            if escalation_alert:
                alerts.append(escalation_alert)
        
        return alerts
    
    def _signal_to_dict(self, signal: Signal) -> Dict[str, Any]:
        """Convert Signal to dictionary."""
        return {
            "signal_type": signal.signal_type,
            "confidence": signal.confidence,
            "source_record_id": signal.source_record_id,
            "timestamp": signal.timestamp.isoformat(),
            "entities": signal.entities,
            "location_hints": signal.location_hints,
            "temporal_hints": signal.temporal_hints,
            "evidence_text": signal.evidence_text[:200] if signal.evidence_text else None
        }
    
    def _cluster_to_dict(self, cluster: EventCluster) -> Dict[str, Any]:
        """Convert EventCluster to dictionary."""
        return {
            "cluster_id": cluster.cluster_id,
            "record_count": len(cluster.records),
            "entities": {k: list(v) for k, v in cluster.entities.items()},
            "locations": list(cluster.locations),
            "confidence_score": cluster.confidence_score,
            "cluster_type": cluster.cluster_type
        }
    
    def _alert_to_dict(self, alert: Dict[str, Any]) -> Dict[str, Any]:
        """Convert alert dict to standardized format."""
        if "created_at" in alert and hasattr(alert["created_at"], "isoformat"):
            alert["created_at"] = alert["created_at"].isoformat()
        return alert
    
    async def analyze_text(self, text: str) -> Dict[str, Any]:
        """
        Analyze a single text for signals (for testing/real-time).
        
        Args:
            text: Text to analyze
            
        Returns:
            Analysis results
        """
        # Create a dummy record
        from datetime import datetime
        import uuid
        
        record = IngestedRecord(
            source_id=uuid.uuid4(),
            timestamp=datetime.utcnow(),
            raw_content=text,
            extracted_text=text,
            entities={},
            connector_type="manual"
        )
        
        # Run analysis
        signals = self.signal_detector.analyze_records([record])
        
        return {
            "text": text[:200],
            "signals_detected": len(signals),
            "signals": [self._signal_to_dict(s) for s in signals]
        }
    
    def get_analysis_stats(self) -> Dict[str, Any]:
        """Get statistics about the analysis engine."""
        return {
            "signal_detector": {
                "coordination_keywords": len(self.signal_detector.coordination_keywords),
                "escalation_keywords": len(self.signal_detector.escalation_keywords),
                "date_patterns": len(self.signal_detector.date_patterns)
            },
            "clustering_engine": {
                "similarity_threshold": self.clustering_engine.similarity_threshold,
                "temporal_window_hours": self.clustering_engine.temporal_window_hours
            },
            "candidate_generator": {
                "confidence_threshold": self.candidate_generator.confidence_threshold,
                "min_signals": self.candidate_generator.min_signals
            }
        }
