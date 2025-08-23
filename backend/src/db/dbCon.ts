import { drizzle as drizzlepost } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema/indexdb.js';

const drizzle = drizzlepost(sql, {
    schema,
});

export default drizzle