import styled from 'styled-components';

export const Form = styled.form`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    margin-bottom: 2.6rem;
    margin-top: 4rem;
    width: 41.4rem;
    @media (max-width: 600px) {
    }
    @media (max-width: 450px) {
        button {
            margin: 0 auto;
        }
        width: 100%;
    }
`;

export const FormError = styled.span`
    color: ${({ theme }) => theme.color.whiteAlpha.a60};
    margin-left: 2.4rem;
    margin-top: -1rem;
`;

export const FormField = styled.label`
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    ${FormError} {
        margin-top: 0;
    }
`;

export const FormLabel = styled.span`
    font-size: ${({ theme }) => theme.font.size.h6};
    color: ${({ theme }) => theme.color.yellow};
    margin-left: 2.4rem;
`;
