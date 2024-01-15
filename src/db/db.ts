import {drizzle} from "drizzle-orm/node-postgres";
import {Client} from "pg";
import * as schema from "./schema";
import {migrate} from "drizzle-orm/node-postgres/migrator";

const migrationClient = new Client({
    connectionString: process.env.DATABASE_URL,
});
migrate(drizzle(migrationClient), {
    migrationsFolder: "../../drizzle"
});

const queryClient = new Client({
    connectionString: process.env.DATABASE_URL,
});
queryClient.connect();

const db = drizzle(queryClient, {
    schema
});
export default db;
