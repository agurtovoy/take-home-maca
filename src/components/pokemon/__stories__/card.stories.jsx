import { PokemonCard } from "@/components/pokemon/card";
import { configure, select } from "@/lib/storybook";

export default {
    component: PokemonCard,
    title: "components/pokemon/PokemonCard",
    argTypes: {
        id: select([1, 2, 3], 1),
    },
};

const names = {
    1: "bulbasaur",
    2: "ivysaur",
    3: "venusaur",
};

const Story = ({ id }) => <PokemonCard key={id} id={id} name={names[id]} />;

export const Primary = configure(Story, {});
