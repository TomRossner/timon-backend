"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCredentialsSchema = void 0;
const zod_1 = require("zod");
const regexp_1 = require("../lib/regexp");
const constants_1 = require("../lib/constants");
const errorMessages_1 = require("../lib/errorMessages");
exports.authCredentialsSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email(errorMessages_1.ERROR_MESSAGES.INVALID_CREDENTIALS),
        password: zod_1.z
            .string()
            .regex(regexp_1.PASSWORD_REGEXP, errorMessages_1.ERROR_MESSAGES.INVALID_CREDENTIALS) // Includes minLength
            .max(constants_1.PASSWORD_MAX_LENGTH, errorMessages_1.ERROR_MESSAGES.INVALID_CREDENTIALS)
    }),
});
