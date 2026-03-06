"""
Metis Platform - Prompt Library

Centralized prompt templates for AI generation tasks.
"""

from typing import Any, Dict, List, Optional


class PromptLibrary:
    """Library of prompt templates for AI tasks."""
    
    @staticmethod
    def event_summary(context: Dict[str, Any]) -> str:
        """
        Generate prompt for event summary.
        
        Args:
            context: Event context dict with event, evidence, actors
            
        Returns:
            Formatted prompt string
        """
        event = context.get("event", {})
        evidence = context.get("evidence", [])
        
        prompt = f"""Analyze the following event and generate a structured summary.

EVENT DETAILS:
Title: {event.get('title', 'Unknown')}
Type: {event.get('event_type', 'Unknown')}
Severity: {event.get('severity', 'Unknown')}
Description: {event.get('description', 'No description available')}

EVIDENCE ({len(evidence)} items):
"""
        
        for i, ev in enumerate(evidence[:5], 1):
            prompt += f"""
{i}. {ev.get('evidence_type', 'Unknown')}: {ev.get('title', 'Untitled')}
   Content: {ev.get('content_text', 'No content')[:300]}...
"""
        
        prompt += """

Generate a structured summary with:
1. Executive Summary (2-3 sentences)
2. Key Facts (bullet points)
3. Actors Involved (if identifiable)
4. Evidence Assessment
5. Confidence Level (High/Medium/Low)
6. Recommended Actions

Format the response in clear sections."""
        
        return prompt
    
    @staticmethod
    def case_report(context: Dict[str, Any]) -> str:
        """
        Generate prompt for case report.
        
        Args:
            context: Case context with case, events, evidence
            
        Returns:
            Formatted prompt string
        """
        case = context.get("case", {})
        events = context.get("events", [])
        
        prompt = f"""Generate a comprehensive case report.

CASE: {case.get('title', 'Unknown')}
Case Number: {case.get('case_number', 'N/A')}
Status: {case.get('status', 'Unknown')}
Priority: {case.get('priority', 'Unknown')}

Description:
{case.get('description', 'No description provided')}

EVENTS ({len(events)} total):
"""
        
        for i, event in enumerate(events[:10], 1):
            prompt += f"""
{i}. {event.get('title', 'Untitled')} ({event.get('event_type', 'Unknown')})
   Severity: {event.get('severity', 'Unknown')}
   Date: {event.get('occurred_at', 'Unknown')}
"""
        
        prompt += """

Generate a structured case report with:
1. Executive Summary
2. Case Overview
3. Timeline of Events
4. Key Findings
5. Risk Assessment
6. Recommendations
7. Next Steps

Format professionally for analyst review."""
        
        return prompt
    
    @staticmethod
    def daily_briefing(activity: Dict[str, Any], stats: Dict[str, Any]) -> str:
        """
        Generate prompt for daily briefing.
        
        Args:
            activity: Recent activity data
            stats: Platform statistics
            
        Returns:
            Formatted prompt string
        """
        new_events = activity.get("new_events", [])
        alerts = activity.get("alerts", [])
        
        prompt = f"""Generate a daily intelligence briefing for the past {activity.get('period_hours', 24)} hours.

PLATFORM OVERVIEW:
- Total Events: {stats.get('total_events', 0)}
- Active Cases: {stats.get('active_cases', 0)}
- High Severity Events: {stats.get('high_severity_events', 0)}

NEW EVENTS ({len(new_events)}):
"""
        
        for event in new_events[:5]:
            prompt += f"""
- {event.get('title', 'Untitled')} ({event.get('severity', 'Unknown')})
"""
        
        if alerts:
            prompt += f"""

ALERTS ({len(alerts)}):
"""
            for alert in alerts[:3]:
                prompt += f"""
- {alert.get('message', 'Alert')}
"""
        
        prompt += """

Generate a briefing with:
1. Key Developments (most important items)
2. New Events Summary
3. Alert Summary
4. Trends and Patterns
5. Recommended Actions
6. Items Requiring Attention

Keep the briefing concise but comprehensive. Use bullet points for readability."""
        
        return prompt
    
    @staticmethod
    def analyst_chat(
        user_message: str,
        context: Optional[Dict[str, Any]] = None,
        chat_history: Optional[List[Dict[str, str]]] = None
    ) -> List[Dict[str, str]]:
        """
        Generate chat messages for analyst chat.
        
        Args:
            user_message: User's message
            context: Optional context about current view
            chat_history: Previous messages
            
        Returns:
            List of message dicts for LLM
        """
        system_prompt = """You are Metis AI Analyst, an intelligent assistant for OSINT investigations.

Your role:
- Help analysts understand events, actors, and patterns
- Answer questions about the data
- Provide insights and recommendations
- Be concise and professional
- Always cite uncertainty when appropriate

Current platform context:
- Metis is an OSINT fusion and intelligence analysis platform
- You have access to event data, evidence, actor profiles, and case information
- You can help with summarization, analysis, and investigation guidance

Respond helpfully and accurately based on the available information."""
        
        messages = [
            {"role": "system", "content": system_prompt}
        ]
        
        # Add context if available
        if context:
            context_str = f"\nCurrent Context:\n{str(context)[:500]}"
            messages.append({"role": "system", "content": context_str})
        
        # Add chat history
        if chat_history:
            messages.extend(chat_history[-5:])  # Last 5 messages
        
        # Add user message
        messages.append({"role": "user", "content": user_message})
        
        return messages
    
    @staticmethod
    def narrative_analysis(narrative_text: str, events: List[Dict]) -> str:
        """
        Generate prompt for narrative analysis.
        
        Args:
            narrative_text: The narrative to analyze
            events: Related events
            
        Returns:
            Formatted prompt string
        """
        prompt = f"""Analyze the following narrative and related events.

NARRATIVE:
{narrative_text}

RELATED EVENTS ({len(events)}):
"""
        
        for i, event in enumerate(events[:5], 1):
            prompt += f"""
{i}. {event.get('title', 'Untitled')} ({event.get('event_type', 'Unknown')})
"""
        
        prompt += """

Provide analysis:
1. Narrative Summary
2. Key Claims (fact-checkable statements)
3. Supporting Evidence Assessment
4. Gaps or Uncertainties
5. Credibility Assessment
6. Related Event Correlations
7. Recommendations for Further Investigation

Be objective and thorough in your analysis."""
        
        return prompt
