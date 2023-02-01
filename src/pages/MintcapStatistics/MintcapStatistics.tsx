// TODO: Refactor

import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';

import dragonSrc from '@/assets/img/shorts/dragon.png';
import { Dropdown } from '@/components/atoms/Dropdown';
import { IOption } from '@/components/atoms/Dropdown/Dropdown.types';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Typography } from '@/components/atoms/Typography';
import { UserCreatureCard } from '@/components/molecules/CreatureCard/UserCreatureCard';
import { FilteringSection } from '@/components/molecules/FilteringSection';
import { Headers } from '@/components/molecules/Headers';
import { STAT_TYPES } from '@/components/molecules/Headers/Headers.types';
import { getCreaturesList } from '@/helpers/get-creature-list';
import { microStxToStx } from '@/helpers/stacks/micro-stx-to-stx';
import { useGetMintcapCreatures } from '@/hooks/useGetMintcapCreatures';
import { HeaderStatisticsOut } from '@/interfaces/contract/HeaderStatisticsOut';
import { MintcapCreaturesIn } from '@/interfaces/portal/MintcapCreaturesIn';
import { UserCreatureModel } from '@/models/user-creature.model';
import { useUsdPerStacksQuery } from '@/store/services/coingecko.service';
import { useGetUserStatisticQuery } from '@/store/services/creatureRacer.service';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import * as Styled from './MintcapStatistics.styles';

const creaturesTypes = [
    { name: 'Boar', type: 'boar', tier: 1, cohort: 1 },
    { name: 'Bird', type: 'bird', tier: 1, cohort: 1 },
    { name: 'Cow', type: 'cow', tier: 1, cohort: 1 },
    { name: 'Frog', type: 'lizard', tier: 1, cohort: 2 },
    { name: 'Dog', type: 'dog', tier: 1, cohort: 2 },
    { name: 'Squirrel', type: 'squirrel', tier: 1, cohort: 2 },
    { name: 'Rhino', type: 'rhino', tier: 1, cohort: 3 },
    { name: 'Hippo', type: 'hippo', tier: 2, cohort: 4 },
    { name: 'Elephant', type: 'elephant', tier: 2, cohort: 4 },
    { name: 'Gorilla', type: 'gorilla', tier: 2, cohort: 4 },
    { name: 'Croko', type: 'croko', tier: 2, cohort: 5 },
    { name: 'Giraffe', type: 'giraffe', tier: 2, cohort: 5 },
    { name: 'Turtle', type: 'turtle', tier: 2, cohort: 5 },
    { name: 'Unicorn', type: 'unicorn', tier: 2, cohort: 6 },
    { name: 'Wolf', type: 'wolf', tier: 3, cohort: 7 },
    { name: 'Panda', type: 'panda', tier: 3, cohort: 7 },
    { name: 'Raccoon', type: 'raccoon', tier: 3, cohort: 7 },
    { name: 'Reindeer', type: 'reindeer', tier: 3, cohort: 8 },
    { name: 'Bunny', type: 'bunny', tier: 3, cohort: 8 },
    { name: 'Dragon', type: 'dragon', tier: 3, cohort: 8 },
    { name: 'Tiger', type: 'tiger', tier: 3, cohort: 9 },
];

const optionsWithProgress = [
    {
        value: -1,
    },
    {
        value: 0,
    },
    {
        value: 1,
    },
    {
        value: 2,
    },
    {
        value: 3,
    },
    {
        value: 4,
    },
];

const tiers = [
    { label: 'All tiers', value: null },
    { label: 'Tier 1', value: 1 },
    { label: 'Tier 2', value: 2 },
    { label: 'Tier 3', value: 3 },
];
const cohorts = [
    { label: 'All cohorts', value: null },
    { label: 'Cohort ~0,8%', value: 2 },
    { label: 'Cohort 1,3%', value: 3 },
    { label: 'Cohort 2,17%', value: 4 },
    { label: 'Cohort 3,5%', value: 5 },
    { label: 'Cohort 5,7%', value: 6 },
    { label: 'Cohort 9,1%', value: 7 },
    { label: 'Cohort 23%', value: 8 },
    { label: 'Cohort 38%', value: 9 },
];

export const MintcapStatistics = () => {
    const [filters, setFilters] = useState('nft');
    const [model, setModel] = useState<MintcapCreaturesIn>({
        isForUser: true,
        type: null,
        tier: null,
        cohort: null,
        muscles: null,
        lungs: null,
        heart: null,
        belly: null,
        buttocks: null,
        isExpiredSoon: null,
    });
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

    // TODO: Refactor and handle errors
    const [page, setPage] = useState(1);
    const [canLoadMore] = useState<boolean>(true);
    const [creatureList, setCreatureList] = useState<UserCreatureModel[]>([]);
    const { creatures, isFetching } = useGetMintcapCreatures({ filters: model, page });
    const { data: statistics } = useGetUserStatisticQuery(null);
    const stacksToUSD = useUsdPerStacksQuery(null);

    const exchangeRate = stacksToUSD?.data ? stacksToUSD.data : 0;

    const handleSetPage = () => {
        if (canLoadMore) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        statistics && setHeaderStatistics(statistics);
    }, [statistics]);

    useEffect(() => {
        if (creatures.length && !isFetching) {
            const newCreaturesList = getCreaturesList(creatureList, creatures);

            const shouldSetCreaturesList = !isEqual(creatureList, newCreaturesList);

            if (page === 1) {
                setCreatureList(creatures.filter((creature) => creature.isNFT));
                return;
            }

            if (shouldSetCreaturesList) {
                setCreatureList(newCreaturesList.filter((creature) => creature.isNFT));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creatures, isFetching, page]);

    const rewardPool =
        headerStatistics?.rewardPool && Math.round(microStxToStx(headerStatistics?.rewardPool));

    const handleSetFilters = (value: string) => {
        setFilters(value);
        setPage(1);
        setModel({
            ...model,
            isForUser: value === 'all' ? false : true,
            isExpiredSoon: value === 'expired' ? true : false,
        });
    };
    const handleChangeFilter =
        (name: string) =>
        ({ value }: IOption) => {
            setPage(1);
            setModel({ ...model, [name]: value === -1 ? null : value });
        };
    return (
        <Styled.MintcapStatistics>
            <Styled.Header>
                <Headers
                    rightImage={dragonSrc}
                    stats={[
                        {
                            label: 'Minted in total',
                            value: `${headerStatistics?.mintedInTotal}`,
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
                                value: rewardPool
                                    ? Number((rewardPool * exchangeRate).toFixed(2))
                                    : 0,
                                currency: CURRENCY.TETHER,
                            },
                            tether: {
                                value: rewardPool ? rewardPool : 0,
                                currency: CURRENCY.STACKS,
                            },
                            type: STAT_TYPES.MONEY,
                        },
                    ]}
                    title="Mintcap Statistics"
                />
            </Styled.Header>
            <Styled.Filters>
                <Styled.DropdownsRow>
                    <Dropdown
                        onChangeAction={handleChangeFilter('tier')}
                        label="All tiers"
                        value="1"
                        options={tiers}
                    />
                    <Dropdown
                        onChangeAction={handleChangeFilter('cohort')}
                        label="All cohorts"
                        value="1"
                        options={cohorts}
                    />
                    <Dropdown
                        onChangeAction={handleChangeFilter('type')}
                        label="All"
                        value="1"
                        options={[
                            { label: 'All', value: null },
                            ...creaturesTypes
                                .filter((option) =>
                                    model.tier === null ? true : option.tier === model.tier,
                                )
                                .filter((option) =>
                                    model.cohort === null ? true : option.cohort === model.cohort,
                                )
                                .map((option) => ({ label: option.name, value: option.type })),
                            // ...creaturesNames
                            //     .map((creatureName) => ({
                            //         label: creatureName,
                            //         value:
                            //             creatureName === 'Frog'
                            //                 ? 'lizard'
                            //                 : creatureName.toLowerCase(),
                            //     }))
                            //     .filter((option) => option.value === 'bird'),
                        ]}
                    />
                </Styled.DropdownsRow>
                <Styled.DropdownsRow>
                    <Dropdown
                        onChangeAction={handleChangeFilter('muscles')}
                        label="Muscles"
                        max={5}
                        icon={ICON.TRAIT_MUSCLES}
                        progress
                        options={optionsWithProgress}
                    />
                    <Dropdown
                        onChangeAction={handleChangeFilter('lungs')}
                        label="Lungs"
                        max={5}
                        icon={ICON.TRAIT_LUNGS}
                        progress
                        options={optionsWithProgress}
                    />
                    <Dropdown
                        onChangeAction={handleChangeFilter('heart')}
                        label="Heart"
                        max={5}
                        icon={ICON.TRAIT_HEART}
                        progress
                        options={optionsWithProgress}
                    />
                    <Dropdown
                        onChangeAction={handleChangeFilter('belly')}
                        label="Fuel"
                        max={5}
                        icon={ICON.TRAIT_BELLY}
                        progress
                        options={optionsWithProgress}
                    />
                    <Dropdown
                        onChangeAction={handleChangeFilter('buttocks')}
                        label="Boost power"
                        max={5}
                        icon={ICON.TRAIT_BUTTOCKS}
                        progress
                        options={optionsWithProgress}
                    />
                </Styled.DropdownsRow>
                <Styled.ShowOnly>
                    <Typography variant="h2" weight="bold">
                        {null}
                        {/* Minted{' '}
                        <Typography variant="h2" color={theme.color.yellow}>
                            7
                        </Typography>{' '}
                        out of 21 */}
                    </Typography>
                    <FilteringSection
                        filters={[
                            { label: 'my nft', value: 'nft' },
                            { label: 'my nft expires soon', value: 'expires' },
                            { label: `all NFT's`, value: 'all' },
                        ]}
                        selectedFilter={filters}
                        handleFilterChange={handleSetFilters}
                    />
                </Styled.ShowOnly>
            </Styled.Filters>
            <Styled.CreaturesList>
                {creatureList.length > 0 ? (
                    creatureList
                        .filter((creature) => {
                            if (filters !== 'expires') return true;
                            const date = new Date().getTime();
                            const expirationMKTime = creature.nftExpirationDate
                                ? new Date(creature.nftExpirationDate).getTime()
                                : 0;
                            const twoWeeks = expirationMKTime - date - 1209600000;
                            return twoWeeks > 0 ? false : true;
                        })
                        .map((creature) => (
                            <UserCreatureCard
                                key={creature.id}
                                creature={creature}
                                isForUser={filters === 'all' ? false : true}
                            />
                        ))
                ) : (
                    <Typography variant="h5">Creatures not found... :(</Typography>
                )}
                {canLoadMore && (
                    <Styled.MoreCreaturesButton
                        secondary
                        label="More Creatures! More...!"
                        onClick={handleSetPage}
                    />
                )}
            </Styled.CreaturesList>
        </Styled.MintcapStatistics>
    );
};
