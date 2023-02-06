import { useState, useEffect } from "react";
import clsx from "clsx";

export const useCSSTransition = ({
    show,
    appear,
    enter,
    enterFrom,
    enterTo,
    leave,
    leaveFrom,
    leaveTo,
    hidden = "hidden",
    afterEnter,
    afterLeave,
}) => {
    const [state, setState] = useState(show ? (appear ? "enterFrom" : "entered") : "left");

    useEffect(() => {
        switch (state) {
            case "leaving":
                if (show) setState("entering");
                break;

            case "left":
                if (show) setState("enterFrom");
                break;

            case "leaveFrom":
                if (show) setState("entered");
                break;

            case "entering":
                if (!show) setState("leaving");
                break;

            case "entered":
                if (!show) setState("leaveFrom");
                break;

            case "enterFrom":
                if (!show) setState("left");
                break;

            default:
                console.warn("Unexpected state in `useEffect`:", state);
        }
    }, [state, show]);

    const onTransitionEnd = () => {
        switch (state) {
            case "entering":
                setState("entered");
                afterEnter && afterEnter();
                break;

            case "leaving":
                setState("left");
                afterLeave && afterLeave();
                break;

            case "left":
            case "entered":
                break;

            default:
                console.warn("Unexpected state in `onTransitionEnd`:", state);
        }
    };

    const onAnimationEnd = () => {
        switch (state) {
            case "enterFrom":
                if (show) setState("entering");
                break;

            case "leaveFrom":
                if (!show) setState("leaving");
                break;

            case "left":
            case "entered":
                break;

            default:
                console.warn("Unexpected state in `onAnimationEnd`:", state);
        }
    };

    const mounted = state !== "left";
    const guaranteeRerender = "animate-noop";
    const stateTrace = import.meta.env.DEV ? `state-trace-${state}` : null;
    const className = clsx(stateTrace, {
        [clsx(enterFrom, guaranteeRerender)]: state === "enterFrom",
        [clsx(enterTo)]: state === "entered",
        [clsx(enter, enterTo)]: state === "entering",
        [clsx(leaveFrom, guaranteeRerender)]: state === "leaveFrom",
        [clsx(leaveTo)]: state === "left",
        [clsx(leave, leaveTo)]: state === "leaving",
        [clsx(hidden)]: !mounted,
    });

    return { mounted, className, onTransitionEnd, onAnimationEnd };
};

export const CSSTransition = ({ children, ...args }) => {
    const { mounted, ...props } = useCSSTransition(args);
    return <div {...props}>{children}</div>;
};
