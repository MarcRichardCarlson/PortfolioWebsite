"use client";

import React, { useRef } from 'react';
import AboutSection from '@/components/AboutSection/AboutSection';
import ContactSection from '@/components/ContactSection/ContactSection';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Header/Header';
import HeroSection from '@/components/HeroSection/HeroSection';
import ProjectSection from '@/components/ProjectSection/ProjectSection';

const MainPage = () => {
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  return (
    < >
      <div className='flex h-screen transition-all duration-300 ease-in-out'>
        <Navbar 
          heroRef={heroRef}
          projectsRef={projectsRef}
          aboutRef={aboutRef}
          contactRef={contactRef}
        />
        <div className="flex-grow h-full overflow-auto">
          <section ref={heroRef}>
          <HeroSection 
            contactRef={contactRef} 
            projectsRef={projectsRef} 
          />
          </section>
          <section ref={projectsRef}>
            <ProjectSection/>
          </section>

          <section ref={aboutRef}>
            <AboutSection />
          </section>
          
          <section ref={contactRef} id="contactRef">
            <ContactSection />
          </section>

          <Footer 
            heroRef={heroRef}
            projectsRef={projectsRef}
            aboutRef={aboutRef}
            contactRef={contactRef} 
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;
