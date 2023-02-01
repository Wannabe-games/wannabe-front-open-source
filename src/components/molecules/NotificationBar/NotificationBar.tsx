import { useState } from 'react';

import * as Styled from './NotificationBar.styles';
import { INotificationBarProps } from './NotificationBar.types';

export const NotificationBar = ({ className, message, type }: INotificationBarProps) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible || !message) {
        return null;
    }

    return (
        <Styled.Wrapper className={className} type={type}>
            {message} <Styled.CloseButton onClick={handleClose} />
        </Styled.Wrapper>
    );
};
