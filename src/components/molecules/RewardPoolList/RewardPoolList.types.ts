import { theme } from '@/theme/mainTheme';

interface Money {
    usdt: number;
    stacks: number;
}

export interface IDayRewardData {
    myReward: Money;
    totalRewardPool: Money;
    stakingPower: number;
    totalStakingPower: number;
}

export interface IMoney {
    money: Money;
    size: 'h5' | 'body1' | 'h1' | 'h2' | 'h3' | 'h4' | 'h6' | 'body2';
    color?: string;
}

interface IStyle {
    size: 'h5' | 'body1' | 'h1' | 'h2' | 'h3' | 'h4' | 'h6' | 'body2';
    color: typeof theme.color.whiteAlpha.a60 | typeof theme.color.yellow;
}

export interface IDayRewardStyles {
    [key: string]: IStyle;
}
