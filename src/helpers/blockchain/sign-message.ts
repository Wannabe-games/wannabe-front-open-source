import { client } from '@micro-stacks/client';
import { SignatureData } from '@stacks/connect';

export const signMessage = async (
    message: string,
    onFinish?: (payload: SignatureData) => void,
): Promise<SignatureData | undefined> => {
    let result;

    await client.signMessage({
        message,
        onFinish: (payload) => {
            result = payload;
            onFinish?.(payload);
        },
    });

    return result;
};
