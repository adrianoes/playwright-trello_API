# playwright-trello_API

Sample project to demonstrate basic api tests using the trello api of my personal account.

# Pre-requirements:

- Visual Studio Code 1.87.2 (Optional, however strongly recommended so you can use playwright extension).
- Playwright 1.42.1.
- Playwright Test for VSCode 1.0.22 (Optional, however strongly recommended so you can run tests in VSC).
- Node.js 18.18.0.
- npm 10.2.4.
- dotenv 16.4.5 (so you can load environment variables from a .env file into process.env).
- Yarn 1.22.19 (Optional).

# Instalation:

- See "https://nodejs.org/en" and install the aforementioned Node.js version.
- See "https://code.visualstudio.com/" and install the latest VSC stable version.
- To use yarn packet manager, open windows prompt as admin and execute the "corepack enable" command (Optional).
- "yarn create playwright" and select TypeScript, tests, yes for github actions and true for install its browsers. 
- "yarn add dotenv -D", to install cypress as a dev dependencie. 
- Look for Playwright Test for VSCode in the extensions marketplace and install the official one from Microsoft.

# Tests:

- "yarn playwright test", to execute the tests in headless mode. 
- Hit Testing button on left side bar in VSC and choose the tests you want to execute.

# Support:

- Playwright docs (https://playwright.dev/docs/intro).
- Trello API docs (https://developer.atlassian.com/cloud/trello/rest/).