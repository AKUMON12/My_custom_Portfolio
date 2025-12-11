# Step-by-Step Guide to Recreate the Portfolio Project

This guide will walk you through creating the "One-Page Portfolio with AI Chatbot" project from scratch.

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

## Step 1: Initialize the Project

Open your terminal and run the following command to create a new Vite project with React and TypeScript:

```bash
npm create vite@latest my-portfolio -- --template react-ts
cd my-portfolio
```

## Step 2: Install Dependencies

Install the necessary packages for styling, animations, and AI integration:

```bash
npm install tailwindcss postcss autoprefixer framer-motion lucide-react clsx tailwind-merge ai @ai-sdk/openai zod
```

Initialize Tailwind CSS:

```bash
npx tailwindcss init -p
```

## Step 3: Configuration Files

### 1. `tailwind.config.js`

Replace the content of `tailwind.config.js` with:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        glass: 'rgba(var(--color-glass), var(--opacity-glass))',
        'glass-border': 'rgba(var(--color-glass-border), var(--opacity-glass-border))',
      },
      textColor: {
        DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
        muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgb(var(--color-primary)), 0 0 10px rgb(var(--color-primary))' },
          '100%': { boxShadow: '0 0 20px rgb(var(--color-primary)), 0 0 30px rgb(var(--color-primary))' },
        }
      }
    },
  },
  plugins: [],
}
```

### 2. `vite.config.ts`

Replace `vite.config.ts` with:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  build: {
    sourcemap: true,
  },
});
```

### 3. `yw_manifest.json` (For Youware Platform)

Create a file named `yw_manifest.json` in the root directory:

```json
{
  "project_type": "react",
  "ai_config": {
    "portfolio_assistant": {
      "model": "deepseek-v3",
      "temperature": 0.7,
      "maxTokens": 4000,
      "system_prompt": "You are Tristan, the personal AI assistant for a Frontend Developer & UI/UX Designer named Tristan Howard. \n\nYour goal is to answer questions about the developer's skills, projects, experience, and background based STRICTLY on the following portfolio context. \n\nContext: ${portfolioContext}\n\nIf the user asks something outside of this context, politely steer them back to the portfolio topics. Be professional, enthusiastic, and concise. Use a futuristic and helpful tone."
    }
  }
}
```

## Step 4: Create Directory Structure

Run the following commands to create the necessary folders inside `src`:

```bash
mkdir -p src/components
mkdir -p src/hooks
mkdir -p src/data
```

## Step 5: Source Code

Copy the following code into the respective files.

### 1. `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-background: 10 10 15; /* #0A0A0F */
    --color-primary: 0 242 255; /* #00f2ff */
    --color-secondary: 188 19 254; /* #bc13fe */
    --color-text: 255 255 255;
    --color-text-muted: 156 163 175;
    --color-glass: 255 255 255;
    --opacity-glass: 0.05;
    --color-glass-border: 255 255 255;
    --opacity-glass-border: 0.1;
  }

  html.light {
    --color-background: 249 250 251; /* gray-50 */
    --color-primary: 14 165 233; /* sky-500 - Darker blue for better contrast on white */
    --color-secondary: 168 85 247; /* purple-500 */
    --color-text: 17 24 39; /* gray-900 */
    --color-text-muted: 75 85 99; /* gray-600 */
    --color-glass: 255 255 255;
    --opacity-glass: 0.7;
    --color-glass-border: 229 231 235; /* gray-200 */
    --opacity-glass-border: 1;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: rgb(var(--color-background));
    color: rgb(var(--color-text));
    @apply antialiased transition-colors duration-300;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgb(var(--color-background));
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-gray-800 rounded-full hover:bg-gray-700 transition-colors;
  }

  html.light ::-webkit-scrollbar-thumb {
    @apply bg-gray-300 hover:bg-gray-400;
  }
}

@layer utilities {
  .bg-glass {
    background-color: rgba(var(--color-glass), var(--opacity-glass));
    backdrop-filter: blur(12px);
  }

  .border-glass-border {
    border-color: rgba(var(--color-glass-border), var(--opacity-glass-border));
  }

  .text-glow {
    text-shadow: 0 0 10px rgba(var(--color-primary), 0.5);
  }
}
```

### 2. `src/vite-env.d.ts`

```typescript
/// <reference types="vite/client" />

// some global object injected by platform
declare global {
    interface Window {
        aiSdk?: Record<string, any>;
        ywConfig?: Record<string, any>;
        ywSdk?: Record<string, any>;
    }
}

export { };
```

### 3. `src/data/mock.ts`

```typescript
export const portfolioData = {
    personal: {
        name: "Tristan Howard", // Placeholder based on email, user should update
        role: "Frontend Developer & UI/UX Designer",
        tagline: "Crafting immersive digital experiences. Exploring IoT. Learning the future of AI.",
        email: "sonsrenai@gmail.com",
        phone: "09928571488",
        social: {
            github: "https://github.com",
            linkedin: "https://linkedin.com",
            facebook: "https://facebook.com"
        },
        highlights: [
            "Web Developer",
            "UI/UX Designer",
            "BSIT Student",
            "Full-Stack Developer in Progress",
            "IoT Enthusiast"
        ]
    },
    about: {
        bio: `I’m a BSIT student at the University of Cebu with a deep passion for technology, creativity, and problem-solving. I specialize in frontend web development and UI/UX design, with a growing curiosity for full-stack development using Node.js.

Beyond the web, I explore the world of IoT, embedded systems, and AI technologies, which allows me to combine hardware and software into meaningful solutions. I enjoy transforming ideas into digital experiences, whether it’s designing interfaces, building interactive prototypes, or creating systems that solve real-world problems.

Creativity is at the center of my work — I love designing visually appealing layouts, editing graphics, crafting music mixes, and using AI tools to enhance productivity. I’m also a critical and flexible thinker, able to adapt quickly to new tasks, technologies, and environments.

I believe in continuous learning, curiosity-driven development, and building solutions that leave an impact, no matter how small. My goal is to keep growing as a full-stack developer while integrating AI and IoT into my future projects.`
    },
    skills: [
        { name: "Graphic Designing", description: "Creating visually stunning assets and layouts." },
        { name: "AI Prompting", description: "Leveraging AI for enhanced productivity and creativity." },
        { name: "Music Editing", description: "Crafting audio mixes and soundscapes." },
        { name: "Critical & Creative Thinking", description: "Solving problems with innovative approaches." },
        { name: "Flexible & Task-Oriented", description: "Adapting to new challenges efficiently." },
        { name: "Web Development", description: "HTML, CSS, JS, React, Node.js." },
        { name: "UI/UX Design", description: "Figma, prototyping, user-centered design." }
    ],
    projects: [
        {
            category: "IoT & Embedded Systems",
            items: [
                {
                    title: "Basic Sensor Circuits",
                    tools: ["Arduino", "Sensors", "C++"],
                    description: "Fundamental experiments with various sensors and actuators."
                },
                {
                    title: "Microcontroller-based Systems",
                    tools: ["ESP32", "IoT", "C++"],
                    description: "Smart systems integrated with cloud connectivity."
                },
                {
                    title: "Device Automation Experiments",
                    tools: ["Home Assistant", "MQTT"],
                    description: "Automating daily tasks using smart devices."
                }
            ]
        },
        {
            category: "Web Projects",
            items: [
                {
                    title: "Academic Static Websites",
                    tools: ["HTML", "CSS", "JS"],
                    description: "Showcase of academic achievements and activities."
                },
                {
                    title: "Election Management System",
                    tools: ["PHP", "MySQL", "Bootstrap"],
                    description: "A system to manage and track student elections."
                },
                {
                    title: "Event Organizer System",
                    tools: ["React", "Node.js", "MongoDB"],
                    description: "Platform for planning and managing events."
                },
                {
                    title: "Weathering Web-App",
                    tools: ["React", "OpenWeatherMap API"],
                    description: "Real-time weather forecasting application."
                }
            ]
        }
    ],
    experience: [
        {
            title: "Networking (Cisco)",
            description: "Basic network configuration, routing, switches, topologies."
        },
        {
            title: "UI/UX Design Contests",
            description: "Participated and created modern design layouts."
        },
        {
            title: "Bitcoin-related Events",
            description: "Tech events, blockchain exposure, and fintech environment."
        }
    ]
};
```

### 4. `src/hooks/useTheme.ts`

```typescript
import { useState, useEffect } from 'react';

export function useTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
        }
        return 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return { theme, toggleTheme };
}
```

### 5. `src/hooks/useChat.ts`

```typescript
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
```

### 6. Components

Create the following files in `src/components/`:

**`src/components/ThemeToggle.tsx`**

```typescript
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-glass border border-glass-border hover:bg-white/10 transition-colors relative overflow-hidden"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-primary" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-500" />
        )}
      </motion.div>
    </button>
  );
}
```

**`src/components/Navbar.tsx`**

```typescript
import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { clsx } from 'clsx';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-glass-border py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/50 group-hover:border-primary transition-colors">
            <Code2 className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-wider text-DEFAULT group-hover:text-primary transition-colors">
            REN<span className="text-primary">-AI</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-muted hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-glass-border overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-muted hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

**`src/components/Hero.tsx`**

```typescript
import { motion } from 'framer-motion';
import { ArrowRight, Download, MessageSquare } from 'lucide-react';
import { portfolioData } from '../data/mock';
import { useState, useEffect } from 'react';

interface HeroProps {
  onChatClick: () => void;
}

export default function Hero({ onChatClick }: HeroProps) {
  const [text, setText] = useState('');
  const fullText = portfolioData.personal.tagline;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-primary font-mono mb-4 text-lg">Hello, I'm</h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-DEFAULT via-gray-400 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400">
            {portfolioData.personal.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted mb-8 font-light">
            {portfolioData.personal.role}
          </h2>

          <div className="h-8 mb-12">
            <p className="text-primary/80 font-mono text-lg md:text-xl">
              {text}<span className="animate-pulse">|</span>
            </p>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {portfolioData.personal.highlights.map((highlight, index) => (
              <motion.span
                key={highlight}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm backdrop-blur-sm hover:bg-primary/10 transition-colors cursor-default shadow-[0_0_10px_rgba(0,242,255,0.1)]"
              >
                {highlight}
              </motion.span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 rounded-full bg-primary text-background font-bold hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all flex items-center gap-2 group"
            >
              Hire Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3 rounded-full border border-glass-border hover:border-primary/50 hover:bg-glass transition-all flex items-center gap-2">
              Download Resume <Download className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="inline-block"
          >
            <button
              onClick={onChatClick}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-glass border border-glass-border hover:border-primary/50 transition-all group cursor-pointer"
            >
              <div className="p-2 rounded-full bg-primary/20 text-primary group-hover:animate-bounce">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted">Ask my AI assistant</p>
                <p className="text-sm text-DEFAULT group-hover:text-primary transition-colors">
                  "Tell me about his skills..."
                </p>
              </div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

**`src/components/About.tsx`**

```typescript
import { motion } from 'framer-motion';
import { portfolioData } from '../data/mock';

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative rounded-2xl overflow-hidden border border-glass-border bg-glass aspect-[3/4] md:aspect-square">
              {/* Placeholder for user portrait */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10" />
              <img
                src="https://res.cloudinary.com/deua2yipj/image/upload/v1765308182/MySelf_tlcxnq.jpg"
                alt="Portrait"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
              />

              {/* Neon Frame Overlay */}
              <div className="absolute inset-0 border-2 border-primary/30 rounded-2xl z-20 m-4" />
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4">
              <span className="text-primary">01.</span> About Me
              <span className="h-px bg-gray-700 flex-grow ml-4" />
            </h2>

            <div className="space-y-6 text-muted leading-relaxed">
              {portfolioData.about.bio.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

**`src/components/Skills.tsx`**

```typescript
import { motion } from 'framer-motion';
import { portfolioData } from '../data/mock';
import { Cpu, Palette, Music, Brain, Zap, Code, Layout } from 'lucide-react';

const iconMap: Record<string, typeof Cpu> = {
  "Graphic Designing": Palette,
  "AI Prompting": Brain,
  "Music Editing": Music,
  "Critical & Creative Thinking": Zap,
  "Flexible & Task-Oriented": Cpu,
  "Web Development": Code,
  "UI/UX Design": Layout
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 dark:bg-black/20 bg-gray-100/50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4"
        >
          <span className="text-primary">02.</span> Skills
          <span className="h-px bg-gray-700 flex-grow ml-4" />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.skills.map((skill, index) => {
            const Icon = iconMap[skill.name] || Zap;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-xl bg-glass border border-glass-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                <div className="relative z-10 flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-DEFAULT mb-2 group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-muted group-hover:text-muted transition-colors">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**`src/components/Projects.tsx`**

```typescript
import { motion } from 'framer-motion';
import { portfolioData } from '../data/mock';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4"
        >
          <span className="text-primary">03.</span> Projects
          <span className="h-px bg-gray-700 flex-grow ml-4" />
        </motion.h2>

        <div className="space-y-16">
          {portfolioData.projects.map((category, catIndex) => (
            <div key={category.category}>
              <h3 className="text-2xl font-bold text-secondary mb-8 pl-4 border-l-4 border-secondary">
                {category.category}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.items.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative rounded-xl overflow-hidden bg-glass border border-glass-border hover:border-primary/50 transition-all"
                  >
                    {/* Image Placeholder */}
                    <div className="h-48 bg-gradient-to-br dark:from-gray-800 dark:to-black from-gray-200 to-gray-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center text-muted font-mono text-4xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                        {project.title.substring(0, 2)}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-bold text-DEFAULT group-hover:text-primary transition-colors">
                          {project.title}
                        </h4>
                        <div className="flex gap-2">
                          <Github className="w-5 h-5 text-muted hover:text-DEFAULT cursor-pointer" />
                          <ExternalLink className="w-5 h-5 text-muted hover:text-DEFAULT cursor-pointer" />
                        </div>
                      </div>

                      <p className="text-muted mb-6 text-sm">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**`src/components/Experience.tsx`**

```typescript
import { motion } from 'framer-motion';
import { portfolioData } from '../data/mock';

export default function Experience() {
  return (
    <section id="experience" className="py-20 dark:bg-black/20 bg-gray-100/50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4"
        >
          <span className="text-primary">04.</span> Experience
          <span className="h-px bg-gray-700 flex-grow ml-4" />
        </motion.h2>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

          <div className="space-y-12">
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_#00f2ff]" />

                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 pl-8' : 'md:pl-12 pl-8'}`}>
                  <div className="p-6 rounded-xl bg-glass border border-glass-border hover:border-primary/30 transition-colors">
                    <h3 className="text-xl font-bold text-DEFAULT mb-2">{exp.title}</h3>
                    <p className="text-muted text-sm">{exp.description}</p>
                  </div>
                </div>
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

**`src/components/Contact.tsx`**

```typescript
import { motion } from 'framer-motion';
import { portfolioData } from '../data/mock';
import { Mail, Phone, Github, Linkedin, Facebook, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4"
        >
          <span className="text-primary">05.</span> Contact
          <span className="h-px bg-gray-700 flex-grow ml-4" />
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/3 space-y-8"
          >
            <h3 className="text-2xl font-bold text-DEFAULT">Let's Connect</h3>
            <p className="text-muted">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-4">
              <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-4 text-muted hover:text-primary transition-colors group">
                <div className="p-3 rounded-lg bg-glass group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                {portfolioData.personal.email}
              </a>
              <div className="flex items-center gap-4 text-muted group">
                <div className="p-3 rounded-lg bg-glass group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                {portfolioData.personal.phone}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {[Github, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="p-3 rounded-lg bg-glass hover:bg-primary/20 hover:text-primary text-muted transition-all hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-2/3"
          >
            <form className="space-y-6 p-8 rounded-2xl bg-glass border border-glass-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-muted">Name</label>
                  <input type="text" className="w-full bg-glass border border-glass-border rounded-lg p-3 text-DEFAULT focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted">Email</label>
                  <input type="email" className="w-full bg-glass border border-glass-border rounded-lg p-3 text-DEFAULT focus:border-primary focus:outline-none transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted">Message</label>
                <textarea rows={5} className="w-full bg-glass border border-glass-border rounded-lg p-3 text-DEFAULT focus:border-primary focus:outline-none transition-colors" />
              </div>
              <button className="w-full py-4 rounded-lg bg-primary text-background font-bold hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all flex items-center justify-center gap-2">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

**`src/components/Footer.tsx`**

```typescript
import { portfolioData } from '../data/mock';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-glass-border dark:bg-black/40 bg-gray-200 text-center">
      <p className="text-muted text-sm">
        Designed & Built by <span className="text-primary">{portfolioData.personal.name}</span>
      </p>
      <p className="text-muted text-xs mt-2">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}
```

**`src/components/ChatWidget.tsx`**

```typescript
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { clsx } from 'clsx';

interface ChatWidgetProps {
  isOpen: boolean;
  toggleChat: () => void;
}

export default function ChatWidget({ isOpen, toggleChat }: ChatWidgetProps) {
  const { messages, sendMessage, isLoading } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input;
    setInput('');
    await sendMessage(message);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={toggleChat}
        className={clsx(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          isOpen ? "bg-red-500 rotate-90" : "bg-primary animate-pulse-slow"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-background" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-background/95 backdrop-blur-xl border border-glass-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-glass-border bg-glass flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-DEFAULT">REN-AI Assistant</h3>
                <p className="text-xs text-primary flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              {messages.length === 0 && (
                <div className="text-center text-muted mt-10">
                  <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Ask me anything about the portfolio!</p>
                  <div className="mt-6 flex flex-col gap-2">
                    {["Tell me about his skills", "Show me his projects", "Download resume"].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => sendMessage(suggestion)}
                        className="text-sm bg-glass hover:bg-primary/10 border border-glass-border hover:border-primary/30 rounded-lg py-2 px-4 transition-colors"
                      >
                        "{suggestion}"
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={clsx(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    msg.role === 'user' ? "bg-secondary/20 text-secondary" : "bg-primary/20 text-primary"
                  )}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={clsx(
                    "p-3 rounded-2xl text-sm",
                    msg.role === 'user'
                      ? "bg-secondary/10 border border-secondary/20 text-DEFAULT rounded-tr-none"
                      : "bg-primary/10 border border-primary/20 text-DEFAULT rounded-tl-none"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex gap-3 mr-auto">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-primary/10 border border-primary/20 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-glass-border bg-glass">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-glass border border-glass-border rounded-xl py-3 pl-4 pr-12 text-DEFAULT placeholder-muted focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary hover:text-background disabled:opacity-50 disabled:hover:bg-primary/20 disabled:hover:text-primary transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

### 7. `src/App.tsx`

```typescript
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className="min-h-screen bg-background text-DEFAULT selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <Navbar />

      <main>
        <Hero onChatClick={() => setIsChatOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />

      <ChatWidget
        isOpen={isChatOpen}
        toggleChat={toggleChat}
      />
    </div>
  );
}

export default App;
```

### 8. `src/main.tsx`

```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## Step 6: Run the Project

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`. You should see your portfolio website running!

## Step 7: Build for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist` folder. You can preview it with:

```bash
npm run preview
```
