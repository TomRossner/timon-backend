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
exports.deleteTeam = exports.updateTeam = exports.createNewTeam = exports.findTeam = void 0;
const team_model_1 = __importDefault(require("../models/team.model"));
// Needed for populations paths
require("../models/player.model");
require("../models/team.model");
require("../models/user.model");
const USER_SELECT_FIELDS = { __v: 0, password: 0 };
const findTeam = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield team_model_1.default.find(query).select({ __v: 0 });
    if (!teams.length)
        return [];
    const populatedTeams = yield Promise.all(teams.map(team => team_model_1.default
        .findById(team._id)
        .select({ __v: 0 })
        .populate({
        path: 'manager',
        select: USER_SELECT_FIELDS
    })
        .populate({
        path: 'coaches',
        populate: { path: 'user', select: USER_SELECT_FIELDS },
        select: { __v: 0 }
    })
        .populate({
        path: 'roster',
        populate: { path: 'user', select: USER_SELECT_FIELDS },
        select: { __v: 0 }
    })
        .lean()));
    return populatedTeams;
});
exports.findTeam = findTeam;
const createNewTeam = (teamData) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield team_model_1.default.create(teamData)).toObject();
});
exports.createNewTeam = createNewTeam;
const updateTeam = (query, update) => __awaiter(void 0, void 0, void 0, function* () {
    return yield team_model_1.default.findOneAndUpdate(query, update, { new: true }).lean();
});
exports.updateTeam = updateTeam;
const deleteTeam = (teamId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield team_model_1.default.findOneAndDelete({ teamId });
});
exports.deleteTeam = deleteTeam;
