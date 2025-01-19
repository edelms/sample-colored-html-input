import { createEffect, createSignal, For } from "solid-js";

type Props = {
    value: string;
    onChange: (value: string) => void;
    colorTable: Color[];
}

type Color = {
    start: number;
    length: number;
    color: string;
}

type MappedValue = {
    value: string;
    color: string;
}

export const ColoredInput = (props: Props) => {

    let input: HTMLInputElement | undefined;
    let span: HTMLSpanElement | undefined;

    const [value, setValue] = createSignal(props.value);
    createEffect(() => setValue(props.value));

    const mappedValues = () => mapColors(value(), props.colorTable);

    createEffect(() => {
        value();
        requestAnimationFrame(() => {
            if (!input || !span) return;
            input.style.width = span.clientWidth + 'px';
        });
    });

    return (
        <div class="relative isolate overflow-x-auto border border-sky-700 rounded-sm outline-none outline-1 outline-offset-0 focus-within:outline-sky-600"
            style={{ 'scrollbar-width': 'none' }}
        >
            <input ref={input} type='text' size=''
                class="relative z-10 px-2 py-0.5 font-mono text-base text-transparent outline-0 caret-sky-700"
                value={value()}
                onInput={e => setValue(e.currentTarget.value)}
                onChange={e => props.onChange(e.currentTarget.value)}
            />
            <span ref={span}
                class="absolute left-0 top-0 min-w-full pl-2 pr-4 py-0.5 z-20 font-mono text-base pointer-events-none whitespace-nowrap"
            >
                <For each={mappedValues()}>
                    {mappedValue => (
                        <span style={{ color: mappedValue.color }}>{mappedValue.value}</span>
                    )}
                </For>
            </span>
        </div>
    );
}

const mapColors = (value: string, colorTable: Color[], defaultColor: string = 'black'): MappedValue[] => {
    const result: MappedValue[] = [];

    let current: string = '';
    let currentColor: string = colorTable.find(x => x.start === 0)?.color ?? defaultColor;
    const push = () => {
        if (!current) return;
        result.push({ value: current, color: currentColor });
        current = '';
    }

    for (let i = 0; i < value.length; i++) {
        current += value[i];
        const newColor = findColorAt(i, colorTable, defaultColor);
        if (newColor !== currentColor) {
            push();
            currentColor = newColor;
        }
    }
    push();

    return result;
}

const findColorAt = (idx: number, colorTable: Color[], defaultColor: string) => {
    const result = colorTable.find(x => x.start - 1 <= idx && x.start - 1 + x.length > idx);
    if (result) return result.color;
    return defaultColor;
}