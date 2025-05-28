import { filmsRepos } from "../repositories/films.repos.ts";

export const FilmService = {
    getAll: () => filmsRepos.findAll(),
    getById: (id: number) => filmsRepos.findById(id),
    add: (data: {title: string, description: string,release_year:number,language_id:number }) => filmsRepos.add(data),
    // Actualizar película
    /*update: async (id: number, title:string ) => {
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
    },*/
};