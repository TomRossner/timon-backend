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
exports.deletePlayerHandler = exports.updatePlayerHandler = exports.createPlayerHandler = exports.getPlayerHandler = void 0;
const players_service_1 = require("../services/players.service");
const httpStatusCodes_1 = __importDefault(require("../lib/httpStatusCodes"));
const arrayToObject_1 = require("../lib/arrayToObject");
const getPlayerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        if (!id) {
            // Return all players
            const players = yield (0, players_service_1.findPlayer)({});
            res
                .status(httpStatusCodes_1.default.SUCCESS)
                .json((0, arrayToObject_1.arrayToObject)(players, (player) => player.user.uid));
            return;
        }
        const player = yield (0, players_service_1.findPlayer)({ user: id });
        if (!player) {
            res
                .status(httpStatusCodes_1.default.NOT_FOUND)
                .json({
                message: `Player ${id} not found.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json((0, arrayToObject_1.arrayToObject)(player, (player) => player.user.uid));
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed finding player(s).`,
        });
    }
});
exports.getPlayerHandler = getPlayerHandler;
const createPlayerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: _id } = req.body;
        const exists = yield (0, players_service_1.findPlayer)({ user: _id });
        console.log(exists);
        if (exists.length) {
            res
                .status(httpStatusCodes_1.default.BAD_REQUEST)
                .json({
                message: `Player ${_id} already exists.`,
            });
            return;
        }
        const newPlayer = yield (0, players_service_1.createNewPlayer)(Object.assign({}, req.body));
        if (!newPlayer) {
            throw new Error(`Failed creating player ${_id}.`);
        }
        res
            .status(httpStatusCodes_1.default.CREATED)
            .json({
            message: `Player ${_id} created successfully.`,
        });
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed creating player ${req.body._id}.`,
        });
    }
});
exports.createPlayerHandler = createPlayerHandler;
const updatePlayerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: _id } = req.params;
        const exists = yield (0, players_service_1.findPlayer)({ user: _id });
        if (!exists) {
            res
                .status(httpStatusCodes_1.default.NOT_FOUND)
                .json({
                message: `Player ${_id} not found.`,
            });
            return;
        }
        const updated = yield (0, players_service_1.updatePlayer)({ user: _id }, req.body);
        if (!updated) {
            res
                .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
                .json({
                message: `Failed updating player ${_id}.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json({
            message: `Player ${_id} updated successfully.`,
        });
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed updating player ${req.body.user.uid}.`,
        });
    }
});
exports.updatePlayerHandler = updatePlayerHandler;
const deletePlayerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: _id } = req.params;
        const exists = yield (0, players_service_1.findPlayer)({ user: _id });
        if (!exists) {
            res
                .status(httpStatusCodes_1.default.NOT_FOUND)
                .json({
                message: `Player ${_id} not found.`,
            });
            return;
        }
        const deleted = yield (0, players_service_1.deletePlayer)(_id);
        if (!deleted) {
            res
                .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
                .json({
                message: `Failed deleting player ${_id}.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json({
            message: `Player ${_id} deleted.`,
        });
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed deleting player ${req.params.playerId}.`,
        });
    }
});
exports.deletePlayerHandler = deletePlayerHandler;
