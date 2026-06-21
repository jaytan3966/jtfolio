"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "@/app/context/themecontext";
import TypewriterTitle from "@/app/components/typewriterTitle";

interface Props {
    initialParagraphs: string[];
    onClose: () => void;
    onSaved: () => void;
}

export default function HeroEditModal({ initialParagraphs, onClose, onSaved }: Props) {
    const { isDarkMode } = useTheme();

    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [paragraphs, setParagraphs] = useState<string[]>(
        initialParagraphs.length ? initialParagraphs : [""],
    );

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;
        let current = requestAnimationFrame(() => {
            current = requestAnimationFrame(() => setIsOpen(true));
        });
        return () => cancelAnimationFrame(current);
    }, [mounted]);

    const handleClose = useCallback(() => {
        if (submitting) return;
        setIsOpen(false);
        window.setTimeout(onClose, 300);
    }, [onClose, submitting]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [handleClose]);

    function updateParagraph(index: number, value: string) {
        setParagraphs((prev) => prev.map((p, i) => (i === index ? value : p)));
    }

    function addParagraph() {
        setParagraphs((prev) => [...prev, ""]);
    }

    function removeParagraph(index: number) {
        setParagraphs((prev) => prev.filter((_, i) => i !== index));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const cleaned = paragraphs.map((p) => p.trim()).filter(Boolean);
        if (cleaned.length === 0) {
            setError("Add at least one paragraph");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/admin/hero", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paragraphs: cleaned }),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => null);
                setError(body?.error ?? `Save failed (${res.status})`);
                return;
            }
            onSaved();
            handleClose();
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    }

    if (!mounted) return null;

    const inputBase = "focus:outline-none px-3 py-2 mt-2 w-full box-border border-2 bg-transparent transition-colors duration-300 resize-none";
    const inputTheme = isDarkMode
        ? "border-white/40 focus:border-white text-white placeholder:text-gray-500"
        : "border-black/40 focus:border-black text-black placeholder:text-gray-400";
    const panelBg = isDarkMode ? "bg-black text-white" : "bg-white text-black";
    const panelBorder = isDarkMode ? "border-white" : "border-black";

    return createPortal(
        <>
            <div
                aria-hidden={!isOpen}
                onClick={handleClose}
                className={`fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            />
            <div
                role="dialog"
                aria-modal="true"
                className={`fixed inset-0 z-[120] flex items-center justify-center p-4 transition-all duration-300 ${
                    isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto font-mono ${panelBg} border-4 ${panelBorder} rounded-sm shadow-2xl`}
                >
                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Close"
                        disabled={submitting}
                        className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 disabled:opacity-50 ${isDarkMode ? "text-white" : "text-black"}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    <div className="px-6 pt-6 pb-2">
                        <TypewriterTitle text="Edit Intro" className="text-2xl md:text-3xl font-bold" />
                        <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Each paragraph shows as its own line in the hero description. Changes go live instantly — no redeploy.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 pb-6">
                        {paragraphs.map((p, i) => (
                            <div key={i} className="my-4 flex flex-col">
                                <div className="flex w-full items-center justify-between">
                                    <label className="text-sm font-bold uppercase tracking-wide">paragraph {i + 1}</label>
                                    {paragraphs.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeParagraph(i)}
                                            aria-label={`Remove paragraph ${i + 1}`}
                                            title="Remove paragraph"
                                            className={`w-6 h-6 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 ${isDarkMode ? "text-white" : "text-black"}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <textarea
                                    value={p}
                                    onChange={(e) => updateParagraph(i, e.target.value)}
                                    placeholder="Write a paragraph about yourself..."
                                    rows={4}
                                    className={`${inputBase} ${inputTheme}`}
                                />
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addParagraph}
                            className={`mt-2 px-4 py-2 box-border border-2 border-dashed text-sm font-bold uppercase tracking-wide transition-colors duration-300 cursor-pointer ${
                                isDarkMode
                                    ? "border-white/40 hover:border-white"
                                    : "border-black/40 hover:border-black"
                            }`}
                        >
                            + Add paragraph
                        </button>

                        {error && (
                            <div className={`my-3 text-sm ${isDarkMode ? "text-red-400" : "text-red-600"}`}>{error}</div>
                        )}

                        <div className="mt-6 flex gap-3 items-center">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`flex-1 font-bold py-3 box-border border-2 transition-all duration-300 ${
                                    isDarkMode
                                        ? "border-white hover:bg-white hover:text-black"
                                        : "border-black hover:bg-black hover:text-white"
                                } disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                            >
                                {submitting ? "SAVING..." : "SAVE"}
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={submitting}
                                className={`px-6 py-3 box-border border-2 transition-all duration-300 ${
                                    isDarkMode
                                        ? "border-white/50 hover:border-white"
                                        : "border-black/50 hover:border-black"
                                } disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                            >
                                CANCEL
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>,
        document.body,
    );
}
