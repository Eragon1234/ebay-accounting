import {drizzle} from "drizzle-orm/node-postgres";
import {Client} from "pg";
import * as schema from "./schema";

const queryClient = new Client({
    connectionString: process.env.DATABASE_URL,
});
queryClient.connect();

const db = drizzle(queryClient, {
    schema
});
export default db;
