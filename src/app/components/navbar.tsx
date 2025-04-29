"use client";
import { useEffect, useState } from "react";
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
        setTimeout(() => {
            setIsVisible(false);
        }, 2650);
        return () => {
            window.removeEventListener("scroll", controlNavbarVisibility);
        };
    }, [isVisible]);
    
    return (
        <div className={`flex ... sticky top-0 text-xl font-mono p-4 justify-between z-50 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
            <div className="flex space-x-4">
                <button onClick={() => handleScrollDown(aboutRef)}>About</button>
                <button onClick={() => handleScrollDown(projectsRef)}>Projects</button>
                <button onClick={() => handleScrollDown(expRef)}>Experience</button>
                <button onClick={() => handleScrollDown(contactRef)}>Contact</button>
            </div>
            
        </div>
    );
}