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
var DefaultButton_1 = __importDefault(require("./DefaultButton"));
var OutlinedButton = styled_components_1["default"](DefaultButton_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: 1px solid ", ";\n  color: ", ";\n  font-weight: ", ";\n  background-color: transparent;\n\n  &:hover {\n    background-color: ", ";\n    color: ", ";\n  }\n"], ["\n  border: 1px solid ", ";\n  color: ", ";\n  font-weight: ", ";\n  background-color: transparent;\n\n  &:hover {\n    background-color: ", ";\n    color: ", ";\n  }\n"])), function (_a) {
    var secondary = _a.secondary, theme = _a.theme;
    return (secondary ? theme.colors.secondary : theme.colors.primary);
}, function (_a) {
    var secondary = _a.secondary, theme = _a.theme;
    return (secondary ? theme.colors.secondary : theme.colors.primary);
}, theme.fonts.weight.semiBold, function (_a) {
    var secondary = _a.secondary, theme = _a.theme;
    return (secondary ? theme.colors.secondary : theme.colors.primary);
}, function (_a) {
    var secondary = _a.secondary, theme = _a.theme;
    return (secondary ? theme.colors.white : theme.colors.black);
});
exports["default"] = OutlinedButton;
var templateObject_1;
