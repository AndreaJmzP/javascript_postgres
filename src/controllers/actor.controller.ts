import { ActorService } from '../services/actor.service.ts';
import {HttpResponse} from "../utils/http_reponse.ts";


export const ActorController = {
    getAll: async () => {
        try {
            const actors = await ActorService.getAll();
            return HttpResponse.ok(actors, "Actores recuperados correctamente");
        } catch (error) {
            return HttpResponse.error("Error al recuperar los actores");
        }
    },

    getById: async (id: number) => {
        try {
            const actor = await ActorService.getById(id);
            if (!actor) {
                return HttpResponse.notFound("Actor no encontrado");
            }
            return HttpResponse.ok([actor], "Actor encontrado");
        } catch (error) {
            return HttpResponse.error("Error al recuperar el actor");
        }
    },

    add: async (body: { first_name: string; last_name: string }) => {
        try {
            const newActor = await ActorService.add(body.first_name, body.last_name);
            return HttpResponse.created(newActor, "Actor creado");
        } catch (error) {
            return HttpResponse.error("Error al crear el actor");
        }
    },
};
