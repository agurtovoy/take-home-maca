import useSWRImmutable from "swr/immutable";
import useSWRInfinite from "swr/infinite";

import { fetcher, queries, fetchPokemons, PAGE_SIZE } from "@/lib/api/graphql-api";
export { queries } from "@/lib/api/graphql-api";
// import { fetcher, queries, fetchPokemons, PAGE_SIZE } from "@/lib/api/rest-api";
// export { queries } from "@/lib/api/rest-api";

export const usePokeAPI = (url, options) => useSWRImmutable(url, fetcher, options);
export const usePokeAPIInfinite = (getKey, options) =>
    useSWRInfinite(getKey, fetcher, {
        revalidateFirstPage: false,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        keepPreviousData: true,
        ...options,
    });

export const usePokemonTypesQuery = () => usePokeAPI([queries.types]);

export const useFetchPokemonsInfinite = ({ query, args }) => {
    const result = usePokeAPIInfinite((page, previousPageData) =>
        fetchPokemons({ query, args, page, previousPageData })
    );

    return { ...result, PAGE_SIZE };
};
