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
var child_process_1 = require("child_process");
var file_1 = require("./utils/file");
var etc_1 = require("./utils/etc");
/**
 * Given an Token-Value Map, commit the tokens and their respective value to the specified Lang File.
 * @param tokenValueMap
 * @param langFilePath
 */
function setTokensForFile(tokenValueMap, langFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        var langJson, translations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, file_1.readFile(langFilePath, { encoding: 'utf-8' })];
                case 1:
                    langJson = _a.sent();
                    translations = JSON.parse(langJson);
                    if (!etc_1.tokensAreValid(Object.keys(tokenValueMap))) {
                        throw new Error("Invalid token(s) specified. The token name may only contain letters, numbers, and underscores.");
                    }
                    tokenValueMap = etc_1.sanitizeValues(tokenValueMap);
                    translations = __assign(__assign({}, translations), tokenValueMap);
                    return [4 /*yield*/, file_1.writeFile(langFilePath, JSON.stringify(etc_1.sortKeys(translations), null, etc_1.spacingFormat), { encoding: 'utf-8' })];
                case 2:
                    _a.sent();
                    Object.keys(tokenValueMap).forEach(function (tokenAdded) {
                        console.log("set#key: { " + tokenAdded + ": " + tokenValueMap[tokenAdded] + " } written to " + langFilePath);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.setTokensForFile = setTokensForFile;
function setTokenForFile(token, value, langFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            value = value || '';
            return [2 /*return*/, setTokensForFile((_a = {}, _a[token] = value, _a), langFilePath)];
        });
    });
}
exports.setTokenForFile = setTokenForFile;
function parseLanguageTagFromFilename(fileName) {
    var match = fileName.match(file_1.extractTag);
    if (match) {
        var _ = match[0], lang = match[1];
        return lang ? lang : '';
    }
    return '';
}
exports.parseLanguageTagFromFilename = parseLanguageTagFromFilename;
/**
 * Sets Tokens for all lang files located in langDir.
 * @param tokenValueMap
 * @param langDir
 */
function setTokensForLangs(tokenValueMap, langDir) {
    return __awaiter(this, void 0, void 0, function () {
        var availableLangFilesInDir, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, file_1.getJSONFilesInDir(langDir)];
                case 1:
                    availableLangFilesInDir = _a.sent();
                    _loop_1 = function (i) {
                        var langFile, filePath, fileContents, tokensFromLangFile, tokensToWrite, langTag, isLangTagEnPrefixed, tokensToAdd;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    langFile = availableLangFilesInDir[i];
                                    filePath = path_1.join(langDir, langFile);
                                    return [4 /*yield*/, file_1.readFile(filePath, { encoding: 'utf-8' })];
                                case 1:
                                    fileContents = _a.sent();
                                    tokensFromLangFile = JSON.parse(fileContents);
                                    tokensToWrite = __assign({}, tokensFromLangFile);
                                    langTag = parseLanguageTagFromFilename(langFile);
                                    isLangTagEnPrefixed = langTag.startsWith('en');
                                    tokensToAdd = Object.keys(tokenValueMap);
                                    tokensToAdd.forEach(function (token) {
                                        var value = tokenValueMap[token];
                                        // Write null values for other langTags to create Token keys
                                        tokensToWrite[token] = isLangTagEnPrefixed ? value : null;
                                    });
                                    tokensToWrite = etc_1.sortKeys(tokensToWrite);
                                    return [4 /*yield*/, file_1.writeFile(filePath, JSON.stringify(tokensToWrite, null, etc_1.spacingFormat))];
                                case 2:
                                    _a.sent();
                                    console.info("set#keys: [" + tokensToAdd.join(',') + "] written to " + filePath);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < availableLangFilesInDir.length)) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_1(i)];
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
exports.setTokensForLangs = setTokensForLangs;
function unsetTokensForLangs(token, langDir, usageDir) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenUsage, err_1, usagesList_1, availableLangFilesInDir, _a, _b, _i, langFile, filePath, langFileContentInJSON, langFileContent;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    tokenUsage = [];
                    if (!usageDir) return [3 /*break*/, 5];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, findUsages(token, usageDir)];
                case 2:
                    tokenUsage = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _c.sent();
                    if (err_1.status === 2) {
                        throw new Error('There was an error while searching for token usage\n' + err_1);
                    }
                    return [3 /*break*/, 4];
                case 4:
                    if (tokenUsage.length !== 0) {
                        usagesList_1 = "";
                        tokenUsage.forEach(function (fileDir) {
                            usagesList_1 = usagesList_1 + 'Token usage found in: ' + fileDir + '\n';
                        });
                        console.log(usagesList_1);
                        throw new Error('Please replace all the usages before trying to unset');
                    }
                    _c.label = 5;
                case 5: return [4 /*yield*/, file_1.getJSONFilesInDir(langDir)];
                case 6:
                    availableLangFilesInDir = _c.sent();
                    _a = [];
                    for (_b in availableLangFilesInDir)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 7;
                case 7:
                    if (!(_i < _a.length)) return [3 /*break*/, 11];
                    langFile = _a[_i];
                    filePath = path_1.join(langDir, availableLangFilesInDir[langFile]);
                    return [4 /*yield*/, file_1.readFile(filePath, { encoding: 'utf-8' })];
                case 8:
                    langFileContentInJSON = _c.sent();
                    langFileContent = JSON.parse(langFileContentInJSON);
                    delete langFileContent[token];
                    return [4 /*yield*/, file_1.writeFile(filePath, JSON.stringify(langFileContent, null, etc_1.spacingFormat), { encoding: 'utf-8' })];
                case 9:
                    _c.sent();
                    console.info("unset#keys: [" + token + "] erased from " + availableLangFilesInDir[langFile]);
                    _c.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 7];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.unsetTokensForLangs = unsetTokensForLangs;
function findUsages(token, usageDir) {
    return __awaiter(this, void 0, void 0, function () {
        var out;
        return __generator(this, function (_a) {
            out = child_process_1.execSync("grep -r -l \"" + token + "\" " + usageDir, { encoding: 'utf-8' });
            return [2 /*return*/, out.split('\n').filter(function (filePath) { return !!filePath; })];
        });
    });
}
exports.findUsages = findUsages;
//# sourceMappingURL=index.js.map