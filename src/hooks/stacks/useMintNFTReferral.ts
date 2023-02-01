import { stringUtf8CV } from 'micro-stacks/clarity';
import { FungibleConditionCode, makeStandardSTXPostCondition } from 'micro-stacks/transactions';

import { useAccount, useOpenContractCall } from '@micro-stacks/react';

import type { FinishedTxData } from 'micro-stacks/connect';

interface IHandleOpenContractCall {
    refCode: string;
    onFinish?: ((payload: FinishedTxData) => void) | undefined;
    onCancel?: ((error?: string | undefined) => void) | undefined;
}

const {
    VITE_CONTRACT_ADDRESS_DEPLOYER: DEPLOYER_ADDRESS,
    VITE_CONTRACT_VERSION: CONTRACT_VERSION,
} = import.meta.env;

export const useMintNFTReferral = () => {
    const { openContractCall, isRequestPending } = useOpenContractCall();
    const { stxAddress } = useAccount();

    const handleOpenContractCall = async ({
        refCode,
        onFinish,
        onCancel,
    }: IHandleOpenContractCall) => {
        const postConditions = [
            makeStandardSTXPostCondition(
                stxAddress as string,
                FungibleConditionCode.LessEqual,
                '100',
            ),
        ];

        await openContractCall({
            contractAddress: DEPLOYER_ADDRESS,
            contractName: `creature-racer-referral-nft-v${CONTRACT_VERSION}`,
            functionName: 'mint',
            validateWithAbi: true,
            functionArgs: [stringUtf8CV(refCode)],
            postConditions,
            onFinish,
            onCancel,
        });
    };

    return {
        handleOpenContractCall,
        isRequestPending,
    };
};
