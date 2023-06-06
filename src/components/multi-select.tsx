"use client";

import {useState} from "react";
import useOutclick from "@/lib/use-outclick";

type MultiSelectProps = {
    name: string;
    updateOptions: (search: string) => Promise<Options>;
}

type Options = { [key: string]: string };

export default function MultiSelect({name, updateOptions}: MultiSelectProps) {
    const [selected, setSelected] = useState<Options>({});
    const [search, setSearch] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [options, setOptions] = useState<Options>({});

    const toggleOption = (option: [string, string]) => {
        const newSelected = {...selected};
        if (newSelected[option[0]]) {
            delete newSelected[option[0]];
        } else {
            newSelected[option[0]] = option[1];
        }
        setSelected(newSelected);
        setSearch("");
    }

    const focus = () => {
        setIsOpen(true);
        updateOptions(search).then(setOptions);
    }

    return (
        <div ref={useOutclick(() => {
            setIsOpen(false);
        })} className="multi-select">
            <div className="multi-select__selected">
                {Object.entries(selected).map((option) => (
                    <span className="multi-select__selected-item" key={option[0]}>
                        {option[1]}
                        <button type="button" className="multi-select__selected-item-remove"
                                onClick={() => toggleOption(option)}>X</button>
                    </span>
                ))}
            </div>
            <input className="multi-select__search" value={search} onFocus={focus} onInput={async event => {
                setSearch(event.currentTarget.value);
                updateOptions(event.currentTarget.value).then(setOptions);
            }}></input>
            {isOpen && (
                <div className="multi-select__options">
                    {Object.entries(options).map((option) => (
                        <div className="multi-select__option" key={option[0]} onClick={() => toggleOption(option)}>
                            {option[1]}
                        </div>
                    ))}
                </div>
            )}
            <input style={{
                display: "none"
            }} name={name} value={JSON.stringify(selected)} readOnly></input>
        </div>
    )
}

