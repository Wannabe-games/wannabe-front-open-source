import styled, { css } from 'styled-components';

import {
    IStyledSocialMediaAvatar,
    SOCIAL_MEDIA_TYPE,
} from './SocialMediaAvatar.types';

export const SocialMediaAvatar = styled.div<IStyledSocialMediaAvatar>(({ theme, type }) => {
    return css`
        background: ${type === SOCIAL_MEDIA_TYPE.EARN
            ? theme.color.blackLike
            : theme.color.stoneAlpha.a20};
        border-radius: 2.4rem;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        justify-content: space-between;
        padding: 1.6rem 1.6rem 1.9rem;
        position: relative;
        width: 100%;
    `;
});

export const SocialMediaBox = styled.div`
    align-items: center;
    display: flex;
    gap: 0.8rem;
    margin-top: 1.4rem;
    a {
        display: flex;
    }
`;
export const SocialMediaLink = styled.a`
    color: ${({ theme }) => theme.color.yellow};
    padding: 0.8rem 0 0.5rem 2rem;
`;
