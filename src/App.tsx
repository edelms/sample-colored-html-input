import { createSignal } from "solid-js"
import { ColoredInput } from "./components/ColoredInput"

function App() {

    const [value, setValue] = createSignal('DemoTextDemoText');

    return (
        <>
            <div class='px-6 py-4 flex flex-col gap-2 max-w-80'>
                <h1 class="text-2xl font-semibold">Colored Input Demo</h1>
                <ColoredInput
                    value={value()}
                    onChange={setValue}
                    colorTable={[
                        { start: 0, length: 4, color: 'red' },
                        { start: 5, length: 4, color: 'green' },
                        { start: 10, length: 4, color: 'orange' },
                        { start: 15, length: 4, color: 'lightgrey' },
                    ]}
                />
            </div>
        </>
    )
}

export default App
