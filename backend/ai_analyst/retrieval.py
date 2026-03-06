"""
Metis Platform - Retrieval Service (RAG)

Retrieves relevant context from Metis data stores for AI analysis.
"""

import uuid
from typing import Any, Dict, List, Optional
from datetime import datetime, timedelta

from sqlalchemy.orm import Session
from sqlalchemy import text

from core.database import get_db
from models.event import Event
from models.evidence import Evidence
from models.actor import Actor
from models.case import Case


class RetrievalService:
    """
    Retrieval-Augmented Generation (RAG) service for AI analyst.
    
    Retrieves relevant context from:
    - PostgreSQL (structured data)
    - OpenSearch (full-text search)
    - Neo4j (graph relationships)
    """
    
    def __init__(self, db: Session):
        self.db = db
    
    def retrieve_event_context(
        self,
        event_id: uuid.UUID,
        include_evidence: bool = True,
        include_actors: bool = True,
        include_related: bool = True
    ) -> Dict[str, Any]:
        """
        Retrieve comprehensive context for an event.
        
        Args:
            event_id: Event UUID
            include_evidence: Include linked evidence
            include_actors: Include involved actors
            include_related: Include related events
            
        Returns:
            Context dictionary for AI analysis
        """
        context = {
            "event": None,
            "evidence": [],
            "actors": [],
            "related_events": [],
            "narratives": []
        }
        
        # Get event details
        event = self.db.query(Event).filter(Event.id == event_id).first()
        if event:
            context["event"] = {
                "id": str(event.id),
                "title": event.title,
                "description": event.description,
                "event_type": event.event_type,
                "severity": event.severity,
                "status": event.status,
                "confidence_score": float(event.confidence_score) if event.confidence_score else None,
                "occurred_at": event.occurred_at.isoformat() if event.occurred_at else None,
                "location_id": str(event.location_id) if event.location_id else None,
                "tags": event.tags
            }
        
        # Get evidence
        if include_evidence and event:
            evidence_items = self.db.query(Evidence).filter(
                Evidence.event_id == event_id
            ).all()
            
            context["evidence"] = [
                {
                    "id": str(e.id),
                    "evidence_type": e.evidence_type,
                    "title": e.title,
                    "content_text": e.content_text[:1000] if e.content_text else None,
                    "source_id": str(e.source_id) if e.source_id else None,
                    "reliability_score": float(e.reliability_score) if e.reliability_score else None,
                    "captured_at": e.captured_at.isoformat() if e.captured_at else None
                }
                for e in evidence_items
            ]
        
        # Get actors
        if include_actors and event:
            # This would use the event_actors relationship table
            # For now, return placeholder
            context["actors"] = []
        
        return context
    
    def retrieve_case_context(
        self,
        case_id: uuid.UUID,
        include_events: bool = True,
        include_evidence: bool = True
    ) -> Dict[str, Any]:
        """
        Retrieve comprehensive context for a case.
        
        Args:
            case_id: Case UUID
            include_events: Include case events
            include_evidence: Include all evidence
            
        Returns:
            Context dictionary for AI analysis
        """
        context = {
            "case": None,
            "events": [],
            "evidence_summary": {},
            "actor_network": []
        }
        
        # Get case details
        case = self.db.query(Case).filter(Case.id == case_id).first()
        if case:
            context["case"] = {
                "id": str(case.id),
                "title": case.title,
                "description": case.description,
                "case_number": case.case_number,
                "status": case.status,
                "priority": case.priority,
                "tags": case.tags,
                "started_at": case.started_at.isoformat() if case.started_at else None
            }
        
        # Get events
        if include_events and case:
            events = self.db.query(Event).filter(Event.case_id == case_id).all()
            context["events"] = [
                {
                    "id": str(e.id),
                    "title": e.title,
                    "event_type": e.event_type,
                    "severity": e.severity,
                    "status": e.status,
                    "occurred_at": e.occurred_at.isoformat() if e.occurred_at else None
                }
                for e in events
            ]
        
        return context
    
    def search_relevant_content(
        self,
        query: str,
        entity_type: Optional[str] = None,
        limit: int = 10
    ) -> List[Dict[str, Any]]:
        """
        Search for relevant content using full-text search.
        
        Args:
            query: Search query
            entity_type: Filter by entity type (event, evidence, actor)
            limit: Maximum results
            
        Returns:
            List of relevant items
        """
        results = []
        
        # Search events
        if not entity_type or entity_type == "event":
            events = self.db.query(Event).filter(
                text("title ILIKE :query OR description ILIKE :query")
            ).params(query=f"%{query}%").limit(limit).all()
            
            results.extend([
                {
                    "type": "event",
                    "id": str(e.id),
                    "title": e.title,
                    "relevance": 0.8
                }
                for e in events
            ])
        
        # Search evidence
        if not entity_type or entity_type == "evidence":
            evidence = self.db.query(Evidence).filter(
                text("title ILIKE :query OR content_text ILIKE :query")
            ).params(query=f"%{query}%").limit(limit).all()
            
            results.extend([
                {
                    "type": "evidence",
                    "id": str(e.id),
                    "title": e.title,
                    "relevance": 0.7
                }
                for e in evidence
            ])
        
        return results[:limit]
    
    def retrieve_recent_activity(
        self,
        hours: int = 24,
        limit: int = 50
    ) -> Dict[str, Any]:
        """
        Retrieve recent platform activity for briefing generation.
        
        Args:
            hours: Lookback period in hours
            limit: Maximum items per category
            
        Returns:
            Recent activity summary
        """
        since = datetime.utcnow() - timedelta(hours=hours)
        
        # New events
        new_events = self.db.query(Event).filter(
            Event.created_at >= since
        ).limit(limit).all()
        
        # Updated cases
        updated_cases = self.db.query(Case).filter(
            Case.updated_at >= since
        ).limit(limit).all()
        
        # New alerts (placeholder - would query alerts table)
        new_alerts = []
        
        return {
            "period_hours": hours,
            "new_events": [
                {
                    "id": str(e.id),
                    "title": e.title,
                    "severity": e.severity,
                    "created_at": e.created_at.isoformat()
                }
                for e in new_events
            ],
            "updated_cases": [
                {
                    "id": str(c.id),
                    "title": c.title,
                    "status": c.status,
                    "updated_at": c.updated_at.isoformat()
                }
                for c in updated_cases
            ],
            "alerts": new_alerts
        }
    
    def get_statistics(self) -> Dict[str, Any]:
        """Get platform statistics for AI context."""
        return {
            "total_events": self.db.query(Event).count(),
            "total_cases": self.db.query(Case).count(),
            "active_cases": self.db.query(Case).filter(Case.status == "open").count(),
            "high_severity_events": self.db.query(Event).filter(
                Event.severity == "high"
            ).count()
        }
