import rewardPoolSrc from '@/assets/img/reward-pool.png';
import { Reward } from '@/models/reward.model';

import { DayReward } from './atoms/DayReward';
import * as Styled from './RewardPoolList.styles';

export const RewardPoolList = ({ rewards }: { rewards: Reward[] }) => (
    <Styled.DayRewardsList>
        {rewards.map((reward, index) => (
            <DayReward key={index} reward={reward} />
        ))}
        <Styled.BackgroundImage src={rewardPoolSrc} />
    </Styled.DayRewardsList>
);
