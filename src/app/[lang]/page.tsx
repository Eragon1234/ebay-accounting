import Dashboard from "@/app/[lang]/dashboard";
import {getLocalizationContext} from "@/lib/server-contexts";
import React from "react";
import {getDictionary, Locales} from "@/translation/dictionaries";

export const dynamic = "force-dynamic";

export default async function Home({params}: { params: { lang: Locales } }) {
    getLocalizationContext().resolve({
        locale: params.lang,
        dict: getDictionary(params.lang)
    });

    return <Dashboard dict={((await getLocalizationContext())).dict}/>
}
