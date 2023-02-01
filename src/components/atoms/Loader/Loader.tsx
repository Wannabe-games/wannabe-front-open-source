import * as Styled from './Loader.styles';
import { ILoaderProps } from './Loader.types';

export const Loader = ({ label, className }: ILoaderProps) => {
    return (
        <Styled.Loader className={className}>
            <Styled.Text>{label}</Styled.Text>
        </Styled.Loader>
    );
};
