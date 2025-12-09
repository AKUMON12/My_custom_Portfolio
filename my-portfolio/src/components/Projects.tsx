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
          {portfolioData.projects.map((category) => (
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