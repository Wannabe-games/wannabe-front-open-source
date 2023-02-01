import * as Styled from './Typography.styles';
import { ITypography } from './Typography.types';

export const Typography = ({ children, color, as, ...props }: ITypography) => {
    return (
        <Styled.Typography $color={color} as={as || 'span'} {...props}>
            {children}
        </Styled.Typography>
    );
};
