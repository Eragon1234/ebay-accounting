import {getDictionary, Locales} from "@/translation/dictionaries";
import Dashboard from "@/app/[lang]/dashboard";

export const dynamic = "force-dynamic";

export default async function Home({params}: { params: { lang: Locales } }) {
    const dict = await getDictionary(params.lang);
    return <Dashboard dict={dict}/>
}
