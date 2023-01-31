export const configure = (Story, args, params) => {
    const result = Story.bind({});
    result.args = args;
    result.parameters = params;
    return result;
};

// roughly based on https://dev.to/admitkard/storybook-controls-the-easy-way-5g4p
export const select = (options, defaultValue, { type } = {}) => ({
    options,
    defaultValue: defaultValue || options[0],
    control: { type: type || "select" },
});

export const boolean = (defaultValue, { type } = {}) => ({
    defaultValue: defaultValue || false,
    control: { type: type || "boolean" },
});

export const text = (defaultValue, { type } = {}) => ({
    defaultValue: defaultValue || "",
    control: { type: type || "text" },
});

export const number = (defaultValue, { type, min, max, step } = {}) => ({
    defaultValue: defaultValue || 0,
    control: { type: type || "number", min: min || -Infinity, max: max || Infinity, step: step || 1 },
});

export const date = (defaultValue, { type } = {}) => ({
    defaultValue: defaultValue || new Date(),
    control: { type: type || "date" },
});

export const object = (defaultValue, { type, min, max, step } = {}) => ({
    defaultValue: defaultValue || {},
    control: { type: type || "object" },
});

export const action = actionName => ({
    action: actionName,
});
