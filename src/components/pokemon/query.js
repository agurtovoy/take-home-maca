import { useFetchPokemonsInfinite } from "@/lib/api/poke-api";

export const useLoadPokemons = ({ query, args }) => {
    const { data, size, setSize, isLoading, error, PAGE_SIZE } = useFetchPokemonsInfinite({ query, args });
    const pokemons = data ? [].concat(...data.map(r => r.pokemon)) : [];
    const haveMore = !data || data[data.length - 1]?.pokemon.length === PAGE_SIZE || data[data.length - 1]?.next;
    const loading = data?.length !== size;

    return {
        pokemons,
        loading,
        pendingQuery: isLoading || error,
        showMore: !loading && haveMore ? () => setSize(size + 1) : null,
    };
};
