"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var enzyme_1 = require("enzyme");
var enzyme_adapter_react_16_1 = __importDefault(require("enzyme-adapter-react-16"));
require("jest-enzyme");
// jest.useFakeTimers();
// /**
//  * Set up DOM in node.js environment for Enzyme to mount to
//  */
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { JSDOM } = require('jsdom');
// const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
// const { window } = jsdom;
// function copyProps(src, target) {
//   Object.defineProperties(target, {
//     ...Object.getOwnPropertyDescriptors(src),
//     ...Object.getOwnPropertyDescriptors(target),
//   });
// }
// jest.useFakeTimers();
// global.window = window;
// global.document = window.document;
// global.navigator = {
//   userAgent: 'node.js',
// };
// copyProps(window, global);
enzyme_1.configure({ adapter: new enzyme_adapter_react_16_1["default"]() });
// const originalConsoleError = console.error;
// console.error = (message, ...args) => !message.startsWith('Warning: ') && originalConsoleError(message, ...args);
