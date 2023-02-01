import styled from 'styled-components';

import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import { HeadersImage } from '@/components/molecules/Headers';

import { ILevelItem } from './Referrals.types';

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
    padding-bottom: 60.1rem;
    ${HeadersImage} {
        bottom: -4rem;
        right: 0;
    }
`;

export const ReferralsTitle = styled(Typography)`
    letter-spacing: 0.1rem;
`;
export const Container = styled.section`
    background-color: ${({ theme }) => theme.color.blackLike};
    display: grid;
    gap: 6.4rem;
    grid-template-columns: 35.7rem 1fr;
    margin-top: 8.8rem;
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
    margin-bottom: 6.8rem;
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
    padding: 1.6rem 2.4rem;
    width: 25.1rem;
    span:nth-of-type(3) {
        margin-top: 0.8rem;
    }
`;

export const ReferralsDetails = styled.section`
    display: grid;
    gap: 0.2rem;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 850px) {
        gap: 3.2rem;
        grid-template-columns: 1fr;
        justify-items: center;
    }
    & > div {
        align-items: center;
    }
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
export const ReferralsDetail = styled.div`
    align-items: flex-start;
    border-top: 1px ${({ theme }) => theme.color.stone} solid;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 3.2rem;
    @media (max-width: 500px) {
        align-items: center;
    }
`;
export const ReferralsList = styled.div`
    padding: 4rem 8.2rem 6.4rem 8.2rem;
    table {
        width: 100%;
    }
    thead {
        border-bottom: 0.1rem ${({ theme }) => theme.color.whiteAlpha.a20} solid;
    }
    th {
        color: ${({ theme }) => theme.color.whiteAlpha.a60};
        font-size: 2.2rem;
        padding: 2.4rem 0;
        text-align: left;
    }
    th:nth-of-type(1) {
        width: 55rem;
    }
    td {
        color: ${({ theme }) => theme.color.white};
        padding: 1.7rem 0;
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
export const ReferralCodeWrapper = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
`;

export const TotalRewardsTextWrapper = styled.div`
    margin-bottom: 1.4rem;
`;
