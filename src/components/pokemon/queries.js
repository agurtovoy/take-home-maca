import { usePokeAPIInfinite, gql } from "@/lib/poke-api";

export const queries = {
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

const PAGE_SIZE = 20;

export const useLoadPokemons = ({ query, args }) => {
    const fetchPokemons = (page, previousPageData) => {
        return page === 0 || previousPageData?.pokemon.length
            ? [query, { limit: PAGE_SIZE, offset: page * PAGE_SIZE, ...(args || {}) }]
            : null;
    };

    const { data, size, setSize, isLoading, error } = usePokeAPIInfinite(fetchPokemons);
    const pokemons = data ? [].concat(...data.map(r => r.pokemon)) : [];
    const haveMore = !data || data[data.length - 1]?.pokemon.length === PAGE_SIZE;
    const loading = data?.length !== size;

    return {
        pokemons,
        loading,
        pendingQuery: isLoading || error,
        showMore: !loading && haveMore ? () => setSize(size + 1) : null,
    };
};
