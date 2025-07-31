import { drizzle as drizzlepost } from 'drizzle-orm/vercel-postgres';
import * as schema from './schema/indexdb.js';

const drizzle = drizzlepost({
    schema,
});

export default drizzle