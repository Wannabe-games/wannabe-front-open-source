import { Dispatch, SetStateAction } from 'react';

import { BADGE_TYPE } from '@/components/atoms/Badge/Badge.types';

export interface ICreatureStats {
    belly: number;
    buttocks: number;
    heart: number;
    lungs: number;
    muscles: number;
}
export interface IDescription {
    label: string;
    value: string;
}
export interface IAction {
    label: string;
    fetchingLabel?: string;
    primary: boolean;
    secondary: boolean;
    tertiary: boolean;
    stake?: boolean;
    action?: (setIsPending?: Dispatch<SetStateAction<string | undefined>>) => void;
    route?: string;
}

export interface IBadge {
    type: BADGE_TYPE;
    value: string;
}
export interface IIsForUser {
    isForUser?: boolean;
}
export interface IStyledCard extends IIsForUser {
    borderColor?: BORDER_COLORS;
    isNFT?: boolean;
    isStaked?: boolean;
}

export enum BORDER_COLORS {
    YELLOW = 'yellow',
    AQUA = 'aqua',
    PINK = 'pink',
}
