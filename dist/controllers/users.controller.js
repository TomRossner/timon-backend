"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserHandler = exports.deleteUserHandler = exports.createUserHandler = exports.getUserHandler = exports.createMockUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("../lib/constants");
const httpStatusCodes_1 = __importDefault(require("../lib/httpStatusCodes"));
const users_service_1 = require("../services/users.service");
const arrayToObject_1 = require("../lib/arrayToObject");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const createMockUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path_1.default.join(__dirname, '../database/users.json');
        const data = yield promises_1.default.readFile(filePath, { encoding: 'utf-8' });
        const users = JSON.parse(data);
        const results = yield Promise.allSettled(users.map((u) => (0, users_service_1.createNewUser)(u)));
        const failed = results.filter(r => r.status === 'rejected');
        const succeeded = results.filter(r => r.status === 'fulfilled');
        res.status(httpStatusCodes_1.default.SUCCESS).json({
            message: `Created ${succeeded.length} users, ${failed.length} failed.`,
            errors: failed.map((f, i) => ({
                user: users[i],
                reason: f.reason instanceof Error ? f.reason.message : f.reason
            }))
        });
    }
    catch (error) {
        console.error(error);
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed creating mock user(s).`,
        });
    }
});
exports.createMockUsers = createMockUsers;
const getUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.query;
        if (!uid) {
            // Return all users
            const users = yield (0, users_service_1.findUser)({}, { stripPassword: true });
            res
                .status(httpStatusCodes_1.default.SUCCESS)
                .json(Array.isArray(users) ? (0, arrayToObject_1.arrayToObject)(users, user => user.uid) : users);
            return;
        }
        const user = yield (0, users_service_1.findUser)({ uid }, { stripPassword: true });
        if (!user) {
            res
                .status(httpStatusCodes_1.default.NOT_FOUND)
                .json({
                message: `User ${uid} not found.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json((0, arrayToObject_1.arrayToObject)(user, user => user.uid));
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed finding user(s).`,
        });
    }
});
exports.getUserHandler = getUserHandler;
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res
                .status(httpStatusCodes_1.default.BAD_REQUEST)
                .json({
                message: "Email and password are required."
            });
            return;
        }
        const exists = yield (0, users_service_1.findUser)({ email });
        if (exists.length) {
            res
                .status(httpStatusCodes_1.default.BAD_REQUEST)
                .json({
                message: `User ${email} is already registered.`
            });
            return;
        }
        const newUser = yield (0, users_service_1.createNewUser)(req.body);
        if (!newUser) {
            throw new Error(`Failed creating user ${email}.`);
        }
        res
            .status(httpStatusCodes_1.default.CREATED)
            .json({
            message: `User ${email} created successfully.`
        });
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed creating user ${req.body.email}.`,
        });
    }
});
exports.createUserHandler = createUserHandler;
const deleteUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const exists = yield (0, users_service_1.findUser)({ uid });
        if (!exists) {
            res
                .status(httpStatusCodes_1.default.NOT_FOUND)
                .json({
                message: `User ${uid} not found.`,
            });
            return;
        }
        const deleted = yield (0, users_service_1.deleteUser)(uid);
        if (!deleted) {
            res
                .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
                .json({
                message: `Failed deleting user ${uid}.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json({
            message: `User ${uid} deleted.`,
        });
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed deleting user ${req.params.uid}.`,
        });
    }
});
exports.deleteUserHandler = deleteUserHandler;
const updateUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { email, currentPassword, newPassword } = _a, rest = __rest(_a, ["email", "currentPassword", "newPassword"]);
        const { uid } = req.params;
        const user = yield (0, users_service_1.findUser)({ uid });
        if (!user) {
            res.status(httpStatusCodes_1.default.NOT_FOUND).json({
                message: `User ${email} not found.`,
            });
            return;
        }
        const updatePayload = Object.assign({}, rest);
        if (newPassword) {
            if (!currentPassword) {
                res
                    .status(httpStatusCodes_1.default.BAD_REQUEST)
                    .json({
                    message: "Current password is required to set a new password.",
                });
                return;
            }
            const passwordMatches = yield bcrypt_1.default.compare(currentPassword, user[0].password);
            if (!passwordMatches) {
                res
                    .status(httpStatusCodes_1.default.UNAUTHORIZED)
                    .json({
                    message: "Current password is incorrect.",
                });
                return;
            }
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, constants_1.HASH_ROUNDS);
            updatePayload.password = hashedPassword;
        }
        const updated = yield (0, users_service_1.updateUser)({ uid }, updatePayload);
        if (!updated) {
            res
                .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
                .json({
                message: `Failed updating user ${email}.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json({
            message: `User ${email} updated successfully.`,
        });
    }
    catch (error) {
        res.status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR).json({
            message: error instanceof Error
                ? error.message
                : `Failed updating user ${req.body.email}.`,
        });
    }
});
exports.updateUserHandler = updateUserHandler;
