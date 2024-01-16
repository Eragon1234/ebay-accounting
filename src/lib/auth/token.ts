import {payloadToBase64, sign} from "@/lib/auth/sign";

export type Payload = {
    exp: number
}

export const sevenDaysInSeconds = 60 * 60 * 24 * 7;

export const cookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: sevenDaysInSeconds
}

export async function getToken(): Promise<string> {
    const epochSeconds = new Date().getTime() / 1000;
    const payload = {
        exp: epochSeconds + sevenDaysInSeconds
    }

    const signature = await sign(payloadToBase64(payload));

    return payloadToBase64(payload) + "." + signature;
}
