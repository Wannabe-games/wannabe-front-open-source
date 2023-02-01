import styled, { css } from 'styled-components';

import {
    IStyledProgressBar,
    IStyledUpgradeBar,
    PROGRESS_BAR_TYPES,
} from './ProgressBar.types';

const RADIUS = '10rem';

export const ProgressBarHeader = styled.div`
    align-items: flex-end;
    color: ${({ theme }) => theme.color.whiteAlpha.a60};
    display: flex;
    font-size: 1.4rem;
    justify-content: space-between;

    svg {
        flex-basis: auto;
    }
`;

export const ProgressBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

export const ProgressBar = styled.div`
    background-color: ${({ theme }) => theme.color.whiteAlpha.a05};
    border-radius: ${RADIUS};
    display: flex;
    align-items: center;
    margin-bottom: 0.4rem;
    margin-top: 0.8rem;
    overflow: hidden;
    position: relative;
`;

export const Upgrade = styled.span<IStyledUpgradeBar>(({ theme, upgrade = 0, percent }) => {
    const offset = upgrade - percent;

    return css`
        background: ${theme.color.neon.aqua};
        border-radius: ${RADIUS};
        display: block;
        height: 100%;
        position: absolute;
        width: ${percent + offset}%;
    `;
});

export const Progress = styled.span<IStyledProgressBar>(({ percent, variant, barHeight }) => {
    const progressLeft = 100 - percent;

    return css`
        clip-path: inset(0 ${progressLeft}% 0 0 round ${RADIUS});
        display: block;
        border-radius: ${RADIUS};
        height: ${barHeight ? barHeight : '0.6rem'};
        width: 100%;
        position: relative;
        ${variant && buildColorVariant(variant)};
    `;
});

const buildColorVariant = (variant: PROGRESS_BAR_TYPES) => {
    const purpleVariantStyles =
        variant === PROGRESS_BAR_TYPES.PURPLE &&
        css`
            transform: matrix(1, 0, 0, -1, 0, 0);
        `;

    return css`
        background: ${({ theme }) => theme.color.gradient.linear.multicolor[variant]};
        ${purpleVariantStyles};
    `;
};
