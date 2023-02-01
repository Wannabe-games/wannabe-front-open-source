import styled from 'styled-components';

export const LobbiesPage = styled.section`
    margin-top: 9.4rem;
    padding-bottom: 41rem;
    @media (max-width: 900px) {
        margin-top: 3.2rem;
        min-height: 50rem;
        padding-bottom: 3.2rem;
    }
`;

export const HeaderWrapper = styled.div`
    img {
        max-width: 16rem;
        right: 0.5rem;
        bottom: -2.5rem;
    }
`;

export const ButtonWrapper = styled.div`
    text-align: right;
    margin-top: 7rem;
    @media (max-width: 600px) {
        margin-top: 2.4rem;
    }
`;

export const LobbyListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2.4rem;
`;
