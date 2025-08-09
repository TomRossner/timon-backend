import { z } from "zod";
import { NAME_REGEXP, PASSWORD_REGEXP, USERNAME_REGEXP } from "../lib/regexp";
import { PHONE_NUMBER_MAX_LENGTH, PHONE_NUMBER_MIN_LENGTH } from "../lib/constants";

export const updateUserSchema = z.object({
    body: z.object({
        uid: z.string(),
        email: z
            .string()
            .email(),
        currentPassword: z.string().regex(PASSWORD_REGEXP).optional(),
        newPassword: z.string().regex(PASSWORD_REGEXP).optional(),
        firstName: z
            .string()
            .regex(NAME_REGEXP), // Includes minLength / maxLength
        lastName: z
            .string()
            .regex(NAME_REGEXP), // Includes minLength / maxLength
        userName: z
            .string()
            .regex(USERNAME_REGEXP), // Different than firstName/lastName. Includes minLength / maxLength
        image: z.string().optional().nullable(),
        phoneNumber: z.string().min(PHONE_NUMBER_MIN_LENGTH).max(PHONE_NUMBER_MAX_LENGTH),
        online: z.boolean(),
        gender: z.enum(["male", "female", "non-binary", "prefer_not_to_say"]),
    }),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>['body'];