"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from "../context/themecontext";

export default function SocialMedia() {
    const { isDarkMode } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.position = 'relative';
        return () => {
            document.body.style.position = '';
        };
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div className={`fixed bottom-0 ml-3 mb-3 z-50 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <div className="flex space-x-2 md:space-x-5">
                <a className="cursor-pointer hover:scale-130 transition-scale duration-500 " href="https://github.com/jaytan3966" target="_blank" rel="noopener noreferrer" title="Jayden&apos;s Github">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                        <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                </a>
                <a className="cursor-pointer hover:scale-130 transition-scale duration-500" href="https://www.linkedin.com/in/jaydentan1206/" target="_blank" rel="noopener noreferrer" title='Jayden&apos;s LinkedIn'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34">
                        <path fill="currentColor" d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                    </svg>
                </a>
                <a className="cursor-pointer hover:scale-130 transition-scale duration-500" title='Jayden&apos;s Resume, take one!' href="JAYDEN_TAN_RESUME.pdf" download={'JAYDEN_TAN_RESUME'} target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                        <path fill={isDarkMode ? 'white' : 'black'} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" className='duration-500'/>
                        <path fill={isDarkMode ? 'black' : 'white'} d="M14 2v6h6z" className='duration-500'/>
                        <path fill={isDarkMode ? 'black' : 'white'} d="M8 9h8v2H8zm0 4h5v2H8zm0 4h8v2H8z" className='duration-500'/>
                    </svg>
                </a>
                <a className="cursor-pointer hover:scale-130 transition-scale duration-500" href="https://www.instagram.com/jaydent.an/" target="_blank" rel="noopener noreferrer" title='Jayden&apos;s Instagram'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                        <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                </a>
                <a className="cursor-pointer hover:scale-130 transition-scale duration-500" href="https://open.spotify.com/user/31w6i5dhscgjrtshxlzsgmdnzyty?si=4f073bb7a4014dbb" target="_blank" rel="noopener noreferrer" title='Jayden&apos;s Spotify'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                        <path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.44-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.2-1.26 9.6-.6 13.26 1.68.42.18.54.84.24 1.26zm.12-3.36c-3.9-2.34-10.32-2.52-14.04-1.38-.6.18-1.2-.18-1.38-.78-.18-.6.18-1.2.78-1.38 4.2-1.26 11.16-1.08 15.54 1.62.54.3.66 1.02.36 1.56-.24.42-.96.54-1.5.18z"/>
                    </svg>
                </a>
            </div>
        </div>,
        document.body
    );
}