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
const findEvent = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield event_model_1.default.find(query).select({ __v: 0 });
    return events;
});
exports.findEvent = findEvent;
const createNewEvent = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield event_model_1.default.create(eventData)).toObject();
});
exports.createNewEvent = createNewEvent;
const updateEvent = (query, update) => __awaiter(void 0, void 0, void 0, function* () {
    return yield event_model_1.default.findOneAndUpdate(query, update, { new: true }).lean();
});
exports.updateEvent = updateEvent;
const deleteEvent = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield event_model_1.default.findOneAndDelete({ name });
});
exports.deleteEvent = deleteEvent;
