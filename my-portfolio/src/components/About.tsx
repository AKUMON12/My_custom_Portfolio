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