import styled from 'styled-components';

import { ReactComponent as Crystals } from '@/assets/img/shorts/crystals.svg';

export const RightImage = styled(Crystals)`
    width: 14.8rem;
    position: absolute;
    bottom: 2.5rem;
    right: -4rem;
    @media (max-width: 500px) {
        display: none;
    }
`;
export const Money = styled.div`
    @media (max-width: 500px) {
        span {
            font-size: ${({ theme }) => theme.font.size.h4};
        }
    }
`;
export const Actions = styled.div`
    bottom: 1.6rem;
    display: flex;
    justify-content: flex-start;
    left: 0;
    padding: 0 2.4rem;
    position: absolute;
    right: 0;
    @media (max-width: 500px) {
        justify-content: center;
    }
`;
