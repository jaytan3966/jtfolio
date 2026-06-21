"use client";
import { TypeAnimation } from "react-type-animation";

interface Props {
    text: string;
    className?: string;
}

// Types out `text` one character at a time, mirroring the section headers on the
// main page. The "> " prompt prefix is rendered statically (it never animates).
export default function TypewriterTitle({ text, className }: Props) {
    const sequence: (string | number)[] = [];
    for (let i = 1; i <= text.length; i++) {
        sequence.push(text.slice(0, i), 50);
    }

    return (
        <span className={className}>
            {"> "}
            <TypeAnimation sequence={sequence} speed={75} cursor={false} />
        </span>
    );
}
