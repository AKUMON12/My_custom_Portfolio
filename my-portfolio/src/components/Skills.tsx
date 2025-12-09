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