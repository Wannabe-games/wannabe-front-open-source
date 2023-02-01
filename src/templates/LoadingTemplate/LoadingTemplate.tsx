import { MutableRefObject, useRef } from 'react';

import { Loader } from '@/components/atoms/Loader';

import { StyledChild, StyledLoadingWrapper } from './LoadingTemplate.styles';
import { LoadingWrapperProps } from './LoadingTemplate.types';

export const LoadingTemplate = ({
    children,
    isFetching,
    keepChildrenVisible = false,
    calculateBottom = true,
}: LoadingWrapperProps) => {
    const childrenRef = useRef() as MutableRefObject<HTMLDivElement>;

    const childrenHeight = childrenRef?.current?.clientHeight;

    const buildLoader = () => (
        <StyledLoadingWrapper
            height={childrenHeight}
            windowsHeight={window.innerHeight}
            calculateBottom={calculateBottom}
        >
            <Loader label="Loading" />
        </StyledLoadingWrapper>
    );

    if (keepChildrenVisible) {
        return (
            <>
                <StyledChild keepChildrenVisible isLoaderVisible={isFetching} ref={childrenRef}>
                    {children}
                </StyledChild>
                {isFetching && buildLoader()}
            </>
        );
    }

    return isFetching ? buildLoader() : <>{children}</>;
};
