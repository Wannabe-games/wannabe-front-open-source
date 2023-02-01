import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Typography } from '@/components/atoms/Typography';

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

export const DayRewardsList = styled.ul`
    display: grid;
    gap: 4rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    position: relative;
    width: 100%;
    @media (max-width: 1330px) {
        grid-template-columns: 1fr 1fr 1fr;
        justify-items: center;
    }
    @media (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

export const DayReward = styled.li`
    background: ${({ theme }) => theme.color.blackLike};
    border-radius: 2rem;
    box-shadow: 0px 24px 32px 0px ${({ theme }) => theme.color.blackLike}59;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.6rem;
    padding: 2.4rem 4.7rem;
    @media (max-width: 1300px) {
        width: 30rem;
    }
    @media (max-width: 400px) {
        width: 28rem;
    }
`;

export const Time = styled(Typography)`
    grid-column: 1/3;
    text-align: center;
`;

export const Divider = styled.hr`
    border: none;
    border-top: 0.1rem ${({ theme }) => theme.color.stone} solid;
    grid-column: 1/3;
    margin: 0;
    width: 100%;
`;

export const Cell = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
`;

export const Actions = styled.div`
    text-align: center;
    grid-column: 1/3;
`;

export const Money = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const Received = styled(Typography)`
    display: inline-block;
    margin: 1rem 2.4rem;
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

export const BackgroundImage = styled.img`
    bottom: 0;
    position: absolute;
    right: 0;
    z-index: -1;
    @media (max-width: 750px) {
        display: none;
    }
`;
