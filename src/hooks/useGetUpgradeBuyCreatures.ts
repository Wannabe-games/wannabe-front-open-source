import { useMemo } from 'react';

import { Filter } from '@/components/molecules/FilteringSection/FilteringSection.types';

import { useGetCreatures } from './useGetCreatures';
import { useGetUserCreatures } from './useGetUserCreatures';

interface UseGetUpgradeBuyCreaturesProps {
    filter: Filter;
}

export const useGetUpgradeBuyCreatures = ({ filter }: UseGetUpgradeBuyCreaturesProps) => {
    const {
        creatures: userCreatures,
        isFetching: isFetchingUserCreatures,
        error: userCreaturesError,
    } = useGetUserCreatures({ page: 0, skip: filter === 'buy' });
    const {
        creatures,
        isFetching: isFetchingCreatures,
        error: creaturesError,
    } = useGetCreatures({
        skip: filter === 'upgrade',
    });

    const isFetching = isFetchingUserCreatures || isFetchingCreatures;

    const memoizedCreatures = useMemo(() => {
        return isFetching ? [] : [...userCreatures, ...creatures];
    }, [isFetching, userCreatures, creatures]);

    return {
        creatures: memoizedCreatures,
        isFetching: isFetchingUserCreatures || isFetchingCreatures,
        error: userCreaturesError || creaturesError,
    };
};
