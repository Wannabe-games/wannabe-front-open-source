import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@/components/atoms/Button';

export const MintcapStatistics = styled.section`
    margin-top: 9.4rem;
    padding-bottom: 41rem;
    @media (max-width: 900px) {
        margin-top: 3.2rem;
        min-height: 50rem;
        padding-bottom: 3.2rem;
    }
`;
export const BackToDashboard = styled(Link)`
    margin-bottom: 2.2rem;
    width: 100%;
    span {
        align-items: center;
        display: flex;
        gap: 0.8rem;
    }
`;
export const DropdownsRow = styled.div`
    display: flex;
    gap: 1.6rem;
    margin-bottom: 2.4rem;
    div {
        width: 100%;
    }
    @media (max-width: 926px) {
        & > div {
            max-width: 30%;
        }
        flex-wrap: wrap;
        justify-content: center;
    }
    @media (max-width: 650px) {
        & > div {
            max-width: 45%;
        }
    }
    @media (max-width: 430px) {
        & > div {
            max-width: 100%;
        }
    }
`;
export const Filters = styled.div`
    margin-top: 5.8rem;
`;
export const ShowOnly = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 4rem 0;
`;
export const CreaturesList = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 35.5rem);
    justify-content: space-between;
    margin-top: 2.2rem;
    width: 100%;
    @media (max-width: 1126px) {
        grid-template-columns: repeat(2, 35.5rem);
        justify-content: space-around;
    }
    @media (max-width: 774px) {
        grid-template-columns: repeat(1, 35.5rem);
    }
`;
export const Header = styled.section`
    @media (max-width: 874px) {
        display: none;
    }
`;

export const MoreCreaturesButton = styled(Button)`
    grid-column: 1 / -1;
    margin: 1.6rem auto;
    margin-bottom: 15rem;
`;
