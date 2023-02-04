import { Sidebar, SidebarLayout } from "@/components/sidebar";
import { FiltersPanel } from "@/components/filters/panel";
import { Pokedex } from "@/components/pokemon/pokedex";
import { StoreProvider } from "@/components/store";

import { usePokeAPI, gql } from "@/lib/poke-api";

const typesQuery = gql`
    query typesQuery {
        types: pokemon_v2_type(where: { name: { _neq: "unknown" } }) {
            name
            id
        }
    }
`;

const MainScreen = () => (
    <div className="h-screen overflow-y-auto bg-slate-800">
        <SidebarLayout className="max-w-screen-xl">
            <Sidebar>
                <FiltersPanel />
            </Sidebar>
            <main className="basis-full">
                <Pokedex />
            </main>
        </SidebarLayout>
    </div>
);

const App = () => {
    const { data, error } = usePokeAPI([typesQuery]);
    if (error) return <div>An error has occurred: {error.toString()}</div>;
    if (!data) return "Loading...";

    return (
        <StoreProvider typeFiltersList={data?.types} logging={import.meta.env.DEV}>
            <MainScreen />
        </StoreProvider>
    );
};

export default App;
