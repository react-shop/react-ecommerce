"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var Yup = __importStar(require("yup"));
exports.ProductsSchema = Yup.array().of(Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
}));
exports.ProductSchema = Yup.object().shape({
    name: Yup.string().required()
});
