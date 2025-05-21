import { filmService } from '../services/film.service.ts';
import {HttpResponse} from "../utils/http_reponse.ts";


export const filmController = {
    getAll: async () => {
        try {
            const actors = await filmService.getAll();
            return HttpResponse.ok(actors, "Películas recuperados correctamente");
        } catch (error) {
            return HttpResponse.error("Error al recuperar los actores");
        }
    },

    getById: async (id: number) => {
        try {
            const film = await filmService.getById(id)
            if (!film) {
                return HttpResponse.notFound("Actor no encontrado");
            }
            return HttpResponse.ok([film], "Actor encontrado");
        } catch (error) {
            return HttpResponse.error("Error al recuperar el actor");
        }
    },

    add: async (body: { title: string; description: string, release_year: string }) => {
        try {
            const newFilm = await filmService.add(body.title, body.description);
            return HttpResponse.created(newFilm, "Película creado");
        } catch (error) {
            return HttpResponse.error("Error al crear la película");
        }
    },
};
