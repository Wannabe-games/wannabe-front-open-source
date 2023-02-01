import styled, { css } from 'styled-components';

import { IInput } from './Input.types';

export const Input = styled.input<IInput>(({ disabled, error, theme }) => {
    const disabledStyles =
        disabled &&
        css`
            color: ${theme.color.whiteAlpha.a40};
            background-color: ${theme.color.blackLike};
            cursor: not-allowed;
        `;

    const errorStyles =
        error &&
        css`
            color: ${({ theme }) => theme.color.status.error};
            box-shadow: 0 0 0 4px ${({ theme }) => theme.color.blackAlpha.a10};
        `;

    const defaultStyles =
        !error &&
        !disabled &&
        css`
            &:not(:hover) {
                box-shadow: 0 0 0 4px ${({ theme }) => theme.color.whiteAlpha.a05};
            }
        `;

    return css`
        background-color: ${theme.color.blackLike};
        border-radius: 10rem;
        border: 0;
        color: ${theme.color.white};
        font-size: ${theme.font.size.body1};
        padding: 1.55rem 2.4rem;
        width: 100%;
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px ${theme.color.blackLike} inset !important;
            -webkit-text-fill-color: ${theme.color.yellow};
            border: 0;
            outline: none;
        }
        &::-webkit-contacts-auto-fill-button,
        &::-webkit-credentials-auto-fill-button {
            visibility: hidden;
            display: none !important;
            pointer-events: none;
            height: 0;
            width: 0;
            margin: 0;
        }

        &::placeholder {
            color: ${theme.color.whiteAlpha.a60};
        }

        &&:hover,
        &&:focus {
            outline: none;
            box-shadow: inset 0 0 0 1px ${theme.color.stone} !important;
        }

        &:focus {
            color: ${theme.color.yellow};
        }

        ${defaultStyles}
        ${errorStyles}
        ${disabledStyles}
    `;
});
