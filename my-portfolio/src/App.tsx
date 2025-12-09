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