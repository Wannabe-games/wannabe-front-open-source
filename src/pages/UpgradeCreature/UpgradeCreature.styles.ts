import styled, { css } from 'styled-components';

import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { PROGRESS_BAR_TYPES } from '@/components/atoms/ProgressBar/ProgressBar.types';
import { Typography } from '@/components/atoms/Typography';

import { IIconButton } from './UpgradeCreature.types';

export const UpgradeCreature = styled.section`
    margin-top: 10.1rem;
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
    margin-top: 5.2rem;
    max-width: 132rem;
    padding: 8rem 2rem;
    padding-bottom: 40rem;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 900px) {
        grid-template-columns: 24.6rem 1fr;
        padding: 3.2rem 1.6rem;
        padding-bottom: 4rem;
    }
    @media (max-width: 750px) {
        gap: 1.6rem;
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
    padding-top: 5.2rem;

    & > span:first-child:not(${Badge}) {
        padding-top: 1.6rem;
    }

    ${Badge} {
        align-self: flex-start;
        margin-bottom: 2rem;
    }
`;

export const DescriptionList = styled.dl`
    margin-top: 1.6rem;
`;

export const Description = styled.dd`
    margin-bottom: 0.8rem;
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
export const ProgressBarHeader = styled.div`
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const BodyPartTitle = styled(Typography)`
    display: inline-block;
    margin-bottom: 3.2rem;
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
        css`
            &::after {
                bottom: -1.4rem;
                content: '';
                border-left: 1.5rem solid transparent;
                border-right: 1.5rem solid transparent;
                border-top: 1.5rem solid #e03efe;
                left: 50%;
                position: absolute;
                transform: translateX(-50%);
            }
        `}
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

export const UpgradeSection = styled.section`
    display: grid;
    gap: 3.8rem;
    grid-template-columns: 15.6rem 1fr;
    margin-top: 4.8rem;
    @media (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
`;

export const Divider = styled.hr`
    background-color: ${({ theme }) => theme.color.stone};
    border: none;
    height: 0.1rem;
    margin: 4.8rem 0;
    width: 100%;
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

export const CenterHorizontally = styled.div`
    align-items: center;
    display: flex;
    margin-bottom: 2.4rem;
`;

export const BackArrowIcon = styled(Icon)`
    height: 2.4rem;
    margin-right: 0.8rem;
    width: 2.4rem;
`;

export const ActiveSwitch = styled.div`
    align-items: center;
    display: flex;
    gap: 1.6rem;
    justify-content: flex-end;
`;

export const CooldownIcon = styled(Icon)`
    position: absolute;
    right: 0.6rem;
    top: 0.6rem;
`;

export const Cooldown = styled.div`
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    a {
        color: ${({ theme }) => theme.color.white};
        text-decoration: underline;
    }
`;

export const CooldownTime = styled(Typography)`
    margin-bottom: 2.4rem;
    margin-top: -1.4rem;
`;
