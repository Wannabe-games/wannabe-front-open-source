import styled from 'styled-components';

import { Typography } from '@/components/atoms/Typography';

export const MintCapWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

export const MintCap = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MintCapValue = styled.span``;

export const Subtitle = styled(Typography)`
    color: ${({ theme }) => theme.color.yellow};
    margin: 0.2rem 0 1.6rem 0;
`;
