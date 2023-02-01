import styled from 'styled-components';

import { Typography } from '@/components/atoms/Typography';

export const MintUp = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    width: 76rem;
    @media (max-width: 900px) {
        width: 100%;
    }
`;
export const Actions = styled.div`
    display: flex;
    gap: 2.4rem;
    justify-content: flex-end;
    width: 100%;
    @media (max-width: 600px) {
        justify-content: center;
    }
`;
export const TypographyStyled = styled(Typography)`
    margin-left: 2.4rem;
    line-height: ${({ variant }) => (variant === 'body2' ? '1.6rem' : 'inherit')};
`;
export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
`;
