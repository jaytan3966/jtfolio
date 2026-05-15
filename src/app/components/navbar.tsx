"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../context/themecontext";
export interface NavbarProps {
    aboutRef: React.RefObject<HTMLDivElement | null>;
    projectsRef: React.RefObject<HTMLDivElement | null>;
    expRef: React.RefObject<HTMLDivElement | null>;
    courseRef: React.RefObject<HTMLDivElement | null>;
    openContact: () => void;
    openSocials?: () => void;
}
  
export const handleScrollDown = (
    ref: React.RefObject<HTMLDivElement | null>
    ) => {
    if (ref.current) {
        window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth",
        });
    }
};

export const handleRefresh = () => {
    window.location.reload();
}

export default function Navbar({aboutRef, projectsRef, expRef, courseRef, openContact, openSocials}: NavbarProps) {
    const { isDarkMode, toggleTheme } = useTheme();
    const [visible, setVisible] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        let lastY = window.scrollY;
        let accum = 0;
        const THRESHOLD = 12;

        const onScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastY;
            lastY = currentY;

            if (currentY <= 10) {
                setVisible(true);
                accum = 0;
                return;
            }

            if ((delta > 0 && accum < 0) || (delta < 0 && accum > 0)) {
                accum = 0;
            }
            accum += delta;

            if (accum > THRESHOLD) {
                setVisible(false);
                accum = 0;
            } else if (accum < -THRESHOLD) {
                setVisible(true);
                accum = 0;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { label: "Projects", action: () => handleScrollDown(projectsRef), title: "Check out Jayden's Projects" },
        { label: "Experience", action: () => handleScrollDown(expRef), title: "Take a look at Jayden's Experience" },
        { label: "Courses", action: () => handleScrollDown(courseRef), title: "See Jayden's Courses" },
        { label: "Socials", action: () => openSocials?.(), title: "Find Jayden on social media" },
        { label: "Contact", action: openContact, title: "Contact Jayden" },
    ];

    if (!mounted) return null;

    return createPortal(
        <div
            className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-2 pt-4 sm:px-4 sm:pt-5 md:pt-6"
            style={{
                transform: visible ? 'translateY(0)' : 'translateY(-150%)',
                opacity: visible ? 1 : 0,
                transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease',
            }}
        >
            <nav
                className={`flex max-w-full flex-wrap items-center justify-center rounded-full font-mono backdrop-blur-xl border-2 transition-colors duration-500 ${isDarkMode ? 'bg-black/60 border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.45)]' : 'bg-white/80 border-black/40 shadow-[0_10px_24px_rgba(0,0,0,0.15)]'}`}
                style={{ padding: 'clamp(3px, 0.8vw, 8px)', gap: 'clamp(1px, 0.45vw, 6px)' }}
            >
                <button
                    type="button"
                    onClick={() => handleScrollDown(aboutRef)}
                    className={`cursor-pointer whitespace-nowrap rounded-full font-bold hover:scale-110 hover:font-extrabold transition-all duration-300 ${isDarkMode ? 'text-white hover:bg-white/15' : 'text-black hover:bg-black/10'}`}
                    style={{
                        padding: 'clamp(7px, 1.6vw, 10px) clamp(8px, 2.2vw, 22px)',
                        fontSize: 'clamp(13px, 2vw, 17px)',
                        lineHeight: 1,
                    }}
                    title="Back to top"
                >
                    Jayden Tan
                </button>

                <div className={`hidden shrink-0 sm:block ${isDarkMode ? 'bg-white/30' : 'bg-black/30'}`} style={{ width: '1px', height: 'clamp(18px, 4vw, 24px)', margin: '0 clamp(0px, 0.35vw, 4px)' }} />

                {links.map((link) => (
                    <button
                        key={link.label}
                        type="button"
                        onClick={link.action}
                        className={`cursor-pointer whitespace-nowrap rounded-full hover:scale-110 hover:font-bold transition-all duration-300 ${isDarkMode ? 'text-white hover:bg-white/15' : 'text-black hover:bg-black/10'}`}
                        style={{
                            padding: 'clamp(7px, 1.6vw, 10px) clamp(5px, 1.8vw, 18px)',
                            fontSize: 'clamp(12px, 1.9vw, 16px)',
                            lineHeight: 1,
                        }}
                        title={link.title}
                    >
                        {link.label}
                    </button>
                ))}

                <div className={`hidden shrink-0 sm:block ${isDarkMode ? 'bg-white/30' : 'bg-black/30'}`} style={{ width: '1px', height: 'clamp(18px, 4vw, 24px)', margin: '0 clamp(0px, 0.35vw, 4px)' }} />

                <button
                    type="button"
                    onClick={toggleTheme}
                    className={`shrink-0 cursor-pointer rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 ${isDarkMode ? 'hover:bg-white/15 text-white' : 'hover:bg-black/10 text-black'}`}
                    style={{ width: 'clamp(34px, 7vw, 42px)', height: 'clamp(34px, 7vw, 42px)' }}
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                    title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                >
                    {isDarkMode ? (
                        <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                        </svg>
                    ) : (
                        <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>
            </nav>
        </div>,
        document.body
    );
}