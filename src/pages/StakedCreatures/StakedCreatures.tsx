// TODO: Refactor

import { useEffect, useState } from 'react';

import creatureTeamSrc from '@/assets/img/shorts/creature-team.png';
import { Dropdown } from '@/components/atoms/Dropdown';
import { IOption } from '@/components/atoms/Dropdown/Dropdown.types';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Typography } from '@/components/atoms/Typography';
import { UserCreatureCard } from '@/components/molecules/CreatureCard/UserCreatureCard';
import { FilteringSection } from '@/components/molecules/FilteringSection';
import { Headers } from '@/components/molecules/Headers';
import { STAT_TYPES } from '@/components/molecules/Headers/Headers.types';
import { microStxToStx } from '@/helpers/stacks/micro-stx-to-stx';
import { useGetUserCreatures } from '@/hooks/useGetUserCreatures';
import { HeaderStatisticsOut } from '@/interfaces/contract/HeaderStatisticsOut';
import { UserCreatureModel } from '@/models/user-creature.model';
import { useUsdPerStacksQuery } from '@/store/services/coingecko.service';
import { useGetUserStatisticQuery } from '@/store/services/creatureRacer.service';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import * as Styled from './StakedCreatures.styles';

const filters = [
    { label: 'all', value: 'all', disabled: false },
    { label: 'available to unstake', value: 'unstake', disabled: false },
];

const options = [
    { label: 'All tiers', value: 'all' },
    { label: 'Tier 1', value: 'tier1' },
    { label: 'Tier 2', value: 'tier2' },
    { label: 'Tier 3', value: 'tier3' },
];

const creaturesTiers: { [key: string | number]: string[] } = {
    tier1: ['boar', 'bird', 'cow', 'frog', 'dog', 'squirrel', 'rhino'],
    tier2: ['hippo', 'elephant', 'gorilla', 'croko', 'giraffe', 'turtle', 'unicorn'],
    tier3: ['wolf', 'panda', 'raccoon', 'reindeer', 'bunny', 'dragon', 'tiger'],
};

export const StakedCreatures = () => {
    const [filter, setFilter] = useState('all');
    const [creatureList, setCreatureList] = useState<UserCreatureModel[]>([]);
    const [headerStatistics, setHeaderStatistics] = useState<HeaderStatisticsOut>({
        expiresSoon: 0,
        mintedInTotal: 0,
        myPoolShare: '0',
        readyToUpgrade: 0,
        referralLevel: null,
        rewardPool: 0,
        totalPoolShare: '0',
        totalStaked: 0,
    });
    const { creatures } = useGetUserCreatures();
    const { data: statistics } = useGetUserStatisticQuery(null);
    const stacksToUSD = useUsdPerStacksQuery(null);

    const exchangeRate = stacksToUSD?.data ? stacksToUSD.data : 0;

    useEffect(() => {
        statistics && setHeaderStatistics(statistics);
    }, [statistics]);

    const rewardPool =
        headerStatistics?.rewardPool && Math.round(microStxToStx(headerStatistics?.rewardPool));

    const handleFilterChange = (value: string) => {
        setFilter(value);
    };
    useEffect(() => {
        setCreatureList(creatures.filter((creature) => creature.isStaked));
    }, [creatures]);

    const handleChangeTierFilter = ({ value }: IOption) => {
        setCreatureList(
            value && value !== 'all'
                ? creatures
                      .filter((creature) => creaturesTiers[value].indexOf(creature.type) !== -1)
                      .filter((creature) => creature.isStaked)
                : creatures,
        );
    };
    return (
        <Styled.StakedCreatures>
            <Headers
                rightImage={creatureTeamSrc}
                stats={[
                    {
                        label: 'Total staked',
                        value: `${headerStatistics?.totalStaked}`,
                        type: STAT_TYPES.VALUE,
                    },
                    {
                        label: 'Pool share',
                        value: `${headerStatistics?.myPoolShare} %`,
                        type: STAT_TYPES.VALUE,
                    },
                    {
                        label: (
                            <>
                                USD Tether{' '}
                                <Icon
                                    name={ICON.EXCHANGE}
                                    width="1.6rem"
                                    fill={theme.color.whiteAlpha.a60}
                                />{' '}
                                Stacks
                            </>
                        ),
                        stacks: {
                            value: rewardPool ? Number((rewardPool * exchangeRate).toFixed(2)) : 0,
                            currency: CURRENCY.TETHER,
                        },
                        tether: {
                            value: rewardPool ? rewardPool : 0,
                            currency: CURRENCY.STACKS,
                        },
                        type: STAT_TYPES.MONEY,
                    },
                    {
                        label: 'Today reward',
                        stacks: {
                            value: Number(
                                (
                                    ((rewardPool * Number(headerStatistics?.myPoolShare)) / 100) *
                                    exchangeRate
                                ).toFixed(2),
                            ),
                            currency: CURRENCY.STACKS,
                        },
                        tether: {
                            value: (rewardPool * Number(headerStatistics?.myPoolShare)) / 100,
                            currency: CURRENCY.TETHER,
                        },
                        type: STAT_TYPES.MONEY,
                    },
                ]}
                title="Staked Creatures"
            />
            <Styled.ListHeader>
                <Styled.Dropdowns>
                    <Dropdown
                        options={options}
                        onChangeAction={handleChangeTierFilter}
                        label="All tiers"
                    />
                </Styled.Dropdowns>
                <FilteringSection
                    filters={filters}
                    selectedFilter={filter}
                    handleFilterChange={handleFilterChange}
                />
            </Styled.ListHeader>
            <Styled.CreatureList>
                {creatureList.length === 0 && (
                    <Typography variant="h6">Creatures not found :(</Typography>
                )}
                {creatureList.map((creature) => (
                    <UserCreatureCard key={creature.id} creature={creature} />
                ))}
            </Styled.CreatureList>
        </Styled.StakedCreatures>
    );
};
