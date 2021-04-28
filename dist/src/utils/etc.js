"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var csv_parse_1 = __importDefault(require("csv-parse"));
exports.spacingFormat = '  ';
// allow: alphanumeric, underscore, hyphen and period
var ValidTokenName = /^\w+((\.\w+)|(-\w+))*$/;
function tokensAreValid(tokens) {
    return tokens.every(function (token) { return !!token.match(ValidTokenName); });
}
exports.tokensAreValid = tokensAreValid;
/**
 * Replace single quote apostrophe with right apostrophe. Single quote apostrophe has the potential to cause issues with the angular parser.
 * @param tokenValueMap
 */
function sanitizeValues(tokenValueMap) {
    var result = __assign({}, tokenValueMap);
    Object.keys(result).forEach(function (token) {
        result[token] = result[token] ? result[token].replace(/'/g, '’') : result[token];
    });
    return result;
}
exports.sanitizeValues = sanitizeValues;
function sortKeys(obj) {
    var result = {};
    Object.keys(obj)
        .sort()
        .forEach(function (key) { return (result[key] = obj[key]); });
    return result;
}
exports.sortKeys = sortKeys;
function csvParse(input, options) {
    return new Promise(function (resolve, reject) {
        csv_parse_1.default(input, options, function (err, output) {
            if (err) {
                reject(err);
            }
            else {
                resolve(output);
            }
        });
    });
}
exports.csvParse = csvParse;
//# sourceMappingURL=etc.js.map