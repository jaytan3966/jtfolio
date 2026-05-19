"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "@/app/context/themecontext";

export interface AddItemTileProps {
    label?: string;
    onClick: () => void;
}

export default function AddItemTile({ label = "Add new", onClick }: AddItemTileProps) {
    const [isTransitioning, setIsTransitioning] = useState(true);
    const { ref, inView } = useInView({ threshold: 0.1 });
    const { isDarkMode } = useTheme();

    useEffect(() => {
        setIsTransitioning(!inView);
    }, [inView]);

    return (
        <button
            ref={ref}
            type="button"
            onClick={onClick}
            aria-label={label}
            title={label}
            className={`box-border border-3 border-dashed flex flex-col items-center justify-center rounded-sm w-full h-full min-h-[260px] group cursor-pointer ${
                isDarkMode
                    ? "border-white/60 text-white hover:border-white hover:bg-white/5"
                    : "border-black/60 text-black hover:border-black hover:bg-black/5"
            } ${
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            } transition-all duration-500`}
        >
            <div
                className={`w-20 h-20 rounded-full flex items-center justify-center border-3 transition-all duration-300 group-hover:scale-110 ${
                    isDarkMode ? "border-white" : "border-black"
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-12 h-12"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </div>
            <span className="mt-4 font-mono font-bold text-lg">{label}</span>
        </button>
    );
}
