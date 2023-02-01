import isEqual from 'lodash/isEqual';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Scroll from 'react-scroll';

import tigerSrc from '@/assets/img/shorts/tiger.png';
import { Dropdown } from '@/components/atoms/Dropdown';
import { Typography } from '@/components/atoms/Typography';
import { UserCreatureCard } from '@/components/molecules/CreatureCard/UserCreatureCard';
import { FilteringSection } from '@/components/molecules/FilteringSection';
import { Headers } from '@/components/molecules/Headers';
import { STAT_TYPES } from '@/components/molecules/Headers/Headers.types';
import { InternalServerError } from '@/components/molecules/InternalServerError';
import { getCreaturesList } from '@/helpers/get-creature-list';
import { useGetUserCreatures } from '@/hooks/useGetUserCreatures';
import { ILocationState } from '@/interfaces/LocationState';
import { UserCreatureModel } from '@/models/user-creature.model';

import * as Styled from './MyPets.styles';

const filters = [
    { label: 'all', value: 'all' },
    { label: 'staked', value: 'staked' },
    { label: 'available for mint', value: 'mint' },
    { label: `my NFT's`, value: `nft` },
    { label: 'expired', value: 'expired' },
];

// TODO: handle isFetching
export const MyPetsPage = () => {
    const [page, setPage] = useState(1);
    const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
    const { creatures: initialUserCreatures, totalResults = 0 } = useGetUserCreatures();
    const { creatures: userCreatures, error, refetch } = useGetUserCreatures({ page });
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [creaturesList, setCreaturesList] = useState<UserCreatureModel[]>([]);

    const location = useLocation();
    const state = location.state as ILocationState;
    const prevAction = state?.from;

    const stakedCreaturesAmount = useMemo(() => {
        return initialUserCreatures.filter((creature) => creature.isStaked).length;
    }, [initialUserCreatures]);

    const nftsAmount = useMemo(() => {
        return initialUserCreatures.filter((creature) => creature.isNFT).length;
    }, [initialUserCreatures]);

    const creaturesReadyToUpgradeAmount = useMemo(() => {
        return initialUserCreatures.filter((creature) => creature.isNFT && !creature.isStaked)
            .length;
    }, [initialUserCreatures]);

    useEffect(() => {
        const resultsAmount = initialUserCreatures.length + userCreatures.length;

        if (resultsAmount === totalResults) {
            setCanLoadMore(false);
        }
    }, [initialUserCreatures.length, totalResults, userCreatures.length]);

    useEffect(() => {
        if (userCreatures.length || initialUserCreatures.length) {
            const newCreaturesList = getCreaturesList(initialUserCreatures, userCreatures);
            const shouldSetCreaturesList = isEqual(creaturesList, newCreaturesList);

            if (!shouldSetCreaturesList) {
                setCreaturesList(newCreaturesList);

                if (prevAction === 'buy' && !creaturesList.length) {
                    Scroll.animateScroll.scrollToBottom({ smooth: false });
                }
            }
        }
    }, [userCreatures, initialUserCreatures, creaturesList, prevAction]);

    const handleFilterChange = (selectedFilter: string) => {
        setSelectedFilter(selectedFilter);
    };
    const handleSetPage = () => {
        if (canLoadMore) {
            setPage(page + 1);
        }
    };

    const filteredCreatures = useMemo(() => {
        const filteredCreatures = creaturesList;

        switch (selectedFilter) {
            case 'all':
                return filteredCreatures;
            case 'staked':
                return filteredCreatures.filter((creature) => creature.isStaked);
            case 'nft':
                return filteredCreatures.filter((creature) => creature.isNFT);
            case 'mint':
                return filteredCreatures.filter((creature) => !creature.isNFT);
            case 'expired':
                return filteredCreatures.filter(
                    (creature) =>
                        creature.nftExpirationDate &&
                        new Date(creature.nftExpirationDate).getTime() < new Date().getTime(),
                );
            default:
                return filteredCreatures;
        }
    }, [creaturesList, selectedFilter]);

    const handleFilterChangeDropdown = ({ value }: { value: string | number | null }) => {
        typeof value === 'string' && setSelectedFilter(value);
    };

    const CreaturesList = useMemo(() => {
        if (error) {
            return <InternalServerError handleTryAgainClick={refetch} error={error} withPadding />;
        }

        return filteredCreatures.length === 0 ? (
            <Typography variant="h5">Creatures not found... :(</Typography>
        ) : (
            <Styled.CreaturesList>
                {filteredCreatures.map((creature) => (
                    <UserCreatureCard key={creature.id} creature={creature} />
                ))}

                {canLoadMore && (
                    <Styled.MoreCreaturesButton
                        secondary
                        label="More Creatures! More...!"
                        onClick={handleSetPage}
                    />
                )}
            </Styled.CreaturesList>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredCreatures, canLoadMore]);

    return (
        <>
            <Styled.MyPetsPage>
                <Styled.HeaderWrapper>
                    <Headers
                        rightImage={tigerSrc}
                        stats={[
                            {
                                label: 'All Pets',
                                value: totalResults.toString(),
                                type: STAT_TYPES.VALUE,
                            },
                            {
                                label: 'Total staked',
                                value: stakedCreaturesAmount.toString(),
                                type: STAT_TYPES.VALUE,
                            },
                            {
                                label: "My minted NFT's",
                                value: nftsAmount.toString(),
                                type: STAT_TYPES.VALUE,
                            },
                            {
                                label: 'Ready to upgrade',
                                value: creaturesReadyToUpgradeAmount.toString(),
                                type: STAT_TYPES.VALUE,
                            },
                        ]}
                        title="My Pets"
                    />
                </Styled.HeaderWrapper>
                <Styled.CreatureListHeader>
                    <FilteringSection
                        filters={filters}
                        selectedFilter={selectedFilter}
                        handleFilterChange={handleFilterChange}
                    />
                    <Dropdown
                        label="All"
                        options={filters}
                        onChangeAction={handleFilterChangeDropdown}
                    />
                </Styled.CreatureListHeader>
                {CreaturesList}
            </Styled.MyPetsPage>
        </>
    );
};
