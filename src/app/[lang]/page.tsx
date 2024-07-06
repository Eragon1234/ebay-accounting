import {getLocalizationContext} from "@/lib/server-contexts";
import React from "react";
import {getDictionary, Locales} from "@/translation/dictionaries";
import DashboardPage from "@/app/[lang]/dashboard-page";

export const dynamic = "force-dynamic";

export default function Home({params}: { params: { lang: Locales } }) {
    const dict = getDictionary(params.lang);
    getLocalizationContext().resolve({
        locale: params.lang,
        dict
    });

    return <DashboardPage dict={dict}/>
}
