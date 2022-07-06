import type { RefObject } from 'react';
import { useEffect, useCallback } from 'react';

export const useOnClickOutside = (
    rootRef: RefObject<Element>,
    handler: (e: Event) => void,
): void => {
    const handleClickOutside = useCallback((e: Event): void => {
        if (!rootRef.current || rootRef.current.contains(e.target as Node)) {
            return;
        }
        handler(e);
    }, [rootRef, handler]);

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside, true);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, [rootRef, handler, handleClickOutside]);
};
