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
var tedious_1 = require("tedious");
var file_1 = require("./utils/file");
var index_1 = require("./index");
exports.DEFAULT_DB_CONFIG = {
    server: 'manualqaco.mia.ucloud.int',
    username: 'dev',
    password: 'usg',
    database: 'HRMS_GLOBALDATA',
};
var ultiproLangCodeToI18nTagMap = {
    ca: ['en-CA'],
    da: ['da-DK', 'da'],
    de: ['de-DE', 'de'],
    en: ['en-US', 'en'],
    es: ['es-MX', 'es-PR', 'es-US', 'es'],
    fl: ['fil-PH', 'fil', 'tl-PH', 'tl'],
    ff: ['fr-FR', 'fr'],
    fr: ['fr-CA'],
    it: ['it-IT', 'it'],
    ms: ['ms-MY', 'ms'],
    nl: ['nl', 'nl-NL'],
    pt: ['pt-BR', 'pt'],
    sv: ['sv-SE', 'sv'],
    uk: ['en-GB'],
};
/**
 * A utility class to look up LocalString
 */
var LocalStringsFinder = /** @class */ (function () {
    function LocalStringsFinder(config) {
        if (config === void 0) { config = exports.DEFAULT_DB_CONFIG; }
        this.initialized = false;
        if (!config) {
            throw new Error('Must supply DB Config');
        }
        this.config = {
            server: config.server,
            authentication: {
                type: 'default',
                options: {
                    userName: config.username,
                    password: config.password,
                },
            },
            options: {
                database: config.database || exports.DEFAULT_DB_CONFIG.database,
                rowCollectionOnDone: true,
            },
        };
    }
    /**
     * Initializes DB connection.
     */
    LocalStringsFinder.prototype.init = function () {
        var _this = this;
        this.connection = new tedious_1.Connection(this.config);
        return new Promise(function (resolve, reject) {
            _this.connection.on('connect', function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                _this.initialized = true;
                resolve(_this);
            });
        });
    };
    /**
     * Checks if the stringFinder is initialized
     */
    LocalStringsFinder.prototype.checkInitialized = function () {
        if (!this.initialized) {
            throw new Error('Finder must be initialized before usage. Please call init() on the Finder instance!');
        }
        return true;
    };
    LocalStringsFinder.prototype.close = function () {
        this.checkInitialized();
        return this.connection.close();
    };
    /**
     * Searches for a LocalStrings entry that matches the given stringId.
     * @param token
     */
    LocalStringsFinder.prototype.findToken = function (stringId) {
        var _this = this;
        this.checkInitialized();
        return new Promise(function (resolve, reject) {
            var request = new tedious_1.Request("SELECT * FROM LocalStrings where StringID like @Token", function (err) {
                if (err) {
                    reject(err);
                }
            });
            request.addParameter('Token', tedious_1.TYPES.NVarChar, "" + stringId);
            _this.query(request)
                .then(function (results) { return resolve(results); })
                .catch(function (err) { return reject(err); });
        });
    };
    /**
     * Searches LocalStrings for entries that match the given text.
     * @param text
     */
    LocalStringsFinder.prototype.findString = function (text, fuzzy, lang) {
        var _this = this;
        if (fuzzy === void 0) { fuzzy = false; }
        if (lang === void 0) { lang = 'en'; }
        this.checkInitialized();
        return new Promise(function (resolve, reject) {
            var request = new tedious_1.Request("SELECT * FROM LocalStrings where TextString like @Text and LanguageCode = @Lang", function (err) {
                if (err) {
                    reject(err);
                }
            });
            request.addParameter('Text', tedious_1.TYPES.NVarChar, fuzzy ? "%" + text + "%" : text);
            request.addParameter('Lang', tedious_1.TYPES.VarChar, lang);
            _this.query(request)
                .then(function (results) { return resolve(results); })
                .catch(function (err) { return reject(err); });
        });
    };
    /**
     * Queries the LocalStrings table using the query request.
     * @param request
     */
    LocalStringsFinder.prototype.query = function (request) {
        var _this = this;
        this.checkInitialized();
        return new Promise(function (resolve, reject) {
            request.on('doneInProc', function (_rowCount, _more, rows) {
                var result = rows.map(function (columns) {
                    var rowMapped = {};
                    columns.forEach(function (column) {
                        rowMapped[column.metadata.colName] = column.value;
                    });
                    return rowMapped;
                });
                resolve(result);
            });
            request.on('error', function (error) {
                reject(error);
            });
            _this.connection.execSql(request);
        }).then(function (result) {
            if (result && result.length > 0) {
                return result.map(function (row) {
                    return {
                        StringID: "" + row.StringID,
                        TextString: "" + row.TextString,
                        IsConfigurable: row.IsConfigurable,
                        Context: "" + row.Context,
                        LanguageCode: "" + row.LanguageCode,
                    };
                });
            }
            return [];
        });
    };
    /**
     * Consumes LocalStrings entry into appropriate lang files located in the specified langDir.
     * @param stringId StringId to consume from LocalStrings
     * @param langDir Lang Dir containing the Lang files
     * @param prefix Prefix to use when inserting tokens; default: 'ultipro'
     */
    LocalStringsFinder.prototype.consumeUltiProToken = function (stringId, langDir, prefix) {
        if (prefix === void 0) { prefix = 'ultipro'; }
        return __awaiter(this, void 0, void 0, function () {
            var tokenRows, availableLangFilesInDir, langTagToFileMap, i, row, langsForWrite, j, langForWrite, fileForWrite, tokenToSet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkInitialized();
                        return [4 /*yield*/, this.findToken(stringId)];
                    case 1:
                        tokenRows = _a.sent();
                        if (tokenRows.length === 0) {
                            console.log('🙈 No results found!');
                        }
                        return [4 /*yield*/, file_1.getJSONFilesInDir(langDir)];
                    case 2:
                        availableLangFilesInDir = _a.sent();
                        langTagToFileMap = availableLangFilesInDir.reduce(function (map, langFile) {
                            var _a;
                            return __assign(__assign({}, map), (_a = {}, _a[index_1.parseLanguageTagFromFilename(langFile)] = langFile, _a));
                        }, {});
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < tokenRows.length)) return [3 /*break*/, 8];
                        row = tokenRows[i];
                        langsForWrite = ultiproLangCodeToI18nTagMap[row.LanguageCode];
                        j = 0;
                        _a.label = 4;
                    case 4:
                        if (!(j < langsForWrite.length)) return [3 /*break*/, 7];
                        langForWrite = langsForWrite[j];
                        fileForWrite = langTagToFileMap[langForWrite];
                        tokenToSet = prefix + "." + stringId;
                        if (!fileForWrite) return [3 /*break*/, 6];
                        return [4 /*yield*/, index_1.setTokenForFile(tokenToSet, row.TextString, langDir + "/" + fileForWrite)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        j++;
                        return [3 /*break*/, 4];
                    case 7:
                        i++;
                        return [3 /*break*/, 3];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Reads in a EN Lang file and will search LocalStrings DB for matches against `mobile.`-prefixed tokens.
     * @param enLangPath Path to EN Lang file
     */
    LocalStringsFinder.prototype.findMatchesFromLangFile = function (enLangPath) {
        return __awaiter(this, void 0, void 0, function () {
            var enLangFile, allEnTokens, mobileEnTokens, matches, tokens, _loop_1, this_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkInitialized();
                        return [4 /*yield*/, file_1.readFile(enLangPath, { encoding: 'utf-8' })];
                    case 1:
                        enLangFile = _a.sent();
                        allEnTokens = JSON.parse(enLangFile);
                        mobileEnTokens = Object.keys(allEnTokens).reduce(function (tokenMap, currentKey) {
                            var _a;
                            if (currentKey.startsWith('mobile.')) {
                                tokenMap = __assign(__assign({}, tokenMap), (_a = {}, _a[currentKey] = allEnTokens[currentKey], _a));
                            }
                            return tokenMap;
                        }, {});
                        matches = [];
                        tokens = Object.keys(mobileEnTokens);
                        _loop_1 = function (i) {
                            var token, stringContentForToken, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        token = tokens[i];
                                        stringContentForToken = mobileEnTokens[token];
                                        return [4 /*yield*/, this_1.findString(stringContentForToken)];
                                    case 1:
                                        result = _a.sent();
                                        if (result && result.length > 0) {
                                            result.forEach(function (row) {
                                                matches.push({
                                                    mobileToken: token,
                                                    mobileTextString: stringContentForToken,
                                                    ultiproStringID: "" + row.StringID,
                                                    ultiproStringIDExistsInLang: !!allEnTokens["ultipro." + row.StringID],
                                                    ultiproTextString: "" + row.TextString,
                                                    ultiproIsConfigurable: row.IsConfigurable,
                                                    ultiproContext: "" + row.Context,
                                                    exactMatch: stringContentForToken === row.TextString,
                                                });
                                            });
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < tokens.length)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_1(i)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, matches];
                }
            });
        });
    };
    return LocalStringsFinder;
}());
exports.LocalStringsFinder = LocalStringsFinder;
//# sourceMappingURL=localstrings.js.map