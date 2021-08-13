"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./src/config/routes/index.ts":
/*!************************************!*\
  !*** ./src/config/routes/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ROUTES\": () => (/* binding */ ROUTES)\n/* harmony export */ });\nconst mapParameters = base => {\n  return (...args) => {\n    return `/${base}${args.map(parameter => `/${parameter}`)}`;\n  };\n};\n\nconst ROUTES = {\n  PUBLIC: {\n    ROOT: mapParameters(`home`),\n    SIGNIN: mapParameters(`sign-in`)\n  },\n  PRIVATE: {\n    ROOT: mapParameters(`home`)\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29uZmlnL3JvdXRlcy9pbmRleC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBRUEsTUFBTUEsYUFBYSxHQUFJQyxJQUFELElBQXlCO0FBQzdDLFNBQU8sQ0FBQyxHQUFHQyxJQUFKLEtBQXVCO0FBQzVCLFdBQVEsSUFBR0QsSUFBSyxHQUFFQyxJQUFJLENBQUNDLEdBQUwsQ0FBVUMsU0FBRCxJQUFnQixJQUFHQSxTQUFVLEVBQXRDLENBQXlDLEVBQTNEO0FBQ0QsR0FGRDtBQUdELENBSkQ7O0FBTU8sTUFBTUMsTUFBYyxHQUFHO0FBQzVCQyxFQUFBQSxNQUFNLEVBQUU7QUFDTkMsSUFBQUEsSUFBSSxFQUFFUCxhQUFhLENBQUUsTUFBRixDQURiO0FBRU5RLElBQUFBLE1BQU0sRUFBRVIsYUFBYSxDQUFFLFNBQUY7QUFGZixHQURvQjtBQUs1QlMsRUFBQUEsT0FBTyxFQUFFO0FBQ1BGLElBQUFBLElBQUksRUFBRVAsYUFBYSxDQUFFLE1BQUY7QUFEWjtBQUxtQixDQUF2QiIsInNvdXJjZXMiOlsid2VicGFjazovL0ByZWFjdC1zaG9wL3Nzci8uL3NyYy9jb25maWcvcm91dGVzL2luZGV4LnRzP2I5NjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUsIFJvdXRlcyB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBtYXBQYXJhbWV0ZXJzID0gKGJhc2U6IHN0cmluZyk6IFJvdXRlID0+IHtcbiAgcmV0dXJuICguLi5hcmdzOiBzdHJpbmdbXSkgPT4ge1xuICAgIHJldHVybiBgLyR7YmFzZX0ke2FyZ3MubWFwKChwYXJhbWV0ZXIpID0+IGAvJHtwYXJhbWV0ZXJ9YCl9YDtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBST1VURVM6IFJvdXRlcyA9IHtcbiAgUFVCTElDOiB7XG4gICAgUk9PVDogbWFwUGFyYW1ldGVycyhgaG9tZWApLFxuICAgIFNJR05JTjogbWFwUGFyYW1ldGVycyhgc2lnbi1pbmApLFxuICB9LFxuICBQUklWQVRFOiB7XG4gICAgUk9PVDogbWFwUGFyYW1ldGVycyhgaG9tZWApLFxuICB9LFxufTtcbiJdLCJuYW1lcyI6WyJtYXBQYXJhbWV0ZXJzIiwiYmFzZSIsImFyZ3MiLCJtYXAiLCJwYXJhbWV0ZXIiLCJST1VURVMiLCJQVUJMSUMiLCJST09UIiwiU0lHTklOIiwiUFJJVkFURSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/config/routes/index.ts\n");

/***/ }),

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/routes */ \"./src/config/routes/index.ts\");\n\n\nconst Index = () => {\n  return null;\n};\n\nconst getServerSideProps = async context => {\n  return {\n    redirect: {\n      destination: _config_routes__WEBPACK_IMPORTED_MODULE_0__.ROUTES.PRIVATE.ROOT(),\n      permanent: false\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Index);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvaW5kZXgudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOztBQUVBLE1BQU1DLEtBQUssR0FBRyxNQUFNO0FBQ2xCLFNBQU8sSUFBUDtBQUNELENBRkQ7O0FBSU8sTUFBTUMsa0JBQXNDLEdBQUcsTUFBT0MsT0FBUCxJQUFtQjtBQUN2RSxTQUFPO0FBQ0xDLElBQUFBLFFBQVEsRUFBRTtBQUNSQyxNQUFBQSxXQUFXLEVBQUVMLCtEQUFBLEVBREw7QUFFUlEsTUFBQUEsU0FBUyxFQUFFO0FBRkg7QUFETCxHQUFQO0FBTUQsQ0FQTTtBQVNQLGlFQUFlUCxLQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQHJlYWN0LXNob3Avc3NyLy4vc3JjL3BhZ2VzL2luZGV4LnRzeD80MWUwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdldFNlcnZlclNpZGVQcm9wcyB9IGZyb20gJ25leHQnO1xuXG5pbXBvcnQgeyBST1VURVMgfSBmcm9tICdAY29uZmlnL3JvdXRlcyc7XG5cbmNvbnN0IEluZGV4ID0gKCkgPT4ge1xuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTZXJ2ZXJTaWRlUHJvcHM6IEdldFNlcnZlclNpZGVQcm9wcyA9IGFzeW5jIChjb250ZXh0KSA9PiB7XG4gIHJldHVybiB7XG4gICAgcmVkaXJlY3Q6IHtcbiAgICAgIGRlc3RpbmF0aW9uOiBST1VURVMuUFJJVkFURS5ST09UKCksXG4gICAgICBwZXJtYW5lbnQ6IGZhbHNlLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmRleDtcbiJdLCJuYW1lcyI6WyJST1VURVMiLCJJbmRleCIsImdldFNlcnZlclNpZGVQcm9wcyIsImNvbnRleHQiLCJyZWRpcmVjdCIsImRlc3RpbmF0aW9uIiwiUFJJVkFURSIsIlJPT1QiLCJwZXJtYW5lbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/index.tsx"));
module.exports = __webpack_exports__;

})();