import { useEffect, memo } from "react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

import PokeBall from "@/components/svg/pokeball.svg";
import { Card, PokemonCard } from "@/components/pokemon/card";

const PlaceholderCard = memo(({ loading }) => (
    <Card>
        <PokeBall
            className={clsx(
                "w-full max-w-xs select-none fill-slate-600 px-10 py-20 opacity-20",
                loading && "animate-spin"
            )}
        />
    </Card>
));

const useLoadMore = ({ showMore }) => {
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && showMore) {
            showMore();
        }
    }, [inView, showMore]);

    return ref;
};

const LoadMorePlaceholder = ({ showMore }) => {
    const ref = useLoadMore({ showMore });
    return (
        <ul ref={ref}>
            <PlaceholderCard />{" "}
        </ul>
    );
};

const unique = pokemons => {
    const seen = new Set();
    return pokemons.reduce((result, p) => {
        if (seen.has(p.id)) return result;
        seen.add(p.id);
        return result.concat(p);
    }, []);
};

export const PokemonList = ({ pokemons, loading, showMore }) => (
    <ul className="min-w-screen ss-duration mx-5 mb-5 grid gap-4 bg-slate-800 transition-all grid-auto-fit-sm">
        {unique(pokemons).map(props => (
            <li key={props.id}>
                <PokemonCard {...props} />
            </li>
        ))}
        {loading && pokemons.length > 0 && (
            <ul>
                <PlaceholderCard loading={true} />
            </ul>
        )}
        {showMore && <LoadMorePlaceholder showMore={showMore} />}
    </ul>
);
