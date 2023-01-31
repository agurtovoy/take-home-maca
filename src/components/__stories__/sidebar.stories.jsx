import { SidebarLayout, Sidebar, OpenSideBarButton } from "@/components/sidebar";
import { configure, number } from "@/lib/storybook";

export default {
    component: Sidebar,
    title: "components/Sidebar",
    argTypes: {
        sidebarItems: number(5),
        contentItems: number(20),
    },
};

const Story = ({ sidebarItems, contentItems }) => (
    <SidebarLayout className="h-screen max-w-screen-lg bg-gray-800">
        <Sidebar>
            <aside className="h-screen w-full overflow-y-auto bg-gray-700 p-4">
                <h2 className="text-md pt-1 font-bold">Sidebar</h2>
                <ul className="mt-2">
                    {[...Array(sidebarItems).keys()].map(i => (
                        <li key={i}>Item {i}</li>
                    ))}
                </ul>
            </aside>
        </Sidebar>
        <main className="basis-full overflow-y-auto">
            <div className="sticky top-0 flex bg-slate-800 px-2 py-4">
                <OpenSideBarButton />
                <h1 className="text-lg font-bold text-white">Content</h1>
            </div>
            <ul className="ss-duration mx-4 mb-4 grid gap-4 transition-all grid-auto-fit-sm">
                {[...Array(contentItems).keys()].map(i => (
                    <li
                        key={i}
                        className="flex flex-col items-center justify-center rounded-lg bg-slate-700 p-8 px-12 text-7xl"
                    >
                        {i}
                    </li>
                ))}
            </ul>
        </main>
    </SidebarLayout>
);

export const Default = configure(Story, {}, { layout: "fullscreen" });
