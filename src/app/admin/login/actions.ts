"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type LoginState = { error?: string } | undefined;

export async function loginAction(
    _prev: LoginState,
    formData: FormData,
): Promise<LoginState> {
    try {
        await signIn("credentials", {
            username: formData.get("username") as string,
            password: formData.get("password") as string,
            redirectTo: "/admin",
        });
        return undefined;
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === "CredentialsSignin") {
                return { error: "Invalid username or password" };
            }
            return { error: "Authentication failed" };
        }
        throw error;
    }
}
