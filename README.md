# Shoutime

## About

Shoutime is an application that allows users to explore top movies and TV shows, search for specific titles, and view detailed information about them.

## Features

- Loads top 10 movies or TV shows depending on the selected tab.
- Live search feature that queries the TMDB search endpoint.
- Search is triggered after the user stops typing for one second and only if there are 3 or more characters in the search bar.
- Results appear under the search box when a search is performed.
- Switching tabs while searching updates the search results with the same search term for the selected tab.
- Detailed view of movies/TV shows with cover image or trailer video and basic information.
- Back button functionality to return the user to the previous state.

## Getting Started

To get started, simply clone this repository and run the following command:

````bash
npm install

This will install all the necessary dependencies.

Running the Application

Development Mode

To start the development server, run:

npm run dev

This command will start the development server using Vite.

Building for Production

To build the application for production, run:

npm run build

This command will compile TypeScript files and then build the app using Vite.

Linting

To lint the codebase, run:

npm run lint

This command will run ESLint to analyze the code for any potential issues.

Preview

To preview the production build locally, run:

npm run preview

This command will serve the production build locally for previewing before deployment.

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/).

## Additional Information

To learn more about the TMDB API and how to integrate it into your application, refer to the [TMDB API documentation](https://developers.themoviedb.org/3/getting-started/introduction).

To learn React, check out the [React documentation](https://reactjs.org/).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
````

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
