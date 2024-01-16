import {payloadFromBase64, verify} from "@/lib/auth/sign";
import {Payload} from "@/lib/auth/token";

type UserSession = { authenticated: false } | { authenticated: true, payload: Payload };
const NoSession: UserSession = {authenticated: false}

export async function getUserSession(authCookie: string | undefined): Promise<UserSession> {
    if (!authCookie) {
        return NoSession;
    }
    const [payloadBase64, signature] = authCookie.split(".");

    if (!await verify(signature, payloadBase64)) {
        return NoSession
    }

    const payload = payloadFromBase64(payloadBase64);
    const epochSeconds = new Date().getTime() / 1000;

    return {
        authenticated: payload.exp >= epochSeconds,
        payload
    }
}