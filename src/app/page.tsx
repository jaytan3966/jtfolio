"use client";
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import Loading from './components/loading';
import Navbar from './components/navbar';
import Introduction from './components/introduction';
import Projects from './components/projects';
import Experience from './experience';
import Contact from './components/contact';

export default function Home() {
  
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const expRef = useRef<HTMLDivElement | null>(null);

  const [currentPage, setCurrentPage] = useState('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage('home');
    }, 7000); 

    return () => clearTimeout(timer); 
  });

  if (currentPage === 'home') {
    return (
      <div ref={aboutRef} >
        <Navbar aboutRef={aboutRef} projectsRef={projectsRef} expRef={expRef} contactRef={contactRef}/>
        <header className="flex items-center p-4 font-mono" id="about-me">
          <Introduction />
        </header>
        <main className="items-center p-4 font-mono sm:2xl">
          <div ref={projectsRef}><Projects /></div>
          <div ref={expRef}><Experience /></div>
          <div ref={contactRef}><Contact /></div>
          <div><Projects /></div>
          <div><Experience /></div>
          <div><Contact /></div>
          <div ><Projects /></div>
          <div><Experience /></div>
          <div><Contact /></div>
          <div><Projects /></div>
          <div><Experience /></div>
          <div><Contact /></div>
        </main>
      </div>
    );
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Loading />
    </main>
    
  );
}
