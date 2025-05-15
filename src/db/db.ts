import {drizzle} from "drizzle-orm/d1";
import * as schema from "./schema";
import {cache} from "react";
import {getCloudflareContext} from "@opennextjs/cloudflare";

export const getDb = cache(() => {
    const {env} = getCloudflareContext();
    return drizzle(env.DB, {schema});
});

// This is the one to use for static routes (i.e. ISR/SSG)
export const getDbAsync = cache(async () => {
    const {env} = await getCloudflareContext({async: true});
    return drizzle(env.DB, {schema});
});
