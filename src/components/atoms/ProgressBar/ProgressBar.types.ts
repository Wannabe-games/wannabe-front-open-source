export enum PROGRESS_BAR_TYPES {
    FIRST = 'first',
    PURPLE = 'purple',
}

export interface IStyledUpgradeBar {
    upgrade?: number;
    percent: number;
}
export interface IProgressBar extends IStyledUpgradeBar {
    header?: JSX.Element;
    className?: string;
    variant?: PROGRESS_BAR_TYPES;
    barHeight?: string;
}

export type IStyledProgressBar = Omit<IProgressBar, 'withHeader' | 'upgrade'>;
