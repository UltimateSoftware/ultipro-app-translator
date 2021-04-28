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
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var file_1 = require("./utils/file");
var etc_1 = require("./utils/etc");
var CSV_INDEX = {
    DOMAIN: 0,
    LANG: 1,
    TOKEN: 2,
    TRANSLATION: 4,
};
function getColumnIndex(index, hasDomainColumn) {
    return hasDomainColumn ? index : index - 1;
}
/**
 * Imports contents of a CSV File into respective JSON Lang files located in the specified langDir.
 * @param csvPath
 * @param langDir
 */
function importCSV(csvPath, langDir, domain) {
    return __awaiter(this, void 0, void 0, function () {
        var tokensByLang, data, lines, i, line, hasDomainColumn, lang, translationsPath, langFileContents, tokensFromLangFile, token, translationIndex, writeToFilesPromises;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tokensByLang = {};
                    if (!csvPath) {
                        throw new Error('Did not provide a csvPath!');
                    }
                    if (!langDir) {
                        throw new Error('Did not specify a langDir!');
                    }
                    console.debug("consume#csv: consuming " + csvPath);
                    return [4 /*yield*/, file_1.readFile(csvPath, { encoding: 'utf-8' })];
                case 1:
                    data = _a.sent();
                    return [4 /*yield*/, etc_1.csvParse(data, { from: 2 })];
                case 2:
                    lines = _a.sent();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < lines.length)) return [3 /*break*/, 7];
                    line = lines[i];
                    hasDomainColumn = !!lines[4];
                    lang = line[getColumnIndex(CSV_INDEX.LANG, hasDomainColumn)];
                    translationsPath = path_1.join(langDir, lang + ".json");
                    if (hasDomainColumn && domain && line[getColumnIndex(CSV_INDEX.DOMAIN, hasDomainColumn)].toUpperCase() !== domain.toUpperCase()) {
                        // If we are filtering the import by a domain like COMMON and this line isn't in that
                        // domain then we skip it explicitly. If the token happens to exist and we don't filter
                        // by domain then it is technically possible to have tokens be imported across domains.
                        return [3 /*break*/, 6];
                    }
                    if (!!tokensByLang[lang]) return [3 /*break*/, 5];
                    console.debug("consume#csv: reading " + translationsPath);
                    return [4 /*yield*/, file_1.readFile(translationsPath, {
                            encoding: 'utf-8',
                        })];
                case 4:
                    langFileContents = _a.sent();
                    tokensFromLangFile = JSON.parse(langFileContents);
                    tokensByLang[lang] = tokensFromLangFile;
                    _a.label = 5;
                case 5:
                    token = line[getColumnIndex(CSV_INDEX.TOKEN, hasDomainColumn)];
                    translationIndex = getColumnIndex(CSV_INDEX.TRANSLATION, hasDomainColumn);
                    tokensByLang[lang][token] = line[translationIndex] ? line[translationIndex].replace(/'/g, '’') : null;
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 3];
                case 7:
                    writeToFilesPromises = Object.keys(tokensByLang).map(function (langTag) { return __awaiter(_this, void 0, void 0, function () {
                        var translationsPath;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    tokensByLang[langTag] = etc_1.sortKeys(tokensByLang[langTag]);
                                    translationsPath = path_1.join(langDir, langTag + ".json");
                                    console.debug("consume#csv: writing " + translationsPath);
                                    return [4 /*yield*/, file_1.writeFile(translationsPath, JSON.stringify(tokensByLang[langTag], null, etc_1.spacingFormat), {
                                            encoding: 'utf-8',
                                        })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(writeToFilesPromises)];
                case 8: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.importCSV = importCSV;
function importCSVFilesFromDir(csvDir, langDir, domain) {
    return __awaiter(this, void 0, void 0, function () {
        var csvFiles, i, csvFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!csvDir) {
                        throw new Error('CSV Directory not specified!');
                    }
                    return [4 /*yield*/, file_1.getCSVFilesInDir(csvDir)];
                case 1:
                    csvFiles = _a.sent();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < csvFiles.length)) return [3 /*break*/, 5];
                    csvFile = csvFiles[i];
                    return [4 /*yield*/, importCSV(path_1.join(csvDir, csvFile), langDir, domain)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.importCSVFilesFromDir = importCSVFilesFromDir;
//# sourceMappingURL=import.js.map