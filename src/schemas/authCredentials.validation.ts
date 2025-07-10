import { z } from "zod";
import { PASSWORD_REGEXP } from "../lib/regexp";
import { PASSWORD_MAX_LENGTH } from "../lib/constants";
import { ERROR_MESSAGES } from "../lib/errorMessages";

export const credentialsSchema = z.object({
    body: z.object({
        email: z
            .string()
            .email(ERROR_MESSAGES.INVALID_CREDENTIALS),
        password: z
            .string()
            .regex(PASSWORD_REGEXP, ERROR_MESSAGES.INVALID_CREDENTIALS) // Includes minLength
            .max(PASSWORD_MAX_LENGTH, ERROR_MESSAGES.INVALID_CREDENTIALS)
    }),
});

export type CredentialsInput = z.infer<typeof credentialsSchema>['body'];