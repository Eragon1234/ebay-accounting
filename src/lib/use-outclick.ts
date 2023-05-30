import {MutableRefObject, RefObject, useEffect, useRef} from "react";

export default function useOutclick(callback: () => void): RefObject<any> {
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
