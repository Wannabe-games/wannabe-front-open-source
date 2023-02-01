import { useEffect, useState } from 'react';

import { updateBalance } from '@/helpers/stacks/balance';
import { useTypedSelector } from '@/store';
import { useUsdPerStacksQuery } from '@/store/services/coingecko.service';
import { selectIsAuthenticated } from '@/store/slices/auth.slice';

export const useStoreBalance = (isConnected: boolean) => {
    const isAuthenticated = useTypedSelector(selectIsAuthenticated);
    const [isLoading, setIsLoading] = useState(true);
    const { data: usdPerStacks } = useUsdPerStacksQuery(null);

    useEffect(() => {
        if (isAuthenticated && isConnected) {
            const fetchUsdPerStacks = async (usdPerStacks: number) => {
                await updateBalance(usdPerStacks);
            };

            try {
                usdPerStacks && fetchUsdPerStacks(usdPerStacks);
            } catch (e) {
                console.error(e);
            }
        }

        setIsLoading(false);
    }, [isAuthenticated, isConnected, usdPerStacks]);

    return {
        isFetching: isLoading,
    };
};
