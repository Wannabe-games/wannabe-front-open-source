import { MarginProps } from 'styled-system';

export interface ITypography extends MarginProps {
    children: string | number | JSX.Element | React.ReactNode;
    className?: string;
    color?: string;
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'body3';
    weight?: 'light' | 'regular' | 'bold' | 'black';
    as?: keyof JSX.IntrinsicElements;
}
