"use client";
import { useEffect, useState } from "react";
import { useTheme } from "../context/themecontext";
export interface NavbarProps {
    aboutRef: React.RefObject<HTMLDivElement | null>;
    projectsRef: React.RefObject<HTMLDivElement | null>;
    contactRef: React.RefObject<HTMLDivElement | null>;
    expRef: React.RefObject<HTMLDivElement | null>;
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

export default function Navbar({aboutRef, projectsRef, expRef, contactRef}: NavbarProps) {
    const [isVisible, setIsVisible] = useState(true);
    const { isDarkMode, toggleTheme } = useTheme();

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const controlNavbarVisibility = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY = currentScrollY;
        };
        window.addEventListener("scroll", controlNavbarVisibility);
        return () => {
            window.removeEventListener("scroll", controlNavbarVisibility);
        };
    }, [isVisible]);
    
    return (
        <div className={`flex ... sticky top-0 text-xl font-mono p-4 md:p-6 justify-between ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
            <div className="flex space-x-5 md:space-x-8">
                <button onClick={() => handleScrollDown(aboutRef)} className="cursor-pointer">About</button>
                <button onClick={() => handleScrollDown(projectsRef)} className="cursor-pointer">Projects</button>
                <button onClick={() => handleScrollDown(expRef)} className="cursor-pointer">Experience</button>
                <button onClick={() => handleScrollDown(contactRef)} className="cursor-pointer">Contact</button>
            </div>
            
            <button
                onClick={toggleTheme}
                className={`
                    relative w-14 h-8 rounded-full p-1 transition-all duration-300 cursor-pointer
                    ${isDarkMode ? 'bg-black ring-1 ring-offset-1 focus:ring-white' : 'bg-gray-100 ring-2 ring-offset-2 focus:ring-black'}
        
                `}
                aria-label={`Toggle ${isDarkMode ? 'light' : 'dark'} mode`}
                >
                <div
                    className={`
                     w-6 h-6 rounded-full transform transition-all duration-300
                    ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}
                    flex items-center justify-center
                    `}
                >
                    {isDarkMode ? (
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    ) : (
                    
                    <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                    )}
                </div>
            </button>

            
        </div>
    );
}