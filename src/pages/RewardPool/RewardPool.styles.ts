import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const RewardPool = styled.section`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-bottom: 24rem;
    padding-top: 10rem;
    @media (max-width: 900px) {
        padding-bottom: 3.2rem;
        padding-top: 3.2rem;
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
