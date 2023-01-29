import { useState } from "react";
import Button from "@/components/button";

const App = () => {
    const [count, setCount] = useState(0);
    return (
        <main className="flex h-screen flex-col">
            <main className="m-auto flex flex-col gap-4">
                <h1 className="text-3xl font-bold">Hello, world</h1>
                <Button onClick={() => setCount(count => count + 1)}>count is {count}</Button>
            </main>
        </main>
    );
};

export default App;
