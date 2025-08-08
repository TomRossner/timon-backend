import { z } from "zod";
import { NAME_REGEXP } from "../lib/regexp";

export const updatePlayerSchema = z.object({
    body: z.object({
        user: z.string(), // ObjectId reference
        team: z.object({
            teamId: z.string(),
            name: z
                .string()
                .regex(NAME_REGEXP),
            manager: z.string().nullable(), // ObjectId reference
            coaches: z.array(z.string()), // Array of ObjectId references
            roster: z.array(z.string()),  // Array of ObjectId references
            logo: z.string().optional().nullable(),
            address: z.object({
                city: z.string(),
                fieldName: z.string().optional(),
                location: z.object({
                    lat: z.number(),
                    long: z.number(),
                }),
            }),
        }),
        jerseyNumber: z.number(),
        isCaptain: z.boolean().optional(),
        role: z.enum(["handler", "cutter", "hybrid"]).optional(),
        injured: z.boolean().optional(),
    }),
});

export type UpdatePlayerInput = z.infer<typeof updatePlayerSchema>['body'];