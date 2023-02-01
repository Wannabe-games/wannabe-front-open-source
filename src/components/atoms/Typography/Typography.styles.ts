import styled, { css } from 'styled-components';
import { space } from 'styled-system';

import { ITypography } from './Typography.types';

export const Typography = styled.span<Omit<ITypography, 'color'> & { $color?: string }>(
    ({ $color, variant, weight, theme }) => {
        const weightStyles =
            weight &&
            css`
                font-weight: ${theme.font.weight[weight]};
            `;

        return css`
            ${space};
            color: ${$color ? $color : '#fff'};
            font-size: ${theme.font.size[variant]};
            line-height: calc(${theme.font.size[variant]}*1.182);
            text-align: left;
            overflow-wrap: break-word;
            ${weightStyles}
        `;
    },
);
