import {getDictionary, Locales} from "@/translation/dictionaries";

import {signIn} from "@/lib/auth/signIn";

export default async function Login({params}: { params: { lang: Locales } }) {
    const dict = await getDictionary(params.lang);

    return <form action={signIn}>
        <label htmlFor="password">{dict.login.password}</label>
        <input type="password" name="password" id="password" />
        <button type="submit">{dict.login.submit}</button>
    </form>
}