import styled from 'styled-components';

import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';

export const Headers = styled.header`
    align-items: center;
    background-color: ${({ theme }) => theme.color.blackLike};
    box-shadow: 0px 24px 32px 0px #0b1b2859;
    border-radius: 2rem;
    display: flex;
    justify-content: space-between;
    margin-top: 2.6rem;
    padding: 1.6rem 22.6rem 1.6rem 3.2rem;
    position: relative;
    gap: 1rem;
    @media (max-width: 1200px) {
        padding: 1.6rem 3.2rem 1.6rem 3.2rem;
    }
    @media (max-width: 1000px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`;
export const Stat = styled.div`
    display: flex;
    flex-direction: column;

    @media (max-width: 700px) {
        span:nth-child(odd) {
            font-size: 2rem;
        }
    }
    @media (min-width: 701px) {
        align-items: center;
    }
`;

export const Value = styled(Typography)`
    line-height: 1.5;
`;

export const Title = styled(Typography)`
    line-height: 3.05rem;
    max-width: 12.8rem;
    overflow-wrap: normal;
    @media (max-width: 1000px) {
        font-size: 2rem;
        grid-column: 1/3;
        margin: 0 auto;
        text-align: center;
    }
`;
export const CreaturesImage = styled.img`
    bottom: -2rem;
    position: absolute;
    right: -3.8rem;
    width: 20rem;
    @media (max-width: 1200px) {
        display: none;
    }
`;
export const Row = styled.div``;
export const CenterHorizontally = styled.div`
    align-items: center;
    display: flex;

    @media (min-width: 650px) {
        margin-left: 2.75rem;
    }
`;
export const BackArrowIcon = styled(Icon)`
    height: 2.4rem;
    margin-right: 0.8rem;
    width: 2.4rem;
`;
