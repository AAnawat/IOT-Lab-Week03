import {reset, seed} from 'drizzle-seed'
import drizzle from '../dbCon';
import * as schema from '../schema/indexdb'

async function main() {
    await reset(drizzle, schema)
    await seed(drizzle, schema, {seed: 1150})
}

main();