"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventSchema = void 0;
const zod_1 = require("zod");
const regexp_1 = require("../lib/regexp");
const events_1 = require("../lib/events");
const eventTypes = [...events_1.EVENT_TYPES];
exports.updateEventSchema = zod_1.z.object({
    body: zod_1.z.object({
        eventId: zod_1.z.string(),
        title: zod_1.z.string().regex(regexp_1.NAME_REGEXP),
        teams: zod_1.z.array(zod_1.z.string()),
        type: zod_1.z.enum(eventTypes),
        banner: zod_1.z.string().optional(),
        logo: zod_1.z.string(),
        startDate: zod_1.z.date(),
        endDate: zod_1.z.date(),
        createdBy: zod_1.z.string(),
        address: zod_1.z.object({
            city: zod_1.z.string().regex(regexp_1.NAME_REGEXP),
            fieldAddress: zod_1.z.string(),
            fieldName: zod_1.z.string().optional(),
            location: zod_1.z.object({
                lat: zod_1.z.number(),
                long: zod_1.z.number(),
            })
        })
    }),
});
