import styled from 'styled-components';

import { NotificationBar } from '@/components/molecules/NotificationBar';

export const Backdrop = styled.div`
    align-items: center;
    background-color: ${({ theme }) => theme.color.blackAlpha.a85};
    bottom: 0;
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    width: 100vw;
    z-index: 1;
`;

export const Container = styled.div`
    background-color: ${({ theme }) => theme.color.stone};
    border-radius: 2.4rem;
    display: flex;
    margin: 2.4rem;
    max-height: 90vh;
    max-width: 90vw;
    padding: 2.4rem;
    position: relative;
    z-index: 101;
`;

export const ModalNotificationBar = styled(NotificationBar)`
    margin-top: 1.4rem;
    margin-bottom: 1.4rem;
`;
