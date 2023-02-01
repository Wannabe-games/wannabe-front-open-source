import { useMemo } from 'react';

import { CreatureModel } from '@/models/creature.model';
import { useGetRegisterCreaturesQuery } from '@/store/services/creatureRacer.service';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

interface IUseGetCreatures {
    creatures: CreatureModel[];
    isFetching: boolean;
    error?: FetchBaseQueryError | SerializedError;
}

export const useGetRegistrationCreatures = (shouldCostNoStacks: boolean): IUseGetCreatures => {
    const {
        data: registrationCreatures,
        isFetching: isFetching,
        error: error,
    } = useGetRegisterCreaturesQuery(null);

    const memoizedCreatures = useMemo(
        () =>
            registrationCreatures &&
            registrationCreatures.map((creatureData) => {
                const creature = new CreatureModel(creatureData);

                creature.shouldCostNoGold = true;
                creature.shouldRedirectToStep4 = true;

                if (shouldCostNoStacks || creature.id === '1') {
                    creature.shouldCostNoStacks = true;
                }

                return creature;
            }),
        [registrationCreatures, shouldCostNoStacks],
    );

    return {
        creatures: memoizedCreatures || [],
        isFetching,
        error,
    };
};
