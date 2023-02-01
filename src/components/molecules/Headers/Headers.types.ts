import React, { ReactNode } from 'react';

import { CURRENCY } from '@/types/currency';

export enum STAT_TYPES {
    VALUE = 'value',
    MONEY = 'money',
}

interface IMoneyValues {
    value: number;
    currency: CURRENCY;
}

export interface IStat {
    label: string | ReactNode;
    value?: string;
    stacks?: IMoneyValues;
    tether?: IMoneyValues;
    type: STAT_TYPES;
}
export interface IHeader {
    rightImage: string;
    stats: IStat[];
    title: React.ReactNode;
}
export interface ICurrencyStat {
    stacks: IMoneyValues;
    tether: IMoneyValues;
    label: string | ReactNode;
}
