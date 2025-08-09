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
exports.deleteEvent = exports.updateEvent = exports.createNewEvent = exports.findEvent = void 0;
const event_model_1 = __importDefault(require("../models/event.model"));
const uuid_1 = require("uuid");
const USER_SELECT_FIELDS = { __v: 0, password: 0 };
const findEvent = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield event_model_1.default.find(query);
    if (!events.length)
        return [];
    const populatedEvents = yield Promise.all(events.map((event) => __awaiter(void 0, void 0, void 0, function* () {
        return yield event_model_1.default
            .findById(event._id)
            .select({ __v: 0 })
            .populate({
            path: 'teams',
            populate: [
                { path: 'manager', select: USER_SELECT_FIELDS },
                { path: 'roster', populate: { path: 'user', select: USER_SELECT_FIELDS }, select: { __v: 0 } },
                { path: 'coaches', populate: { path: 'user', select: USER_SELECT_FIELDS }, select: { __v: 0 } }
            ],
            select: { __v: 0 },
        }).populate({
            path: 'createdBy',
            select: USER_SELECT_FIELDS,
        })
            .lean();
    })));
    return populatedEvents;
});
exports.findEvent = findEvent;
const createNewEvent = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield event_model_1.default
        .create(Object.assign(Object.assign({}, eventData), { eventId: (0, uuid_1.v4)() })))
        .toObject();
});
exports.createNewEvent = createNewEvent;
const updateEvent = (query, update) => __awaiter(void 0, void 0, void 0, function* () {
    return yield event_model_1.default.findOneAndUpdate(query, update, { new: true }).lean();
});
exports.updateEvent = updateEvent;
const deleteEvent = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield event_model_1.default.findOneAndDelete({ eventId });
});
exports.deleteEvent = deleteEvent;
