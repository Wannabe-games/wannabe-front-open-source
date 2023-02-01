import { FungibleConditionCode, makeStandardSTXPostCondition } from 'micro-stacks/transactions';

import { useAccount, useOpenStxTokenTransfer } from '@micro-stacks/react';

export interface IHandleTokenTransfer {
    amount: number;
}

const { VITE_CONTRACT_ADDRESS_STX_TRANSFER } = import.meta.env;

export const useTokenTransfer = () => {
    const { openStxTokenTransfer, isRequestPending } = useOpenStxTokenTransfer();
    const { stxAddress } = useAccount();

    const receiverAddress = VITE_CONTRACT_ADDRESS_STX_TRANSFER;

    const handleTokenTransfer = async ({ amount }: IHandleTokenTransfer) => {
        const postConditions = [
            makeStandardSTXPostCondition(
                stxAddress as string,
                FungibleConditionCode.LessEqual,
                amount * 1e6,
            ),
        ];

        const result = await openStxTokenTransfer({
            recipient: receiverAddress,
            amount: `${amount * 1e6}`, // micro STX
            postConditions,
        });

        return result;
    };

    return {
        handleTokenTransfer,
        isRequestPending,
    };
};
