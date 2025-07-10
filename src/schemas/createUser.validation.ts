import { z } from "zod";
import { NAME_REGEXP, USERNAME_REGEXP } from "../lib/regexp";
import { PHONE_NUMBER_MAX_LENGTH, PHONE_NUMBER_MIN_LENGTH } from "../lib/constants";

export const createUserSchema = z.object({
    body: z.object({
        email: z
            .string()
            .email(),
        firstName: z
            .string()
            .regex(NAME_REGEXP), // Includes minLength / maxLength
        lastName: z
            .string()
            .regex(NAME_REGEXP), // Includes minLength / maxLength
        userName: z
            .string()
            .regex(USERNAME_REGEXP), // Different than firstName/lastName. Includes minLength / maxLength
        image: z.string().optional(),
        phoneNumber: z.number().min(PHONE_NUMBER_MIN_LENGTH).max(PHONE_NUMBER_MAX_LENGTH),
        online: z.boolean(),
        gender: z.enum(["male", "female", "non-binary", "prefer_not_to_say"]),
    }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];