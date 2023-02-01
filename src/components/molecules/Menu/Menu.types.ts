import React from 'react';

import { ICON } from '@/components/atoms/Icon/Icon.types';

export interface IMenu {
    children: React.ReactNode;
    className?: string;
}
export interface IMenuItem {
    children: React.ReactNode;
    icon?: ICON;
}
