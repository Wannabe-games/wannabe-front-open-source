import styled from 'styled-components';

import { Typography } from '@/components/atoms/Typography';

export const Footer = styled.footer`
    background-color: rgba(11, 27, 40, 0.3);
    bottom: 0;
    padding: 4rem 8rem;
    position: fixed;
    width: 100vw;
    left: 0;
    @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
        backdrop-filter: blur(24px);
        background-color: rgba(11, 27, 40, 0.1);
    }
    @media (max-width: 900px) {
        padding: 1.6rem 0;
        position: static;
        margin-left: -2rem;
        width: 100vw;
    }
`;

export const FooterInner = styled.div`
    display: flex;
    justify-content: space-between;
    a {
        color: ${({ theme }) => theme.color.yellow};
    }
    @media (max-width: 900px) {
        justify-items: center;
        display: grid;
        gap: 1.6rem;
        grid-template-columns: 1fr;
        span {
            text-align: center;
        }
        ul {
            gap: 1.6rem;
        }
        li {
            margin: 0;
        }
    }
    @media (max-width: 750px) {
        ul {
            flex-direction: column;
        }
    }
`;

export const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    @media (max-width: 900px) {
        align-items: center;
        gap: 1.6rem;
    }
`;

export const FooterQuote = styled(Typography)`
    margin-bottom: 0.3rem;
    margin-top: 2.4rem;
`;
