"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tedious_1 = require("tedious");
exports.rows = [
    [
        { value: 'Login', metadata: { colName: 'StringID' } },
        { value: 'Hello', metadata: { colName: 'TextString' } },
        { value: 'false', metadata: { colName: 'IsConfigurable' } },
        { value: 'null', metadata: { colName: 'Context' } },
        { value: 'en', metadata: { colName: 'LanguageCode' } },
    ],
    [
        { value: 'Login', metadata: { colName: 'StringID' } },
        { value: 'Hi', metadata: { colName: 'TextString' } },
        { value: 'false', metadata: { colName: 'IsConfigurable' } },
        { value: 'null', metadata: { colName: 'Context' } },
        { value: 'en', metadata: { colName: 'LanguageCode' } },
    ],
    [
        { value: 'Login', metadata: { colName: 'StringID' } },
        { value: 'Hola', metadata: { colName: 'TextString' } },
        { value: 'false', metadata: { colName: 'IsConfigurable' } },
        { value: 'null', metadata: { colName: 'Context' } },
        { value: 'es', metadata: { colName: 'LanguageCode' } },
    ],
];
exports.rowsResults = [
    { StringID: 'Login', TextString: 'Hello', IsConfigurable: false, Context: 'null', LanguageCode: 'en' },
    { StringID: 'Login', TextString: 'Hi', IsConfigurable: false, Context: 'null', LanguageCode: 'en' },
    { StringID: 'Login', TextString: 'Hola', IsConfigurable: false, Context: 'null', LanguageCode: 'es' },
];
exports.rowsResultsText = [
    { StringID: 'Login', TextString: 'Hello', IsConfigurable: 'false', Context: 'null', LanguageCode: 'en' },
    { StringID: 'Login', TextString: 'Hi', IsConfigurable: 'false', Context: 'null', LanguageCode: 'en' },
    { StringID: 'Login', TextString: 'Hola', IsConfigurable: 'false', Context: 'null', LanguageCode: 'es' },
];
exports.findTokenParam = [['Token', tedious_1.TYPES.NVarChar, 'testToken']];
exports.findStringParam = [['Text', tedious_1.TYPES.NVarChar, '%testString%'], ['Lang', tedious_1.TYPES.VarChar, 'de']];
exports.setTokenForFileParam = [
    ['mobile.testToken', 'Hello', '../../fakeDirectory/en-US.json'],
    ['mobile.testToken', 'Hi', '../../fakeDirectory/en-US.json'],
    ['mobile.testToken', 'Hola', '../../fakeDirectory/es-PR.json'],
];
exports.enLangFileExample = {
    'mobile.Hello': 'Howdy',
    'mobile.Bye': 'See you later',
    'ultipro.Greeting': 'hello',
};
exports.findMatchesFromLangFileFindstring = [
    { StringID: 'Greeting', TextString: 'Hello', IsConfigurable: false, Context: 'null', LanguageCode: 'en' },
    { StringID: 'Greeting', TextString: 'Howdy', IsConfigurable: false, Context: 'null', LanguageCode: 'en' },
    { StringID: 'Greeting', TextString: 'Hi', IsConfigurable: false, Context: 'null', LanguageCode: 'en' },
];
exports.findMatchesFromLangFileFindstring1 = [
    { StringID: 'Farewell', TextString: 'Bye', IsConfigurable: false, Context: 'null', LanguageCode: 'fr' },
    { StringID: 'Farewell', TextString: 'Good day', IsConfigurable: false, Context: 'null', LanguageCode: 'it' },
    { StringID: 'Farewell', TextString: 'See you later', IsConfigurable: false, Context: 'null', LanguageCode: 'ge' },
];
exports.matches = [
    {
        mobileToken: 'mobile.Hello',
        mobileTextString: 'Howdy',
        ultiproStringID: 'Greeting',
        ultiproStringIDExistsInLang: true,
        ultiproTextString: 'Hello',
        ultiproIsConfigurable: false,
        ultiproContext: 'null',
        exactMatch: false,
    },
    {
        mobileToken: 'mobile.Hello',
        mobileTextString: 'Howdy',
        ultiproStringID: 'Greeting',
        ultiproStringIDExistsInLang: true,
        ultiproTextString: 'Howdy',
        ultiproIsConfigurable: false,
        ultiproContext: 'null',
        exactMatch: true,
    },
    {
        mobileToken: 'mobile.Hello',
        mobileTextString: 'Howdy',
        ultiproStringID: 'Greeting',
        ultiproStringIDExistsInLang: true,
        ultiproTextString: 'Hi',
        ultiproIsConfigurable: false,
        ultiproContext: 'null',
        exactMatch: false,
    },
    {
        mobileToken: 'mobile.Bye',
        mobileTextString: 'See you later',
        ultiproStringID: 'Farewell',
        ultiproStringIDExistsInLang: false,
        ultiproTextString: 'Bye',
        ultiproIsConfigurable: false,
        ultiproContext: 'null',
        exactMatch: false,
    },
    {
        mobileToken: 'mobile.Bye',
        mobileTextString: 'See you later',
        ultiproStringID: 'Farewell',
        ultiproStringIDExistsInLang: false,
        ultiproTextString: 'Good day',
        ultiproIsConfigurable: false,
        ultiproContext: 'null',
        exactMatch: false,
    },
    {
        mobileToken: 'mobile.Bye',
        mobileTextString: 'See you later',
        ultiproStringID: 'Farewell',
        ultiproStringIDExistsInLang: false,
        ultiproTextString: 'See you later',
        ultiproIsConfigurable: false,
        ultiproContext: 'null',
        exactMatch: true,
    },
];
//# sourceMappingURL=localstringtest.js.map