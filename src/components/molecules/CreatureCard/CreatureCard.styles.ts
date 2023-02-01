import styled, { css } from 'styled-components';

import { Badge } from '@/components/atoms/Badge';
import { Typography } from '@/components/atoms/Typography';

import { IIsForUser, IStyledCard } from './CreatureCard.types';

export const CreatureCardContainer = styled.div<IStyledCard>`
    background-color: ${({ theme }) => theme.color.blackAlpha.a10};
    border-style: solid;
    border-color: ${({ theme, borderColor }) =>
        borderColor ? theme.color.neon[borderColor] : 'transparent'};
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    height: ${({ isForUser }) => (!isForUser ? '' : '647px')};
    justify-content: space-between;
    margin: 20px auto;

    padding: 2.4rem;
    position: relative;
    width: 40rem;
    ${({ borderColor }) =>
        borderColor &&
        css`
            border-width: 0.4rem;
        `};
    @media (max-width: 450px) {
        width: 100%;
    }
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const Creature = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 31.3rem;
    justify-content: space-between;
    text-align: center;
    img {
        width: 25.7rem;
    }
`;

export const GoldAmount = styled.span``;

export const Gold = styled.div<{ isFree?: boolean }>`
    align-items: center;
    color: ${({ theme }) => theme.color.white};
    display: flex;
    flex-wrap: nowrap;
    gap: 0.8rem;
    min-width: 9rem;
    position: relative;
    justify-content: flex-end;

    ${({ isFree }) =>
        isFree &&
        css`
            text-decoration: line-through;
            color: ${({ theme }) => theme.color.yellow};
            ${GoldAmount} {
                color: ${({ theme }) => theme.color.whiteAlpha.a40};
            }
        `}
`;

export const GoldBadge = styled(Badge)`
    position: absolute;
    right: 0;
    top: -1rem;
`;

export const Name = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

export const NameHeader = styled.header`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const Row = styled.div`
    align-items: center;
    color: ${({ theme }) => theme.color.white};
    display: flex;
    justify-content: space-between;
    dl {
        font-size: ${({ theme }) => theme.font.size.body1};
        display: inline-flex;
        column-gap: 0.5rem;
        row-gap: 0.7rem;
        flex-wrap: wrap;
        max-width: 15rem;
    }
    dt {
        color: ${({ theme }) => theme.color.whiteAlpha.a60};
    }
`;

export const Stats = styled.div<IIsForUser>`
    background-color: ${({ theme }) => theme.color.blackAlpha.a90};
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: ${({ isForUser }) => (!isForUser ? '' : '27.5rem')};
    justify-content: space-between;
    margin: -2.4rem;
    padding: 2.4rem;
    box-shadow: 0px 24px 32px rgba(11, 27, 40, 0.35);
    border-bottom-left-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;
`;

export const Traits = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

export const TwoColumns = styled.ul`
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 1fr;
    width: 100%;
`;

export const ActionBar = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    button,
    div {
        width: 100%;
    }
`;

export const AdditionalText = styled(Typography).attrs(() => ({
    variant: 'h5',
    weight: 'bold',
}))`
    text-align: center;
    flex: 1;
`;
