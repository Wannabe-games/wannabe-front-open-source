export interface IRevenuePopup {
    hide: () => void;
    showExtendedCalculator: () => void;
}
interface Money {
    tether: number;
    stacks: number;
}
export interface IMoney {
    money: Money;
}
export interface IInvestment {
    return: { days: number; money: Money };
    double: { days: number; money: Money };
}
