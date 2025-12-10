// import { useState } from 'react'; // Keep useState if used elsewhere, otherwise remove the import
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
// Removed: import ChatWidget from './components/ChatWidget';

function App() {
  // Removed: const [isChatOpen, setIsChatOpen] = useState(false);
  // Removed: const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className="min-h-screen bg-background text-DEFAULT selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <Navbar />

      <main>
        {/* Action: Ensure the onChatClick prop is removed from Hero */}
        <Hero onChatClick={() => {/* handle chat click */}} /> 
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />

      {/* Removed: ChatWidget component call */}
    </div>
  );
}

export default App;