"""
Metis Platform - LLM Provider Abstraction

Pluggable providers for AI model integration.
"""

import os
from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional
from dataclasses import dataclass, field

from core.config import settings


@dataclass
class LLMResponse:
    """Standardized LLM response."""
    content: str
    model: str
    tokens_used: int = 0
    cost: float = 0.0
    metadata: Dict[str, Any] = field(default_factory=dict)


class LLMProvider(ABC):
    """Abstract base class for LLM providers."""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key
        self.model = "default"
    
    @abstractmethod
    async def generate(
        self,
        prompt: str,
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> LLMResponse:
        """
        Generate text completion.
        
        Args:
            prompt: Input prompt
            temperature: Sampling temperature
            max_tokens: Maximum tokens to generate
            
        Returns:
            LLMResponse with generated content
        """
        pass
    
    @abstractmethod
    async def generate_chat(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> LLMResponse:
        """
        Generate chat completion.
        
        Args:
            messages: List of message dicts with 'role' and 'content'
            temperature: Sampling temperature
            max_tokens: Maximum tokens to generate
            
        Returns:
            LLMResponse with generated content
        """
        pass
    
    def is_configured(self) -> bool:
        """Check if provider is properly configured."""
        return bool(self.api_key)


class OpenAIProvider(LLMProvider):
    """OpenAI GPT provider."""
    
    def __init__(self, api_key: Optional[str] = None):
        super().__init__(api_key or settings.OPENAI_API_KEY)
        self.model = "gpt-4"
    
    async def generate(
        self,
        prompt: str,
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> LLMResponse:
        """Generate using OpenAI API."""
        if not self.is_configured():
            return LLMResponse(
                content="OpenAI not configured. Set OPENAI_API_KEY.",
                model="none",
                tokens_used=0
            )
        
        try:
            # Placeholder for actual OpenAI integration
            # In production:
            # import openai
            # client = openai.AsyncOpenAI(api_key=self.api_key)
            # response = await client.completions.create(...)
            
            return LLMResponse(
                content=f"[OpenAI {self.model} would generate response for prompt length {len(prompt)}]",
                model=self.model,
                tokens_used=len(prompt) // 4  # Rough estimate
            )
        except Exception as e:
            return LLMResponse(
                content=f"Error: {str(e)}",
                model=self.model,
                tokens_used=0
            )
    
    async def generate_chat(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> LLMResponse:
        """Generate chat completion using OpenAI."""
        if not self.is_configured():
            return LLMResponse(
                content="OpenAI not configured. Set OPENAI_API_KEY.",
                model="none",
                tokens_used=0
            )
        
        return LLMResponse(
            content=f"[OpenAI chat response for {len(messages)} messages]",
            model=self.model,
            tokens_used=sum(len(m.get("content", "")) for m in messages) // 4
        )


class AnthropicProvider(LLMProvider):
    """Anthropic Claude provider."""
    
    def __init__(self, api_key: Optional[str] = None):
        super().__init__(api_key or settings.ANTHROPIC_API_KEY)
        self.model = "claude-3-sonnet"
    
    async def generate(
        self,
        prompt: str,
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> LLMResponse:
        """Generate using Anthropic API."""
        if not self.is_configured():
            return LLMResponse(
                content="Anthropic not configured. Set ANTHROPIC_API_KEY.",
                model="none",
                tokens_used=0
            )
        
        return LLMResponse(
            content=f"[Claude {self.model} would generate response]",
            model=self.model,
            tokens_used=len(prompt) // 4
        )
    
    async def generate_chat(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> LLMResponse:
        """Generate chat completion using Anthropic."""
        if not self.is_configured():
            return LLMResponse(
                content="Anthropic not configured. Set ANTHROPIC_API_KEY.",
                model="none",
                tokens_used=0
            )
        
        return LLMResponse(
            content=f"[Claude chat response for {len(messages)} messages]",
            model=self.model,
            tokens_used=sum(len(m.get("content", "")) for m in messages) // 4
        )


class MockProvider(LLMProvider):
    """Mock provider for testing without API keys."""
    
    def __init__(self):
        super().__init__("mock")
        self.model = "mock-llm"
    
    async def generate(
        self,
        prompt: str,
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> LLMResponse:
        """Generate mock response."""
        return LLMResponse(
            content="[MOCK] This is a mock response for testing purposes.",
            model=self.model,
            tokens_used=100
        )
    
    async def generate_chat(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> LLMResponse:
        """Generate mock chat response."""
        return LLMResponse(
            content="[MOCK] This is a mock chat response.",
            model=self.model,
            tokens_used=100
        )
    
    def is_configured(self) -> bool:
        """Mock provider is always configured."""
        return True


def get_llm_provider(provider_name: Optional[str] = None) -> LLMProvider:
    """
    Factory function to get configured LLM provider.
    
    Args:
        provider_name: Name of provider (openai, anthropic, mock)
        
    Returns:
        Configured LLMProvider instance
    """
    name = provider_name or os.getenv("AI_PROVIDER", "mock")
    
    if name == "openai":
        return OpenAIProvider()
    elif name == "anthropic":
        return AnthropicProvider()
    else:
        return MockProvider()
