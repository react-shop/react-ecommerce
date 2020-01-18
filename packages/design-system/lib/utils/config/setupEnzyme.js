"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var enzyme_1 = require("enzyme");
var enzyme_adapter_react_16_1 = __importDefault(require("enzyme-adapter-react-16"));
require("jest-enzyme");
enzyme_1.configure({ adapter: new enzyme_adapter_react_16_1["default"]() });
