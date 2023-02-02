import useSWRImmutable from "swr/immutable";
import useSWRInfinite from "swr/infinite";
import { request } from "graphql-request";
export { gql } from "graphql-request";

const fetcher = ([query, params]) => {
    console.log("fetching query", query, { params });
    return request("https://beta.pokeapi.co/graphql/v1beta", query, params);
};

export const usePokeAPI = (url, options) => useSWRImmutable(url, fetcher, options);
export const usePokeAPIInfinite = (getKey, options) =>
    useSWRInfinite(getKey, fetcher, {
        revalidateFirstPage: false,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        ...options,
    });

export default usePokeAPI;
