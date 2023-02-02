import { createStore } from "zustand";

export const createFiltersStore = ({ typeFiltersList, logging }) => {
    const typeFilters = (typeFiltersList || []).reduce((result, { id, name }) => ({ ...result, [id]: name }), {});
    const storeDef = (set, get) => ({
        typeFilters: { ...typeFilters },
        typeSelection: {},
        selectedTypes: () => Object.entries(get().typeSelection).filter(s => s[1]),
        selectedTypeIds: () =>
            get()
                .selectedTypes()
                .map(([id]) => parseInt(id, 10)),
        selectedTypeNames: () =>
            get()
                .selectedTypeIds()
                .map(id => typeFilters[id]),
        selectType: (id, selected) =>
            set(({ typeSelection }) => ({ typeSelection: { ...typeSelection, [id]: selected } })),
        clearAll: () => set({ typeSelection: {} }),
    });

    return logging ? createStore(withLogging(storeDef)) : createStore(storeDef);
};

const withLogging = config => (set, get, api) =>
    config(
        args => {
            console.log("-> applying:", args);
            set(args);
            console.log("-> new state:", get());
        },
        get,
        api
    );
