const apiRoot = "https://pokeapi.co/api/v2";

const extractId = url =>
    new URL(url).pathname
        .split("/")
        .filter(p => !!p)
        .slice(-1)[0];

const normalizeNameIdResults = data => (data || []).map(({ name, url }) => ({ name, id: parseInt(extractId(url)) }));
const pokemonsByTypeUrl = ({ types }) => `https://pokeapi.co/api/v2/type/${types[0]}/`;
const nextPokemonsByTypeUrl = (types, prevName) => {
    const n = types.indexOf(prevName);
    return n >= 0 && n < types.length - 1 ? pokemonsByTypeUrl({ types: types.slice(n + 1) }) : null;
};

const normalizePokemonResults = data => normalizeNameIdResults(data).filter(p => p.id < 10000);

export const PAGE_SIZE = 20;

export const queries = {
    types: {
        url: () => `${apiRoot}/type/?limit=100`,
        normalize: data => ({ types: normalizeNameIdResults(data?.results) }),
    },

    allPokemons: {
        url: () => `${apiRoot}/pokemon/?limit=${PAGE_SIZE}`,
        normalize: data => ({ pokemon: normalizePokemonResults(data?.results), next: data.next }),
    },

    pokemonsByType: {
        url: pokemonsByTypeUrl,
        normalize: (data, { types }) => ({
            pokemon: normalizePokemonResults((data.pokemon || []).map(x => x.pokemon)),
            next: nextPokemonsByTypeUrl(types, data.name),
        }),
    },
};

export const fetcher = ([query, args]) => {
    const url = query.url(args);
    return fetch(url)
        .then(r => r.json())
        .then(r => query.normalize(r, args));
};

const nextQuery = (query, args, nextUrl) => (nextUrl ? [{ ...query, url: () => nextUrl }, args] : null);

export const fetchPokemons = ({ query, args, page, previousPageData }) =>
    page === 0 ? [query, args] : nextQuery(query, args, previousPageData?.next);
