import { CSSTransition } from "@/components/css-transition";
import { configure, boolean } from "@/lib/storybook";
import PokeBall from "@/components/svg/pokeball.svg";

export default {
    component: CSSTransition,
    title: "components/CSSTransition",
    argTypes: {
        show: boolean(),
    },
};

const Story = ({ show }) => (
    <div className="h-20 w-20">
        <CSSTransition
            show={show}
            enter="transition-opacity delay-[1000ms] duration-[2000ms]"
            enterFrom="opacity-0"
            enterTo="opacity-40"
            leave="transition-all delay-[2000ms] duration-700"
            leaveFrom="opacity-40 scale-100"
            leaveTo="opacity-0 scale-0"
        >
            <div>
                <PokeBall className="w-full animate-spin fill-slate-500" />
            </div>
        </CSSTransition>
    </div>
);

export const Default = configure(Story, {});
