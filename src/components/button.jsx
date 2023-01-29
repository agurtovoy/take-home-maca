import clsx from "clsx";

const Button = ({ type, size = "md", variant = "primary", onClick, children, ...props }) => (
    <button type={type} className="group" onClick={onClick} {...props}>
        <div
            className={clsx(
                "duration-300 group-enabled:transition-all",
                "rounded font-bold",
                "group-enabled:group-hover:-translate-y-[3px] group-enabled:group-active:translate-y-[0px]",
                {
                    "border-2 border-primary-600 bg-primary-600 text-white group-disabled:border-primary-400 group-disabled:bg-primary-400 group-disabled:text-primary-100":
                        variant === "primary",
                    "border-2 border-primary-600 text-primary-400 group-disabled:border-primary-300 group-disabled:text-primary-300":
                        variant === "secondary",
                },
                {
                    "py-2 px-3 text-sm": size === "sm",
                    "py-2 px-4": size === "md",
                    "py-2 px-5 text-lg": size === "lg",
                }
            )}
        >
            {children}
        </div>
    </button>
);

export default Button;
