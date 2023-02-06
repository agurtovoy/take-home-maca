import { request, gql } from "graphql-request";

export const queries = {
    types: gql`
        query typesQuery {
            types: pokemon_v2_type(where: { name: { _neq: "unknown" } }) {
                name
                id
            }
        }
    `,

    allPokemons: gql`
        query allPokemons($offset: Int, $limit: Int) {
            pokemon: pokemon_v2_pokemon(
                limit: $limit
                order_by: { id: asc }
                offset: $offset
                where: { id: { _lt: 10000 } }
            ) {
                name
                base_experience
                id
                types: pokemon_v2_pokemontypes {
                    id
                }
            }
        }
    `,

    pokemonsByType: gql`
        query pokemonsByType($offset: Int, $limit: Int, $types: [String!]) {
            pokemon: pokemon_v2_pokemon(
                limit: $limit
                order_by: { id: asc }
                offset: $offset
                where: { id: { _lt: 10000 }, pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _in: $types } } } }
            ) {
                name
                base_experience
                id
                types: pokemon_v2_pokemontypes {
                    id
                }
            }
        }
    `,
};

export const fetcher = ([query, args]) => request("https://beta.pokeapi.co/graphql/v1beta", query, args);

export const PAGE_SIZE = 20;

export const fetchPokemons = ({ query, args, page, previousPageData }) =>
    page === 0 || previousPageData?.pokemon.length
        ? [query, { limit: PAGE_SIZE, offset: page * PAGE_SIZE, ...(args || {}) }]
        : null;
