import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

import PokeBall from "@/components/svg/pokeball.svg";
import { Card, PokemonCard } from "@/components/pokemon/card";
import { useStore } from "@/components/store";

import { usePokeAPIInfinite, gql } from "@/lib/poke-api";

const allPokemonsQuery = gql`
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
`;

const pokemonsByTypeQuery = gql`
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
`;

const PAGE_SIZE = 20;

const useLoadPokemons = ({ query, args }) => {
    const fetchPokemons = (page, previousPageData) => {
        return page === 0 || previousPageData?.pokemon.length
            ? [query, { limit: PAGE_SIZE, offset: page * PAGE_SIZE, ...(args || {}) }]
            : null;
    };

    const { data, size, setSize } = usePokeAPIInfinite(fetchPokemons);
    const pokemons = data ? [].concat(...data.map(r => r.pokemon)) : [];
    const haveMore = !data || data[data.length - 1]?.pokemon.length === PAGE_SIZE;
    const loading = data?.length !== size;

    return {
        pokemons,
        loading,
        showMore: !loading && haveMore ? () => setSize(size + 1) : null,
    };
};

const PlaceholderCard = ({ loading }) => (
    <Card>
        <PokeBall
            className={clsx("w-full max-w-xs select-none fill-slate-600 px-10 py-20", loading && "animate-spin")}
        />
    </Card>
);

const useLoadMore = ({ showMore }) => {
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && showMore) {
            showMore();
        }
    }, [inView, showMore]);

    return ref;
};

const useTypeFilters = () => {
    const selection = useStore(s => s.selectedTypeNames());
    return selection.length ? { query: pokemonsByTypeQuery, args: { types: selection } } : { query: allPokemonsQuery };
};

export const PokemonList = () => {
    const queryDef = useTypeFilters();
    const { pokemons, loading, showMore } = useLoadPokemons(queryDef);
    const ref = useLoadMore({ showMore });
    //    const filtersMap = useStore(s => s.typeFilters);

    return (
        <ul className="min-w-screen ss-duration z-0 mx-5 mb-5 grid gap-4 bg-slate-800 transition-all grid-auto-fit-sm">
            {pokemons.map(props => (
                <li key={props.id}>
                    <PokemonCard {...props} />
                </li>
            ))}
            {loading && (
                <ul>
                    <PlaceholderCard loading={true} />
                </ul>
            )}
            {showMore && (
                <ul ref={ref}>
                    <PlaceholderCard />
                </ul>
            )}
        </ul>
    );
};
