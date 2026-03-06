"""
Metis Platform - Actor Threat Scorer

Calculates threat scores for actors based on behavior patterns.
"""

from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional
import uuid


@dataclass
class ThreatScore:
    """Threat score for an actor."""
    actor_id: uuid.UUID
    overall_score: float  # 0-100
    confidence: float  # 0-1
    factors: Dict[str, float] = field(default_factory=dict)
    risk_level: str = "unknown"  # low, medium, high, critical
    calculated_at: datetime = field(default_factory=datetime.utcnow)
    reasoning: List[str] = field(default_factory=list)


class ActorThreatScorer:
    """
    Calculates threat scores for actors.
    
    Factors:
    - Historical activity
    - Network influence
    - Coordination behavior
    - Prior incident involvement
    """
    
    def __init__(self):
        self.weights = {
            "historical_activity": 0.25,
            "network_influence": 0.25,
            "coordination_behavior": 0.30,
            "prior_incidents": 0.20
        }
    
    async def calculate_score(
        self,
        actor_id: uuid.UUID,
        lookback_days: int = 90
    ) -> ThreatScore:
        """
        Calculate threat score for an actor.
        
        Args:
            actor_id: Actor UUID
            lookback_days: Historical lookback period
            
        Returns:
            ThreatScore with breakdown
        """
        # Placeholder - would query actual data
        # In production:
        # 1. Get actor's events
        # 2. Get actor's network
        # 3. Get coordination patterns
        # 4. Calculate weighted scores
        
        factors = {
            "historical_activity": 65.0,
            "network_influence": 72.0,
            "coordination_behavior": 58.0,
            "prior_incidents": 45.0
        }
        
        # Calculate weighted overall score
        overall = sum(
            factors.get(factor, 0) * weight
            for factor, weight in self.weights.items()
        )
        
        # Determine risk level
        risk_level = self._score_to_risk_level(overall)
        
        # Generate reasoning
        reasoning = self._generate_reasoning(factors, overall)
        
        return ThreatScore(
            actor_id=actor_id,
            overall_score=round(overall, 1),
            confidence=0.75,
            factors=factors,
            risk_level=risk_level,
            reasoning=reasoning
        )
    
    def _score_to_risk_level(self, score: float) -> str:
        """Convert numeric score to risk level."""
        if score >= 75:
            return "critical"
        elif score >= 60:
            return "high"
        elif score >= 40:
            return "medium"
        else:
            return "low"
    
    def _generate_reasoning(
        self,
        factors: Dict[str, float],
        overall: float
    ) -> List[str]:
        """Generate human-readable reasoning."""
        reasoning = []
        
        # Identify highest scoring factor
        highest = max(factors.items(), key=lambda x: x[1])
        reasoning.append(f"Strongest indicator: {highest[0].replace('_', ' ').title()} ({highest[1]:.0f}/100)")
        
        # Identify lowest scoring factor
        lowest = min(factors.items(), key=lambda x: x[1])
        reasoning.append(f"Weakest indicator: {lowest[0].replace('_', ' ').title()} ({lowest[1]:.0f}/100)")
        
        # Overall assessment
        if overall >= 60:
            reasoning.append("Actor exhibits multiple concerning patterns")
        elif overall >= 40:
            reasoning.append("Moderate threat level - monitoring recommended")
        else:
            reasoning.append("Low threat profile based on available data")
        
        return reasoning
    
    async def compare_actors(
        self,
        actor_ids: List[uuid.UUID]
    ) -> List[ThreatScore]:
        """
        Compare threat scores across multiple actors.
        
        Args:
            actor_ids: List of actor UUIDs
            
        Returns:
            List of threat scores sorted by score
        """
        scores = []
        for actor_id in actor_ids:
            score = await self.calculate_score(actor_id)
            scores.append(score)
        
        # Sort by overall score descending
        return sorted(scores, key=lambda x: x.overall_score, reverse=True)
    
    def get_trend(
        self,
        actor_id: uuid.UUID,
        days: int = 30
    ) -> Dict[str, Any]:
        """
        Get threat score trend over time.
        
        Args:
            actor_id: Actor UUID
            days: Number of days for trend
            
        Returns:
            Trend data
        """
        # Placeholder - would query historical scores
        return {
            "actor_id": str(actor_id),
            "trend": "increasing",
            "change": 12.5,
            "period_days": days,
            "data_points": [
                {"date": (datetime.utcnow() - timedelta(days=i)).isoformat(), "score": 50 + i}
                for i in range(0, days, 7)
            ]
        }
