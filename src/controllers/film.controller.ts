import { FilmService } from '../services/film.service.ts';
import { HttpResponse } from "../utils/http_reponse.ts";

export const filmController = {
    getAll: async () => {
        try {
            const films = await FilmService.getAll();
            return HttpResponse.ok(films, "Películas recuperadas correctamente");
        } catch (error) {
            return HttpResponse.error("Error al recuperar las películas");
        }
    },

    getById: async (id: number) => {
        try {
            const film = await FilmService.getById(id);
            if (!film) {
                return HttpResponse.notFound("Película no encontrada");
            }
            return HttpResponse.ok([film], "Película encontrada");
        } catch (error) {
            return HttpResponse.error("Error al recuperar la película");
        }
    },

    add: async (body: { title: string; description: string }) => {
        try {
            const newFilm = await FilmService.add(body.title, body.description);
            return HttpResponse.created(newFilm, "Película creada");
        } catch (error) {
            return HttpResponse.error("Error al crear la película");
        }
    },

    // Actualizar película
    update: async (id: number, title:string) => {
        try {
            const updatedFilm = await FilmService.update(id,title);
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
            const deletedFilm = await FilmService.delete(id);
            if (!deletedFilm) {
                return HttpResponse.notFound("Película no encontrada");
            }
            return HttpResponse.ok(deletedFilm, "Película eliminada");
        } catch (error) {
            return HttpResponse.error("Error al eliminar la película");
        }
    },
};