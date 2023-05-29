"use client";

import {useRef, useState} from "react";
import useOutclick from "@/lib/use-outclick";

type MultiSelectProps = {
    name: string;
    updateOptions: (search: string) => Promise<string[]>;
}

export default function MultiSelect({name, updateOptions}: MultiSelectProps) {
    const wrapperRef = useRef(null);
    useOutclick(wrapperRef, () => setIsOpen(false));

    const [selected, setSelected] = useState<string[]>([]);
    const [search, setSearch] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [options, setOptions] = useState<string[]>([]);

    const toggleOption = (option: string) => {
        if (selected.includes(option)) {
            setSelected(selected.filter((item) => item !== option));
        } else {
            setSelected([...selected, option]);
        }

        setSearch("");
    }

    const focus = () => {
        setIsOpen(true);
        updateOptions(search).then(setOptions);
    }

    return (
        <div ref={wrapperRef} className="multi-select">
            <div className="multi-select__selected">
                {selected.map((option) => (
                    <span className="multi-select__selected-item" key={option}>
                        {option}
                        <button className="multi-select__selected-item-remove"
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
                    {options.map((option) => (
                        <div className="multi-select__option" key={option} onClick={() => toggleOption(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
            <input style={{
                display: "none"
            }} name={name} value={selected} readOnly></input>
        </div>
    )
}

