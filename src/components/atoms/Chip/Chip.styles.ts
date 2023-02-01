import styled, { css } from 'styled-components';

import { IChip } from './Chip.types';

export const Chip = styled.button<Omit<IChip, 'label'>>(({ theme, disabled, isSelected }) => {
    const selectedStyles =
        isSelected &&
        css`
            background-color: ${theme.color.yellow};
            color: ${theme.color.blackLike};
        `;

    const hoverStyles =
        !isSelected &&
        css`
            &:hover:enabled {
                color: ${theme.color.yellow};
            }
        `;

    const disabledStyles =
        disabled &&
        css`
            color: ${theme.color.whiteAlpha.a40};
            background-color: ${theme.color.blackLike};
            cursor: not-allowed;
        `;

    return css`
        cursor: pointer;
        padding: 1.2rem 2.4rem;
        border: 0;
        background-color: ${theme.color.blackLike};
        color: ${theme.color.white};
        border-radius: 10rem;

        ${selectedStyles}
        ${disabledStyles}
        ${hoverStyles}
    `;
});
