import styled from 'styled-components';

import { Button } from '@/components/atoms/Button';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { PROGRESS_BAR_TYPES } from '@/components/atoms/ProgressBar/ProgressBar.types';
import { Typography } from '@/components/atoms/Typography';
import { IIconButton } from '@/pages/UpgradeCreature/UpgradeCreature.types';

export const RegisterPageStep4 = styled.div`
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
    @media (max-width: 600px) {
        padding-top: 3.2rem;
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

export const CreatureDetails = styled.section`
    display: grid;
    gap: 6.5rem;
    grid-template-columns: 37.6rem 1fr;
    margin-top: 4rem;
    max-width: 132rem;
    padding: 8rem 2rem;
    padding-bottom: 4rem;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 900px) {
        grid-template-columns: 24.6rem 1fr;
        padding-bottom: 4rem;
    }
    @media (max-width: 750px) {
        grid-template-columns: 1fr;
    }
`;

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
`;

export const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding-top: 1.6rem;
`;

export const CreatureImage = styled.img`
    border: 5px ${({ theme }) => theme.color.stone} solid;
    border-radius: 1.2rem;
    height: 37.6rem;
    width: 37.6rem;
    @media (max-width: 900px) {
        height: 24.6rem;
        width: 24.6rem;
    }
    @media (max-width: 750px) {
        margin: 0 auto;
    }
`;

export const Container = styled.main`
    margin-top: 8.7rem;
    padding-bottom: 21rem;
    @media (max-width: 900px) {
        padding-bottom: 5rem;
    }
    @media (max-width: 600px) {
        margin-top: 3.2rem;
        padding-bottom: 3.2rem;
    }
`;

export const BodyPartTitle = styled(Typography)`
    display: inline-block;
    margin-bottom: 3.2rem;
    margin-top: 3rem;
`;

export const BodyPartsStatistics = styled.div`
    display: grid;
    column-gap: 2.4rem;
    row-gap: 1.3rem;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 1200px) {
        grid-template-columns: 1fr 1fr;
    }
`;

export const BodyPartProgressBar = styled(ProgressBar).attrs(() => ({
    barHeight: '1rem',
    variant: PROGRESS_BAR_TYPES.PURPLE,
}))``;

export const ProgressBarHeader = styled.div`
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const UpgradeSection = styled.section`
    display: grid;
    gap: 3.8rem;
    grid-template-columns: 15.6rem 1fr;
    margin-top: 4.8rem;
    @media (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
`;

export const Performance = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.6rem;
    grid-template-columns: 1fr;
    span:nth-child(1) {
        grid-column: 1/3;
    }
    @media (max-width: 1000px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`;

export const UpgradeType = styled.div``;

export const UpgradeButtons = styled.div`
    display: grid;
    gap: 1.6rem;
    grid-template-columns: repeat(5, 1fr);
    justify-content: space-between;
    margin-top: 4rem;
    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 750px) {
        grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 550px) {
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;
    }
`;

export const IconButton = styled.button<IIconButton>`
    background: ${({ active }) =>
        !active
            ? 'linear-gradient(40.19deg, rgba(255, 69, 255, 0.2) 11.52%, rgba(103, 32, 248, 0.2) 79.61%)'
            : 'linear-gradient(40.19deg, #ff45ff 11.52%, #6720f8 79.61%)'};
    border-radius: 1.2rem;
    height: 8.7rem;
    position: relative;
    width: 8.7rem;
    ${({ active }) =>
        active &&
        `&::after {
      bottom: -1.4rem;
      content: '';
      border-left: 1.5rem solid transparent;
      border-right: 1.5rem solid transparent;
      border-top: 1.5rem solid #e03efe;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
  }`}
`;

export const Price = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;
    margin-top: 4rem;
    span {
        align-items: center;
        display: flex;
        gap: 0.8rem;
    }
    @media (max-width: 1250px) {
        flex-wrap: wrap;
    }
    @media (max-width: 500px) {
        flex-wrap: wrap;
        justify-content: center;
    }
`;

export const UpgradeButton = styled(Button)`
    margin-left: 2.4rem;
`;

export const UpgradeText = styled.div`
    span {
        max-width: 56.4rem;
        text-align: right;
    }
`;
export const NFTInfo = styled(Typography)`
    padding: 3.2rem;
    text-align: center;
`;
