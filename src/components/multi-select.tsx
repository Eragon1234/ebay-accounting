"use client";

import {useEffect, useState} from "react";
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

    useEffect(() => {
        updateOptions(search).then(setOptions);
    }, [search, updateOptions])

    const toggleOption = (option: [string, string]) => {
        const [key, value] = option;

        const newSelected = {...selected};
        if (newSelected[key]) {
            delete newSelected[key];
        } else {
            newSelected[key] = value;
        }
        setSelected(newSelected);
        setSearch("");
    }

    const focus = () => {
        setIsOpen(true);
        updateOptions(search).then(setOptions);
    }

    const close = () => setIsOpen(false);

    return (
        <div ref={useOutclick(close)} className="multi-select">
            <div className="multi-select__selected">
                {Object.entries(selected).map((option) => (
                    <span className="multi-select__selected-item" key={option[0]}>
                        {option[1]}
                        <button type="button" className="multi-select__selected-item-remove"
                                onClick={() => toggleOption(option)}>X</button>
                    </span>
                ))}
            </div>
            <input className="multi-select__search" value={search} onFocus={focus}
                   onInput={event => setSearch(event.currentTarget.value)}/>
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

