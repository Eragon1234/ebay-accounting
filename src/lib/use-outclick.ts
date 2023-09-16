import {MutableRefObject, useEffect, useRef} from "react";

/**
 * Executes the given callback function when a click event occurs outside the referenced element.
 *
 * @param {() => void} callback - The function to be executed when an outside click occurs.
 * @return {MutableRefObject<any>} - The mutable reference object holding the reference to the element.
 */
export default function useOutclick(callback: () => void): MutableRefObject<any> {
    const ref: MutableRefObject<any> = useRef(null);

    useEffect(() => {
        function handleClickOutside(event: Event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);

    return ref;
}
