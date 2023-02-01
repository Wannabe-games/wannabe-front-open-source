import styled, { css } from 'styled-components';

import { Button } from '@/components/atoms/Button';

export const NotFound = styled.section<{ withPadding?: boolean }>`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding-top: 10.7rem;
    position: relative;
    ${({ withPadding }) =>
        withPadding &&
        css`
            margin-bottom: 40rem;
        `}
`;
export const GoBackButton = styled(Button)`
    margin-top: 2.8rem;
`;
export const Frog = styled.img`
    position: absolute;
    right: 61.1rem;
    top: 13.7rem;
`;
export const Giraffe = styled.img`
    position: absolute;
    right: 27.2rem;
    top: 1.6rem;
`;
export const Rhino = styled.img`
    position: absolute;
    right: 4.1rem;
    top: 11.4rem;
`;
