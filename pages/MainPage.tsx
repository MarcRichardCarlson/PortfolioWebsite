"use client";

import React, { useRef, useEffect, Suspense, lazy } from 'react';
import Head from 'next/head';

// Lazy load components
const Navbar = lazy(() => import('@/components/Header/Header'));
const HeroSection = lazy(() => import('@/components/HeroSection/HeroSection'));
const AboutSection = lazy(() => import('@/components/AboutSection/AboutSection'));
const ProjectSection = lazy(() => import('@/components/ProjectSection/ProjectSection'));
const ContactSection = lazy(() => import('@/components/ContactSection/ContactSection'));
const Footer = lazy(() => import('@/components/Footer/Footer'));

// Loading component
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-black-smooth">
    <div className="animate-pulse flex flex-col items-center">
      <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700 mb-4"></div>
      <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

const MainPage = () => {
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // Preload critical images
  useEffect(() => {
    const preloadImages = [
      '/images/HeroImage.png',
      '/images/DSCF9509.png',
      '/images/kjGgBSc75G0.png',
      '/images/HelloSmart.png',
      '/images/Lamtek.png'
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Preload components
  useEffect(() => {
    const preloadComponents = async () => {
      const components = [
        import('@/components/Header/Header'),
        import('@/components/HeroSection/HeroSection'),
        import('@/components/AboutSection/AboutSection'),
        import('@/components/ProjectSection/ProjectSection'),
        import('@/components/ContactSection/ContactSection'),
        import('@/components/Footer/Footer')
      ];

      await Promise.all(components.map(component => component));
    };

    preloadComponents();
  }, []);

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/images/HeroImage.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/images/DSCF9509.png"
          as="image"
          type="image/png"
        />
      </Head>
      <div className="bg-white dark:bg-black-smooth transition-colors duration-250">
        <Suspense fallback={<LoadingFallback />}>
          <Navbar
            heroRef={heroRef}
            projectsRef={projectsRef}
            aboutRef={aboutRef}
            contactRef={contactRef}
          />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <section ref={heroRef}>
            <HeroSection
              contactRef={contactRef}
              projectsRef={projectsRef}
            />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <section ref={aboutRef}>
            <AboutSection />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <section ref={projectsRef}>
            <ProjectSection />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <section ref={contactRef} id="contactRef">
            <ContactSection />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <Footer
            heroRef={heroRef}
            projectsRef={projectsRef}
            aboutRef={aboutRef}
            contactRef={contactRef}
          />
        </Suspense>
      </div>
    </>
  );
};

export default MainPage;
