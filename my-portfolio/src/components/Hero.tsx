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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text bg-gradient-to-r from-DEFAULT via-gray-400 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400">
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
              className="hidden flex items-center gap-3 px-6 py-3 rounded-2xl bg-glass border border-glass-border hover:border-primary/50 transition-all group cursor-pointer"
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