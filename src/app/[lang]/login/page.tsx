import {signIn} from "@/lib/auth/signIn";
import {useContext} from "react";
import {LocalizationContext} from "@/lib/contexts";

export default async function Login() {
    const {dict} = useContext(LocalizationContext);

    return <form action={signIn}>
        <label htmlFor="password">{dict.login.password}</label>
        <input type="password" name="password" id="password"/>
        <button type="submit">{dict.login.submit}</button>
    </form>
}