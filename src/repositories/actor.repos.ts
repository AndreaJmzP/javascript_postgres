import { db } from '../db/index.ts';
import { actors } from '../db/schema.ts';
import { eq } from "drizzle-orm";

export const ActorRepository = {
    findAll: async () => {
        return await db.select().from(actors);
    },

    findById: async (id: number) => {
        const [actor] = await db
            .select()
            .from(actors)
            .where(eq(actors.actor_id, id));
        return actor || null;
    },

    add: async (data: { first_name: string; last_name: string }) => {
        const [newActor] = await db
            .insert(actors)
            .values(data)
            .returning();
        return newActor;
    },

    update: async (id: number, data: Partial<{ first_name: string; last_name: string }>) => {
        const [updatedActor] = await db
            .update(actors)
            .set(data)
            .where(eq(actors.actor_id, id))
            .returning();
        return updatedActor || null;
    },

    delete: async (id: number) => {
        const [deletedActor] = await db
            .delete(actors)
            .where(eq(actors.actor_id, id))
            .returning();
        return deletedActor || null;
    }
};