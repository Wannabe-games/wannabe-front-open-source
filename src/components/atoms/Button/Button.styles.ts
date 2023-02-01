import { Link as RouterLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IStyledButton } from './Button.types';

export const Button = styled.button<IStyledButton>(
    ({ primary, secondary, tertiary, disabled, rightIcon, theme, stake }) => {
        const primaryStyles =
            primary &&
            css`
                background-color: ${theme.color.yellow};

                ${!disabled &&
                css`
                    &:hover {
                        background-color: ${theme.color.white};
                    }
                `}
            `;

        const secondaryStyles =
            secondary &&
            css`
                background-color: transparent;
                color: ${theme.color.white};

                ${!disabled &&
                css`
                    border-color: ${theme.color.yellow};

                    &:hover {
                        border-color: ${theme.color.white};
                    }
                `}
            `;

        const tertiaryStyles =
            tertiary &&
            css`
                background-color: transparent;
                color: ${theme.color.yellow};

                ${!disabled &&
                css`
                    &:hover {
                        color: ${theme.color.white};
                    }
                `}
            `;

        const stakeStyles =
            stake &&
            css`
                background: ${theme.color.gradient.linear.multicolor.first};
                overflow: auto;
                border: 0;
                &:hover {
                    background: #fff;
                }
            `;

        const unStakeStyles =
            stake === false &&
            css`
                border-color: ${theme.color.neon.pink};
            `;

        return css`
            border-radius: 6rem;
            border: 1px solid transparent;
            padding: 0.8rem 2.3rem;
            display: inline-flex;
            position: relative;
            align-items: center;
            justify-content: center;
            ${primaryStyles}
            ${secondaryStyles}
            ${tertiaryStyles}
            ${stakeStyles}
            ${unStakeStyles}
        
            ${disabled &&
            css`
                & {
                    background: ${theme.color.blackLike} !important;
                    color: ${theme.color.whiteAlpha.a40};
                    cursor: not-allowed;
                }
            `}

            ${rightIcon &&
            css`
                gap: 0.7rem;
            `}
        `;
    },
);

export const Link = styled(RouterLink)`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;
