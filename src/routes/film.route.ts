import { Hono } from 'hono';
import { filmSchema } from '../schemas/film_schema.ts';
import { filmController } from '../controllers/film.controller.ts';
import { validateBody } from '../middlewares/validate.ts';

// este es el nuevo middleware

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
        const bodyValidated = c.get('validateBody') as {
            title: string;
            description: string;
            release_year: string;
        };
        const { status, body } = await filmController.add(bodyValidated);
        return new Response(JSON.stringify(body), {
            status: status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
);
// Actualizar película
FilmRouter.put('/:id', validateBody(filmSchema.partial()), async (c) => {
    const id = Number(c.req.param('id'));
    const body = c.get('validatedBody');
    const { status: Number, body: responseBody } = await filmController.update(id, body);
    return c.json(responseBody, status);
});

// Eliminar película
FilmRouter.delete('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status: status, body } = await filmController.delete(id);
    return c.json(body, status);
});

export default FilmRouter;
