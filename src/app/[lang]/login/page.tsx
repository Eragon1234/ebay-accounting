import {signIn} from "@/lib/auth/signIn";
import {getLocalizationContext} from "@/lib/server-context";

export default async function Login() {
    const {dict} = getLocalizationContext();

    return <form action={signIn}>
        <label htmlFor="password">{dict.login.password}</label>
        <input type="password" name="password" id="password"/>
        <button type="submit">{dict.login.submit}</button>
    </form>
}