import { useCallback, useMemo, useState } from 'react';

import { UserCreatureModel } from '@/models/user-creature.model';
import { useTypedSelector } from '@/store';
import {
    creatureRacerApi,
    useGetUserCreaturesQuery,
} from '@/store/services/creatureRacer.service';

const filters = [
    { label: 'all', value: 'all' },
    { label: 'staked', value: 'staked' },
    { label: 'available for mint', value: 'mint' },
    { label: `my NFT's`, value: `nft` },
    { label: 'expired', value: 'expired' },
];

export const useGetUserCreatures = (props?: UseGetUserCreaturesProps) => {
    const [selectedFilter, setSelectedFilter] = useState<UserCreaturesFilters>('all');
    const page = props?.page;
    const { error } = useTypedSelector(creatureRacerApi.endpoints.getUserCreatures.select(null));

    const handleFilterChange = useCallback((value: UserCreaturesFilters) => {
        setSelectedFilter(value);
    }, []);

    const {
        data,
        isFetching,
        error: userCreaturesError,
        refetch,
        isLoading,
    } = useGetUserCreaturesQuery(page === 1 ? null : page || null, {
        skip: !!error || page === 1 || !!props?.skip,
    });

    const memoizedCreatures = useMemo(
        () => data?.creatures && data.creatures.map((creature) => new UserCreatureModel(creature)),
        [data],
    );

    // TODO: Should be handled in the backend
    const filteredCreatures = useMemo(() => {
        const filteredCreatures = memoizedCreatures;

        switch (selectedFilter) {
            case 'all':
                return filteredCreatures;
            case 'staked':
                return filteredCreatures?.filter((creature) => creature.isStaked);
            case 'nft':
                return filteredCreatures?.filter((creature) => creature.isNFT);
            case 'mint':
                return filteredCreatures?.filter((creature) => !creature.isNFT);
            case 'expired':
                return filteredCreatures?.filter(
                    (creature) =>
                        creature.nftExpirationDate &&
                        new Date(creature.nftExpirationDate).getTime() < new Date().getTime(),
                );
            default:
                return filteredCreatures;
        }
    }, [memoizedCreatures, selectedFilter]);

    return {
        creatures: filteredCreatures || [],
        error: userCreaturesError,
        filters,
        handleFilterChange,
        isFetching,
        isLoading,
        refetch,
        selectedFilter,
        totalResults: data?.maxResults,
    };
};

interface UseGetUserCreaturesProps {
    page?: number;
    skip?: boolean;
}

export interface IUserCreaturesFilter {
    label: string;
    value: string;
}

export type UserCreaturesFilters = 'all' | 'staked' | 'nft' | 'mint' | 'expired';
