import { PositionProps } from 'styled-system';

export type TooltipPositions = 'top' | 'bottom' | 'left' | 'right';

export interface IStyledTooltip {
    sx?: number;
    toolTipPosition?: TooltipPositions;
}
export interface ITooltip extends IStyledTooltip, PositionProps {
    color?: string;
    element: JSX.Element;
    iconSize?: number;
}
