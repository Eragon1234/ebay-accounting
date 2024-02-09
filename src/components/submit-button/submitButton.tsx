"use client";

import {useFormStatus} from "react-dom";

export async function SubmitButton({text}: { text: string }) {
    const {pending} = useFormStatus();

    return <button type="submit" style={{width: "auto",}} disabled={pending}>{text}</button>;
}