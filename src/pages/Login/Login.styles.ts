import styled from 'styled-components';

import background from '@/assets/img/creature-team-2.png';

export const LoginPage = styled.main`
    background-image: url(${background});
    background-position: top right 4.8rem;
    background-repeat: no-repeat;
    display: flex;
    justify-content: space-between;
    margin-top: 5rem;
    min-height: 53.1rem;
    padding-left: 6.5rem;
    @media (max-width: 800px) {
        background-image: none;
        margin-top: 1.6rem;
        min-height: 40rem;
    }
    @media (max-width: 560px) {
        padding-left: 0;
    }
`;
export const FooterSpacer = styled.div`
    height: 21rem;
    @media (max-width: 900px) {
        height: 0;
    }
`;
