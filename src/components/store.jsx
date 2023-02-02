import { useRef } from "react";
import { createContext, useContext } from "react";
import { useStore as useStore_ } from "zustand";

import { createFiltersStore } from "@/lib/store";

const StoreContext = createContext(null);

export const StoreProvider = ({ children, ...props }) => {
    const storeRef = useRef();
    if (!storeRef.current) {
        storeRef.current = createFiltersStore(props);
    }
    return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

export const useStore = (selector, equalityFn) => {
    const store = useContext(StoreContext);
    if (!store) throw new Error("Missing StoreContext.Provider in the tree");
    return useStore_(store, selector, equalityFn);
};
