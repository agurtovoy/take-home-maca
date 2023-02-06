# Pokédex Lite

## Summary

 - Pure React SPA (no server side)
 - Pulls data from [PokeAPI's GraphQL endpoint](https://pokeapi.co/docs/graphql)
 - Doesn't use any 3rd party UI components
 - Deployed to https://take-home-maca.vercel.app/
 - Used tech:
   - React 18.2
   - [Vite](https://vitejs.dev/) for bundling/HMR
   - [TailwindCSS](https://tailwindcss.com/) for styling
   - [zustand](https://github.com/pmndrs/zustand) for global state management
   - [swr](https://swr.vercel.app/) + [graphql-request](https://www.npmjs.com/package/graphql-request) for lightweight, robust data fetching
   - [Storybook](https://storybook.js.org/) for component-centered development
   - [vitest](https://vitest.dev/) for testing
   - [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) + [Stylelint](https://stylelint.io/) for automatic enforcement of basic code hygiene
   - [yarn](https://yarnpkg.com/) for package management
   
## Local development workflows

| Task          | Command       |
| ------------- | ------------- |
| Run dev server | `yarn install && yarn dev` |
| Run storybook | `yarn storybook` |
| Run tests | `yarn test` |

## Known deficiences

- No automated UI testing
- Poor unit tests and stories coverage
- Hard-coded UI theme, missing light mode support
- Tons of unsuppressed dev dependency warnings (mostly coming from Storybook)
