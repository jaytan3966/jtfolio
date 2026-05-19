"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/app/context/themecontext";

import Loading from "@/app/components/loading";
import Navbar from "@/app/components/navbar";
import Introduction from "@/app/components/introduction";
import Projects from "@/app/components/sections/projects";
import Experience from "@/app/components/sections/experience";
import Courses from "@/app/components/sections/courses";
import Contact from "@/app/components/sections/contact";
import Socials from "@/app/components/sections/socials";

import { logoutAction } from "./actions";

export default function AdminHome() {
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const projectsRef = useRef<HTMLDivElement | null>(null);
    const expRef = useRef<HTMLDivElement | null>(null);
    const courseRef = useRef<HTMLDivElement | null>(null);

    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSocialsOpen, setIsSocialsOpen] = useState(false);
    const openContact = () => {
        setIsSocialsOpen(false);
        setIsContactOpen(true);
    };
    const closeContact = () => setIsContactOpen(false);
    const openSocials = () => {
        setIsContactOpen(false);
        setIsSocialsOpen(true);
    };
    const closeSocials = () => setIsSocialsOpen(false);

    const [currentPage, setCurrentPage] = useState("home");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        setHasMounted(true);
        const hasVisited = localStorage.getItem("hasVisited");
        if (hasVisited) {
            return;
        }
        setCurrentPage("loading");
        localStorage.setItem("hasVisited", "true");

        const timer = setTimeout(() => {
            setIsTransitioning(true);

            setTimeout(() => {
                setCurrentPage("home");
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 250);
            }, 250);
        }, 6750);

        return () => clearTimeout(timer);
    }, []);

    if (!hasMounted) {
        return null;
    }

    if (currentPage === "home") {
        return (
            <div
                ref={aboutRef}
                className={`${
                    isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
                } transition-all duration-500 ${
                    isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
            >
                <Navbar
                    aboutRef={aboutRef}
                    projectsRef={projectsRef}
                    expRef={expRef}
                    courseRef={courseRef}
                    openContact={openContact}
                    openSocials={openSocials}
                />

                <AdminBadge />

                <header className="flex p-4 font-mono" id="about-me">
                    <Introduction
                        aboutRef={aboutRef}
                        projectsRef={projectsRef}
                        expRef={expRef}
                        courseRef={courseRef}
                        openContact={openContact}
                    />
                </header>
                <main className="items-center p-4 font-mono sm:2xl">
                    <div ref={projectsRef}>
                        <Projects />
                    </div>
                    <div ref={expRef}>
                        <Experience admin />
                    </div>
                    <div ref={courseRef}>
                        <Courses admin />
                    </div>
                </main>
                <Contact isOpen={isContactOpen} onClose={closeContact} />
                <Socials isOpen={isSocialsOpen} onClose={closeSocials} />
            </div>
        );
    }
    return (
        <main
            className={`flex flex-col items-center justify-center min-h-screen transition-all duration-500 ${
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            } ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
        >
            <Loading />
        </main>
    );
}

function AdminBadge() {
    const { isDarkMode } = useTheme();
    return (
        <div className="fixed bottom-4 right-4 z-[105] flex items-center gap-2 font-mono">
            <span
                className={`px-3 py-1 rounded-full text-xs font-bold border-2 backdrop-blur-md ${
                    isDarkMode
                        ? "bg-black/60 border-white/40 text-white"
                        : "bg-white/80 border-black/40 text-black"
                }`}
                title="You're editing as admin"
            >
                ADMIN
            </span>
            <form action={logoutAction}>
                <button
                    type="submit"
                    title="Sign out"
                    className={`px-3 py-1 rounded-full text-xs font-bold border-2 backdrop-blur-md cursor-pointer transition-colors duration-300 ${
                        isDarkMode
                            ? "bg-black/60 border-white/40 text-white hover:bg-white hover:text-black"
                            : "bg-white/80 border-black/40 text-black hover:bg-black hover:text-white"
                    }`}
                >
                    LOGOUT
                </button>
            </form>
        </div>
    );
}
