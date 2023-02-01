import styled from 'styled-components';

import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';

export const Calculator = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    max-height: 80vh;
    overflow-y: scroll;
    padding-right: 2.4rem;
    width: 81.7rem;
    &::-webkit-scrollbar {
        margin: 20rem;
        width: 1.2rem;
    }
    &::-webkit-scrollbar-track {
        border-radius: 1rem;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 1rem;
        background-color: ${({ theme }) => theme.color.whiteAlpha.a60};
    }
`;

export const Divider = styled.hr`
    border: 0.1rem ${({ theme }) => theme.color.whiteAlpha.a20} solid;
    margin: 1.6rem 0;
    width: 100%;
`;

export const Row = styled.div`
    display: grid;
    gap: 5.6rem;
    grid-template-columns: 40rem 1fr;
`;

export const InputTypography = styled(Typography)`
    display: inline-block;
    margin-bottom: 1rem;
`;

export const TypographyMargin = styled(Typography)`
    display: inline-block;
    margin-bottom: 0.8rem;
`;

export const RNFT = styled(Typography)`
    background: ${({ theme }) => theme.color.gradient.linear.multicolor.first};
    display: inline-block;
    font-weight: 700;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const CalculateButton = styled(Button)`
    justify-content: center;
    width: 100%;
`;
export const Actions = styled.div`
    text-align: right;
    padding-bottom: 0.2rem;
    margin-top: 2.4rem;
    button:nth-of-type(2) {
        margin-right: 2.4rem;
    }
`;
export const FutureRewards = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;
