import {signIn} from "@/lib/auth/signIn";
import {getLocalizationContext} from "@/lib/server-contexts";
import {getDictionary, Locales} from "@/translation/dictionaries";

export default async function Login({params}: { params: { lang: Locales } }) {
    getLocalizationContext().resolve({
        locale: params.lang,
        dict: getDictionary(params.lang)
    });

    const {dict} = await getLocalizationContext();

    return <form action={signIn}>
        <label htmlFor="password">{dict.login.password}</label>
        <input type="password" name="password" id="password"/>
        <button type="submit">{dict.login.submit}</button>
    </form>
}