import { IPopupProps } from '@/interfaces/Popup';

export interface ICalculatorPopup extends IPopupProps {
    showRevenueCalculator: () => void;
}

interface Money {
    tether: number;
    stacks: number;
}

export interface IMoney {
    money: Money;
    size?: 'h2' | 'h5';
}

export interface ICalculatorDetails {
    rewardPool: number;
    userReward: number;
    activeReferral: number;
    usersDailyAmount: number;
}
