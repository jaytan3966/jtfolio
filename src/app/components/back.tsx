"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavbarProps, handleScrollDown } from "./navbar";
import { useTheme } from "../context/themecontext";

export default function Back({ aboutRef }: NavbarProps) {
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
        <div className="fixed bottom-0 right-0 p-3 z-50">
            <button
                onClick={() => handleScrollDown(aboutRef)}
                className={`
                    w-12 h-12 flex items-center justify-center 
                    ${isDarkMode 
                        ? "bg-black text-white hover:bg-white hover:text-black shadow-lg" 
                        : "text-black bg-white hover:bg-black hover:text-white shadow-md"
                    }
                    hover:-translate-y-1
                    cursor-pointer
                    rounded-full 
                    transition-all duration-500 ease-in-out 
                    outline-none focus:outline-none
                    shadow-[0_4px_14px_-2px_rgba(0,0,0,0.15)] 
                    hover:shadow-[0_6px_20px_-2px_rgba(0,0,0,0.25)]
                    active:scale-95
                    ${isDarkMode ? "ring-white/20" : "ring-black/20"} ring-1
                `}
                title="Back to Home"
                aria-label="Up arrow"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="w-6 h-6"
                >
                    <path d="M18 15l-6-6-6 6"/>
                </svg>
            </button>
        </div>,
        document.body
    );
}