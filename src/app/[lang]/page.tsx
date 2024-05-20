import Dashboard from "@/app/[lang]/dashboard";
import {getLocalizationContext} from "@/lib/server-contexts";

export const dynamic = "force-dynamic";

export default async function Home() {
    return <Dashboard dict={((await getLocalizationContext())).dict}/>
}
