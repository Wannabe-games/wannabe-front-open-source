export interface ICalculatorPopup {
    hide: () => void;
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
