import {integer,text,numeric, pgTable, serial, varchar} from 'drizzle-orm/pg-core';
import {release} from "node:os";
import {number} from "zod";
import {kMaxLength} from "node:buffer";

export const actors = pgTable('actor', {
    actor_id: serial('actor_id').primaryKey(),
    first_name: varchar('first_name', { length: 100 }),
    last_name: varchar('last_name', { length: 100 })
});

export const films =pgTable('film',{
    film_id: serial('film_id').primaryKey(),
    title: varchar('title',{length:255}),
    description: varchar('description',{length:500}),
    release_year:numeric('release_year'),
    language_id: numeric('language_id'),
    rental_duration: integer('rental_duration'),
    rental_rate: numeric('rental_rate', { precision: 4, scale: 2 }),
    length: integer('length'),
    replacement_cost: numeric('replacement_cost', { precision: 5, scale: 2 }),
    rating: varchar('rating', { length: 10 }),
    fulltext: text('fulltext'),

});



