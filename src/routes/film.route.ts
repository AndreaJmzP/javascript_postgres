import { Hono } from 'hono';
import { filmSchema } from '../schemas/film_schema.ts';
import { filmController } from '../controllers/film.controller.ts';
import { validateBody } from '../middlewares/validate.ts';
import {ActorController} from "../controllers/actor.controller.ts";
import actorRouter from "./actor.route.ts";


const FilmRouter = new Hono();

FilmRouter.get('/films', async (): Promise<Response> => {
    const { status, body } = await filmController.getAll();
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

FilmRouter.get('/films/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status, body } = await filmController.getById(id);
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

FilmRouter.post(
    '/films',
    validateBody(filmSchema),
    async (c) => {
       const bodyValidated = c.get('validatedBody');

        const { status, body } = await filmController.add(bodyValidated);
        return new Response(JSON.stringify(body), {
            status: status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
);

// Actualizar película
FilmRouter.put('/films/:id', validateBody(filmSchema.partial()), async (c) => {
    const id = Number(c.req.param('id'));
    const validatedData = c.get('validatedBody');
    const { status, body } = await filmController.update(id, validatedData);
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

// Eliminar película
FilmRouter.delete('/films/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status, body } = await filmController.delete(id);
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

export default FilmRouter;
