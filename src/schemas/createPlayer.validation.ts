import { z } from "zod";

export const createPlayerSchema = z.object({
    body: z.object({
        user: z.string(), // ObjectId reference
        team: z.string(), // ObjectId reference
        jerseyNumber: z.number(),
        isCaptain: z.boolean().optional(),
        role: z.enum(["handler", "cutter", "hybrid"]).optional(),
        injured: z.boolean().optional(),
    }),
});

export type CreatePlayerInput = z.infer<typeof createPlayerSchema>['body'];