"use client";

import {useFormStatus} from "react-dom";

export function SubmitButton({text}: { text: string }) {
    const {pending} = useFormStatus();

    return <button disabled={pending} type="submit" style={{width: "auto",}}>{text}</button>;
}