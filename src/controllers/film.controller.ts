
import { HttpResponse } from "../utils/http_reponse.ts";
import {filmsRepos} from "../repositories/films.repos.ts";

export const filmController = {
    getAll: async () => {
        try {
            const films = await filmsRepos.findAll();
            return HttpResponse.ok(films, "Películas recuperadas correctamente");
        } catch (error) {
            return HttpResponse.error("Error al recuperar las películas");
        }
    },

    getById: async (id: number) => {
        try {
            const film = await filmsRepos.findById(id);
            if (!film) {
                return HttpResponse.notFound("Película no encontrada");
            }
            return HttpResponse.ok([film], "Película encontrada");
        } catch (error) {
            return HttpResponse.error("Error al recuperar la película");
        }
    },

    add: async (data: { title: string; description: string, release_year:number, language_id:number }) => {
        try {
            console.log("Datos recibidos:", data);//comprobar
            const newFilm = await filmsRepos.add(data);
            console.log("Película creada:", newFilm); //comprobar
            return HttpResponse.created(newFilm);
        } catch (error) {
            console.error("Error al crear película:", error); //comprobar
            return HttpResponse.error("Error al crear la película");
        }
    },
    // Actualizar película
    update: async (id: number, data: Partial<{ title: string; description: string ,release_year:number,language_id:number}>) => {
        try {
            const updatedFilm = await filmsRepos.update(id,data);
            if (!updatedFilm) {
                return HttpResponse.notFound("Película no encontrada");
            }
            return HttpResponse.ok(updatedFilm, "Película actualizada");
        } catch (error) {
            return HttpResponse.error("Error al actualizar la película");
        }
    },
    // Eliminar película
    delete: async (id: number) => {
        try {
            const deletedFilm = await filmsRepos.delete(id);
            if (!deletedFilm) {
                return HttpResponse.notFound("Película no encontrada");
            }
            return HttpResponse.ok(deletedFilm, "Película eliminada");
        } catch (error) {
            return HttpResponse.error("Error al eliminar la película");
        }
    },
};