import styled from 'styled-components';

export const CreatureCard = styled.div`
    align-items: center;
    background-color: ${({ theme }) => theme.color.blackAlpha.a10};
    border-radius: 1.2rem;
    color: ${({ theme }) => theme.color.white};
    display: flex;
    justify-content: center;
    width: 40rem;
    height: 64.7rem;
`;
