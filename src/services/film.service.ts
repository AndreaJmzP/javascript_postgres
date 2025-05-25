import { filmsRepos } from '../repositories/films.repos.ts';

export const FilmService = {
    getAll: () => filmsRepos.findAll(),
    getById: (id: number) => filmsRepos.findById(id),
    add: (title: string, description: string) =>
        filmsRepos.add({ title, description }),
};
