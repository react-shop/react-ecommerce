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
var DefaultButton = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 15px 55px;\n  border-radius: 6px;\n  width: ", ";\n  text-align: center;\n  font-family: proxima-nova, sans-serif;\n  font-size: ", ";\n  cursor: pointer;\n\n  &:hover {\n    box-shadow: ", ";\n    opacity: ", "\n  }\n"], ["\n  padding: 15px 55px;\n  border-radius: 6px;\n  width: ", ";\n  text-align: center;\n  font-family: proxima-nova, sans-serif;\n  font-size: ", ";\n  cursor: pointer;\n\n  &:hover {\n    box-shadow: ", ";\n    opacity: ", "\n  }\n"])), function (props) { return (props.full ? '100%' : 'auto'); }, theme_1["default"].fonts.sizes.body, function (props) { return (props.secondary ? 'none' : '0px 11px 16px rgba(40, 245, 190, 0.2)'); }, function (props) { return (props.secondary ? 0.8 : 1); });
exports["default"] = DefaultButton;
var templateObject_1;
