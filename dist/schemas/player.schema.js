"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerSchema = void 0;
const zod_1 = require("zod");
const user_schema_1 = require("./user.schema");
const regexp_1 = require("../lib/regexp");
exports.PlayerSchema = zod_1.z.object({
    user: user_schema_1.UserSummarySchema,
    teamId: zod_1.z.string(),
    teamName: zod_1.z
        .string()
        .regex(regexp_1.NAME_REGEXP),
    jerseyNumber: zod_1.z.number(),
    isCaptain: zod_1.z
        .boolean()
        .optional(),
    role: zod_1.z
        .enum(["handler", "cutter", "hybrid"])
        .optional(),
    injured: zod_1.z
        .boolean()
        .optional(),
});
