import styled from 'styled-components';

import { Typography } from '@/components/atoms/Typography';

export const MintNFTReferral = styled.div`
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
export const RNFTText = styled(Typography)`
    background: ${({ theme }) => theme.color.gradient.linear.multicolor.first};
    display: inline-block;
    font-weight: 700;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;
