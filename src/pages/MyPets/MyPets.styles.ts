import styled from 'styled-components';

import { Button } from '@/components/atoms/Button';

export const ShortsList = styled.ul`
    display: grid;
    gap: 5.2rem;
    grid-template-columns: 1fr 1fr 1fr;
    list-style: none;
    padding: 0;
    width: 100%;
`;

export const MyPetsPage = styled.section`
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
        max-width: 17.2rem;
        right: 1.3rem;
        bottom: -2.5rem;
    }
`;

export const CreaturesList = styled.ul`
    display: grid;
    gap: 4rem;
    grid-template-columns: 1fr 1fr 1fr;
    list-style: none;
    @media (max-width: 1350px) {
        grid-template-columns: 1fr 1fr;
        justify-items: center;
    }
    @media (max-width: 800px) {
        grid-template-columns: 1fr;
        justify-items: center;
    }
`;
export const FilterList = styled.ul`
    display: flex;
    gap: 1.6rem;
    justify-content: flex-end;
    margin-bottom: 4rem;
    margin-top: 5.4rem;
`;
export const StyledButton = styled(Button)`
    background-color: ${({ theme }) => theme.color.blackLike};
    border: none;
    color: ${({ theme }) => theme.color.white};
`;

export const CreatureListHeader = styled.header`
    display: flex;
    justify-content: flex-end;
    margin-top: 2.4rem;
    margin-bottom: 2rem;
    button:first-child {
        display: none;
    }
    @media (min-width: 800px) {
        margin-top: 10rem;
    }
    @media (max-width: 800px) {
        button:first-child {
            display: flex;
            min-width: 14rem;
        }
        ol {
            display: none;
        }
    }
`;

export const MoreCreaturesButton = styled(Button)`
    grid-column: 1 / -1;
    margin: 0 auto;
    margin-bottom: 15rem;
`;
