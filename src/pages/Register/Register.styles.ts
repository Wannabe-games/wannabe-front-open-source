import styled from 'styled-components';

import background from '@/assets/img/creature-team.png';
import { Typography } from '@/components/atoms/Typography';

export const Container = styled.div`
    margin-top: 11rem;
    @media (max-width: 800px) {
        margin-top: 3.2rem;
    }
`;
export const RegisterPage = styled.main`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-bottom: 4rem;
    max-width: 144rem;
    padding-bottom: 21rem;
    @media (max-width: 1000px) {
        min-height: 531px;
    }
    @media (max-width: 900px) {
        padding-bottom: 1.6rem;
    }
`;

export const RegisterForm = styled.div`
    background: url(${background});
    background-position: top 0 right 4.8rem;
    background-repeat: no-repeat;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    padding-left: 6.5rem;
    margin-top: 10rem;
    width: 100%;
    @media (max-width: 800px) {
        margin-top: 3.2rem;
        background: none;
        > span:nth-child(1) {
            font-size: ${({ theme }) => theme.font.size.h2};
            line-height: calc(2rem * 1.182);
            margin-top: 0;
        }
        > span:nth-child(2) {
            font-size: ${({ theme }) => theme.font.size.h4};
            line-height: calc(2rem * 1.182);
        }
    }
    @media (max-width: 560px) {
        padding-left: 0;
    }
`;

export const RegisterPageImage = styled.img`
    height: 531px;
    width: 683px;
`;

export const Title = styled(Typography)`
    margin-bottom: 1rem;
`;
