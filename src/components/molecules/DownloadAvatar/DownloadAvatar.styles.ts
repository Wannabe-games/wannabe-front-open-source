import styled from 'styled-components';

export const DownloadAvatar = styled.div`
    background: ${({ theme }) => theme.color.stoneAlpha.a20};
    border-radius: 2.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 1.6rem 1.6rem 1.9rem;
`;

export const SocialMediaBox = styled.div`
    align-items: center;
    display: flex;
    gap: 0.8rem;
    margin-top: 1.4rem;
    a {
        display: flex;
    }
`;

export const SocialMediaLink = styled.a`
    color: ${({ theme }) => theme.color.yellow};
    padding: 0.8rem 0 0.5rem 2rem;
`;
