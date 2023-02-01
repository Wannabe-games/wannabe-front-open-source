/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from 'react-toastify';

import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

// eslint-disable-next-line unused-imports/no-unused-vars
export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        toast.error(action.error.message || action.error.data?.message);
    }

    return next(action);
};
