import clsx from "clsx";
import { CSSTransition } from "@/components/css-transition";
import PokeBall from "@/components/svg/pokeball.svg";

export const Spinner = ({ className }) => (
    <div className={clsx(className, "pointer-events-none z-30 flex h-32 w-32 items-center justify-center")}>
        <CSSTransition
            show={true}
            appear={true}
            enter="transition-opacity delay-500 duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-40"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-40"
            leaveTo="opacity-0"
        >
            <div>
                <PokeBall className="w-full animate-spin fill-slate-500" />
            </div>
        </CSSTransition>
    </div>
);
