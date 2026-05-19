"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTheme } from "@/app/context/themecontext";
import type { ExpProps } from "@/app/components/boxGrids/experienceBox";
import type { CourseProps } from "@/app/components/boxGrids/courseBox";

type Mode = "create" | "edit";

type Props =
    | {
          entityType: "experience";
          mode: Mode;
          initial?: ExpProps;
          onClose: () => void;
          onSaved: () => void;
          onDelete?: () => Promise<boolean> | boolean;
      }
    | {
          entityType: "courses";
          mode: Mode;
          initial?: CourseProps;
          onClose: () => void;
          onSaved: () => void;
          onDelete?: () => Promise<boolean> | boolean;
      };

type ExperienceState = {
    name: string;
    title: string;
    description: string;
    skills: string;
    href: string;
    rank: string;
};

type CourseState = {
    name: string;
    courseTitle: string;
    description: string;
    lessons: string;
    href: string;
    rigor: string;
};

function fromExperience(initial?: ExpProps): ExperienceState {
    return {
        name: initial?.name ?? "",
        title: initial?.title ?? "",
        description: initial?.description ?? "",
        skills: (initial?.skills ?? []).join(", "),
        href: initial?.href ?? "",
        rank: initial?.rank !== undefined ? String(initial.rank) : "",
    };
}

function fromCourse(initial?: CourseProps): CourseState {
    return {
        name: initial?.name ?? "",
        courseTitle: initial?.courseTitle ?? "",
        description: initial?.description ?? "",
        lessons: (initial?.lessons ?? []).join(", "),
        href: initial?.href ?? "",
        rigor: initial?.rigor !== undefined ? String(initial.rigor) : "",
    };
}

function parseList(value: string): string[] {
    return value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
}

export default function ItemFormModal(props: Props) {
    const { entityType, mode, onClose, onSaved } = props;
    const { isDarkMode } = useTheme();

    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);

    const [expState, setExpState] = useState<ExperienceState>(() =>
        entityType === "experience" ? fromExperience(props.initial) : fromExperience(undefined),
    );
    const [courseState, setCourseState] = useState<CourseState>(() =>
        entityType === "courses" ? fromCourse(props.initial) : fromCourse(undefined),
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
        if (submitting || deleting) return;
        setIsOpen(false);
        window.setTimeout(onClose, 300);
    }, [onClose, submitting, deleting]);

    const handleDelete = useCallback(async () => {
        const target = props.initial?.name;
        if (!props.onDelete || mode !== "edit" || !target) return;
        const ok = window.confirm(
            `Delete ${entityType === "experience" ? "experience" : "course"} "${target}"? This cannot be undone.`,
        );
        if (!ok) return;
        setDeleting(true);
        setError(null);
        try {
            const success = await props.onDelete();
            if (success !== false) {
                setIsOpen(false);
                window.setTimeout(onClose, 300);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to delete");
        } finally {
            setDeleting(false);
        }
    }, [props, mode, entityType, onClose]);

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

    useEffect(() => {
        if (!file) {
            setFilePreview(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setFilePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const currentName = entityType === "experience" ? expState.name : courseState.name;
    const initialName =
        entityType === "experience"
            ? props.initial?.name
            : props.initial?.name;

    const existingImageUrl = useMemo(() => {
        if (mode !== "edit" || !initialName) return null;
        return `https://jtfolio-imgs.s3.amazonaws.com/jtfolio-${entityType}/${initialName}.png`;
    }, [mode, initialName, entityType]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            const nameForRequest = currentName.trim();
            if (!nameForRequest) {
                setError("Name is required");
                setSubmitting(false);
                return;
            }

            let payload: Record<string, unknown>;
            if (entityType === "experience") {
                const rankNum = expState.rank.trim() === "" ? undefined : Number(expState.rank);
                if (rankNum !== undefined && Number.isNaN(rankNum)) {
                    setError("Rank must be a number");
                    setSubmitting(false);
                    return;
                }
                payload = {
                    title: expState.title,
                    description: expState.description,
                    skills: parseList(expState.skills),
                    href: expState.href,
                    ...(rankNum !== undefined ? { rank: rankNum } : {}),
                };
                if (mode === "create") payload.name = nameForRequest;
            } else {
                const rigorNum = Number(courseState.rigor);
                if (Number.isNaN(rigorNum)) {
                    setError("Rigor must be a number");
                    setSubmitting(false);
                    return;
                }
                payload = {
                    courseTitle: courseState.courseTitle,
                    description: courseState.description,
                    lessons: parseList(courseState.lessons),
                    href: courseState.href,
                    rigor: rigorNum,
                };
                if (mode === "create") payload.name = nameForRequest;
            }

            const url =
                mode === "create"
                    ? `/api/admin/${entityType === "experience" ? "experiences" : "courses"}`
                    : `/api/admin/${entityType === "experience" ? "experiences" : "courses"}/${encodeURIComponent(initialName ?? nameForRequest)}`;
            const method = mode === "create" ? "POST" : "PUT";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                setError(body?.error ?? `Save failed (${res.status})`);
                setSubmitting(false);
                return;
            }

            if (file) {
                const form = new FormData();
                form.append("entityType", entityType);
                form.append("name", nameForRequest);
                form.append("file", file);
                const upRes = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: form,
                });
                if (!upRes.ok) {
                    const body = await upRes.json().catch(() => null);
                    setError(`Saved, but image upload failed: ${body?.error ?? upRes.status}`);
                    setSubmitting(false);
                    return;
                }
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

    const inputBase = "focus:outline-none px-3 py-2 mt-2 w-full box-border border-2 bg-transparent transition-colors duration-300";
    const inputTheme = isDarkMode
        ? "border-white/40 focus:border-white text-white placeholder:text-gray-500"
        : "border-black/40 focus:border-black text-black placeholder:text-gray-400";
    const panelBg = isDarkMode ? "bg-black text-white" : "bg-white text-black";
    const panelBorder = isDarkMode ? "border-white" : "border-black";

    const title =
        (mode === "create" ? "> New " : "> Edit ") +
        (entityType === "experience" ? "Experience" : "Course");

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
                        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
                        <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {mode === "edit" ? "Update fields and (optionally) replace the image." : "Fill in the details for the new entry."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 pb-6">
                        <div className="my-4 flex flex-col">
                            <label className="text-sm font-bold uppercase tracking-wide">name<span className="ml-1">*</span></label>
                            <input
                                type="text"
                                value={currentName}
                                onChange={(e) => {
                                    if (entityType === "experience") setExpState({ ...expState, name: e.target.value });
                                    else setCourseState({ ...courseState, name: e.target.value });
                                }}
                                disabled={mode === "edit"}
                                required
                                placeholder="e.g. Apple"
                                className={`${inputBase} ${inputTheme} disabled:opacity-60 disabled:cursor-not-allowed`}
                            />
                            {mode === "edit" && (
                                <span className={`mt-1 text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>name is the primary key and cannot be changed; delete and recreate to rename.</span>
                            )}
                        </div>

                        {entityType === "experience" ? (
                            <>
                                <Field label="title" value={expState.title} onChange={(v) => setExpState({ ...expState, title: v })} placeholder="SWE Intern" inputBase={inputBase} inputTheme={inputTheme} />
                                <FieldArea label="description" value={expState.description} onChange={(v) => setExpState({ ...expState, description: v })} placeholder="What you did there..." inputBase={inputBase} inputTheme={inputTheme} />
                                <Field label="skills (comma-separated)" value={expState.skills} onChange={(v) => setExpState({ ...expState, skills: v })} placeholder="TypeScript, React, AWS" inputBase={inputBase} inputTheme={inputTheme} />
                                <Field label="href" value={expState.href} onChange={(v) => setExpState({ ...expState, href: v })} placeholder="https://..." inputBase={inputBase} inputTheme={inputTheme} />
                                <Field label="rank (optional)" value={expState.rank} onChange={(v) => setExpState({ ...expState, rank: v })} placeholder="1" inputBase={inputBase} inputTheme={inputTheme} />
                            </>
                        ) : (
                            <>
                                <Field label="courseTitle" value={courseState.courseTitle} onChange={(v) => setCourseState({ ...courseState, courseTitle: v })} placeholder="Algorithms" inputBase={inputBase} inputTheme={inputTheme} />
                                <FieldArea label="description" value={courseState.description} onChange={(v) => setCourseState({ ...courseState, description: v })} placeholder="What this course covers..." inputBase={inputBase} inputTheme={inputTheme} />
                                <Field label="lessons (comma-separated)" value={courseState.lessons} onChange={(v) => setCourseState({ ...courseState, lessons: v })} placeholder="DP, Graphs, Greedy" inputBase={inputBase} inputTheme={inputTheme} />
                                <Field label="href" value={courseState.href} onChange={(v) => setCourseState({ ...courseState, href: v })} placeholder="https://..." inputBase={inputBase} inputTheme={inputTheme} />
                                <Field label="rigor" value={courseState.rigor} onChange={(v) => setCourseState({ ...courseState, rigor: v })} placeholder="5" inputBase={inputBase} inputTheme={inputTheme} required />
                            </>
                        )}

                        <div className="my-4 flex flex-col">
                            <label className="text-sm font-bold uppercase tracking-wide">image</label>
                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                                className={`mt-2 ${isDarkMode ? "text-white" : "text-black"}`}
                            />
                            {(filePreview || existingImageUrl) && (
                                <div className={`mt-3 border-2 ${isDarkMode ? "border-white/40" : "border-black/40"} rounded-sm overflow-hidden w-full max-w-xs`}>
                                    <Image
                                        src={filePreview ?? (existingImageUrl as string)}
                                        alt="preview"
                                        width={400}
                                        height={225}
                                        unoptimized
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}
                            <span className={`mt-1 text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>PNG / JPEG / WEBP, max 5 MB. Saved as jtfolio-{entityType}/{currentName || "<name>"}.png in S3.</span>
                        </div>

                        {error && (
                            <div className={`my-3 text-sm ${isDarkMode ? "text-red-400" : "text-red-600"}`}>
                                {error}
                            </div>
                        )}

                        <div className="mt-4 flex gap-3 items-center">
                            <button
                                type="submit"
                                disabled={submitting || deleting}
                                className={`flex-1 font-bold py-3 box-border border-2 transition-all duration-300 ${
                                    isDarkMode
                                        ? "border-white hover:bg-white hover:text-black"
                                        : "border-black hover:bg-black hover:text-white"
                                } disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                            >
                                {submitting ? "SAVING..." : mode === "create" ? "CREATE" : "SAVE"}
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={submitting || deleting}
                                className={`px-6 py-3 box-border border-2 transition-all duration-300 ${
                                    isDarkMode
                                        ? "border-white/50 hover:border-white"
                                        : "border-black/50 hover:border-black"
                                } disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                            >
                                CANCEL
                            </button>
                            {mode === "edit" && props.onDelete && (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={submitting || deleting}
                                    aria-label="Delete"
                                    title="Delete"
                                    className={`w-12 h-12 ml-auto rounded-full flex items-center justify-center border-2 transition-all duration-200 hover:scale-110 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                                        isDarkMode
                                            ? "bg-black text-white border-white hover:bg-white hover:text-black"
                                            : "bg-white text-black border-black hover:bg-black hover:text-white"
                                    }`}
                                >
                                    {deleting ? (
                                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" opacity="0.25" />
                                            <path d="M22 12a10 10 0 01-10 10" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                            <path d="M10 11v6M14 11v6" />
                                            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                        </svg>
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>,
        document.body,
    );
}

function Field({ label, value, onChange, placeholder, inputBase, inputTheme, required }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    inputBase: string;
    inputTheme: string;
    required?: boolean;
}) {
    return (
        <div className="my-4 flex flex-col">
            <label className="text-sm font-bold uppercase tracking-wide">{label}{required && <span className="ml-1">*</span>}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                className={`${inputBase} ${inputTheme}`}
            />
        </div>
    );
}

function FieldArea({ label, value, onChange, placeholder, inputBase, inputTheme }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    inputBase: string;
    inputTheme: string;
}) {
    return (
        <div className="my-4 flex flex-col">
            <label className="text-sm font-bold uppercase tracking-wide">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={4}
                className={`${inputBase} ${inputTheme} resize-none`}
            />
        </div>
    );
}
