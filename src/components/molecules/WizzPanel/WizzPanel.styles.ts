import styled, { css } from 'styled-components';

import { IWizzPanelTitle } from './WizzPanel.types';

const horizontalLineStyles = css`
    background-color: ${({ theme }) => theme.color.whiteAlpha.a20};
    content: '';
    height: 1px;
    position: relative;
    z-index: -1;
`;

export const WizzPanel = styled.ol`
    align-items: center;
    color: ${({ theme }) => theme.color.white};
    counter-reset: step;
    display: flex;
    flex-wrap: nowrap;

    &::before,
    &::after {
        ${horizontalLineStyles}
        flex: 0.5992 0 auto; //TODO:
    }

    &::before {
        margin-right: 2.1rem;
    }

    &::after {
        margin-left: 2.1rem;
    }
`;

export const WizzPanelItem = styled.li(() => {
    return css`
        align-items: center;
        display: flex;
        gap: 2.1rem;

        &:not(:last-child) {
            flex: 1;
            &::after {
                ${horizontalLineStyles}
                flex: 1 0 auto;
                margin-right: 2.1rem;
            }
        }
    `;
});

export const WizzPanelTitle = styled.h3<IWizzPanelTitle>`
    --size: 6.5rem;
    @media (max-width: 800px) {
        --size: 4rem;
    }
    @media (max-width: 600px) {
        --size: 3rem;
    }
    @media (max-width: 420px) {
        --size: 2rem;
    }
    align-items: center;
    background-color: ${({ active, index, theme }) =>
        active === index
            ? theme.color.yellow
            : active < index
            ? theme.color.whiteAlpha.a20
            : theme.color.blackLike};
    border-radius: 50%;
    box-shadow: 0px 24px 32px 0px #0b1b2859;
    color: ${({ active, index, theme }) =>
        active === index
            ? theme.color.blackLike
            : active < index
            ? theme.color.white
            : theme.color.whiteAlpha.a60};
    display: flex;
    font-size: 2.8rem;
    font-weight: bold;
    height: var(--size);
    justify-content: center;
    line-height: var(--size);
    width: var(--size);
    @media (max-width: 800px) {
        font-size: 2rem;
    }
    @media (max-width: 600px) {
        font-size: 1.6rem;
    }
    @media (max-width: 420px) {
        font-size: 1.2rem;
    }

    &::before {
        content: counter(step);
        counter-increment: step;
    }
`;
