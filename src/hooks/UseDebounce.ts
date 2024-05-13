import React from 'react';
import {useEffect, useCallback, useRef, RefObject} from 'react';

export default function useDebounce<T>(
    effect: (value: T) => void,
    dependencies: any[], // Can be refined based on specific use case
    delay: number,
    initialValue?: T // Optional for initial value handling
): RefObject<T> {
    const callback = useCallback((value: T) => effect(value), dependencies);

    // Use useRef to create a mutable ref for timeout
    const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Initialize with null

    useEffect(() => {
        // Clear any existing timeout before setting a new one
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Assign the timeout reference using a callback function
        timeoutRef.current = setTimeout(() => callback(initialValue || (dependencies[0] as T)), delay) as NodeJS.Timeout;

        // Cleanup function to clear timeout on unmount
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [callback, delay, ...dependencies, initialValue]); // Include initialValue in deps

    // Return an empty ref for compatibility
    return React.createRef<T>();
}