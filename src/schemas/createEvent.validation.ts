import { z } from "zod";
import { NAME_REGEXP } from "../lib/regexp";
import { EVENT_TYPES } from "../lib/events";

const eventTypes = [...EVENT_TYPES as readonly string[]] as [string, ...string[]];

export const createEventSchema = z.object({
    body: z.object({
        title: z.string().regex(NAME_REGEXP),
        teams: z.array(z.string()),
        type: z.enum(eventTypes),
        banner: z.string().optional(),
        logo: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        createdBy: z.string(),
        address: z.object({
            city: z.string().regex(NAME_REGEXP),
            fieldAddress: z.string(),
            fieldName: z.string().optional(),
            location: z.object({
                lat: z.number(),
                long: z.number(),
            })
        })
    }),
});

export type CreateEventInput = z.infer<typeof createEventSchema>['body'];