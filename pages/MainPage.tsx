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
    <main>
      <Navbar 
        heroRef={heroRef}
        projectsRef={projectsRef}
        aboutRef={aboutRef}
        contactRef={contactRef}
      />
      <section ref={heroRef}>
      <HeroSection 
        contactRef={contactRef} 
        projectsRef={projectsRef} 
      />

      </section>
      <section ref={projectsRef}>
        <ProjectSection />
      </section>
      <section ref={aboutRef}>
        <AboutSection />
      </section>
      <section ref={contactRef}>
        <ContactSection />
      </section>
      <Footer 
        heroRef={heroRef}
        projectsRef={projectsRef}
        aboutRef={aboutRef}
        contactRef={contactRef} 
      />
    </main>
  );
};

export default MainPage;
