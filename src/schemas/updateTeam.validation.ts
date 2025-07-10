import { z } from "zod";
import { NAME_REGEXP } from "../lib/regexp";

export const updateTeamSchema = z.object({
    body: z.object({
        teamName: z
            .string()
            .regex(NAME_REGEXP),
        manager: z.string(), // ObjectId reference
        coaches: z.array(z.string()), // Array of ObjectId references
        roster: z.array(z.string()),  // Array of ObjectId references
        logo: z.string().optional(),
        address: z.object({
            city: z.string(),
            fieldAddress: z.string(),
            fieldName: z.string().optional(),
            location: z.object({
                lat: z.number(),
                long: z.number(),
            }),
        }),
    }),
});

export type UpdateTeamInput = z.infer<typeof updateTeamSchema>['body'];