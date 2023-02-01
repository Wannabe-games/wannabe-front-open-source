import styled from 'styled-components';

export const RegisterPageStep3 = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 8rem;
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
export const CreaturesList = styled.ul`
    background-image: url(/static/creature-team-4.png);
    background-repeat: no-repeat;
    background-position: bottom 26rem right 2rem;
    display: grid;
    gap: 4rem;
    grid-template-columns: 1fr 1fr 1fr;
    list-style: none;
    padding: 0 8rem 26rem;
    @media (max-width: 1330px) {
        background-image: none;
        grid-template-columns: 1fr 1fr;
        padding: 0;
    }
    @media (max-width: 950px) {
        grid-template-columns: 1fr;
    }
`;
export const Container = styled.main`
    margin-top: 8.7rem;
    @media (max-width: 600px) {
        margin-top: 3.2rem;
    }
`;
