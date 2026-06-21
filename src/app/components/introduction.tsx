"use client";
import { useCallback, useEffect, useState } from "react";
import { handleScrollDown, NavbarProps } from "./navbar";
import { useTheme } from "../context/themecontext";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import HeroEditModal from "./admin/heroEditModal";

export const DEFAULT_HERO_PARAGRAPHS = [
    "Thanks for stopping by! I'm a CS junior at UC Santa Barbara, drawn to backend engineering and AI systems — lately, that's meant building data pipelines, LLM integrations, and full-stack applications.",
    "This summer, I'll be joining Visa as a Software Engineering Intern. Right now, I'm working with Unwrap.ai on a social media relevancy classifier for clients like Lululemon and Lyft, and developing .NET web apps at UCSB ITS.",
    "Outside of coding, I enjoy watching movies, playing tennis, and listening to music.",
];

interface IntroductionProps extends NavbarProps {
    admin?: boolean;
}

export default function Introduction({ projectsRef, expRef, openContact, admin = false }: IntroductionProps) {
    const { isDarkMode } = useTheme();
    const { ref, inView } = useInView({
        threshold: 0.1,
    });
    const { ref: descRef, inView: descInView } = useInView({
        threshold: 0.1,
    });

    const [paragraphs, setParagraphs] = useState<string[]>(DEFAULT_HERO_PARAGRAPHS);
    const [loaded, setLoaded] = useState(false);
    const [editing, setEditing] = useState(false);

    const refetch = useCallback(async () => {
        try {
            const res = await fetch("/api/db?type=HERO");
            if (!res.ok) return;
            const data = await res.json();
            const item = Array.isArray(data) ? data[0] : data;
            if (item && Array.isArray(item.paragraphs) && item.paragraphs.length > 0) {
                setParagraphs(item.paragraphs);
            }
        } catch {
            // keep defaults on failure
        } finally {
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <div className="p-8 min-h-screen grid md:grid-cols-2 items-center justify-center text-center text-wrap">
            <div ref={ref}>
                {inView && (<TypeAnimation
                        sequence={[
                            "H", 50,
                            "He", 50,
                            "Hey", 50,
                            "Hey,", 50,
                            "Hey, I", 50,
                            "Hey, I'm", 50,
                            "Hey, I'm J", 50,
                            "Hey, I'm Ja", 50,
                            "Hey, I'm Jay", 50,
                            "Hey, I'm Jayd", 50,
                            "Hey, I'm Jayde", 50,
                            "Hey, I'm Jayden", 50,
                            "Hey, I'm Jayden!", 50,
                        ]}
                        speed={79}
                        cursor={false}
                        className="text-6xl lg:text-7xl font-bold mb-4"
                    />
                    )}
            </div>
            <div className="md:text-lg lg:text-2xl">
                {admin && (
                    <div className="flex justify-center mb-4">
                        <button
                            type="button"
                            onClick={() => setEditing(true)}
                            className={`px-3 py-1 rounded-full text-xs font-bold border-2 cursor-pointer transition-colors duration-300 ${
                                isDarkMode
                                    ? "border-white/40 text-white hover:bg-white hover:text-black"
                                    : "border-black/40 text-black hover:bg-black hover:text-white"
                            }`}
                        >
                            EDIT INTRO
                        </button>
                    </div>
                )}
                <div
                    ref={descRef}
                    className={`transition-all duration-600 ${
                        loaded && descInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                >
                    {paragraphs.map((p, i) => (
                        <h2 key={i} className="mb-4">{p}</h2>
                    ))}
                    <div className="flex flex-wrap text-center justify-center mb-4">
                        <h2>Check out my&nbsp;</h2>
                        <button onClick={() => handleScrollDown(projectsRef)} className={`cursor-pointer relative font-medium hover:font-bold transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${isDarkMode ? "after:bg-white" : "after:bg-black"}`}>projects</button>
                        <h2>,&nbsp;</h2>
                        <button onClick={() => handleScrollDown(expRef)} className={`cursor-pointer relative font-medium hover:font-bold transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${isDarkMode ? "after:bg-white" : "after:bg-black"}`}>experiences</button>
                        <h2>,&nbsp;or&nbsp;</h2>
                        <button onClick={openContact} className={`cursor-pointer relative font-medium hover:font-bold transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${isDarkMode ? "after:bg-white" : "after:bg-black"}`}>contact</button>
                        <h2>&nbsp;me.</h2>
                    </div>
                </div>
            </div>
            {admin && editing && (
                <HeroEditModal
                    initialParagraphs={paragraphs}
                    onClose={() => setEditing(false)}
                    onSaved={refetch}
                />
            )}
        </div>
    )
}
