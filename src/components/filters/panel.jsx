import clsx from "clsx";

import { useStore } from "@/components/store";

const CategorySelector = ({ name, selected, onChange }) => (
    <label
        className={clsx(
            "inline-block cursor-pointer rounded-full border-2 border-slate-600 py-1 px-3 text-slate-300",
            selected
                ? "bg-white text-slate-500 hover:text-slate-800"
                : "bg-transparent hover:border-slate-400 hover:text-slate-200"
        )}
    >
        <input
            type="checkbox"
            className="w-0 opacity-0"
            name={name}
            checked={!!selected}
            onChange={e => onChange(e.target.checked)}
        />
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

export const FiltersPanel = () => {
    const filters = Object.entries(useStore(s => s.typeFilters));
    const selection = useStore(s => s.typeSelection);
    const selectType = useStore(s => s.selectType);

    return (
        <div className="h-screen overflow-y-auto bg-gray-700">
            <FiltersHeader />
            <fieldset className="flex flex-col items-start gap-2 py-4 pl-5 pt-0 pr-7">
                {filters.map(([id, name]) => (
                    <CategorySelector
                        key={id}
                        name={name}
                        selected={selection[id]}
                        onChange={selected => selectType(id, selected)}
                    />
                ))}
            </fieldset>
        </div>
    );
};
