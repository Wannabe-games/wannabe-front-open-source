import { useMemo } from 'react';

import { MintcapCreaturesIn } from '@/interfaces/portal/MintcapCreaturesIn';
import { UserCreatureModel } from '@/models/user-creature.model';
import { useGetMintcapCreaturesQuery } from '@/store/services/creatureRacer.service';

export const useGetMintcapCreatures = ({
    filters,
    page,
}: {
    filters: MintcapCreaturesIn;
    page: number;
}) => {
    const {
        data: creatures,
        isFetching,
        error,
    } = useGetMintcapCreaturesQuery({ ...filters, page });

    const memoizedCreatures = useMemo(
        () => creatures && creatures.map((creature) => new UserCreatureModel(creature)),
        [creatures],
    );

    return {
        creatures: memoizedCreatures || [],
        isFetching,
        error,
    };
};
