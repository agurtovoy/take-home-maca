import clsx from "clsx";

import { Sidebar, SidebarLayout, OpenSideBarButton } from "@/components/sidebar";
import { PokemonList } from "@/components/pokemon/list";
import { FiltersPanel } from "@/components/filters/panel";
import { StoreProvider } from "@/components/store";

import { usePokeAPI, gql } from "@/lib/poke-api";

const initialDataQuery = gql`
    query initialData {
        types: pokemon_v2_type(where: { name: { _neq: "unknown" } }) {
            name
            id
        }
    }
`;

const PokedexHeaderContent = ({ className }) => (
    <div className={clsx("flex items-center pt-4 pl-1 pb-3", className)}>
        <OpenSideBarButton />
        <h1 className="cursor-default text-xl font-bold leading-5">
            Pokédex <i className="font-normal italic">Lite</i>
        </h1>
    </div>
);

const PokedexHeader = () => (
    <div className="">
        <div className="fixed top-0 left-0 right-0 select-none xs:right-4">
            <PokedexHeaderContent className="invisible-children pointer-events-none bg-slate-800" />
            <div className="h-2 bg-gradient-to-b from-slate-800"></div>
        </div>

        <div className="fixed top-0 select-none">
            <PokedexHeaderContent />
        </div>
        <div className="pt-[4.2rem]" />
    </div>
);

const MainScreen = () => (
    <div className="h-screen overflow-y-auto bg-slate-800">
        <SidebarLayout className="max-w-screen-xl">
            <Sidebar>
                <FiltersPanel />
            </Sidebar>
            <main className="basis-full will-change-contents">
                <PokedexHeader />
                <PokemonList />
            </main>
        </SidebarLayout>
    </div>
);

const App = () => {
    const { data, error } = usePokeAPI([initialDataQuery]);
    if (error) return <div>An error has occurred: {error.toString()}</div>;
    if (!data) return "Loading...";

    return (
        <StoreProvider typeFiltersList={data?.types} logging={import.meta.env.DEV}>
            <MainScreen />
        </StoreProvider>
    );
};

export default App;
