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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeamHandler = exports.updateTeamHandler = exports.createTeamHandler = exports.getTeamHandler = void 0;
const teams_service_1 = require("../services/teams.service");
const httpStatusCodes_1 = __importDefault(require("../lib/httpStatusCodes"));
const uuid_1 = require("uuid");
const arrayToObject_1 = require("../lib/arrayToObject");
const getTeamHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, id } = req.query;
        if (!name && !id) {
            // Return all teams
            const teams = yield (0, teams_service_1.findTeam)({});
            res
                .status(httpStatusCodes_1.default.SUCCESS)
                .json((0, arrayToObject_1.arrayToObject)(teams, team => team.name));
            return;
        }
        if (name) {
            const REGEX_SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/g;
            const escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS, '\\$&');
            const team = yield (0, teams_service_1.findTeam)({
                name: { $regex: `^${escapeRegex(name.toString())}$`, $options: 'i' },
            });
            if (!team.length) {
                res
                    .status(httpStatusCodes_1.default.NOT_FOUND)
                    .json({
                    message: `Team ${name} not found.`,
                });
                return;
            }
            res
                .status(httpStatusCodes_1.default.SUCCESS)
                .json((0, arrayToObject_1.arrayToObject)(team, team => team.name));
            return;
        }
        const team = yield (0, teams_service_1.findTeam)({ teamId: id });
        if (!team.length) {
            res
                .status(httpStatusCodes_1.default.NOT_FOUND)
                .json({
                message: `Team ${id} not found.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json((0, arrayToObject_1.arrayToObject)(team, team => team.name));
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed finding team(s).`,
        });
    }
});
exports.getTeamHandler = getTeamHandler;
const createTeamHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const exists = yield (0, teams_service_1.findTeam)({ name });
        if (exists.length) {
            res
                .status(httpStatusCodes_1.default.BAD_REQUEST)
                .json({
                message: `Team ${name} already exists.`,
            });
            return;
        }
        const newTeam = yield (0, teams_service_1.createNewTeam)(Object.assign(Object.assign({}, req.body), { teamId: (0, uuid_1.v4)() }));
        if (!newTeam) {
            throw new Error(`Failed creating team ${name}.`);
        }
        res
            .status(httpStatusCodes_1.default.CREATED)
            .json({
            message: `Team ${name} created successfully.`,
        });
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed creating team ${req.body.name}.`,
        });
    }
});
exports.createTeamHandler = createTeamHandler;
const updateTeamHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId } = req.params;
        const exists = yield (0, teams_service_1.findTeam)({ teamId });
        if (!exists) {
            res
                .status(httpStatusCodes_1.default.NOT_FOUND)
                .json({
                message: `Team ${teamId} not found.`,
            });
            return;
        }
        const updated = yield (0, teams_service_1.updateTeam)({ teamId }, req.body);
        if (!updated) {
            res
                .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
                .json({
                message: `Failed updating team ${teamId}.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json({
            message: `Team ${updated.name} updated successfully.`,
        });
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed updating team ${req.body.teamId}.`,
        });
    }
});
exports.updateTeamHandler = updateTeamHandler;
const deleteTeamHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId } = req.params;
        const exists = yield (0, teams_service_1.findTeam)({ teamId });
        if (!exists) {
            res
                .status(httpStatusCodes_1.default.NOT_FOUND)
                .json({
                message: `Team ${teamId} not found.`,
            });
            return;
        }
        const deleted = yield (0, teams_service_1.deleteTeam)(teamId);
        if (!deleted) {
            res
                .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
                .json({
                message: `Failed deleting team ${teamId}.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json({
            message: `Team ${teamId} deleted.`,
        });
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed deleting team ${req.params.teamId}.`,
        });
    }
});
exports.deleteTeamHandler = deleteTeamHandler;
