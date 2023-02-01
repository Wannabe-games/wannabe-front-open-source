import styled from 'styled-components';

import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';

export const UpgradeSection = styled.section`
    display: grid;
    gap: 3.8rem;
    grid-template-columns: 15.6rem 1fr;
    margin-top: 4.8rem;
    @media (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
`;
export const CreatureProfile = styled.section`
    margin-top: 10rem;
`;
export const CreatureImage = styled.img`
    border: 5px ${({ theme }) => theme.color.stone} solid;
    border-radius: 1.2rem;
    height: 37.6rem;
    width: 37.6rem;
    @media (max-width: 900px) {
        height: 24.6rem;
        width: 24.6rem;
    }
    @media (max-width: 750px) {
        margin: 0 auto;
    }
`;
export const ActiveSwitch = styled.div`
    align-items: center;
    display: flex;
    gap: 1.6rem;
    justify-content: flex-end;
    margin: 3.5rem 0;
`;

export const FullWidthContainer = styled.div`
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    position: relative;
    right: 50%;
    width: 100vw;
    background-color: ${({ theme }) => theme.color.blackLike};
`;

export const CreatureDetails = styled.section`
    display: grid;
    gap: 6.5rem;
    grid-template-columns: 37.6rem 1fr;
    margin-top: 5.2rem;
    max-width: 132rem;
    padding: 8rem 2rem;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 900px) {
        grid-template-columns: 24.6rem 1fr;
        padding: 3.2rem 1.6rem;
        padding-bottom: 4rem;
    }
    @media (max-width: 750px) {
        gap: 1.6rem;
        grid-template-columns: 1fr;
    }
`;

export const LeftContainer = styled.div``;

export const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & > span:first-child:not(${Badge}) {
        padding-top: 1.6rem;
    }

    ${Badge} {
        align-self: flex-start;
        margin-bottom: 2rem;
    }
`;

export const BodyPartsStatistics = styled.div`
    display: grid;
    gap: 2.4rem;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 1200px) {
        grid-template-columns: 1fr 1fr;
    }
`;

export const ProgressBarHeader = styled.div`
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const Performance = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.6rem;
    margin-bottom: 2.4rem;
    margin-top: 3.2rem;
`;

export const UpgradeType = styled.div``;

export const UpgradeButtons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 4rem;
    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 750px) {
        grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 550px) {
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;
    }
`;

export const IconButton = styled.button`
    background: linear-gradient(
        40.19deg,
        rgba(255, 69, 255, 0.2) 11.52%,
        rgba(103, 32, 248, 0.2) 79.61%
    );
    border-radius: 1.2rem;
    height: 8.7rem;
    width: 8.7rem;
`;

export const Divider = styled.hr`
    background-color: ${({ theme }) => theme.color.stone};
    border: none;
    height: 0.1rem;
    margin: 4.8rem 0;
    width: 100%;
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 2.4rem;
    justify-content: flex-end;
`;

export const DescriptionList = styled.dl`
    margin-top: 1.6rem;
`;

export const Description = styled.dd`
    margin-bottom: 0.8rem;
`;

export const OtherCreaturesContainer = styled.section`
    max-width: 132rem;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-left: auto;
    margin-right: auto;
`;

export const CreatureListHeader = styled.header`
    display: flex;
    justify-content: space-between;
    margin: 3rem 0 1rem;
    padding-left: 1rem;
`;

export const CreaturesList = styled.ul`
    display: grid;
    gap: 4rem;
    grid-template-columns: 1fr 1fr 1fr;
    list-style: none;
    padding: 0 0 26rem 0;
    @media (max-width: 1350px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        padding: 0 0 6rem 0;
    }
`;

export const MoreCreaturesButton = styled(Button)`
    grid-column: 1 / -1;
    margin: 0 auto;
`;

export const ShortsList = styled.ul`
    display: grid;
    gap: 5.2rem;
    grid-template-columns: 1fr 1fr 1fr;
    list-style: none;
    margin-top: 10rem;
    padding: 0;
    width: 100%;
`;
