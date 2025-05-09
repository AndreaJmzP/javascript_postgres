import { pgTable, serial,  varchar } from 'drizzle-orm/pg-core';

export const actors = pgTable('actor', {
    actor_id: serial('actor_id').primaryKey(),
    first_name: varchar('first_name', { length: 100 }),
    last_name: varchar('last_name', { length: 100 })
});
