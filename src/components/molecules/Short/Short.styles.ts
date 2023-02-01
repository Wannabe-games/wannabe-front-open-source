import styled, { css } from 'styled-components';

import { Button as Btn } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';

export const Short = styled.div(({ theme }) => {
    return css`
        background: ${theme.color.blackLike};
        border-radius: 2rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: 16.2rem;
        padding: 1.75rem 2.5rem 1.75rem;
        position: relative;
        width: 37.1rem;
        div:nth-of-type(1) {
            align-self: flex-start;
        }
        @media (max-width: 500px) {
            width: 100%;
            div:nth-of-type(1) {
                align-self: center;
            }
            img {
                display: none;
            }
        }
    `;
});

export const Header = styled.header`
    margin-bottom: 0.8rem;
    position: relative;
`;

export const InfoButton = styled.button`
    bottom: 0.2rem;
    position: absolute;
    right: -2.5rem;
`;

export const Title = styled(Typography)`
    margin-right: 0.8rem;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    gap: 1.6rem;
    margin-top: auto;
    @media (max-width: 500px) {
        justify-content: center;
        width: 100%;
    }
`;

export const Button = styled(Btn)`
    margin-top: auto;
`;
