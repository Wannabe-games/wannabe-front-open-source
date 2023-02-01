import styled from 'styled-components';

import { StyledLoaderChildrenProps, StyledLoadingWrapperProps } from './LoadingTemplate.types';

const buildLoaderChildOpacity = (isLoaderVisible?: boolean) => {
    if (isLoaderVisible) {
        return 0;
    } else {
        return 1;
    }
};

const StyledChild = styled.div<StyledLoaderChildrenProps>`
    opacity: ${({ isLoaderVisible }) => buildLoaderChildOpacity(isLoaderVisible)};
`;

export const StyledLoadingWrapper = styled.div<StyledLoadingWrapperProps>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    ${({ calculateBottom, height, windowsHeight }) =>
        calculateBottom &&
        `
        bottom: ${calcBottom(height, windowsHeight)}px;
    `}
`;

const calcBottom = (height: number, windowHeight?: number) => {
    if (!windowHeight || windowHeight > height) {
        return height / 2;
    } else {
        return windowHeight / 2;
    }
};

export { StyledChild };
