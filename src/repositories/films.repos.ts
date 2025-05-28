import { db } from '../db/index';
import {films} from '../db/schema';
import { eq } from "drizzle-orm";

export const filmsRepos  = {
    findAll: async () => {
        return await db.select().from(films)
    },
    findById: async (id: number) => {
        const [film] = await db
            .select()
            .from(films)
            .where(eq(films.film_id, id));
        return film;
    },
    add: async (data: { title: string; description: string ,release_year:number,language_id:number}) => {
        const [newFilm] = await db.insert(films).
            values(data).
            returning();
            return newFilm;
    },
    // Actualizar película (PATCH/PUT)
    update: async (id: number, data: Partial<{ title: string; description: string,release_year:number,language_id:number }>) => {
        const [updatedFilm] = await db
            .update(films)
            .set(data)
            .where(eq(films.film_id, id))
            .returning();
        return updatedFilm || null;
    },
    // Eliminar película
    delete: async (id: number) => {
        const [deletedFilm] = await db
            .delete(films)
            .where(eq(films.film_id, id))
            .returning();
        return deletedFilm || null;
    },
};
