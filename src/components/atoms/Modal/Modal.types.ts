import { ReactNode } from 'react';

export interface IStyledModal {
    show: boolean;
}

export interface IModal {
    hideModal: () => void;
    children: ReactNode;
}
