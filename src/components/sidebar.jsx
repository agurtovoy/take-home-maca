import { useEffect, useState, createContext, useContext } from "react";
import clsx from "clsx";

import { useScreen } from "@/lib/tailwind";
import CloseSidebarIcon from "@/components/svg/arrows-left.svg";
import OpenSidebarIcon from "@/components/svg/arrows-right.svg";

const useSidebar = () => {
    const [isShown, setShown] = useState({ small: false, large: true });
    const key = useScreen("ss") ? "large" : "small";
    const show = (value, key) => setShown(state => ({ ...state, [key]: value }));

    useEffect(() => {
        if (key === "large") show(false, "small");
    }, [key]);

    return {
        isShown: isShown[key],
        show: () => show(true, key),
        hide: () => show(false, key),
    };
};

const SidebarContext = createContext(null);

export const SidebarLayout = ({ children, className }) => {
    const sidebarState = useSidebar();
    return (
        <SidebarContext.Provider value={sidebarState}>
            <div className={clsx("relative m-auto overflow-x-clip ss:flex", className)}>{children}</div>
        </SidebarContext.Provider>
    );
};

export const Sidebar = ({ children }) => {
    const { isShown, hide } = useContext(SidebarContext);

    return (
        <>
            <aside className="pointer-events-none fixed top-0 z-50 h-screen">
                <div className="relative overflow-x-clip">
                    <div className="pr-4">
                        <div className="ss-w-full" />
                    </div>
                    <div
                        className={clsx(
                            "ss-duration ss-w-full absolute top-0 left-0 transform-gpu select-none opacity-100 transition will-change-transform",
                            isShown
                                ? "pointer-events-auto ss:translate-x-0 ss:opacity-100"
                                : "-translate-x-full ss:opacity-0"
                            //                        forceClose ? "ss:opacity-0" : "ss:translate-x-0 ss:opacity-100"
                            // state.forceClose ? "" : "ss:translate-x-0"
                        )}
                    >
                        <HideButton isShown={isShown} onClick={hide} />
                        {children}
                    </div>
                </div>
            </aside>
            <SidebarSpacer isShown={isShown} />
            <ModalOverlay isShown={isShown} onClick={hide} />
        </>
    );
};

export const OpenSideBarButton = () => {
    const { isShown, show } = useContext(SidebarContext);
    return (
        <button
            onClick={show}
            className={clsx(
                "group ml-3 mr-3 scale-100 rounded-md bg-slate-700 p-2 opacity-100",
                "ss-duration transition-all",
                isShown && "ss:mr-0 ss:ml-0 ss:scale-0 ss:opacity-0"
            )}
        >
            <OpenSidebarIcon
                className={clsx(
                    "ss-duration h-4 w-4 fill-slate-500 transition-all group-hover:fill-slate-400",
                    isShown && "ss:w-0"
                )}
            />
        </button>
    );
};

const HideButton = ({ isShown, onClick }) => (
    <div className="relative flex">
        <button
            onClick={onClick}
            className={clsx(
                "pointer-events-none absolute top-4 right-0 z-50 flex h-8 w-6 items-center justify-center rounded-md bg-slate-700 p-2 opacity-0",
                "ss-duration group transition-all ss:pointer-events-auto",
                isShown ? "ss:-right-2 ss:opacity-100" : "ss:right-0 ss:opacity-0"
            )}
        >
            <CloseSidebarIcon className="fill-slate-500 group-hover:fill-slate-400" />
        </button>
    </div>
);

const SidebarSpacer = ({ isShown }) => (
    <div
        className={clsx(
            "ss-duration hidden h-screen shrink-0 grow-0 transition-all will-change-contents ss:block",
            isShown ? "ss-w-full" : "w-0"
        )}
    ></div>
);

const ModalOverlay = ({ isShown, onClick }) => (
    <div
        onClick={onClick}
        className={clsx(
            "fixed inset-0 z-40 bg-gray-800 transition-opacity duration-300 will-change-transform ss:hidden",
            isShown ? "opacity-75" : "-translate-x-full opacity-0"
        )}
    />
);
