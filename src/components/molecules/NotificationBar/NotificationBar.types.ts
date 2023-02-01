export enum NOTIFICATION_TYPE {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
}

export interface INotificationBarProps {
    type: NOTIFICATION_TYPE;
    message: string;
    className?: string;
}
