import { useEffect, useState } from 'react';

import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Typography } from '@/components/atoms/Typography';
import { microStxToStx } from '@/helpers/stacks/micro-stx-to-stx';
import { HeaderStatisticsOut } from '@/interfaces/contract/HeaderStatisticsOut';
import { ROUTE } from '@/routing/routes.types';
import { useUsdPerStacksQuery } from '@/store/services/coingecko.service';
import { useGetUserStatisticQuery } from '@/store/services/creatureRacer.service';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import { Short } from '../Short';
import * as Styled from './RewardPool.styles';

const tooltipContent =
    'Reward Pool starts to be available to claim on daily basis when 25% of Tier 3 rarest Creatures are minted.';

export const RewardPool = () => {
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
    const { data: statistics } = useGetUserStatisticQuery(null);
    const stacksToUSD = useUsdPerStacksQuery(null);

    const exchangeRate = stacksToUSD?.data ? stacksToUSD.data : 0;
    const rewardPool =
        headerStatistics?.rewardPool && Math.round(microStxToStx(headerStatistics?.rewardPool));

    useEffect(() => {
        statistics && setHeaderStatistics(statistics);
    }, [statistics]);

    return (
        <Short>
            <Short.Header
                sx={18.7}
                infoContent={
                    <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                        {tooltipContent}
                    </Typography>
                }
            >
                Reward Pool
            </Short.Header>
            <Styled.Money>
                <Typography variant="h3" weight="bold">
                    ~
                </Typography>{' '}
                <Typography variant="h3" weight="bold" color={theme.color.yellow} mr="0.8rem">
                    {rewardPool ? (rewardPool * exchangeRate).toFixed(2) : 0}
                </Typography>
                <Icon name={CURRENCY.TETHER} width="2.4rem" />
                <Typography variant="h3" ml="0.7rem" mr="0.7rem">
                    /
                </Typography>
                <Typography variant="h3" weight="bold" color={theme.color.yellow} mr="0.8rem">
                    {rewardPool}
                </Typography>
                <Icon name={CURRENCY.STACKS} width="2.4rem" />
            </Styled.Money>
            <Typography variant="body1" weight="light" color={theme.color.whiteAlpha.a60}>
                <>
                    USD Tether{' '}
                    <Icon name={ICON.EXCHANGE} width="1.6rem" fill={theme.color.whiteAlpha.a60} />{' '}
                    Stacks
                </>
            </Typography>
            <Styled.Actions>
                <Short.Button primary label="Claim" route={ROUTE.REWARD_POOL} />
            </Styled.Actions>
            <Styled.RightImage />
        </Short>
    );
};
