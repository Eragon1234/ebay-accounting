import type {Config} from "drizzle-kit";

export default {
    schema: "./src/db/schema.ts",
    dialect: "sqlite",
    out: "./drizzle",
    driver: 'd1',
    dbCredentials: {
        wranglerConfigPath: "",
        dbName: ""
    }
} satisfies Config;
