"""
Metis Platform - AI Report Generators

Generates AI-powered reports and summaries.
"""

import uuid
from typing import Any, Dict, Optional

from sqlalchemy.orm import Session

from ai_analyst.llm_providers import LLMProvider, LLMResponse, get_llm_provider
from ai_analyst.prompts import PromptLibrary
from ai_analyst.retrieval import RetrievalService


class EventSummaryGenerator:
    """Generates AI summaries for events."""
    
    def __init__(self, db: Session, provider: Optional[LLMProvider] = None):
        self.db = db
        self.retrieval = RetrievalService(db)
        self.provider = provider or get_llm_provider()
    
    async def generate_summary(self, event_id: uuid.UUID) -> Dict[str, Any]:
        """
        Generate an AI summary for an event.
        
        Args:
            event_id: Event UUID
            
        Returns:
            Summary dict with content and metadata
        """
        # Retrieve event context
        context = self.retrieval.retrieve_event_context(event_id)
        
        if not context.get("event"):
            return {
                "error": "Event not found",
                "event_id": str(event_id)
            }
        
        # Generate prompt
        prompt = PromptLibrary.event_summary(context)
        
        # Generate summary
        response = await self.provider.generate(
            prompt=prompt,
            temperature=0.5,
            max_tokens=1500
        )
        
        return {
            "event_id": str(event_id),
            "summary": response.content,
            "model": response.model,
            "tokens_used": response.tokens_used,
            "generated_at": "2024-03-06T00:00:00Z",  # Would use actual timestamp
            "context": {
                "evidence_count": len(context.get("evidence", [])),
                "actor_count": len(context.get("actors", []))
            }
        }


class CaseReportGenerator:
    """Generates AI reports for cases."""
    
    def __init__(self, db: Session, provider: Optional[LLMProvider] = None):
        self.db = db
        self.retrieval = RetrievalService(db)
        self.provider = provider or get_llm_provider()
    
    async def generate_report(self, case_id: uuid.UUID) -> Dict[str, Any]:
        """
        Generate an AI report for a case.
        
        Args:
            case_id: Case UUID
            
        Returns:
            Report dict with content and metadata
        """
        # Retrieve case context
        context = self.retrieval.retrieve_case_context(case_id)
        
        if not context.get("case"):
            return {
                "error": "Case not found",
                "case_id": str(case_id)
            }
        
        # Generate prompt
        prompt = PromptLibrary.case_report(context)
        
        # Generate report
        response = await self.provider.generate(
            prompt=prompt,
            temperature=0.4,
            max_tokens=3000
        )
        
        return {
            "case_id": str(case_id),
            "report": response.content,
            "model": response.model,
            "tokens_used": response.tokens_used,
            "generated_at": "2024-03-06T00:00:00Z",
            "context": {
                "event_count": len(context.get("events", [])),
                "case_title": context["case"].get("title")
            }
        }


class DailyBriefingGenerator:
    """Generates daily intelligence briefings."""
    
    def __init__(self, db: Session, provider: Optional[LLMProvider] = None):
        self.db = db
        self.retrieval = RetrievalService(db)
        self.provider = provider or get_llm_provider()
    
    async def generate_briefing(
        self,
        hours: int = 24,
        focus_areas: Optional[list] = None
    ) -> Dict[str, Any]:
        """
        Generate a daily intelligence briefing.
        
        Args:
            hours: Lookback period
            focus_areas: Optional focus areas
            
        Returns:
            Briefing dict with content and sections
        """
        # Retrieve recent activity
        activity = self.retrieval.retrieve_recent_activity(hours=hours)
        stats = self.retrieval.get_statistics()
        
        # Generate prompt
        prompt = PromptLibrary.daily_briefing(activity, stats)
        
        # Generate briefing
        response = await self.provider.generate(
            prompt=prompt,
            temperature=0.6,
            max_tokens=2000
        )
        
        # Parse sections (simplified)
        content = response.content
        sections = self._parse_briefing_sections(content)
        
        return {
            "period_hours": hours,
            "briefing": content,
            "sections": sections,
            "model": response.model,
            "tokens_used": response.tokens_used,
            "generated_at": "2024-03-06T00:00:00Z",
            "summary": {
                "new_events": len(activity.get("new_events", [])),
                "alerts": len(activity.get("alerts", []))
            }
        }
    
    def _parse_briefing_sections(self, content: str) -> Dict[str, str]:
        """Parse briefing content into sections."""
        # Simplified parsing - in production would use structured output
        sections = {}
        
        # Look for common section headers
        section_patterns = [
            ("key_developments", ["Key Developments", "Key Developments:"]),
            ("new_events", ["New Events", "New Events:"]),
            ("alerts", ["Alert Summary", "Alerts:"]),
            ("trends", ["Trends", "Trends and Patterns"]),
            ("recommendations", ["Recommendations", "Recommended Actions"])
        ]
        
        for section_key, headers in section_patterns:
            for header in headers:
                if header in content:
                    # Simple extraction - would be more sophisticated in production
                    start = content.find(header)
                    if start >= 0:
                        end = content.find("\n\n", start + len(header))
                        if end < 0:
                            end = len(content)
                        sections[section_key] = content[start:end].strip()
                        break
        
        return sections
