import styled, { css, DefaultTheme } from 'styled-components';

import { BADGE_TYPE, IBadge } from './Badge.types';

const buildVariantStyles = ($type: BADGE_TYPE, theme: DefaultTheme) => {
    switch ($type) {
        case BADGE_TYPE.NFT:
            return css`
                background: ${theme.color.gradient.linear.nftBadge};
            `;
        case BADGE_TYPE.COLLECTABLE:
            return css`
                background-color: ${theme.color.neon.aqua};
            `;
        case BADGE_TYPE.STAKED:
            return css`
                background-color: ${theme.color.neon.pink};
            `;
        case BADGE_TYPE.FREE:
            return css`
                background-color: ${theme.color.whiteAlpha.a60};
            `;
        case BADGE_TYPE.FREE_COIN:
            return css`
                background-color: ${theme.color.whiteAlpha.a40};
                color: ${theme.color.yellow};
                border: 1px solid ${theme.color.yellow};
                font-size: ${theme.font.size.body2};
            `;
        case BADGE_TYPE.BUY:
            return css`
                background-color: ${theme.color.yellow};
            `;
    }
};

export const Badge = styled.span<IBadge>(({ $type, theme }) => {
    return css`
        display: inline-block;
        border-radius: 4rem;
        border: 0;
        padding: 0.4rem 1.2rem 0.3rem;
        font-weight: 700;
        ${buildVariantStyles($type, theme)}
    `;
});
