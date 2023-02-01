import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';

type DebounceType = boolean | string | number;

export const useDebounce = (value: DebounceType, timeout = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<DebounceType>('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSetDebouncedValue = useCallback(
        debounce((refCode) => {
            setDebouncedValue(refCode);
        }, timeout),
        [],
    );

    useEffect(() => {
        handleSetDebouncedValue(value);
    }, [value, handleSetDebouncedValue]);

    return debouncedValue;
};
