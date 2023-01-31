import useSWRImmutable from "swr/immutable";
// import useSWRInfinite_ from "swr/infinite";
import { request } from "graphql-request";
export { gql } from "graphql-request";

const fetcher = query => request("https://beta.pokeapi.co/graphql/v1beta", query);
//const defaultOptions = options => ({ revalidateOnFocus: false, ...options });

export const usePokeAPI = (url, options) => useSWRImmutable(url, fetcher, options);
// export const useSWRInfinite = (getKey, options) => useSWRInfinite_(getKey, _fetcher, _defaultOptions(options));

export default usePokeAPI;
