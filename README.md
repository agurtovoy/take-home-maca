# Pokédex Lite

## Highlights

### Responsiveness

https://user-images.githubusercontent.com/3394202/217006276-c88b5868-cc29-4698-a6cf-c035a90b053f.mp4

https://user-images.githubusercontent.com/3394202/217009029-82f7af3a-c433-4a45-9e77-0d593aeea902.mp4

https://user-images.githubusercontent.com/3394202/217011275-323bf180-284e-4396-96d8-437bdd1ed37f.mp4

### Slow network

https://user-images.githubusercontent.com/3394202/217015513-ea97b413-3f7e-48c3-8652-b361e8e830b5.mp4


## Summary

 - Pure React SPA (no server side)
 - Pulls data from ~[PokeAPI's GraphQL endpoint](https://pokeapi.co/docs/graphql)~ [PokeAPI's REST endpoint](https://pokeapi.co/docs/v2)
 - Doesn't use any 3rd party UI components
 - All CSS animations/transitions are handrolled
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
- REST API is a hack that I threw together in about an hour after discovering that the GraphQL endpoint became unresponsive
- Some flickering surfaced after the switch from GraphQL to REST
