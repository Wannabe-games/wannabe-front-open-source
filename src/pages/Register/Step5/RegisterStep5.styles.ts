import styled from 'styled-components';

import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';

import { ILevelItem } from './RegisterStep5.types';

export const RegisterPageStep5 = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding-left: 6.5rem;
    padding-top: 10rem;
    @media (max-width: 700px) {
        > span:nth-child(1) {
            font-size: ${({ theme }) => theme.font.size.h2};
            line-height: calc(2rem * 1.182);
            margin-top: 0;
        }
        > span:nth-child(2) {
            font-size: ${({ theme }) => theme.font.size.h4};
            line-height: calc(2rem * 1.182);
        }
        > span:nth-child(3) {
            font-size: ${({ theme }) => theme.font.size.h6};
            line-height: calc(2rem * 1.182);
        }
    }
    @media (max-width: 560px) {
        padding-left: 0;
    }
`;

export const ButtonsWrapper = styled.div`
    display: inline-flex;
    gap: 4rem;
    margin-top: 2rem;
`;

export const FullWidthContainer = styled.div`
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    position: relative;
    right: 50%;
    width: 100vw;
    background-color: ${({ theme }) => theme.color.blackLike};
`;
export const Referrals = styled.main`
    margin-top: 9.4rem;
    padding-bottom: 18.9rem;
`;
export const ReferralsTitle = styled(Typography)`
    letter-spacing: 0.1rem;
    margin-top: 1.8rem;
`;
export const Container = styled.section`
    background-color: ${({ theme }) => theme.color.blackLike};
    display: grid;
    gap: 6.4rem;
    grid-template-columns: 35.7rem 1fr;
    margin-top: 4rem;
    margin-left: auto;
    margin-right: auto;
    padding: 8rem 0;
    width: 128rem;
    @media (max-width: 1300px) {
        padding: 8rem 1.6rem;
    }
    @media (max-width: 1000px) {
        grid-template-columns: 1fr;
        padding: 8rem 1.6rem;
        width: 100%;
    }
    @media (max-width: 700px) {
        padding: 3.2rem 1.6rem;
    }
`;
export const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 35.7rem;
    span {
        display: inline-block;
    }
    span:nth-of-type(2) {
        margin-top: 0.8rem;
    }
    span:nth-of-type(3) {
        margin-top: 2.6rem;
    }
    & > div:nth-of-type(1) {
        margin-top: 4rem;
    }
    @media (max-width: 1000px) {
        width: 100%;
    }
`;
export const RightSide = styled.div`
    width: 100%;
`;
export const LevelList = styled.ul`
    display: grid;
    gap: 4rem;
    grid-template-columns: 1fr 1fr 1fr;
    list-style: none;
    margin-bottom: 11.4rem;
    @media (max-width: 1300px) {
        grid-template-columns: 1fr 1fr;
        justify-items: center;
    }
    @media (max-width: 560px) {
        grid-template-columns: 1fr;
        justify-items: center;
    }
`;
export const LevelItem = styled.li<ILevelItem>`
    align-items: center;
    background-color: ${({ theme }) => theme.color.stoneAlpha.a20};
    border: 0.1rem ${({ theme, selected }) => (selected ? theme.color.yellow : theme.color.white)}
        solid;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    height: 14.5rem;
    justify-content: space-between;
    margin: 0 auto;
    padding: 1.6rem 2.4rem;
    width: 25.1rem;
    span:nth-of-type(3) {
        margin-top: 0.8rem;
    }
`;

export const ReferralsDetails = styled.section`
    display: flex;
    flex-direction: column;
`;
export const RNFT = styled(Typography)`
    background: ${({ theme }) => theme.color.gradient.linear.multicolor.first};
    display: inline-block;
    font-weight: 700;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;
export const ReferralsDetail = styled.div`
    align-items: flex-start;
    border-top: 1px ${({ theme }) => theme.color.stone} solid;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding-top: 3.2rem;
    @media (max-width: 500px) {
        align-items: center;
    }
`;

export const CenterHorizontally = styled.div`
    align-items: center;
    display: flex;
`;
export const BackArrowIcon = styled(Icon)`
    height: 2.4rem;
    margin-right: 0.8rem;
    width: 2.4rem;
`;
