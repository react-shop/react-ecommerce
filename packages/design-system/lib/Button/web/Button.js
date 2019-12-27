"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var ContainerBtn = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 10px 15px;\n  border-radius: 5px;\n  background-color: red;\n  color: #fff;\n"], ["\n  padding: 10px 15px;\n  border-radius: 5px;\n  background-color: red;\n  color: #fff;\n"])));
exports.DefaultButton = function (_a) {
    var children = _a.children;
    return react_1["default"].createElement(ContainerBtn, null, children);
};
var templateObject_1;
