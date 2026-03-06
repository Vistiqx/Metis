"""
Metis Platform - Escalation Risk Model

Predicts protest and conflict escalation risks.
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Dict, List, Optional
import uuid


@dataclass
class EscalationRisk:
    """Escalation risk assessment."""
    event_id: uuid.UUID
    risk_score: float  # 0-1
    risk_level: str  # low, medium, high, critical
    confidence: float
    indicators: List[Dict[str, Any]] = field(default_factory=list)
    predicted_timeline: str = ""
    contributing_factors: List[str] = field(default_factory=list)
    mitigation_suggestions: List[str] = field(default_factory=list)
    assessed_at: datetime = field(default_factory=datetime.utcnow)


class EscalationRiskModel:
    """
    Escalation risk prediction model.
    
    Analyzes events for signs of potential escalation:
    - Coordination language
    - Historical patterns
    - Actor threat levels
    - Contextual factors
    - Social media signals
    """
    
    def __init__(self):
        self.thresholds = {
            "critical": 0.8,
            "high": 0.6,
            "medium": 0.4,
            "low": 0.0
        }
    
    async def assess_event(
        self,
        event_id: uuid.UUID,
        include_context: bool = True
    ) -> EscalationRisk:
        """
        Assess escalation risk for an event.
        
        Args:
            event_id: Event UUID
            include_context: Whether to include broader context
            
        Returns:
            EscalationRisk assessment
        """
        # Placeholder - would analyze actual event data
        # In production:
        # 1. Get event details
        # 2. Analyze evidence for escalation signals
        # 3. Check actor threat levels
        # 4. Look at historical patterns
        # 5. Factor in social media sentiment
        
        indicators = [
            {
                "type": "language_analysis",
                "indicator": "escalation_keywords",
                "present": True,
                "weight": 0.3,
                "confidence": 0.75
            },
            {
                "type": "actor_analysis",
                "indicator": "high_threat_actors",
                "count": 2,
                "weight": 0.25,
                "confidence": 0.6
            },
            {
                "type": "temporal",
                "indicator": "upcoming_date",
                "days_until": 3,
                "weight": 0.2,
                "confidence": 0.9
            }
        ]
        
        # Calculate weighted risk score
        total_weight = sum(i.get("weight", 0) for i in indicators)
        weighted_sum = sum(
            i.get("confidence", 0) * i.get("weight", 0)
            for i in indicators
        )
        
        risk_score = weighted_sum / total_weight if total_weight > 0 else 0.0
        
        # Determine risk level
        risk_level = self._score_to_level(risk_score)
        
        # Generate predictions
        predicted_timeline = self._predict_timeline(risk_score, indicators)
        
        # Contributing factors
        contributing_factors = [
            "Active organizer accounts identified",
            "Historical violence at similar events",
            "Coordination detected on social media",
            "Proximity to sensitive locations"
        ]
        
        # Mitigation suggestions
        mitigation_suggestions = [
            "Monitor organizer communications",
            "Alert local authorities",
            "Deploy early warning systems",
            "Track key actors"
        ]
        
        return EscalationRisk(
            event_id=event_id,
            risk_score=round(risk_score, 2),
            risk_level=risk_level,
            confidence=0.72,
            indicators=indicators,
            predicted_timeline=predicted_timeline,
            contributing_factors=contributing_factors,
            mitigation_suggestions=mitigation_suggestions
        )
    
    def _score_to_level(self, score: float) -> str:
        """Convert score to risk level."""
        if score >= self.thresholds["critical"]:
            return "critical"
        elif score >= self.thresholds["high"]:
            return "high"
        elif score >= self.thresholds["medium"]:
            return "medium"
        else:
            return "low"
    
    def _predict_timeline(self, score: float, indicators: List[Dict]) -> str:
        """Predict escalation timeline."""
        # Check for temporal indicators
        temporal = next((i for i in indicators if i.get("type") == "temporal"), None)
        
        if temporal and temporal.get("days_until"):
            days = temporal["days_until"]
            if days <= 3:
                return f"High probability within {days} days"
            elif days <= 7:
                return f"Possible within {days} days"
            else:
                return f"Monitor over next {days} days"
        
        if score >= 0.7:
            return "Escalation possible within 24-48 hours"
        elif score >= 0.5:
            return "Monitor closely over next week"
        else:
            return "Low immediate risk"
    
    async def assess_campaign(
        self,
        event_ids: List[uuid.UUID]
    ) -> Dict[str, Any]:
        """
        Assess escalation risk across multiple related events.
        
        Args:
            event_ids: List of event UUIDs
            
        Returns:
            Campaign-level risk assessment
        """
        individual_risks = []
        for event_id in event_ids:
            risk = await self.assess_event(event_id)
            individual_risks.append(risk)
        
        # Calculate aggregate risk
        avg_score = sum(r.risk_score for r in individual_risks) / len(individual_risks)
        max_score = max(r.risk_score for r in individual_risks)
        
        return {
            "campaign_risk_score": round(avg_score, 2),
            "max_individual_risk": round(max_score, 2),
            "risk_level": self._score_to_level(max_score),
            "event_count": len(event_ids),
            "high_risk_events": sum(1 for r in individual_risks if r.risk_level in ["high", "critical"]),
            "assessments": [
                {
                    "event_id": str(r.event_id),
                    "risk_score": r.risk_score,
                    "risk_level": r.risk_level
                }
                for r in individual_risks
            ]
        }
