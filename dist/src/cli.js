#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var package_json_1 = require("../package.json");
var export_1 = require("./export");
var import_1 = require("./import");
var localstrings_1 = require("./localstrings");
var file_1 = require("./utils/file");
var _1 = require(".");
var UltiProAppTranslatorCLI = /** @class */ (function () {
    function UltiProAppTranslatorCLI() {
        this.program = new commander_1.default.Command();
        this.program.version(package_json_1.version);
    }
    UltiProAppTranslatorCLI.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this.readProjectConfig()];
                    case 1:
                        _a.config = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _c.sent();
                        console.warn('No project config file found!');
                        this.config = undefined;
                        return [3 /*break*/, 3];
                    case 3:
                        _b = this;
                        return [4 /*yield*/, this.createFinderInstance(this.config)];
                    case 4:
                        _b.finder = _c.sent();
                        this.program = this.setProgramCommands(this.program);
                        this.program.parse(process.argv);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Reads the project's UAT Config
     */
    UltiProAppTranslatorCLI.prototype.readProjectConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var configFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, file_1.readFile('./uat.json', { encoding: 'utf-8' })];
                    case 1:
                        configFile = _a.sent();
                        return [2 /*return*/, JSON.parse(configFile)];
                }
            });
        });
    };
    /**
     * Create a LocalStringsFinder instance to be used by the CLI
     * @param projectConfig
     */
    UltiProAppTranslatorCLI.prototype.createFinderInstance = function (projectConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var finder;
            return __generator(this, function (_a) {
                finder = new localstrings_1.LocalStringsFinder({
                    server: (projectConfig && projectConfig.dbServer) || localstrings_1.DEFAULT_DB_CONFIG.server,
                    username: (projectConfig && projectConfig.dbUsername) || localstrings_1.DEFAULT_DB_CONFIG.username,
                    password: (projectConfig && projectConfig.dbPassword) || localstrings_1.DEFAULT_DB_CONFIG.password,
                    database: (projectConfig && projectConfig.dbDatabase) || localstrings_1.DEFAULT_DB_CONFIG.database,
                });
                return [2 /*return*/, finder.init()];
            });
        });
    };
    UltiProAppTranslatorCLI.prototype.handleError = function (err) {
        console.log(err.message);
        process.exit(1);
    };
    /**
     * Sets up the program commands to their respective methods
     * @param program
     */
    UltiProAppTranslatorCLI.prototype.setProgramCommands = function (program) {
        var _this = this;
        program
            .command('set <token> <value> [langDir]')
            .description('Sets a token')
            .action(function (token, value, langDir) {
            return _this.set(token, value, langDir)
                .then(function () { return process.exit(0); })
                .catch(function (err) { return _this.handleError(err); });
        });
        program
            .command('set:map [tokenValueMapPath] [langDir]')
            .description('Performs a batch set of tokens')
            .action(function (tokenValueMapPath, langDir) {
            return _this.setMap(tokenValueMapPath, langDir)
                .then(function () { return process.exit(0); })
                .catch(function (err) { return _this.handleError(err); });
        });
        program
            .command('export [langDir] [outDir] [combineSimilarLanguages]')
            .description('Exports translations to send out to translation vendor')
            .action(function (langDir, outDir, combineSimilarLanguages) {
            if (combineSimilarLanguages === void 0) { combineSimilarLanguages = true; }
            return _this.export(langDir, outDir, combineSimilarLanguages)
                .then(function () { return process.exit(0); })
                .catch(function (err) { return _this.handleError(err); });
        });
        program
            .command('import <csvDir> [langDir] [domain]')
            .description('Imports CSVs within a directory into appropriate Lang files')
            .action(function (csvDir, langDir, domain) {
            return _this.import(csvDir, langDir, domain)
                .then(function () { return process.exit(0); })
                .catch(function (err) { return _this.handleError(err); });
        });
        program
            .command('ultipro:consume <StringId> [langDir]')
            .description('Consumes an UltiPro LocalStrings entry into appropriate Lang files')
            .action(function (stringId, langDir) {
            return _this.ultiproConsume(stringId, langDir)
                .then(function () { return process.exit(0); })
                .catch(function (err) { return _this.handleError(err); });
        });
        program
            .command('ultipro:findString <stringContent>')
            .option('-f, --fuzzy', 'Fuzzy search; performs LIKE comparison via search via %stringContent%')
            .description('Finds LocalStrings entries which resembles the string content; setting `fuzzy` to true will search via %stringContent%')
            .action(function (stringContent, cmdObject) {
            if (cmdObject === void 0) { cmdObject = { fuzzy: false }; }
            return _this.ultiproFindString(stringContent, cmdObject.fuzzy)
                .then(function () { return process.exit(0); })
                .catch(function (err) { return _this.handleError(err); });
        });
        program
            .command('ultipro:findToken <StringId>')
            .description('Finds LocalStrings entries with the given StringId')
            .action(function (stringId) {
            return _this.ultiproFindToken(stringId)
                .then(function () { return process.exit(0); })
                .catch(function (err) { return _this.handleError(err); });
        });
        program
            .command('unset <Token> [langDir] [usagesDir]')
            .description('Unsets a token')
            .action(function (token, langDir, usagesDir) {
            return _this.unset(token, langDir, usagesDir)
                .then(function () { return process.exit(0); })
                .catch(function (err) { return _this.handleError(err); });
        });
        return program;
    };
    /**
     * Sets a token
     * @param token Token to set
     * @param value Value to set for Token
     * @param langDir Directory where all Lang files are located
     */
    UltiProAppTranslatorCLI.prototype.set = function (token, value, langDir) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        langDir = langDir || (this.config && this.config.langDir);
                        if (!value || value.trim() === '') {
                            throw new Error('Missing value!');
                        }
                        if (!langDir) {
                            throw new Error('Missing langDir!');
                        }
                        return [4 /*yield*/, _1.setTokensForLangs((_a = {}, _a[token] = value, _a), langDir)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * Performs a batch set of tokens
     * @param tokenValueMapPath Path of the TokenValueMap file to use
     * @param langDir Directory where all Lang files are located
     */
    UltiProAppTranslatorCLI.prototype.setMap = function (tokenValueMapPath, langDir) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenValueMapFile, tokenValueMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenValueMapPath = tokenValueMapPath || (this.config && this.config.tokenValueMapPath);
                        langDir = langDir || (this.config && this.config.langDir);
                        if (!tokenValueMapPath) {
                            throw new Error('Missing tokenValueMapPath!');
                        }
                        else if (!langDir) {
                            throw new Error('Missing langDir!');
                        }
                        return [4 /*yield*/, file_1.readFile(tokenValueMapPath, {
                                encoding: 'utf-8',
                            })];
                    case 1:
                        tokenValueMapFile = _a.sent();
                        tokenValueMap = JSON.parse(tokenValueMapFile);
                        return [4 /*yield*/, _1.setTokensForLangs(tokenValueMap, langDir)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Exports translations to send out to translation vendor
     * @param langDir Directory where all Lang files are located
     * @param outDir Output directory
     * @param combineSimilarLanguages Whether or not similar languages should be combined into a single csv; default: true
     */
    UltiProAppTranslatorCLI.prototype.export = function (langDir, outDir, combineSimilarLanguages) {
        if (combineSimilarLanguages === void 0) { combineSimilarLanguages = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        langDir = langDir || (this.config && this.config.langDir);
                        outDir = outDir || (this.config && this.config.exportDir);
                        if (!langDir) {
                            throw new Error('Missing langDir!');
                        }
                        else if (!outDir) {
                            throw new Error('Missing outDir!');
                        }
                        return [4 /*yield*/, export_1.exportToCSV({
                                langDir: langDir,
                                combineSimilarLanguages: combineSimilarLanguages,
                                outputDir: outDir,
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Imports CSVs within a directory into appropriate Lang files
     * @param csvDir Directoy containing all the CSVs to import
     * @param langDir Directory where all Lang files are located
     * @param domain Optional domain such as COMMON or NOTIFICATIONS to filter down imports
     */
    UltiProAppTranslatorCLI.prototype.import = function (csvDir, langDir, domain) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        langDir = langDir || (this.config && this.config.langDir);
                        domain = domain || (this.config && this.config.domain);
                        if (!langDir) {
                            throw new Error('Missing langDir!');
                        }
                        else if (!csvDir) {
                            throw new Error('Missing csvDir!');
                        }
                        return [4 /*yield*/, import_1.importCSVFilesFromDir(csvDir, langDir, domain)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Consumes an UltiPro LocalStrings entry into appropriate Lang files
     * @param stringId LocalStrings StringId to consume
     * @param langDir Directory where all Lang files are located
     */
    UltiProAppTranslatorCLI.prototype.ultiproConsume = function (stringId, langDir) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        langDir = langDir || (this.config && this.config.langDir);
                        if (!langDir) {
                            throw new Error('Missing langDir!');
                        }
                        return [4 /*yield*/, this.finder.consumeUltiProToken(stringId, langDir)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Consumes an UltiPro LocalStrings entry into appropriate Lang files
     * @param stringId StringId to look up
     */
    UltiProAppTranslatorCLI.prototype.ultiproFindToken = function (stringId) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.finder.findToken(stringId)];
                    case 1:
                        results = _a.sent();
                        console.log("\uD83D\uDD0D Found " + results.length + " result(s)!");
                        console.table(results);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Finds LocalStrings entries which resembles the string content; setting `fuzzy` to true will search via %stringContent%
     * @param stringContent String content to search for
     * @param fuzzy Searches term approximately within any string via %stringContent%; default: false
     */
    UltiProAppTranslatorCLI.prototype.ultiproFindString = function (stringContent, fuzzy) {
        if (fuzzy === void 0) { fuzzy = false; }
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.finder.findString(stringContent, fuzzy)];
                    case 1:
                        results = _a.sent();
                        console.log("\uD83D\uDD0D Found " + results.length + " result(s)!");
                        console.table(results);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Unsets a token from the lang files
     * @param token String token name to unset
     * @param langDir Directory where all Lang files are located
     * @param usagesDir Directory where all the files that might use the token are located
     */
    UltiProAppTranslatorCLI.prototype.unset = function (token, langDir, usagesDir) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        langDir = langDir || (this.config && this.config.langDir);
                        usagesDir = usagesDir || (this.config && this.config.usagesDir);
                        if (!langDir) {
                            throw new Error('Missing langDir!');
                        }
                        else if (!usagesDir) {
                            console.log('Missing usagesDir!');
                        }
                        return [4 /*yield*/, _1.unsetTokensForLangs(token, langDir, usagesDir)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UltiProAppTranslatorCLI;
}());
exports.UltiProAppTranslatorCLI = UltiProAppTranslatorCLI;
(function main() {
    return __awaiter(this, void 0, void 0, function () {
        var translatorCLI;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    translatorCLI = new UltiProAppTranslatorCLI();
                    return [4 /*yield*/, translatorCLI.init()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
})();
//# sourceMappingURL=cli.js.map