"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from './context/themecontext';

import Loading from './components/loading';
import Navbar from './components/navbar';
import Back from './components/back';
import SocialMedia from './components/socialMedia';

import Introduction from './components/introduction';
import Projects from './components/sections/projects';
import Experience from './components/sections/experience';
import Courses from './components/sections/courses';
import Contact from './components/sections/contact';

export default function Home() {
  
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const expRef = useRef<HTMLDivElement | null>(null);
  const courseRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);


  const [currentPage, setCurrentPage] = useState('loading');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentPage('home');
        setTimeout(() => {
          setIsTransitioning(false);
        }, 250);
      }, 250);
    }, 6750); 

    return () => clearTimeout(timer); 
  }, []);

  if (currentPage === 'home') {
    return (
      <div ref={aboutRef} className={`${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'} transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <Navbar aboutRef={aboutRef} projectsRef={projectsRef} expRef={expRef} courseRef={courseRef} contactRef={contactRef}/>
        <header className="flex p-4 font-mono" id="about-me">
          <Introduction aboutRef={aboutRef} projectsRef={projectsRef} expRef={expRef} courseRef={courseRef} contactRef={contactRef}/>
          
        </header>
        <main className={`items-center p-4 font-mono sm:2xl`}>
          <div ref={projectsRef} ><Projects /></div>
          <div ref={expRef}><Experience /></div>
          <div ref={courseRef}><Courses /></div>
          <div ref={contactRef}><Contact /></div>
        </main>
        <Back aboutRef={aboutRef} projectsRef={projectsRef} expRef={expRef} courseRef={courseRef} contactRef={contactRef}/>
        <SocialMedia/>
      </div>
    );
  }
  return (
    <main className={`flex flex-col items-center justify-center min-h-screen transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Loading />
    </main>
    
  );
}
