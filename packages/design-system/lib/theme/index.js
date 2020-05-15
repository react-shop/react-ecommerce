"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var colors_1 = __importDefault(require("./colors"));
var units_1 = __importDefault(require("./units"));
exports.theme = {
    colors: {
        primary: colors_1["default"].primary,
        secondary: colors_1["default"].secondary,
        primaryDark: colors_1["default"].primaryDark,
        error: colors_1["default"].error,
        black: colors_1["default"].black,
        blackNormal: colors_1["default"].blackNormal,
        blackDark: colors_1["default"].blackDark,
        blackLight: colors_1["default"].blackLight,
        white: colors_1["default"].white,
        gray: colors_1["default"].gray
    },
    space: {
        spacing1: units_1["default"].sizes.spacing1,
        spacing2: units_1["default"].sizes.spacing2,
        spacing4: units_1["default"].sizes.spacing4,
        spacing8: units_1["default"].sizes.spacing8,
        spacing10: units_1["default"].sizes.spacing10,
        spacing12: units_1["default"].sizes.spacing12,
        spacing16: units_1["default"].sizes.spacing16,
        spacing18: units_1["default"].sizes.spacing18,
        spacing20: units_1["default"].sizes.spacing20,
        spacing24: units_1["default"].sizes.spacing24,
        spacing32: units_1["default"].sizes.spacing32
    },
    radii: {
        xsmall: units_1["default"].borderRadius.xsmall,
        small: units_1["default"].borderRadius.small,
        medium: units_1["default"].borderRadius.medium,
        large: units_1["default"].borderRadius.large,
        full: units_1["default"].borderRadius.full
    }
};
