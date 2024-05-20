import Dashboard from "@/app/[lang]/dashboard";
import {getLocalizationContext} from "@/lib/server-context";

export const dynamic = "force-dynamic";

export default async function Home() {
    return <Dashboard dict={getLocalizationContext().dict}/>
}
