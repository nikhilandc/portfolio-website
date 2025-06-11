import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Hackathons from './components/sections/Hackathons';
import Contact from './components/sections/Contact';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <div className="min-h-screen bg-gray-900">
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Hackathons />
            <Contact />
            <AdminLogin />
            <AdminPanel />
          </main>
          <Footer />
        </div>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;