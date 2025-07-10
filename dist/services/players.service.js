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
exports.deletePlayer = exports.updatePlayer = exports.createNewPlayer = exports.findPlayer = void 0;
const player_model_1 = __importDefault(require("../models/player.model"));
// Needed for populations paths
require("../models/player.model");
require("../models/team.model");
require("../models/user.model");
const USER_SELECT_FIELDS = { __v: 0, password: 0 };
const findPlayer = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield player_model_1.default
        .find(query)
        .select({ __v: 0 })
        .populate({ path: 'user', select: USER_SELECT_FIELDS })
        .populate({
        path: 'team',
        populate: [
            { path: 'manager', select: USER_SELECT_FIELDS },
            { path: 'roster', populate: { path: 'user', select: USER_SELECT_FIELDS }, select: { __v: 0 } },
            { path: 'coaches', populate: { path: 'user', select: USER_SELECT_FIELDS }, select: { __v: 0 } }
        ],
        select: { __v: 0 }
    })
        .lean();
    return players;
});
exports.findPlayer = findPlayer;
const createNewPlayer = (playerData) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield player_model_1.default.create(playerData)).toObject();
});
exports.createNewPlayer = createNewPlayer;
const updatePlayer = (query, update) => __awaiter(void 0, void 0, void 0, function* () {
    return yield player_model_1.default.findOneAndUpdate(query, update, { new: true }).lean();
});
exports.updatePlayer = updatePlayer;
const deletePlayer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield player_model_1.default.findOneAndDelete({ user: id });
});
exports.deletePlayer = deletePlayer;
