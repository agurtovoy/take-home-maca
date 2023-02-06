import clsx from "clsx";

import { OpenSideBarButton } from "@/components/sidebar";
import { Spinner } from "@/components/spinner";
import { PokemonList } from "@/components/pokemon/list";

import { useLoadPokemons } from "@/components/pokemon/query";

import { useStore } from "@/components/store";

import { queries } from "@/lib/api/poke-api";

const PokedexHeaderContent = ({ className }) => (
    <div className={clsx("flex items-center pt-4 pl-1 pb-3", className)}>
        <OpenSideBarButton />
        <h1 className="cursor-default text-xl font-bold leading-5 text-slate-50">
            Pokédex <i className="font-normal italic">Lite</i>
        </h1>
    </div>
);

const PokedexHeader = () => (
    <div className="">
        <div className="fixed top-0 left-0 right-0 z-30 select-none xs:right-4">
            <PokedexHeaderContent className="invisible-children pointer-events-none bg-slate-800" />
            <div className="h-2 bg-gradient-to-b from-slate-800"></div>
        </div>

        <div className="fixed top-0 z-30 select-none">
            <PokedexHeaderContent />
        </div>
        <div className="pt-[4.2rem]" />
    </div>
);

const useTypeFilters = () => {
    const selection = useStore(s => s.selectedTypeNames());
    return selection.length
        ? { query: queries.pokemonsByType, args: { types: selection } }
        : { query: queries.allPokemons };
};

const PendingQuerySpinner = () => (
    <div className="absolute top-0 left-1/2">
        <Spinner className="fixed top-[50%] -translate-y-1/2 -translate-x-1/2 " />
    </div>
);

const PokedexContainer = ({ children, pendingQuery }) => (
    <div className="relative">
        {pendingQuery && <PendingQuerySpinner />}
        <PokedexHeader />
        <div className={clsx("transition-opacity duration-200", pendingQuery ? "opacity-30 delay-500" : "opacity-100")}>
            {children}
        </div>
    </div>
);

export const Pokedex = () => {
    const queryDef = useTypeFilters();
    const { pendingQuery, ...listArgs } = useLoadPokemons(queryDef);

    return (
        <PokedexContainer pendingQuery={pendingQuery}>
            <PokemonList {...listArgs} />
        </PokedexContainer>
    );
};
