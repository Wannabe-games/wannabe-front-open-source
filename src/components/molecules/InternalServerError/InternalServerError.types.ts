import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export interface IInternalServerErrorProps {
    error?: FetchBaseQueryError | SerializedError; // TODO: Should be handled
    handleTryAgainClick: () => void;
    withPadding?: boolean;
}
