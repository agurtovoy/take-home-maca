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

export const PokemonList = ({ pokemons, loading, showMore }) => {
    //    const filtersMap = useStore(s => s.typeFilters);

    return (
        <ul className="min-w-screen ss-duration mx-5 mb-5 grid gap-4 bg-slate-800 transition-all grid-auto-fit-sm">
            {pokemons.map(props => (
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
};
