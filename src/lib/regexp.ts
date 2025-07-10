export const EMAIL_REGEXP: RegExp = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
export const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const NAME_REGEXP: RegExp = /([a-zA-Z]{2,32}-*)+/;
export const USERNAME_REGEXP = /^(?=.*[\p{L}\d])[\p{L}\d_]{3,32}$/u;