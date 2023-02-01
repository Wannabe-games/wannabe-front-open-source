// TODO: Deep compare creatures array, // TODO: Refactor

import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import creatureTeamSrc from '@/assets/img/shorts/rhino.png';
import { Dropdown } from '@/components/atoms/Dropdown';
import { IOption } from '@/components/atoms/Dropdown/Dropdown.types';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Typography } from '@/components/atoms/Typography';
import { CreatureCard } from '@/components/molecules/CreatureCard';
import { UserCreatureCard } from '@/components/molecules/CreatureCard/UserCreatureCard';
import { FilteringSection } from '@/components/molecules/FilteringSection';
import { Filter } from '@/components/molecules/FilteringSection/FilteringSection.types';
import { Headers } from '@/components/molecules/Headers';
import { STAT_TYPES } from '@/components/molecules/Headers/Headers.types';
import { CREATURES_TIERS } from '@/constants';
import { microStxToStx } from '@/helpers/stacks/micro-stx-to-stx';
import { useGetUpgradeBuyCreatures } from '@/hooks/useGetUpgradeBuyCreatures';
import { HeaderStatisticsOut } from '@/interfaces/contract/HeaderStatisticsOut';
import { CreatureModel } from '@/models/creature.model';
import { UserCreatureModel } from '@/models/user-creature.model';
import { useUsdPerStacksQuery } from '@/store/services/coingecko.service';
import { useGetUserStatisticQuery } from '@/store/services/creatureRacer.service';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import * as Styled from './UpgradeBuyCreatures.styles';

const filters = [
    { label: 'All', value: 'all' },
    { label: 'To buy', value: 'buy' },
    { label: 'To upgrade', value: 'upgrade' },
];

const options = [
    { label: 'All tiers', value: 'all' },
    { label: 'Tier 1', value: 'tier1' },
    { label: 'Tier 2', value: 'tier2' },
    { label: 'Tier 3', value: 'tier3' },
];

export const UpgradeBuyCreatures = () => {
    const { state } = useLocation();
    const [filter, setFilter] = useState<Filter>(state?.filter || 'all');
    const [headerStatistics, setHeaderStatistics] = useState<HeaderStatisticsOut>({
        expiresSoon: 0,
        mintedInTotal: 0,
        myPoolShare: '0',
        readyToUpgrade: 0,
        referralLevel: null,
        rewardPool: 1000000,
        totalPoolShare: '0',
        totalStaked: 0,
    });
    const { creatures, isFetching, error } = useGetUpgradeBuyCreatures({ filter });
    const jsonCreatures = JSON.stringify(creatures);

    const [creatureList, setCreatureList] =
        useState<(UserCreatureModel | CreatureModel)[]>(creatures);

    useEffect(() => {
        setCreatureList(creatures);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jsonCreatures]);

    const stacksToUSD = useUsdPerStacksQuery(null);
    const exchangeRate = stacksToUSD?.data ? stacksToUSD.data : 0;

    const { data: statistics } = useGetUserStatisticQuery(null);
    useEffect(() => {
        statistics && setHeaderStatistics(statistics);
    }, [statistics]);

    const rewardPool =
        headerStatistics?.rewardPool && Math.round(microStxToStx(headerStatistics?.rewardPool));

    const handleFilterChange = (value: Filter) => {
        setFilter(value);
    };

    const handleChangeTierFilter = ({ value }: IOption) => {
        const val = value as 'tier1' | 'tier2' | 'tier3' | 'all';

        setCreatureList(
            val && val !== 'all'
                ? creatures.filter((creature) => CREATURES_TIERS[val].indexOf(creature.type) !== -1)
                : creatures,
        );
    };

    const renderContent = useMemo(() => {
        if (isFetching) {
            return <Typography variant="h5">Loading...</Typography>;
        }

        if (error) {
            return <Typography variant="h5">Error</Typography>;
        }

        if (!creatureList.length) {
            <Typography variant="h5">Creatures not found... :(</Typography>;
        }

        return (
            <>
                {creatureList.map((creature) => {
                    if (creature instanceof UserCreatureModel) {
                        return <UserCreatureCard key={creature.id} creature={creature} />;
                    }

                    return <CreatureCard key={creature.id} creature={creature} />;
                })}
            </>
        );
    }, [creatureList, error, isFetching]);

    return (
        <Styled.UpgradeCreatures>
            <Headers
                stats={[
                    {
                        label: 'Ready to upgrade',
                        value: `${headerStatistics?.readyToUpgrade}`,
                        type: STAT_TYPES.VALUE,
                    },
                    {
                        label: 'Expires soon',
                        value: `${headerStatistics?.expiresSoon}`,
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
                            value: Number((rewardPool * exchangeRate).toFixed(2)),
                            currency: CURRENCY.TETHER,
                        },
                        tether: {
                            value: rewardPool,
                            currency: CURRENCY.STACKS,
                        },
                        type: STAT_TYPES.MONEY,
                    },
                ]}
                rightImage={creatureTeamSrc}
                title={
                    <>
                        Upgrade
                        <br />
                        or buy new
                    </>
                }
            />
            <Styled.Filters>
                <Styled.Dropdowns>
                    <Dropdown
                        label="All tiers"
                        options={options}
                        onChangeAction={handleChangeTierFilter}
                    />
                </Styled.Dropdowns>
                <FilteringSection
                    filters={filters}
                    selectedFilter={filter}
                    handleFilterChange={handleFilterChange}
                />
            </Styled.Filters>
            <Styled.CreaturesList>{renderContent}</Styled.CreaturesList>
        </Styled.UpgradeCreatures>
    );
};
