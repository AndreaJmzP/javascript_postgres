
import { ActorRepository } from '../repositories/actor.repos.ts';
import {HttpResponse} from "../utils/http_reponse.ts";

export const ActorController = {
    getAll: async () => {
        try {
            const actors = await ActorRepository.findAll();
            return HttpResponse.ok(actors);
        } catch (error) {
            return HttpResponse.error("Error al recuperar los actores");
        }
    },

    getById: async (id: number) => {
        try {
            const actor = await ActorRepository.findById(id);
            if (!actor) return HttpResponse.notFound('Actor no encontrado');
            return HttpResponse.ok(actor);
        } catch (error) {
            return HttpResponse.error('Actor no encontrado');
        }
    },

    add: async (data: { first_name: string; last_name: string }) => {
        try {
            const actor = await ActorRepository.add(data);
            return HttpResponse.created(actor);
        } catch (error) {
            return HttpResponse.error('Actor no creado');
        }
    },

    update: async (id: number, data: Partial<{ first_name: string; last_name: string }>) => {
        try {
            const actor = await ActorRepository.update(id, data);
            if (!actor) return HttpResponse.notFound('Actor no encontrado');
            return HttpResponse.ok(actor);
        } catch (error) {
            return HttpResponse.error('Actor no encontrado');
        }
    },

    delete: async (id: number) => {
        try {
            const actor = await ActorRepository.delete(id);
            if (!actor) return HttpResponse.notFound('Actor no encontrado');
            return HttpResponse.ok(actor);
        } catch (error) {
            return HttpResponse.error('Actor no encontrado');
        }
    }
};