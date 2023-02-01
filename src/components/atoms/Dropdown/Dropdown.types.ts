import { ICON } from '../Icon/Icon.types';

export interface IOpenDropdown {
    open: boolean;
}

export interface IOption {
    icon?: ICON;
    label?: string;
    max?: number;
    value: number | string | null;
}

export interface IDropdown {
    icon?: ICON;
    label?: string;
    className?: string;
    max?: number;
    options: IOption[];
    onChangeAction: (value: IOption) => void;
    progress?: boolean;
    value?: number | string | null;
}
