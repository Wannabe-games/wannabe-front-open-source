export type ApiError = {
    data: {
        status: number;
        title?: string;
        type: ERROR_TYPE;
        message?: string;
    };
    status?: number;
};

export enum ERROR_TYPE {
    'WALLET_EXIST' = 'wallet_exist',
}
