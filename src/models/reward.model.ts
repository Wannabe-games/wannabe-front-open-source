// TODO:

import { toast } from 'react-toastify';

import { claimPoolRewardAction } from '@/helpers/actions/claimPoolRewardAction';
import { daysSinceGivenDate } from '@/helpers/format-date';
import { RewardPoolListOut } from '@/interfaces/contract/RewardPoolListOut';
import { store } from '@/store';
import { coinGeckoApi } from '@/store/services/coingecko.service';
import { DAY_REWARD_TYPE } from '@/types/day-reward-type';

const toastId = 'claim-toast';
export class Reward {
    private readonly _myReward: number;
    private readonly _myStakingPower: number;
    private readonly _totalRewardPool: number | null;
    private readonly _user: number;
    private readonly _isReceived: boolean | null;
    private readonly _withdrawId: number | null;
    private readonly _date: string;
    private readonly _id: string | null;

    constructor(definition: RewardPoolListOut) {
        this._myReward = definition.myReward;
        this._myStakingPower = definition.myStakingPower;
        this._totalRewardPool = definition.totalRewardPool;
        this._user = definition.user;
        this._isReceived = definition.isReceived;
        this._withdrawId = definition.withdrawId;
        this._date = definition.date;
        this._id = definition.id;
    }

    public get id(): string | null {
        return this._id;
    }

    public static get usdPerStacks(): number {
        const { data: usdPerStacks } = coinGeckoApi.endpoints.usdPerStacks.select(null)(
            store.getState(),
        );

        return usdPerStacks || 1.44;
    }

    public get myReward(): number {
        return Number(this._myReward) || 0;
    }

    public get reward(): { usdt: number; stacks: number } {
        const usdPerStacks = Reward.usdPerStacks;
        const stacks = this.myReward;

        const usdt = Math.round(stacks * usdPerStacks);

        return { usdt, stacks };
    }

    public get myStakingPower(): number {
        return this._myStakingPower || 0;
    }

    public get totalReward(): { usdt: number; stacks: number } {
        const usdPerStacks = Reward.usdPerStacks;
        const stacks = this.totalRewardPool || 0;

        const usdt = Math.round(stacks * usdPerStacks);

        return { usdt: usdt, stacks };
    }

    public get totalRewardPool(): number | null {
        return this._totalRewardPool;
    }

    public get userId(): number {
        return this._user;
    }

    public get isReceived(): boolean | null {
        return this._isReceived;
    }

    public get withdrawId(): number | null {
        return this._withdrawId;
    }

    public get date(): string {
        const date = this._date;

        const daysSince = daysSinceGivenDate(date);

        if (daysSince <= 7) {
            const today = daysSince === 0 ? 'today' : null;
            const dayWord = daysSince === 1 ? 'day' : 'days';

            return today || `${daysSince} ${dayWord} ago`;
        }

        return date;
    }

    public get rewardType(): DAY_REWARD_TYPE {
        const date = this._date;
        const daysSince = daysSinceGivenDate(date);
        const isAvailable = this.isAvailable;

        if (daysSince === 0) {
            return DAY_REWARD_TYPE.TODAY;
        }

        if (!isAvailable) {
            return DAY_REWARD_TYPE.UNAVAILABLE;
        }

        if (this.isReceived) {
            return DAY_REWARD_TYPE.CLAIMED;
        }

        return DAY_REWARD_TYPE.TO_CLAIM;
    }

    public get claimRewardAction() {
        const id = this.id;

        return async () => {
            if (!id) {
                toast.error('Oops! Something went wrong', { toastId });
                return null;
            }

            if (!this.myReward) {
                toast.error('No reward to claim', { toastId });
                return;
            }

            await claimPoolRewardAction(id);
        };
    }

    public get isAvailable(): boolean {
        return !!this.id;
    }

    public get disabledBtnLabel(): string | undefined {
        if (!this.isAvailable) {
            return 'Unavailable';
        }

        if (this.isReceived) {
            return 'Claimed';
        }

        if (!this.myReward) {
            return 'No reward to claim';
        }
    }
}
