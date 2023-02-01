import { useEffect, useState } from 'react';

import creatureTeamSrc from '@/assets/img/shorts/creature-team.png';
import { HeaderStatisticsOut } from '@/interfaces/contract/HeaderStatisticsOut';
import { ROUTE } from '@/routing/routes.types';
import { useGetUserStatisticQuery } from '@/store/services/creatureRacer.service';

import { Short } from '../Short';

export const StakedCreatures = () => {
    const [headerStatistics, setHeaderStatistics] = useState<HeaderStatisticsOut>({
        expiresSoon: 0,
        mintedInTotal: 1,
        myPoolShare: '0',
        readyToUpgrade: 0,
        referralLevel: null,
        rewardPool: 0,
        totalPoolShare: '0',
        totalStaked: 0,
    });
    const { data: statistics } = useGetUserStatisticQuery(null);

    useEffect(() => {
        statistics && setHeaderStatistics(statistics);
    }, [statistics]);

    return (
        <Short>
            <Short.Header>Staked Creatures</Short.Header>
            <Short.Subheader>
                <>{headerStatistics.myPoolShare}% Pool share</>
            </Short.Subheader>
            <Short.Button
                secondary
                label={`View all${
                    headerStatistics.totalStaked !== 0 ? ` ${headerStatistics.totalStaked}` : ''
                }`}
                route={ROUTE.STAKED_CREATURES}
            />
            <img
                src={creatureTeamSrc}
                style={{ width: '20rem', position: 'absolute', right: '-3.8rem', bottom: 0 }}
            />
        </Short>
    );
};
