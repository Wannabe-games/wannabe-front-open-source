export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
    label?: string | React.ReactNode;
    onClick?: (e: React.FormEvent) => void;
    primary?: boolean;
    rightIcon?: React.ReactElement;
    route?: string;
    secondary?: boolean;
    stake?: boolean;
    state?: {
        [key: string]: string;
    };
    tertiary?: boolean;
    type?: 'submit' | 'button';
    replace?: boolean;
}

export interface IStyledButton extends Omit<IButton, 'rightIcon'> {
    rightIcon?: boolean;
}
