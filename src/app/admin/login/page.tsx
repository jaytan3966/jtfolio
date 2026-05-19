"use client";
import { useActionState } from "react";
import { useTheme } from "@/app/context/themecontext";
import { loginAction, type LoginState } from "./actions";

export default function AdminLoginPage() {
    const { isDarkMode } = useTheme();
    const [state, formAction, pending] = useActionState<LoginState, FormData>(
        loginAction,
        undefined,
    );

    const inputBase =
        "focus:outline-none px-3 py-2 mt-2 w-full box-border border-2 bg-transparent transition-colors duration-300";
    const inputTheme = isDarkMode
        ? "border-white/40 focus:border-white text-white placeholder:text-gray-500"
        : "border-black/40 focus:border-black text-black placeholder:text-gray-400";
    const panelBg = isDarkMode ? "bg-black text-white" : "bg-white text-black";
    const panelBorder = isDarkMode ? "border-white" : "border-black";

    return (
        <main
            className={`min-h-screen flex items-center justify-center p-4 font-mono ${
                isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
            } transition-colors duration-500`}
        >
            <div
                className={`w-full max-w-md ${panelBg} border-4 ${panelBorder} rounded-sm shadow-2xl p-6`}
            >
                <h1 className="text-3xl font-bold">{"> Admin"}</h1>
                <p
                    className={`mt-1 text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                    Sign in to edit experiences and courses.
                </p>

                <form action={formAction} className="mt-4">
                    <div className="my-4 flex flex-col">
                        <label
                            htmlFor="username"
                            className="text-sm font-bold uppercase tracking-wide"
                        >
                            username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className={`${inputBase} ${inputTheme}`}
                        />
                    </div>

                    <div className="my-4 flex flex-col">
                        <label
                            htmlFor="password"
                            className="text-sm font-bold uppercase tracking-wide"
                        >
                            password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className={`${inputBase} ${inputTheme}`}
                        />
                    </div>

                    {state?.error && (
                        <div
                            className={`my-3 text-sm ${
                                isDarkMode ? "text-red-400" : "text-red-600"
                            }`}
                        >
                            {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={pending}
                        className={`mt-2 w-full font-bold py-3 box-border border-2 transition-all duration-300 ${
                            isDarkMode
                                ? "border-white hover:bg-white hover:text-black"
                                : "border-black hover:bg-black hover:text-white"
                        } disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                    >
                        {pending ? "SIGNING IN..." : "SIGN IN"}
                    </button>
                </form>
            </div>
        </main>
    );
}
