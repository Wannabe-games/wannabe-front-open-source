import styled, { css } from 'styled-components';

import { Button as BaseButton } from '@/components/atoms/Button';
import { Dropdown } from '@/components/atoms/Dropdown';
import { Typography } from '@/components/atoms/Typography';

const TdThStyles = css`
    flex: 1 1 50%;
    min-width: 120px;
    text-align: left;
    padding: 1.6rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    @media (min-width: 900px) {
        flex: 1 1 150px;
        &:first-child {
            /* flex: 1 1 18rem; */
            min-width: 20rem;
            flex-basis: 20rem;
        }

        &:nth-child(2) {
            flex: 1 1 8rem;
        }

        &:nth-child(3) {
            flex: 1 1 6rem;
        }

        &:nth-child(4) {
            flex-basis: 13rem;
            min-width: 13rem;
        }

        &:last-child {
            flex-basis: 25rem;
            min-width: 25rem;
        }
    }

    @media (min-width: 1200px) {
        flex: 1 1 150px;
        &:first-child {
            flex: 1 1 15rem;
        }

        &:nth-child(2) {
            flex: 1 1 20rem;
        }

        &:nth-child(4) {
            flex: 1 1 8rem;
        }

        &:last-child {
            flex: 1 1 25rem;
        }
    }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 899px) {
        margin-top: 2.4rem;
    }
`;

export const SortBy = styled(Dropdown)`
    @media (min-width: 900px) {
        display: none;
    }
`;

export const Heading = styled(Typography)`
    color: ${({ theme }) => theme.color.yellow};
    font-weight: bold;

    @media (max-width: 899px) {
        font-size: 2rem;
    }
`;

export const Table = styled.table`
    width: 100%;
    margin-top: 1.9rem;
    color: ${({ theme }) => theme.color.whiteAlpha.a60};
`;

export const Td = styled.td`
    ${TdThStyles};
`;

export const Score = styled.span`
    color: ${({ theme }) => theme.color.yellow};
`;

export const StacksAmount = styled.span`
    font-size: 2.6rem;
    color: #fff;
    display: flex;
    align-items: center;
    column-gap: 1rem;
    font-weight: 700;
    letter-spacing: 0.2rem;
    svg {
        position: relative;
        top: 0.2rem;
    }
`;

export const Username = styled.span`
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    column-gap: 0.8rem;
`;

export const Th = styled.th`
    ${TdThStyles};
`;

export const Tr = styled.tr<{ isDraft?: boolean }>`
    display: flex;

    border-radius: 2rem;
    &:first-child {
        @media (max-width: 899px) {
            display: none;
        }

        ${Th} {
            padding-bottom: 3.5rem;
        }
    }
    &:not(:first-child) {
        font-size: 1.8rem;
        background: linear-gradient(269.99deg, #0b1b28 0.01%, rgba(38, 58, 73, 0.5) 99.99%),
            linear-gradient(0deg, #0b1b28, #0b1b28);
        ${({ isDraft, theme }) => isDraft && `background: ${theme.color.stone}`};
        margin-bottom: 1.6rem;
    }
    @media screen and (max-width: 899px) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 0.5em 0;
    }
`;

export const MobileLabel = styled.p`
    font-size: 1.2rem;
    flex: 1 1 100%;
    margin-top: 0.5rem;

    @media (min-width: 900px) {
        display: none;
    }
`;

export const Button = styled(BaseButton)`
    width: 100%;
`;

export const UserIconWrapper = styled.div`
    border: 1px solid ${({ theme }) => theme.color.whiteAlpha.a60};
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        fill: ${({ theme }) => theme.color.whiteAlpha.a60};
    }
`;
