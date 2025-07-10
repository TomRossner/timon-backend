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
exports.deleteUser = exports.updateUser = exports.createNewUser = exports.findUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const player_model_1 = __importDefault(require("../models/player.model"));
const team_model_1 = __importDefault(require("../models/team.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("../lib/constants");
const uuid_1 = require("uuid");
const findUser = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default
        .find(query)
        .select((options === null || options === void 0 ? void 0 : options.stripPassword)
        ? { __v: 0, password: 0 }
        : { __v: 0 })
        .lean();
    return users;
});
exports.findUser = findUser;
const createNewUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, constants_1.HASH_ROUNDS);
    return (yield user_model_1.default.create(Object.assign(Object.assign({}, userData), { uid: (0, uuid_1.v4)(), password: hashedPassword }))).toObject();
});
exports.createNewUser = createNewUser;
const updateUser = (query, update) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOneAndUpdate(query, update, { new: true }).lean();
});
exports.updateUser = updateUser;
const deleteUser = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    // Delete the user
    const deletedUser = yield user_model_1.default.findOneAndDelete({ uid });
    if (!deletedUser)
        return null;
    // Delete the Player associated with this user
    const deletedPlayer = yield player_model_1.default.findOneAndDelete({ user: deletedUser._id });
    if (deletedPlayer) {
        // Remove player from team's roster
        yield team_model_1.default.updateOne({ _id: deletedPlayer.team }, { $pull: { roster: deletedPlayer._id } });
    }
    return deletedUser;
});
exports.deleteUser = deleteUser;
