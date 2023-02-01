import * as Styled from './Button.styles';
import { IButton } from './Button.types';

export const Button = ({
    className,
    disabled,
    label,
    onClick,
    primary,
    rightIcon,
    route,
    secondary,
    stake,
    state,
    tertiary,
    replace,
    type = 'button',
}: IButton) => {
    if (route) {
        return (
            <Styled.Button
                as="div"
                className={className}
                disabled={disabled}
                primary={primary}
                rightIcon={!!rightIcon}
                secondary={secondary}
                stake={stake}
                tertiary={tertiary}
            >
                <Styled.Link to={route} state={state} replace={replace} />
                {label}
                {rightIcon}
            </Styled.Button>
        );
    }

    return (
        <Styled.Button
            className={className}
            disabled={disabled}
            onClick={onClick}
            primary={primary}
            rightIcon={!!rightIcon}
            secondary={secondary}
            stake={stake}
            tertiary={tertiary}
            type={type}
        >
            {label}
            {rightIcon}
        </Styled.Button>
    );
};
