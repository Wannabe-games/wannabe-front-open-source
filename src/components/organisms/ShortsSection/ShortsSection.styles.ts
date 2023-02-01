import styled from 'styled-components';

export const ShortsList = styled.ul`
    display: grid;
    gap: 5.2rem;
    grid-template-columns: 1fr 1fr 1fr;
    list-style: none;
    padding: 0;
    width: 100%;
    @media (max-width: 1350px) {
        grid-template-columns: 1fr 1fr;
        justify-items: center;
    }
    @media (max-width: 950px) {
        grid-template-columns: 1fr;
    }
`;

export const ShortsPlaceholder = styled.div`
    position: relative;
    top: -5.8rem;
    @media (max-width: 1350px) {
        display: none;
    }
`;
