import {Payload} from "@/lib/auth/token";

const secret = crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(process.env.SECRET!),
    {
        name: "HMAC",
        hash: {name: "SHA-256"}
    },
    false,
    ["sign", "verify"]
);

export async function sign(b64payload: string): Promise<string> {
    const signature = await crypto.subtle.sign("HMAC", await secret, Buffer.from(b64payload));

    return Buffer.from(signature).toString("base64url");
}

export async function verify(signature: string, b64payload: string): Promise<boolean> {
    const signatureBuffer = Buffer.from(signature, "base64url");
    const payloadBuffer = Buffer.from(b64payload);

    return crypto.subtle.verify("HMAC", await secret, signatureBuffer, payloadBuffer);
}

export function payloadToBase64(obj: Payload): string {
    return Buffer.from(JSON.stringify(obj)).toString("base64url");
}

export function payloadFromBase64(base64: string): Payload {
    return JSON.parse(Buffer.from(base64, "base64url").toString());
}
