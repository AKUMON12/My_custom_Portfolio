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