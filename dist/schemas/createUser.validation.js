"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
const regexp_1 = require("../lib/regexp");
const constants_1 = require("../lib/constants");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email(),
        firstName: zod_1.z
            .string()
            .regex(regexp_1.NAME_REGEXP), // Includes minLength / maxLength
        lastName: zod_1.z
            .string()
            .regex(regexp_1.NAME_REGEXP), // Includes minLength / maxLength
        userName: zod_1.z
            .string()
            .regex(regexp_1.USERNAME_REGEXP), // Different than firstName/lastName. Includes minLength / maxLength
        image: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.number().min(constants_1.PHONE_NUMBER_MIN_LENGTH).max(constants_1.PHONE_NUMBER_MAX_LENGTH),
        online: zod_1.z.boolean(),
        gender: zod_1.z.enum(["male", "female", "non-binary", "prefer_not_to_say"]),
    }),
});
