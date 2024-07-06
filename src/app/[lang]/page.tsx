import React from "react";
import {getDictionary, Locales} from "@/translation/dictionaries";
import DashboardPage from "@/app/[lang]/dashboard-page";

export const dynamic = "force-dynamic";

export default function Home({params}: { params: { lang: Locales } }) {
    const localization = {
        locale: params.lang,
        dict: getDictionary(params.lang)
    }

    return <DashboardPage dict={localization.dict}/>
}
