import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Input } from '@/components/atoms/Input';
import { Typography } from '@/components/atoms/Typography';

export const FullWidthContainer = styled.div`
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    position: relative;
    right: 50%;
    width: 100vw;
    background-color: ${({ theme }) => theme.color.blackLike};
    margin-bottom: 9rem;
    @media (max-width: 900px) {
        margin-bottom: 0;
    }
`;
export const Wrapper = styled.div`
    padding-top: 10rem;
    padding-bottom: 10rem;
`;

export const ShortsList = styled.ul`
    display: grid;
    gap: 5.2rem;
    grid-template-columns: 1fr 1fr 1fr;
    list-style: none;
    padding: 0;
    width: 100%;
`;

export const UserAvatar = styled.img`
    height: 37.6rem;
    width: 37.6rem;
    @media (max-width: 950px) {
        height: 21rem;
        width: 21rem;
    }
`;
export const UserDetails = styled.section`
    display: grid;
    gap: 6.5rem;
    grid-template-columns: 37.6rem 1fr;
    @media (max-width: 950px) {
        grid-template-columns: 21rem 1fr;
    }
    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;
export const UserAvatarWrapper = styled.div<{ hasAvatar: boolean }>`
    align-items: center;
    border-radius: 1.5rem;
    display: flex;
    justify-content: center;
    @media (max-width: 950px) {
        height: 21rem;
        margin: 0 auto;
        width: 21rem;
    }

    ${({ hasAvatar }) =>
        hasAvatar &&
        css`
            border: 5px solid #263a49;
        `}
`;
export const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding-top: 1.6rem;
`;
export const List = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 1200px) {
        gap: 1.6rem;
        grid-template-columns: 1fr;
    }
`;
export const ListItem = styled.li`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    position: relative;
`;
export const RNFTContainer = styled.div`
    margin: 1.1rem 0 1.7rem 0;
`;
export const RNFT = styled(Typography)`
    background: ${({ theme }) => theme.color.gradient.linear.multicolor.first};
    display: inline-block;
    font-weight: 700;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    &::after {
        content: ':';
        color: ${({ theme }) => theme.color.white};
        -webkit-background-clip: initial;
        -webkit-text-fill-color: initial;
        font-weight: initial;
        font-size: initial;
    }
`;
export const EditButton = styled(Button)`
    color: ${({ theme }) => theme.color.white};
    position: absolute;
    right: 0;
    top: -0.5rem;
    img {
        margin-left: 0.8rem;
    }
`;
export const Divider = styled.hr`
    background-color: ${({ theme }) => theme.color.stone};
    border: none;
    height: 0.1rem;
    margin: 2.4rem 0;
    width: 100%;
`;
export const Subtitle = styled(Typography)`
    color: ${({ theme }) => theme.color.yellow};
    margin: 0.2rem 0 1.6rem 0;
`;
export const RefferalInput = styled(Input)`
    margin-top: 1.6rem;
    width: 14.6rem;
`;

//TODO:
export const CenterHorizontally = styled.div`
    align-items: center;
    display: flex;
`;

export const BackArrowIcon = styled(Icon)`
    height: 2.4rem;
    margin-right: 0.8rem;
    width: 2.4rem;
`;

export const InnerWrapper = styled.div`
    background-color: #0b1b28;
    margin: 0 auto;
    margin-top: 5.2rem;
    max-width: 144rem;
    padding: 8rem;
    @media (max-width: 750px) {
        padding: 1.6rem;
    }
`;

export const BackToDashboard = styled(Link)`
    margin-bottom: 2rem;
    display: inline-block;
`;

export const ReferralCodeWrapper = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
`;
