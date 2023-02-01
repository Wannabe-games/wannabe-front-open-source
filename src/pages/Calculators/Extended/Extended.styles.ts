import styled from 'styled-components';

import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';

export const Calculator = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin: 0 auto;
    padding: 1.6rem 0;
    padding-right: 2.4rem;
    width: 81.7rem;
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
    button:nth-of-type(1) {
        margin-right: 2.4rem;
    }
`;
export const FutureRewards = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

export const FooterSpacer = styled.div`
    height: 21rem;
`;

export const FullWidthContainer = styled.div`
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: 10rem;
    padding: 1.6rem 0;
    position: relative;
    right: 50%;
    width: 100vw;
    background-color: ${({ theme }) => theme.color.blackAlpha.a10};
`;
