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
exports.Flex = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: 'flex';\n  direction: ", ";\n  justify-content: ", ";\n  align-items: ", ";\n"], ["\n  display: 'flex';\n  direction: ", ";\n  justify-content: ", ";\n  align-items: ", ";\n"])), function (props) { return (props.direction ? props.direction : 'row'); }, function (props) { return props.justify; }, function (props) { return props.align; });
var templateObject_1;
