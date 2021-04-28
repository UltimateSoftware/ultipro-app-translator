"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var dedupe_1 = __importDefault(require("dedupe"));
var index_1 = require("./index");
var file_1 = require("./utils/file");
/*
 * Create multiple .csv files of missing translations (one file per language).
 * Optionally combine similar languages into same file.
 * Returns array of file paths to the .csv files.
 */
function exportToCSV(_a) {
    var _b = _a.langDir, langDir = _b === void 0 ? './' : _b, _c = _a.outputDir, outputDir = _c === void 0 ? './' : _c, _d = _a.combineSimilarLanguages, combineSimilarLanguages = _d === void 0 ? true : _d;
    return __awaiter(this, void 0, void 0, function () {
        var csvDir, lines, files, filePaths, enTokens, _e, _f, error_1, jsonLangFiles, _g, jsonLangFilesNoEn, extractMissingTokenValuesPromises, writeCSVFilePromises;
        var _this = this;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    csvDir = path_1.join(outputDir || '', 'lang-cli-output');
                    lines = ['"language","token","en-US value","translation"'];
                    files = {};
                    filePaths = [];
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, 3, , 4]);
                    _f = (_e = JSON).parse;
                    return [4 /*yield*/, file_1.readFile(path_1.join(langDir, 'en-US.json'), {
                            encoding: 'utf-8',
                        })];
                case 2:
                    enTokens = _f.apply(_e, [_h.sent()]);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _h.sent();
                    console.error(error_1);
                    return [2 /*return*/];
                case 4:
                    _g = dedupe_1.default;
                    return [4 /*yield*/, file_1.getJSONFilesInDir(langDir)];
                case 5:
                    jsonLangFiles = _g.apply(void 0, [_h.sent()]);
                    jsonLangFilesNoEn = jsonLangFiles.filter(function (langTag) { return !langTag.startsWith('en'); });
                    extractMissingTokenValuesPromises = jsonLangFilesNoEn.map(function (jsonLangFile) { return __awaiter(_this, void 0, void 0, function () {
                        var langTag, tokensFromFile, _a, _b, nullValueTokens, fileName;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    langTag = index_1.parseLanguageTagFromFilename(jsonLangFile);
                                    _b = (_a = JSON).parse;
                                    return [4 /*yield*/, file_1.readFile(path_1.join(langDir, jsonLangFile), {
                                            encoding: 'utf-8',
                                        })];
                                case 1:
                                    tokensFromFile = _b.apply(_a, [_c.sent()]);
                                    nullValueTokens = Object.keys(tokensFromFile).filter(function (token) {
                                        var result = false;
                                        if (tokensFromFile[token] === null) {
                                            result = true;
                                            if (!enTokens[token] || enTokens[token].trim() === '') {
                                                console.warn("Skipping " + token + ": Missing translation! Please add English value or unset key.");
                                                result = false;
                                            }
                                        }
                                        return result;
                                    });
                                    fileName = getFileNameForLanguageTag(langTag, combineSimilarLanguages);
                                    if (!files[fileName]) {
                                        console.debug("export#exportToCSV: initializing csv file " + fileName);
                                        files[fileName] = __spreadArrays(lines);
                                    }
                                    files[fileName] = __spreadArrays(files[fileName], nullValueTokens.map(function (token) {
                                        var english = enTokens[token];
                                        english = english.replace(/"/g, '""');
                                        return "\"" + langTag + "\",\"" + token + "\",\"" + english + "\",\"\"";
                                    }));
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(extractMissingTokenValuesPromises)];
                case 6:
                    _h.sent();
                    return [4 /*yield*/, file_1.createDirectoryIfNotExist(csvDir)];
                case 7:
                    _h.sent();
                    writeCSVFilePromises = Object.keys(files).map(function (tag) {
                        var csvFile = path_1.join(csvDir, tag + ".csv");
                        filePaths.push(csvFile);
                        console.info("creating '" + csvFile + "'");
                        return file_1.writeFile(csvFile, files[tag].join('\n'));
                    });
                    return [4 /*yield*/, Promise.all(writeCSVFilePromises)];
                case 8:
                    _h.sent();
                    return [2 /*return*/, filePaths];
            }
        });
    });
}
exports.exportToCSV = exportToCSV;
function getFileNameForLanguageTag(langTag, combineSimilarLanguages) {
    if (combineSimilarLanguages === void 0) { combineSimilarLanguages = true; }
    if (!combineSimilarLanguages) {
        return langTag;
    }
    switch (langTag.trim().toLowerCase()) {
        case 'da':
        case 'da-dk': {
            return 'da+da-DK';
        }
        case 'de':
        case 'de-de': {
            return 'de+de-DE';
        }
        case 'es':
        case 'es-us': {
            return 'es+es-US';
        }
        case 'fil':
        case 'fil-ph': {
            return 'fil+fil-PH';
        }
        case 'fr':
        case 'fr-fr': {
            return 'fr+fr-FR';
        }
        case 'it':
        case 'it-it': {
            return 'it+it-IT';
        }
        case 'ms':
        case 'ms-my': {
            return 'ms+ms-MY';
        }
        case 'nl':
        case 'nl-nl': {
            return 'nl+nl-NL';
        }
        case 'pt':
        case 'pt-br': {
            return 'pt+pt-BR';
        }
        case 'sv':
        case 'sv-se': {
            return 'sv+sv-SE';
        }
        case 'tl':
        case 'tl-ph': {
            return 'tl+tl-PH';
        }
        default: {
            return langTag; // es-MX, es-PR, fr-CA etc.
        }
    }
}
exports.getFileNameForLanguageTag = getFileNameForLanguageTag;
//# sourceMappingURL=export.js.map