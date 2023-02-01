import styled from 'styled-components';

export const StakedCreatures = styled.main`
    margin-top: 9.4rem;
    padding-bottom: 41rem;
    @media (max-width: 900px) {
        margin-top: 3.2rem;
        min-height: 50rem;
        padding-bottom: 3.2rem;
    }
`;
export const ListHeader = styled.header`
    display: flex;
    gap: 1.6rem;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 9.5rem;
    @media (max-width: 900px) {
        align-items: center;
        flex-direction: column;
    } ;
`;
export const CreatureList = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 35.5rem);
    justify-content: space-between;
    gap: 4rem;
    margin-top: 4rem;
`;
export const CreatureListItem = styled.li``;

export const Dropdowns = styled.div`
    width: 24.2rem;
`;
