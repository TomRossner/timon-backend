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
exports.deleteEventHandler = exports.updateEventHandler = exports.createEventHandler = exports.getEventHandler = void 0;
const events_service_1 = require("../services/events.service");
const httpStatusCodes_1 = __importDefault(require("../lib/httpStatusCodes"));
const arrayToObject_1 = require("../lib/arrayToObject");
const uuid_1 = require("uuid");
const getEventHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.query;
        if (!eventId) {
            // Return all events
            const events = yield (0, events_service_1.findEvent)({});
            res
                .status(httpStatusCodes_1.default.SUCCESS)
                .json((0, arrayToObject_1.arrayToObject)(events, event => event.eventId));
            return;
        }
        const event = yield (0, events_service_1.findEvent)({ eventId });
        if (!event.length) {
            res
                .status(httpStatusCodes_1.default.NOT_FOUND)
                .json({
                message: `Event ${eventId} not found.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json((0, arrayToObject_1.arrayToObject)(event, event => event.eventId));
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed finding event(s).`,
        });
    }
});
exports.getEventHandler = getEventHandler;
const createEventHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const title = (_a = req.body.title) === null || _a === void 0 ? void 0 : _a.trim();
        const exists = yield (0, events_service_1.findEvent)({ title });
        if (exists.length) {
            res
                .status(httpStatusCodes_1.default.BAD_REQUEST)
                .json({
                message: `Event ${title} already exists.`,
            });
            return;
        }
        const newEvent = yield (0, events_service_1.createNewEvent)(Object.assign(Object.assign({}, req.body), { eventId: (0, uuid_1.v4)() }));
        if (!newEvent) {
            throw new Error(`Failed creating event ${title}.`);
        }
        res
            .status(httpStatusCodes_1.default.CREATED)
            .json({
            message: `Event ${title} created successfully.`,
        });
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed creating event ${req.body.title}.`,
        });
    }
});
exports.createEventHandler = createEventHandler;
const updateEventHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const exists = yield (0, events_service_1.findEvent)({ eventId });
        if (!exists) {
            res
                .status(httpStatusCodes_1.default.NOT_FOUND)
                .json({
                message: `Event ${eventId} not found.`,
            });
            return;
        }
        const updated = yield (0, events_service_1.updateEvent)({ eventId }, req.body);
        if (!updated) {
            res
                .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
                .json({
                message: `Failed updating event ${eventId}.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json({
            message: `Event ${updated.title} updated successfully.`,
        });
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed updating event ${req.body.title}.`,
        });
    }
});
exports.updateEventHandler = updateEventHandler;
const deleteEventHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const exists = yield (0, events_service_1.findEvent)({ eventId });
        if (!exists) {
            res
                .status(httpStatusCodes_1.default.NOT_FOUND)
                .json({
                message: `Event ${eventId} not found.`,
            });
            return;
        }
        const deleted = yield (0, events_service_1.deleteEvent)(eventId);
        if (!deleted) {
            res
                .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
                .json({
                message: `Failed deleting event ${eventId}.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json({
            message: `Event ${eventId} deleted.`,
        });
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed deleting event ${req.params.eventId}.`,
        });
    }
});
exports.deleteEventHandler = deleteEventHandler;
