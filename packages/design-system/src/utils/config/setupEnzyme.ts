import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

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

configure({ adapter: new EnzymeAdapter() });

// const originalConsoleError = console.error;
// console.error = (message, ...args) => !message.startsWith('Warning: ') && originalConsoleError(message, ...args);
