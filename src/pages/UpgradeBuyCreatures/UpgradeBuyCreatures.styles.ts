import styled from 'styled-components';

export const UpgradeCreatures = styled.section`
    margin-top: 10.1rem;
    padding-bottom: 40rem;
`;
export const Filters = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.6rem;
    justify-content: space-between;
    margin-top: 5.8rem;
    @media (max-width: 650px) {
        align-items: center;
        flex-direction: column;
    }
`;
export const CreaturesList = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 35.5rem);
    justify-content: space-between;
    margin-top: 2.2rem;
    width: 100%;
    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 35.5rem);
        justify-content: space-around;
    }
    @media (max-width: 780px) {
        grid-template-columns: repeat(1, 35.5rem);
    }
`;
export const Dropdowns = styled.div`
    width: 20rem;
`;
