import { useState, useCallback } from 'react';
import { generateText, type CoreMessage } from 'ai'; // Added CoreMessage import
import { createOpenAI } from '@ai-sdk/openai';
import { portfolioData } from '../data/mock';

// 1. Define Message shape for your UI
export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

// 2. Define Configuration shapes explicitly
// This fixes the "property does not exist on type unknown" errors
type YWSceneConfig = {
    apiKey?: string;
    // We define system_prompt as a function so we can call it later
    system_prompt?: (vars: Record<string, string>) => string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
    [k: string]: unknown;
};

type YWConfig = {
    ai_config?: Record<string, YWSceneConfig>;
    [k: string]: unknown;
};

export function useChat(sceneName = 'portfolio_assistant') {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = useCallback(async (userMessage: string) => {
        // 3. Access global config with the specific type definition
        const globalConfig = (globalThis as unknown as { ywConfig?: YWConfig }).ywConfig;
        const config = globalConfig?.ai_config?.[sceneName];

        if (!config) {
            console.error(`API Error - Configuration '${sceneName}' not found`);
            return;
        }

        setIsLoading(true);

        // Add user message to UI state immediately
        const newUserMessage: Message = { role: 'user', content: userMessage };
        setMessages(prev => [...prev, newUserMessage]);

        const openai = createOpenAI({
            baseURL: 'https://api.youware.com/public/v1/ai',
            apiKey: 'sk-YOUWARE'
        });

        try {
            // Prepare context variables
            const variables = {
                portfolioContext: JSON.stringify(portfolioData, null, 2)
            };

            // Generate system prompt (safe now because we typed config correctly)
            const systemPrompt = config.system_prompt ? config.system_prompt(variables) : '';

            // 4. Helper functions for Normalization
            // We removed 'tool' since you confirmed this is text-only chat
            const allowedRoles = ['user', 'assistant', 'system'] as const;
            type AllowedRole = typeof allowedRoles[number];

            const isRole = (r: unknown): r is AllowedRole =>
                typeof r === 'string' && (allowedRoles as readonly string[]).includes(r);

            const normalizeContent = (c: unknown): string =>
                typeof c === 'string' ? c : JSON.stringify(c);

            // 5. Construct the message array safely
            // We cast to `CoreMessage[]` at the end to satisfy the SDK requirements
            const safeMessages = [
                ...(systemPrompt ? [{ role: 'system', content: String(systemPrompt) }] : []),
                ...messages.map((m) => {
                    const obj = m as { role?: unknown; content?: unknown };
                    return {
                        // Fallback to 'user' if the role looks weird, preventing crashes
                        role: isRole(obj.role) ? obj.role : 'user',
                        content: normalizeContent(obj.content)
                    };
                }),
                {
                    role: 'user',
                    content: normalizeContent(newUserMessage.content)
                }
            ] as CoreMessage[];

            const { text } = await generateText({
                // Fallback to 'gpt-4o' if config.model is missing
                model: openai(config.model || 'gpt-4o'),
                messages: safeMessages,
                // These are now valid numbers because YWSceneConfig defined them as such
                temperature: config.temperature ?? 0.7,
                maxOutputTokens: config.maxTokens ?? 4000
            });

            // Add AI response to history
            const assistantMessage: Message = { role: 'assistant', content: text };
            setMessages(prev => [...prev, assistantMessage]);

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(`API Error - Conversation failed: ${message}`);

            const errorMessage: Message = {
                role: 'assistant',
                content: "I'm having trouble connecting right now. Please try again later."
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [sceneName, messages]);

    return {
        messages,
        sendMessage,
        isLoading,
        isOpen,
        toggleChat,
        setIsOpen
    };
}