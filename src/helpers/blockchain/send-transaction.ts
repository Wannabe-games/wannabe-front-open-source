import { FungibleConditionCode, makeStandardSTXPostCondition } from 'micro-stacks/transactions';

import { client, getStxAddress, TxType } from '@micro-stacks/client';

const { VITE_CONTRACT_ADDRESS_DEPLOYER: DEPLOYER_ADDRESS } = import.meta.env;

export const startPayment = async (amount: number) => {
    const stxAddress = getStxAddress({ client }) as string;

    const postConditions = [
        makeStandardSTXPostCondition(stxAddress, FungibleConditionCode.LessEqual, amount),
    ];

    const finishedTx = await client.signTransaction(TxType.TokenTransfer, {
        recipient: DEPLOYER_ADDRESS,
        amount: `${amount}`,
        postConditions,
    });

    return finishedTx;
};
