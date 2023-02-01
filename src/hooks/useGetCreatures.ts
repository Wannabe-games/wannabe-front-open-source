import { useMemo } from 'react';

import { CreatureModel } from '@/models/creature.model';
import { useGetCreaturesQuery } from '@/store/services/creatureRacer.service';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

interface IUseGetCreatures {
    creatures: CreatureModel[];
    isFetching: boolean;
    error?: FetchBaseQueryError | SerializedError;
    refetch: () => void;
}

interface UseGetCreaturesProps {
    skip?: boolean;
}

export const useGetCreatures = (props?: UseGetCreaturesProps): IUseGetCreatures => {
    const {
        data: creatures,
        isFetching,
        error,
        refetch,
    } = useGetCreaturesQuery(null, { skip: !!props?.skip });

    const memoizedCreatures = useMemo(
        () => creatures && creatures.map((creature) => new CreatureModel(creature)),
        [creatures],
    );

    return {
        creatures: memoizedCreatures || [],
        isFetching,
        error,
        refetch,
    };
};
