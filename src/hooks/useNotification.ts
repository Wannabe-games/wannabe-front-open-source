import { useState } from 'react';

import { INotificationBarProps } from '@/components/molecules/NotificationBar/NotificationBar.types';

export const useNotification = () => {
    const [notification, setNotification] = useState<INotificationBarProps>();

    const handleSetNotification = (notification: Omit<INotificationBarProps, 'isVisible'>) => {
        setNotification(notification);
    };

    const handleClearNotification = () => {
        setNotification(undefined);
    };

    return {
        notification,
        setNotification: handleSetNotification,
        clearNotification: handleClearNotification,
    };
};
