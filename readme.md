# UltiPro App Translator

## What

`ultipro-app-translator` is a tool designed to streamline the translation process around `ultipro-app`

## How

#### Setting tokens

```
// in ultipro-app
npm run lang:set "mobile.token.ex1" "Example 1"

// in ultipro-app-translator
npm run cli set "mobile.token.ex1" "Example 1"
```

#### Unsettting tokens
```
// in ultipro-app
npm run lang:unset "mobile.token.ex1"


// in ultipro-app-translator
npm run cli unset "mobile.token.ex1"
```

#### Exporting for translations for vendor

```
// in ultipro-app
npm run lang:export

// in ultipro-app-translator
npm run cli export
```

#### Importing after translations come back from vendor

```
// in ultipro-app
npm run lang:import ./path-to-csv-folder

// in ultipro-app-translator
npm run cli import ./path-to-csv-folder
```

#### Finding LocalStrings entries which match the text content

```
// in ultipro-app
npm run lang:findString "Log in"

// in ultipro-app-translator
npm run cli ultipro:findString "Log in"

// output
🔍 Found 2 result(s)!
┌─────────┬────────────────┬────────────┬────────────────┬─────────┬──────────────┐
│ (index) │    StringID    │ TextString │ IsConfigurable │ Context │ LanguageCode │
├─────────┼────────────────┼────────────┼────────────────┼─────────┼──────────────┤
│    0    │ 'CapitalLogIn' │  'Log In'  │     false      │ 'null'  │     'en'     │
│    1    │    'Login'     │  'Log in'  │      true      │ 'null'  │     'en'     │
└─────────┴────────────────┴────────────┴────────────────┴─────────┴──────────────┘

// when --fuzzy
npm run cli ultipro:findString "benefits enrollment" -- --fuzzy

// ouput
🔍 Found 4 result(s)!
┌─────────┬──────────────────────────────────┬──────────────────────────────────────┬────────────────┬─────────┬──────────────┐
│ (index) │             StringID             │              TextString              │ IsConfigurable │ Context │ LanguageCode │
├─────────┼──────────────────────────────────┼──────────────────────────────────────┼────────────────┼─────────┼──────────────┤
│    0    │       'BenefitsEnrollment'       │        'Benefits Enrollment'         │      true      │ 'null'  │     'en'     │
│    1    │ 'BenefitsEnrollmentIntroduction' │  'Benefits Enrollment Introduction'  │      true      │ 'null'  │     'en'     │
│    2    │   'EmployeeBenefitsEnrollment'   │    'Employee Benefits Enrollment'    │      true      │ 'null'  │     'en'     │
│    3    │          'WelcomeToBE'           │ 'Welcome to Benefits Enrollment {0}' │     false      │ 'null'  │     'en'     │
└─────────┴──────────────────────────────────┴──────────────────────────────────────┴────────────────┴─────────┴──────────────┘
```

#### Finding LocalStrings entries with the given StringId

```
// in ultipro-app
npm run lang:findToken "Login"

// in ultipro-app-translator
npm run cli ultipro:findToken "Login"

// output
🔍 Found 12 result(s)!
┌─────────┬──────────┬────────────────────────┬────────────────┬─────────┬──────────────┐
│ (index) │ StringID │       TextString       │ IsConfigurable │ Context │ LanguageCode │
├─────────┼──────────┼────────────────────────┼────────────────┼─────────┼──────────────┤
│    0    │ 'Login'  │        'Log på'        │     false      │ 'null'  │     'da'     │
│    1    │ 'Login'  │       'Anmelden'       │      true      │ 'null'  │     'de'     │
│    2    │ 'Login'  │        'Log in'        │      true      │ 'null'  │     'en'     │
│    3    │ 'Login'  │    'Iniciar sesión'    │      true      │ 'null'  │     'es'     │
│    4    │ 'Login'  │      'Connexion'       │      true      │ 'null'  │     'ff'     │
│    5    │ 'Login'  │      'Mag-log in'      │      true      │ 'null'  │     'fl'     │
│    6    │ 'Login'  │ 'Ouverture de session' │      true      │ 'null'  │     'fr'     │
│    7    │ 'Login'  │        'Accedi'        │      true      │ 'null'  │     'it'     │
│    8    │ 'Login'  │      'Log masuk'       │      true      │ 'null'  │     'ms'     │
│    9    │ 'Login'  │      'Aanmelden'       │      true      │ 'null'  │     'nl'     │
│   10    │ 'Login'  │     'Fazer Login'      │      true      │ 'null'  │     'pt'     │
│   11    │ 'Login'  │       'Logga in'       │     false      │ 'null'  │     'sv'     │
└─────────┴──────────┴────────────────────────┴────────────────┴─────────┴──────────────┘
```

#### Consuming LocalStrings entries into appropriate lang files

```
// in ultipro-app
npm run lang:consume "Login"

// in ultipro-app-translator
npm run cli ultipro:consume "Login"

// output
set#key: { ultipro.Login: Log in } written to ./mock/i18n/en-US.json
set#key: { ultipro.Login: Log in } written to ./mock/i18n/en.json
set#key: { ultipro.Login: Connexion } written to ./mock/i18n/fr.json
set#key: { ultipro.Login: Ouverture de session } written to ./mock/i18n/fr-CA.json
```

## Why

`ultipro-app-translator` took the best parts of `ultipro-mobile-lang-cli` and has now been rewritten in TS with flexibility and modularity in mind. Making changes to the `ultipro-mobile-lang-cli` was a little cumbersome due to its heavy reliance on AREAs, which the app does not have. Currently, it supports the 3 most used commands `set`, `import`, `export`

## Future Work

-   TBD
