import {signIn} from "@/lib/auth/signIn";
import {getLocalization, Locales} from "@/translation/dictionaries";

export default async function Login(props: { params: Promise<{ lang: Locales }> }) {
    const params = await props.params;
    const localization = getLocalization(params.lang);

    const {dict} = localization;

    return <form action={signIn}>
        <label htmlFor="password">{dict.login.password}</label>
        <input type="password" name="password" id="password"/>
        <button type="submit">{dict.login.submit}</button>
    </form>
}