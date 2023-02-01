import styled from 'styled-components';

import { Typography } from '@/components/atoms/Typography';
import { Form } from '@/components/molecules/Form';

export const LoginForm = styled(Form)`
    margin-top: 6.6rem;
    @media (max-width: 700px) {
        margin-top: 1.6rem;
        span:nth-of-type(1) {
            font-size: ${({ theme }) => theme.font.size.h4};
            line-height: calc(2rem * 1.182);
        }
        span:nth-of-type(2) {
            font-size: ${({ theme }) => theme.font.size.h6};
            line-height: calc(2rem * 1.182);
        }
    }
`;

export const LoginFormActions = styled.div`
    align-items: center;
    display: flex;
    gap: 4rem;
    margin-top: 1.6rem;
    @media (max-width: 450px) {
        justify-content: center;
        width: 100%;
    }
`;

export const Subtitle = styled(Typography)`
    margin-top: -1.4rem;
    margin-bottom: 1.6rem;
`;
