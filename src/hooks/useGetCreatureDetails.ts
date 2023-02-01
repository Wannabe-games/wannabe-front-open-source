import { useMemo } from 'react';

import { UserCreatureDetailsModel } from '@/models/user-creature-details.model';
import { useGetUserCreatureDetailsQuery } from '@/store/services/creatureRacer.service';

export const useGetCreatureDetails = (id?: string) => {
    const {
        data: creature,
        isFetching,
        error,
        isLoading,
    } = useGetUserCreatureDetailsQuery(id, { skip: !id });

    const memoizedCreature = useMemo(
        () => creature && new UserCreatureDetailsModel(creature),
        [creature],
    );

    return {
        creature: memoizedCreature,
        isFetching,
        error,
        isLoading,
    };
};
