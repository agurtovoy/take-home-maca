import { useInView } from "react-intersection-observer";
import clsx from "clsx";

import PokeBall from "@/components/svg/pokeball.svg";

import { usePokeAPIInfinite, gql } from "@/lib/poke-api";
import { useEffect } from "react";

const pokemonsQuery = gql`
    query pokemons($offset: Int, $limit: Int) {
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

const PAGE_SIZE = 20;

const useLoadPokemons = ({ preloadedData }) => {
    const fetchPokemons = (page, previousPageData) => {
        return page === 0 || previousPageData?.pokemon.length
            ? [pokemonsQuery, { limit: PAGE_SIZE, offset: page * PAGE_SIZE }]
            : null;
    };

    const { data, size, setSize } = usePokeAPIInfinite(fetchPokemons);
    const pokemons = data ? [].concat(...data.map(r => r.pokemon)) : preloadedData;
    const haveMore = !data || data[data.length - 1]?.pokemon.length === PAGE_SIZE;
    const loading = data?.length !== size;

    return {
        pokemons,
        loading,
        showMore: !loading && haveMore ? () => setSize(size + 1) : null,
    };
};

const paddedId = (id, padding = 3) => String(id).padStart(padding, "0");

const thumbnailUrl = id => `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId(id)}.png`;

const Card = ({ children }) => (
    <div className="flex flex-col items-center rounded-lg bg-slate-700 px-4 py-3">{children}</div>
);

const PokemonCard = ({ id, name }) => (
    <Card>
        <div className="flex w-full items-baseline justify-between">
            <h5 className="text-lg font-bold capitalize">{name}</h5>
            <div className="text-md font-semibold text-slate-500">#{paddedId(id, 4)}</div>
        </div>

        <img className="w-full max-w-xs select-none px-4 py-7" src={thumbnailUrl(id)} alt={name} />
    </Card>
);

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

export const PokemonList = ({ preloadedData }) => {
    const { pokemons, loading, showMore } = useLoadPokemons({ preloadedData });
    const ref = useLoadMore({ showMore });

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
