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