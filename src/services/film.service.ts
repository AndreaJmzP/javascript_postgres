import { db } from "../db";
import { films } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import { filmsRepos } from "../repositories/films.repos.ts";

export const FilmService = {
    getAll: () => filmsRepos.findAll(),
    getById: (id: number) => filmsRepos.findById(id),
    add: (title: string, description: string) =>
        filmsRepos.add({ title, description}),
    // Actualizar película
    update: async (id: number, title:string ) => {
        const [updatedFilm] = await db.update(films)
            .set(title)
            .where(eq(films.film_id, id))
            .returning();
        return updatedFilm;
    },
    //Eliminar película
    delete: async (id: number) => {
        const [deletedFilm] = await db.delete(films)
            .where(eq(films.film_id, id))
            .returning();
        return deletedFilm;
    },
};