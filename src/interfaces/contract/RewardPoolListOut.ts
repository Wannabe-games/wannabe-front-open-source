export interface RewardPoolListOut {
    id: string | null;
    myReward: number;
    myStakingPower: number;
    totalRewardPool: number;
    user: number;
    isReceived: boolean;
    withdrawId: number | null;
    date: string;
}
