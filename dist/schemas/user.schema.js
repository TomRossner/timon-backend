"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSummarySchema = void 0;
const zod_1 = require("zod");
const regexp_1 = require("../lib/regexp");
exports.UserSummarySchema = zod_1.z.object({
    uid: zod_1.z.string(),
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().regex(regexp_1.NAME_REGEXP),
    lastName: zod_1.z.string().regex(regexp_1.NAME_REGEXP),
    userName: zod_1.z.string().regex(regexp_1.USERNAME_REGEXP),
    image: zod_1.z.string().optional(),
    online: zod_1.z.boolean(),
    gender: zod_1.z.enum(["male", "female", "non-binary", "prefer_not_to_say"]),
});
