"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var styled_components_1 = __importDefault(require("styled-components"));
var theme_1 = __importDefault(require("../../theme"));
var DefaultButton_1 = __importDefault(require("./DefaultButton"));
var StyledButton = styled_components_1["default"](DefaultButton_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  color: ", ";\n"], ["\n  background-color: ", ";\n  color: ", ";\n"])), function (props) { return (props.secondary ? theme_1["default"].colors.secondary : theme_1["default"].colors.primary); }, function (props) { return (props.secondary ? theme_1["default"].colors.white : theme_1["default"].colors.black); });
exports["default"] = StyledButton;
var templateObject_1;
