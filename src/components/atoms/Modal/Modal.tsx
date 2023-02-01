import { useRef } from 'react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import * as Styled from './Modal.styles';
import { IModal } from './Modal.types';

export const Modal = ({ hideModal, children }: IModal) => {
    const ref = useRef(null);
    useOnClickOutside(ref, hideModal);

    return (
        <Styled.Backdrop>
            <Styled.Container ref={ref} data-custom-modal>
                {children}
            </Styled.Container>
        </Styled.Backdrop>
    );
};

Modal.NotificationBar = Styled.ModalNotificationBar;
