"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayToObject = void 0;
const arrayToObject = (arr, keyFn) => {
    return Object.fromEntries(arr.map(item => [keyFn(item), item]));
};
exports.arrayToObject = arrayToObject;
