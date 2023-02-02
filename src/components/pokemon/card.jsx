const paddedId = (id, padding = 3) => String(id).padStart(padding, "0");

const thumbnailUrl = id => `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId(id)}.png`;

export const Card = ({ children }) => (
    <div className="flex flex-col items-center rounded-lg bg-slate-700 px-4 py-3">{children}</div>
);

export const PokemonCard = ({ id, name }) => (
    <Card>
        <div className="flex w-full items-baseline justify-between">
            <h5 className="text-lg font-bold capitalize">{name}</h5>
            <div className="text-md font-semibold text-slate-500">#{paddedId(id, 4)}</div>
        </div>

        <img className="w-full max-w-xs select-none px-4 py-7" src={thumbnailUrl(id)} alt={name} />
    </Card>
);
