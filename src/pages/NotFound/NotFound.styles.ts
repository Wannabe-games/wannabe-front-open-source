import styled from 'styled-components';

import { Button } from '@/components/atoms/Button';

export const NotFound = styled.section`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    min-height: 80vh;
    padding-top: 10.7rem;
    position: relative;
    @media (max-width: 700px) {
        align-items: center;
        flex-direction: column-reverse;
        gap: 4.8rem;
        justify-content: flex-end;
        min-height: 80vh;
        padding-top: 0;
    }
`;
export const Container = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    @media (max-width: 700px) {
        align-items: center;
    }
`;
export const GoBackButton = styled(Button)`
    margin-top: 2.8rem;
`;
export const Frog = styled.img`
    position: absolute;
    right: 61.1rem;
    top: 13.7rem;
    @media (max-width: 1100px) {
        right: 50%;
        top: 5rem;
        transform: translateX(50%);
    }
    @media (max-width: 700px) {
        top: 5rem;
        position: relative;
        right: 0;
        transform: translateX(0%);
    }
`;
export const Giraffe = styled.img`
    position: absolute;
    right: 27.2rem;
    top: 1.6rem;
    @media (max-width: 1100px) {
        display: none;
    }
`;
export const Rhino = styled.img`
    position: absolute;
    right: 4.1rem;
    top: 11.4rem;
    @media (max-width: 1100px) {
        display: none;
    }
`;
