import { Sidebar, SidebarLayout } from "@/components/sidebar";
import { FiltersPanel } from "@/components/filters/panel";
import { Pokedex } from "@/components/pokemon/pokedex";
import { Spinner } from "@/components/spinner";
import { StoreProvider } from "@/components/store";

import { usePokemonTypesQuery } from "@/lib/api/poke-api";

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
    const { data, error } = usePokemonTypesQuery();
    if (!data || error) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-slate-800">
                <Spinner />
            </div>
        );
    }

    return (
        <StoreProvider typeFiltersList={data?.types} logging={import.meta.env.DEV}>
            <MainScreen />
        </StoreProvider>
    );
};

export default App;
