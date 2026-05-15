"use client";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "@/app/context/themecontext";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/app/utils/send-email";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export type FormData = {
    name: string;
    email: string;
    company: string;
    message: string;
};

type FieldConfig = {
    name: keyof FormData;
    label: string;
    placeholder: string;
    required: boolean;
    type: "text" | "email" | "textarea";
};

const fields: FieldConfig[] = [
    { name: "name", label: "name", placeholder: "Steve Jobs", required: true, type: "text" },
    { name: "email", label: "email", placeholder: "stevejobs@apple.com", required: true, type: "email" },
    { name: "company", label: "company", placeholder: "Apple", required: false, type: "text" },
    { name: "message", label: "message", placeholder: "Let's have a coffee chat...", required: true, type: "textarea" },
];

interface ContactProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Contact({ isOpen, onClose }: ContactProps) {
    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isDarkMode } = useTheme();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen, onClose]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({ mode: "onTouched" });

    const formRef = useRef<HTMLFormElement>(null);

    const toastStyle = {
        background: isDarkMode ? "black" : "white",
        color: isDarkMode ? "white" : "black",
        border: `1px solid ${isDarkMode ? "white" : "black"}`,
        fontFamily: '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    };

    async function onSubmit(data: FormData) {
        setIsSubmitting(true);
        try {
            await sendEmail(data);
            toast.success("Message sent!", { style: toastStyle });
            reset();
            formRef.current?.reset();
            setTimeout(onClose, 600);
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again or email me directly.", { style: toastStyle });
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!mounted) return null;

    const inputBase = "focus:outline-none px-3 py-2 mt-2 w-full box-border border-2 bg-transparent transition-colors duration-300";
    const inputTheme = isDarkMode
        ? "border-white/40 focus:border-white text-white placeholder:text-gray-500"
        : "border-black/40 focus:border-black text-black placeholder:text-gray-400";
    const errorBorder = isDarkMode ? "border-red-400" : "border-red-600";
    const panelBg = isDarkMode ? "bg-black text-white" : "bg-white text-black";
    const panelBorder = isDarkMode ? "border-white" : "border-black";

    return createPortal(
        <>
            <div
                aria-hidden={!isOpen}
                onClick={onClose}
                className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-title"
                className={`fixed inset-0 z-[70] flex items-center justify-center p-4 transition-all duration-300 ${
                    isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto font-mono ${panelBg} border-4 ${panelBorder} rounded-sm shadow-2xl`}
                >
                    <button
                        onClick={onClose}
                        aria-label="Close contact form"
                        className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 ${
                            isDarkMode ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    <div className="px-6 pt-6 pb-2">
                        <h2 id="contact-title" className="text-2xl md:text-3xl font-bold">{"> Contact"}</h2>
                        <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Drop a note — I&apos;ll get back to you.
                        </p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate className="px-6 pb-6">
                        {fields.map((field) => {
                            const fieldId = `contact-${field.name}`;
                            const error = errors[field.name];
                            const validation =
                                field.type === "email"
                                    ? {
                                          required: field.required ? "Email is required" : false,
                                          pattern: {
                                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                              message: "Please enter a valid email address",
                                          },
                                      }
                                    : { required: field.required ? `${field.label} is required` : false };

                            return (
                                <div className="my-4 flex flex-col" key={field.name}>
                                    <label htmlFor={fieldId} className="text-sm font-bold uppercase tracking-wide">
                                        {field.label}{field.required && <span className="ml-1">*</span>}
                                    </label>
                                    {field.type === "textarea" ? (
                                        <textarea
                                            id={fieldId}
                                            {...register(field.name, validation)}
                                            placeholder={field.placeholder}
                                            aria-invalid={error ? "true" : "false"}
                                            rows={5}
                                            className={`${inputBase} ${error ? errorBorder : inputTheme} resize-none`}
                                        />
                                    ) : (
                                        <input
                                            id={fieldId}
                                            {...register(field.name, validation)}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            aria-invalid={error ? "true" : "false"}
                                            className={`${inputBase} ${error ? errorBorder : inputTheme}`}
                                        />
                                    )}
                                    {error && (
                                        <span className={`mt-1 text-xs ${isDarkMode ? "text-red-400" : "text-red-600"}`}>
                                            {error.message as string}
                                        </span>
                                    )}
                                </div>
                            );
                        })}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`mt-2 w-full font-bold py-3 box-border border-2 transition-all duration-300 ${
                                isDarkMode
                                    ? "border-white hover:bg-white hover:text-black"
                                    : "border-black hover:bg-black hover:text-white"
                            } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent ${
                                isDarkMode ? "disabled:hover:text-white" : "disabled:hover:text-black"
                            } cursor-pointer`}
                        >
                            {isSubmitting ? "SENDING..." : "SEND"}
                        </button>
                    </form>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={isDarkMode ? 'dark' : 'light'}
                className="font-mono z-[80]"
            />
        </>,
        document.body,
    );
}
