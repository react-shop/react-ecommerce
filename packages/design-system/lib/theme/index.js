"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.theme = void 0;
var colors_1 = __importDefault(require("./colors"));
var units_1 = __importDefault(require("./units"));
exports.theme = {
    colors: __assign({}, colors_1["default"]),
    space: __assign({}, units_1["default"].sizes),
    radii: __assign({}, units_1["default"].borderRadius)
};
