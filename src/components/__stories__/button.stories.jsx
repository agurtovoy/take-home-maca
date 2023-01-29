import Button from "@/components/button";
import { withArgs, select, boolean } from "@/lib/storybook";

export default {
    component: Button,
    title: "components/Button",
    argTypes: {
        size: select(["sm", "md", "lg"], "md"),
        variant: select(["primary", "secondary"], "primary"),
        disabled: boolean(),
    },
};

const Story = ({ title, ...args }) => <Button {...args}>{title}</Button>;

export const Primary = withArgs(Story, { title: "Let's go" });
export const Secondary = withArgs(Story, { title: "Never mind", variant: "secondary" });

export const Paired = ({ size, disabled, ...args }) => (
    <div className="flex space-x-4">
        <Button size={size} disabled={disabled} variant="secondary">
            Never mind
        </Button>
        <Button size={size} disabled={disabled}>
            Let's go
        </Button>
    </div>
);
