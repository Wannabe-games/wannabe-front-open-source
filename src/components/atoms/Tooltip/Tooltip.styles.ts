import styled, { css } from 'styled-components';
import { position } from 'styled-system';

import { IStyledTooltip, TooltipPositions } from './Tooltip.types';

const buildTooltipPosition = (position: TooltipPositions) => {
    switch (position) {
        case 'top':
            return `
                bottom: 0.5rem;
            `;
        case 'bottom':
            return `
                top: 100%;
            `;
    }
};

export const Container = styled.div`
    display: inline-flex;
    margin-left: 0.2rem;
    top: -0.2rem;
    position: relative;
    font-size: 0;
    ${position};
    &:hover .abc {
        display: flex;
    }
    svg {
        cursor: help;
    }
`;
export const Tooltip = styled.div<IStyledTooltip>(
    ({ theme, toolTipPosition, sx }) => css`
        background-color: ${theme.color.stone};
        border-radius: 0.3rem;
        box-shadow: 1px 3px 8px rgba(11, 27, 40, 0.35);
        display: none;
        flex-direction: column;
        line-height: 1.2;
        padding: 0.8rem;
        position: absolute;
        right: -0.5rem;
        transform: translate(100%, 0);
        width: ${sx ? `${sx}rem` : 'inherit'};
        z-index: 200;
        ${toolTipPosition && buildTooltipPosition(toolTipPosition)};
    `,
);
