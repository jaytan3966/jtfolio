"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "@/app/context/themecontext";

interface Props {
    onClose: () => void;
}

export default function ResumeUploadModal({ onClose }: Props) {
    const { isDarkMode } = useTheme();

    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [done, setDone] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!file) {
            setFilePreview(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setFilePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

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
            if (e.key !== "Escape") return;
            // Collapse the expanded preview first, then close the modal.
            if (expanded) setExpanded(false);
            else handleClose();
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [handleClose, expanded]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!file) {
            setError("Choose a PDF to upload");
            return;
        }
        setSubmitting(true);
        try {
            const form = new FormData();
            form.append("file", file);
            const res = await fetch("/api/admin/resume", { method: "POST", body: form });
            if (!res.ok) {
                const body = await res.json().catch(() => null);
                setError(body?.error ?? `Upload failed (${res.status})`);
                return;
            }
            setDone(true);
            window.setTimeout(handleClose, 900);
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    }

    if (!mounted) return null;

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
                    className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto font-mono ${panelBg} border-4 ${panelBorder} rounded-sm shadow-2xl`}
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
                        <h2 className="text-2xl md:text-3xl font-bold">{"> Update Resume"}</h2>
                        <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Upload a new PDF. It replaces the live resume everywhere instantly — no redeploy.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 pb-6">
                        <div className="my-4 flex flex-col">
                            <label className="text-sm font-bold uppercase tracking-wide">resume (pdf)<span className="ml-1">*</span></label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                                className={`mt-2 ${isDarkMode ? "text-white" : "text-black"}`}
                            />
                            {file && (
                                <span className={`mt-2 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                            )}
                            <span className={`mt-1 text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>PDF only, max 10 MB.</span>
                        </div>

                        <div className="my-4 flex flex-col">
                            <div className="flex w-full items-center justify-between">
                                <label className="text-sm font-bold uppercase tracking-wide">
                                    {filePreview ? "new resume" : "current resume"}
                                </label>
                                <span className="flex-1" />
                                <button
                                    type="button"
                                    onClick={() => setExpanded(true)}
                                    title="Expand preview"
                                    className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wide cursor-pointer transition-opacity duration-200 hover:opacity-70 ${isDarkMode ? "text-white" : "text-black"}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                        <polyline points="15 3 21 3 21 9" />
                                        <polyline points="9 21 3 21 3 15" />
                                        <line x1="21" y1="3" x2="14" y2="10" />
                                        <line x1="3" y1="21" x2="10" y2="14" />
                                    </svg>
                                    Expand
                                </button>
                            </div>
                            <div className={`mt-2 border-2 ${isDarkMode ? "border-white/40" : "border-black/40"} rounded-sm overflow-hidden`}>
                                <iframe
                                    key={filePreview ?? "current"}
                                    src={`${filePreview ?? "/api/resume"}#toolbar=0&navpanes=0&view=FitH`}
                                    title={filePreview ? "New resume preview" : "Current resume preview"}
                                    className="w-full h-[45vh] bg-white"
                                />
                            </div>
                            <span className={`mt-1 text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                                {filePreview ? "Preview of the PDF you selected." : "The resume currently live on the site."}
                            </span>
                        </div>

                        {error && (
                            <div className={`my-3 text-sm ${isDarkMode ? "text-red-400" : "text-red-600"}`}>{error}</div>
                        )}
                        {done && (
                            <div className={`my-3 text-sm ${isDarkMode ? "text-green-400" : "text-green-600"}`}>Resume updated!</div>
                        )}

                        <div className="mt-4 flex gap-3 items-center">
                            <button
                                type="submit"
                                disabled={submitting || !file}
                                className={`flex-1 font-bold py-3 box-border border-2 transition-all duration-300 ${
                                    isDarkMode
                                        ? "border-white hover:bg-white hover:text-black"
                                        : "border-black hover:bg-black hover:text-white"
                                } disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                            >
                                {submitting ? "UPLOADING..." : "UPLOAD"}
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

            {expanded && (
                <div
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setExpanded(false)}
                    className="fixed inset-0 z-[130] flex flex-col bg-black/80 backdrop-blur-sm p-4 sm:p-8"
                >
                    <div className="flex w-full items-center justify-between pb-3 font-mono text-white">
                        <span className="text-sm font-bold uppercase tracking-wide">
                            {filePreview ? "new resume" : "current resume"}
                        </span>
                        <span className="flex-1" />
                        <button
                            type="button"
                            onClick={() => setExpanded(false)}
                            aria-label="Close expanded preview"
                            className="w-8 h-8 flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                    <iframe
                        key={`expanded-${filePreview ?? "current"}`}
                        src={`${filePreview ?? "/api/resume"}#view=FitH`}
                        title={filePreview ? "New resume preview (expanded)" : "Current resume preview (expanded)"}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 w-full bg-white rounded-sm"
                    />
                </div>
            )}
        </>,
        document.body,
    );
}
