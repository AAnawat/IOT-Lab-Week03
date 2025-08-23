import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './api/db/schema',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.POSTGRES_URL as string,
    }
})