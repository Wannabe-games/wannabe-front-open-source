# Getting Started

## Table of Contents

-   [Summary](#summary)
-   [Sending Feedback](#sending-feedback)
-   [Instruction to Install a Project](#instruction-to-install-a-project)
-   [Available Scripts](#available-scripts)
    -   [yarn dev](#yarn-dev)
    -   [yarn build](#yarn-build)
    -   [yarn serve](#yarn-serve)
    -   [yarn storybook](#yarn-storybook)
    -   [yarn build-storybook](#yarn-build-storybook)
-   [Folder Structure](#folder-structure)
-   [Documentation](#documentation)
-   [Environment Variables](#environment-variables)
-   [Support](#support)
-   [Tech Stack](#tech-stack)
-   [Authors](#authors)

## Summary

This is a `package.json` for a JavaScript project using React for the frontend, the Stacks Blockchain API, and the Vite JavaScript build tool. The project is built using TypeScript and has various dependencies for functionalities such as forms, animations, and modals. The `dependencies` section lists the packages required to run the app, and the `devDependencies` section lists the packages required for development and testing, such as Storybook and testing libraries. The `scripts` section contains several commands that can be run with `npm run`, such as `serve` to preview the app, `de`v to run the development server, and `build` to build the production version.

## Sending Feedback

We are always open to [your feedback](https://wannabe.games/).

## Instruction to Install a Project

Here is the instruction to install a project after cloning the repository:

1. Install Node.js version >= 16.10.0 and < 17.0.0.
2. Open the terminal or command prompt in the cloned repository folder.
3. Run `yarn install` to install all the dependencies listed in `package.json`.
4. Add [environment variables](#environment-variables) to your .env file
5. Run `yarn run dev` to start the development server.
6. Open the browser and go to [http://127.0.0.1:5173](http://127.0.0.1:5173) to see the application.
7. To build the production version, run `yarn run build`.
8. For running storybook, run `yarn run storybook` and visit [http://127.0.0.1:6006](http://127.0.0.1:6006).

Note: Make sure to use `npm` instead of `yarn` if you haven't installed `yarn`.

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://127.0.0.1:5173](http://127.0.0.1:5173/) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn serve`

Runs the app in the production mode.\
Open [http://127.0.0.1:4173](http://127.0.0.1:4173/) to view it in the browser.

### `yarn storybook`

Runs the storybok in the development mode.\
Open [http://127.0.0.1:6006](http://127.0.0.1:6006/) to view it in the browser.

### `yarn build-storybook`

Builds the storybook for production to the `storybook-static` folder.\
It correctly bundles Storybook in production mode and optimizes the build for the best performance.

## Folder Structure

We took care to make the project structure scalable and intuitive.

```
wannabe-games-frontend/
  .storybook
  public/
  src/
    assets/ - images (logos, icons, creatures etc.)
    components/ - reusable components (based on atomic design pattern)
    config/
    constants/ - e.g. error strings/notifications
    helpers/
        actions/ - complete actions that trigger methods on smart contracts
        blockchain/ - all methods that can be performed on smart contracts
        stacks/ - functions that retrieve data from stack blockchain
    hooks/
    interfaces/
    models/
    pages/
    routing/
    schemas/
    store/
    templates/
    theme/
    types/
```

## Documentation

[Documentation](https://wannabe.games/docs/react-template/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_COIN_GECKO_API_URL`

`VITE_MINT_COST`

`VITE_API_URL`

`VITE_STACKS_CHAIN_ID`

`VITE_CONTRACT_ADDRESS_DEPLOYER`

`VITE_CONTRACT_VERSION`

`VITE_STACKS_API_URL`

`VITE_STACKS_NETWORK`

`VITE_STACKS_TESTNET_URL`

## Support

For support, go to [Wannabe Games](https://wannabe.games/#contact) or join our [Discord channel](https://discord.gg/fpk5dgftSj).

## Tech Stack

`JavaScript`
`React`
`Vite`
`TypeScript`
`Babel`
`Storybook`
`Styled Components`
`Redux, Redux Toolkit`
`React Router`
`Yup`
`HTML2Canvas`
& more

## Authors

-   [@Wannabe-games](https://github.com/Wannabe-games)
