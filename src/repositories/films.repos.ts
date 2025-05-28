import { db } from '../db/index';
import { films } from '../db/schema';
import { eq } from "drizzle-orm";

export const filmsRepos  = {
    findAll: async () => db.select().from(films),
    findById: async (id: number) => {
        const [film] = await db
            .select()
            .from(films)
            .where(eq(films.film_id, id));
        return film;
    },
    add: async (data: { title: string; description: string }) =>{
        db.insert(films).values(data).returning();
    },
    // Actualizar película (PATCH/PUT)
    update: async (id: number, data: { title: string; description: string }) => {
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
