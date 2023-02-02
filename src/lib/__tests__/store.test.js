import { expect, describe, test } from "vitest";
import { createFiltersStore } from "@/lib/store";

const filters = [
    {
        name: "normal",
        id: 101,
    },
    {
        name: "fighting",
        id: 17,
    },
    {
        name: "flying",
        id: 42,
    },
];

describe("correctly initialized", () => {
    test("list of types", () => {
        const store = createFiltersStore({
            typeFiltersList: filters,
        }).getState();

        expect(store.typeFilters).toMatchSnapshot();
        expect(store.typeSelection).toStrictEqual({});
    });

    test("null/undefined", () => {
        expect(createFiltersStore({ typeFiltersList: null }).getState().typeFilters).toStrictEqual({});
        expect(createFiltersStore({}).getState().typeFilters).toStrictEqual({});
    });
});

describe("selection", () => {
    test("set/unset", () => {
        const store = createFiltersStore({
            typeFiltersList: filters,
        }).getState();

        expect(store.selectedTypeIds()).toStrictEqual([]);
        expect(store.selectedTypeNames()).toStrictEqual([]);

        store.selectType(17, true);
        store.selectType(42, false);
        store.selectType(101, true);
        expect(store.selectedTypeIds()).toMatchSnapshot();
        expect(store.selectedTypeNames()).toMatchSnapshot();

        store.clearAll();
        expect(store.selectedTypeIds()).toStrictEqual([]);
        expect(store.selectedTypeNames()).toStrictEqual([]);
    });
});
