import { useLayoutEffect, useRef, useState, memo } from "react";
import { CSSTransition, useCSSTransition } from "@/components/css-transition";
import clsx from "clsx";

import PokeBall from "@/components/svg/pokeball.svg";

const paddedId = (id, padding = 3) => String(id).padStart(padding, "0");

const thumbnailUrl = id => `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId(id)}.png`;

export const Card = ({ children, transparent = false }) => (
    <div className={clsx("flex flex-col items-center rounded-lg px-4 py-3", !transparent && "bg-slate-700")}>
        {children}
    </div>
);

const ThumbnailPlaceholder = ({ shown, animateLeave, spinnerDelay, afterEnter }) => {
    const [animate, setAnimate] = useState(true);
    return (
        <CSSTransition
            show={shown}
            appear={true}
            enter="transition-scale delay-[200ms] duration-[1ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            afterEnter={afterEnter}
            hidden=""
        >
            <CSSTransition
                show={shown}
                appear={true}
                enter="transition-opacity delay-[150ms] duration-700"
                enterFrom="opacity-0"
                enterTo="opacity-20"
                leave={clsx("transition-opacity", animateLeave ? "duration-500" : "duration-[1ms]")}
                leaveFrom="opacity-20"
                leaveTo="opacity-0"
                afterLeave={() => setAnimate(false)}
            >
                <PokeBall
                    style={{ animationDelay: `${spinnerDelay}ms` }}
                    className={clsx(
                        "w-full min-w-[160px] fill-slate-600 p-5",
                        animate && "animate-[spin_5s_linear_infinite]"
                    )}
                />
            </CSSTransition>
        </CSSTransition>
    );
};

const ThumbnailImage = ({ shown, animateAppearance, id, alt, onLoad }) => {
    const [timestampMs] = useState(Date.now());
    const imageRef = useRef();
    const { mounted, className, ...props } = useCSSTransition({
        show: shown,
        enter: clsx("transition", animateAppearance ? "duration-500" : "duration-[1ms]"),
        enterFrom: animateAppearance ? "opacity-0 scale-0" : "opacity-100 scale-100",
        enterTo: "opacity-100 scale-100",
        hidden: "opacity-0 scale-0",
    });

    useLayoutEffect(() => {
        if (imageRef.current?.complete) {
            onLoad({ ms: 0 });
        }
    }, [onLoad]);

    return (
        <img
            ref={imageRef}
            className={clsx(className, "w-full max-w-xs select-none text-transparent")}
            src={thumbnailUrl(id)}
            alt={alt}
            onLoad={() => onLoad({ ms: Date.now() - timestampMs })}
            {...props}
        />
    );
};

const Thumbnail = ({ id, alt }) => {
    const [placeholderVisible, setPlaceholderVisible] = useState(false);
    const [loaded, setLoaded] = useState(null);

    const animateAppearance = loaded?.ms > 150 || placeholderVisible;
    return (
        <div className="zstack mx-4 my-7">
            <ThumbnailPlaceholder
                shown={!loaded}
                animateLeave={animateAppearance}
                spinnerDelay={-(id % 100) * 500}
                afterEnter={() => setPlaceholderVisible(true)}
            />

            <ThumbnailImage shown={loaded} animateAppearance={animateAppearance} id={id} alt={alt} onLoad={setLoaded} />
        </div>
    );
};

export const PokemonCard = memo(({ id, name }) => {
    return (
        <Card>
            <div className="flex w-full items-baseline justify-between">
                <h5 className="text-lg font-bold capitalize leading-5 text-slate-50">{name}</h5>
                <div className="text-md font-semibold text-slate-500">#{paddedId(id, 4)}</div>
            </div>
            <Thumbnail id={id} alt={name} />
        </Card>
    );
});
