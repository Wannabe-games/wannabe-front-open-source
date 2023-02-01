export interface LoadingWrapperProps {
    children?: React.ReactNode;
    isFetching: boolean;
    text?: string;
    highlight?: boolean;
    keepChildrenVisible?: boolean;
    calculateBottom?: boolean;
}

export interface StyledTextProps {
    highlight?: boolean;
}

export interface StyledLoaderChildrenProps {
    isLoaderVisible?: boolean;
    keepChildrenVisible?: boolean;
}

export interface StyledLoadingWrapperProps {
    isLoaderVisible?: boolean;
    height: number;
    windowsHeight?: number;
    calculateBottom?: boolean;
}

export interface StyledLoaderProps {
    visible?: boolean;
    noDelay?: boolean;
    local?: boolean;
}
