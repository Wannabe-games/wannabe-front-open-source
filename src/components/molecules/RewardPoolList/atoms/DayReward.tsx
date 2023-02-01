// TODO: Refactor

import React from 'react';

import { Tooltip } from '@/components/atoms/Tooltip';
import { Typography } from '@/components/atoms/Typography';
import { Reward } from '@/models/reward.model';
import { theme } from '@/theme/mainTheme';
import { DAY_REWARD_TYPE } from '@/types/day-reward-type';

import { Button } from '../../Short/Short.styles';
import * as Styled from '../RewardPoolList.styles';
import { IDayRewardStyles } from '../RewardPoolList.types';
import { Money } from './Money';

const TooltipAgoText = () => (
    <Typography
        variant="body2"
        color={theme.color.whiteAlpha.a60}
        weight="regular"
    >{`Total "Reward Pool" is total reward pool size that was available for that day; "My Reward" is your total reward that is available to claim; "My Staking Power" is dependent on how many Creature NFTs you have staked and this is yours percentage share of "Total Reward Pool`}</Typography>
);

const dayRewardStyles: IDayRewardStyles = {
    [DAY_REWARD_TYPE.TODAY]: {
        size: 'h5',
        color: theme.color.yellow,
    },
    [DAY_REWARD_TYPE.TO_CLAIM]: {
        size: 'body1',
        color: theme.color.yellow,
    },
    [DAY_REWARD_TYPE.CLAIMED]: {
        size: 'body1',
        color: theme.color.whiteAlpha.a60,
    },
    [DAY_REWARD_TYPE.UNAVAILABLE]: {
        size: 'body1',
        color: theme.color.whiteAlpha.a60,
    },
};

const DayRewardRaw = ({ reward: dayReward }: { reward: Reward }) => {
    const {
        date,
        rewardType,
        reward,
        myReward,
        myStakingPower,
        totalReward,
        claimRewardAction,
        disabledBtnLabel,
    } = dayReward;

    return (
        <Styled.DayReward>
            <Styled.Time variant="h5" weight="bold" color={theme.color.whiteAlpha.a60}>
                {date} <Tooltip element={<TooltipAgoText />} sx={20} />
            </Styled.Time>
            <Styled.Cell>
                <Typography variant={dayRewardStyles[rewardType].size} weight="bold">
                    My Reward
                </Typography>
                <Money
                    money={reward}
                    color={dayRewardStyles[rewardType].color}
                    size={dayRewardStyles[rewardType].size}
                />
            </Styled.Cell>
            <Styled.Cell>
                <Typography variant={dayRewardStyles[rewardType].size} weight="bold">
                    My Staking Power
                </Typography>
                <Typography
                    variant={dayRewardStyles[rewardType].size}
                    weight="bold"
                    color={dayRewardStyles[rewardType].color}
                >
                    <>{myStakingPower}%</>
                </Typography>
            </Styled.Cell>
            <Styled.Divider />
            <Styled.Cell>
                <Typography variant={dayRewardStyles[rewardType].size} weight="bold">
                    Total Reward Pool
                </Typography>
                <Money
                    money={totalReward}
                    color={dayRewardStyles[rewardType].color}
                    size={dayRewardStyles[rewardType].size}
                />
            </Styled.Cell>
            <Styled.Divider />
            <Styled.Actions>
                {disabledBtnLabel ? (
                    <Styled.Received variant="body1" color={theme.color.whiteAlpha.a40}>
                        {disabledBtnLabel}
                    </Styled.Received>
                ) : (
                    <Button
                        primary
                        label="Claim"
                        onClick={claimRewardAction}
                        disabled={!myReward}
                        rightIcon={
                            <Tooltip
                                color={theme.color.blackLike}
                                sx={20.7}
                                iconSize={20}
                                element={
                                    <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                                        <>
                                            Remember that you need to claim your rewards within 7
                                            days, if you don&apos;t do this your reward will go back
                                            to Total Reward Pool and will be re-distributed.
                                            <br />
                                            After each claim there is a cool down of XXXXXX, so take
                                            this under consideration.
                                        </>
                                        `
                                    </Typography>
                                }
                            />
                        }
                    />
                )}
            </Styled.Actions>
        </Styled.DayReward>
    );
};

export const DayReward = React.memo(DayRewardRaw);
