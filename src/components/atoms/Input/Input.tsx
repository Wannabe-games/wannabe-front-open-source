import * as Styled from './Input.styles';
import { IInput } from './Input.types';

export const Input = ({ ...props }: IInput) => {
    return <Styled.Input {...props} />;
};
