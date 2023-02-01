import { useMemo } from 'react';

import { Reward } from '@/models/reward.model';
import { useRewardPoolListQuery } from '@/store/services/creatureRacer.service';

export const useRewardPoolList = () => {
    const { data: rewardPoolList, isFetching, refetch, error } = useRewardPoolListQuery(null);

    const rewards = useMemo(
        () => rewardPoolList?.map((reward) => reward && new Reward(reward)),
        [rewardPoolList],
    );

    return {
        rewards,
        isFetching,
        refetch,
        error,
    };
};
