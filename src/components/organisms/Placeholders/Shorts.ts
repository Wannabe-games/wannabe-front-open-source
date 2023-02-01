import styled from 'styled-components';

export const Shorts = styled.li`
    align-items: center;
    background-color: ${({ theme }) => theme.color.blackLike};
    border-radius: 2rem;
    box-shadow: 0 24px 32px rgba(11, 27, 40, 0.35);
    color: ${({ theme }) => theme.color.white};
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: 37.1rem;
    height: 16.2rem;
`;
