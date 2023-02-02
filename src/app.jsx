import clsx from "clsx";

import { Sidebar, SidebarLayout, OpenSideBarButton } from "@/components/sidebar";

import { usePokeAPI, gql } from "@/lib/poke-api";

const initialData = gql`
    query initialData {
        types: pokemon_v2_type(where: { name: { _neq: "unknown" } }) {
            name
            id
        }

        pokemon: pokemon_v2_pokemon(limit: 20, order_by: { id: asc }) {
            name
            base_experience
            id
            types: pokemon_v2_pokemontypes {
                id
            }
        }
    }
`;

const paddedId = (id, padding = 3) => String(id).padStart(padding, "0");

const thumbnailUrl = id => `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId(id)}.png`;

const PokemonCard = ({ id, name }) => (
    <div className="flex flex-col items-center rounded-lg bg-slate-700 px-4 py-3">
        <div className="flex w-full items-baseline justify-between">
            <h5 className="text-lg font-bold capitalize">{name}</h5>
            <div className="text-md font-semibold text-slate-500">#{paddedId(id, 4)}</div>
        </div>

        <img className="w-full max-w-xs select-none px-4 py-7" src={thumbnailUrl(id)} alt={name} />
    </div>
);

const CategorySelector = ({ id, name, selected }) => (
    <label
        className={clsx(
            "inline-block cursor-pointer rounded-full border-2 border-slate-600 py-1 px-3 text-slate-300",
            "hover:bg-white hover:text-slate-800",
            selected ? "bg-white" : "bg-transparent"
        )}
    >
        <input type="checkbox" className="w-0 opacity-0" name={name} value={selected} />
        <span className="moz-ml-n2px select-none capitalize">{name}</span>
    </label>
);

const FiltersHeader = () => (
    <div className="sticky top-0">
        <h2 className="mt-[1px] cursor-default whitespace-nowrap bg-gray-700 p-5 pb-3 text-sm font-semibold uppercase">
            Filter by type
        </h2>
        <div className="h-2 bg-gradient-to-b from-gray-700"></div>
    </div>
);

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

const App = () => {
    const { data, error } = usePokeAPI(initialData);
    if (error) return <div>An error has occurred: {error.toString()}</div>;
    if (!data) return "Loading...";

    return (
        <div className="h-screen overflow-y-auto bg-slate-800">
            <SidebarLayout className="max-w-screen-xl">
                <Sidebar>
                    <div className="h-screen overflow-y-auto bg-gray-700">
                        <FiltersHeader />
                        <fieldset className="flex flex-col items-start gap-2 py-4 pl-5 pt-0 pr-7">
                            {(data?.types || []).map(props => (
                                <CategorySelector key={props.id} {...props} />
                            ))}
                        </fieldset>
                    </div>
                </Sidebar>
                <main className="basis-full will-change-contents">
                    <PokedexHeader />
                    <ul className="min-w-screen ss-duration z-0 mx-5 mb-5 grid gap-4 bg-slate-800 transition-all grid-auto-fit-sm">
                        {(data?.pokemon || []).map(props => (
                            <li key={props.id}>
                                <PokemonCard {...props} />
                            </li>
                        ))}
                    </ul>
                </main>
            </SidebarLayout>
        </div>
    );
};

export default App;
