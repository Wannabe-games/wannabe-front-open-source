import styled, { css } from 'styled-components';

export const Loader = styled.div(({ theme }) => {
    return css`
        align-items: center;
        backdrop-filter: blur(2.4rem);
        background: ${theme.color.blackAlpha.a10};
        border-radius: 1.2rem;
        border: 1px solid ${theme.color.yellow};
        color: #fff;
        display: flex;
        height: 3.5rem;
        justify-content: center;
        width: 11.9rem;
    `;
});

export const Text = styled.span`
    &::after {
        animation: ellipsis 1.25s infinite;
        content: '';
        display: inline-block;
        text-align: left;
        width: 1em;
    }
    @keyframes ellipsis {
        26% {
            content: '.';
        }
        52% {
            content: '..';
        }
        78% {
            content: '...';
        }
    }
`;
