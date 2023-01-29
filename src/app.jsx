import { useState } from "react";

const App = () => {
    const [count, setCount] = useState(0);
    return (
        <main className="flex h-screen flex-col">
            <main className="m-auto flex flex-col gap-4">
                <h1 className="text-3xl font-bold">Hello, world</h1>
                <button
                    className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                    onClick={() => setCount(count => count + 1)}
                >
                    count is {count}
                </button>
            </main>
        </main>
    );
};

export default App;
