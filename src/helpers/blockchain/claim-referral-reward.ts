import { ReferralPoolWithdrawOut } from '@/interfaces/contract/ReferralPoolWithdrawOut';
import { client, ContractCallParams, TxType } from '@micro-stacks/client';
import { bufferCV, uintCV } from '@stacks/transactions';

import { parseHexString } from '../parse-hex-string';

const { VITE_CONTRACT_ADDRESS_DEPLOYER: DEPLOYER_ADDRESS } = import.meta.env;
const { VITE_CONTRACT_VERSION: CONTRACT_VERSION } = import.meta.env;

export const claimReferralReward = async (params: ReferralPoolWithdrawOut) => {
    const { signature, amount, withdrawId } = params;

    const callArgs = {
        contractAddress: DEPLOYER_ADDRESS,
        contractName: `creature-racer-referral-pool-v${CONTRACT_VERSION}`,
        functionName: 'withdraw',
        fee: 500,
        functionArgs: [
            bufferCV(new Uint8Array(parseHexString(signature))),
            uintCV(amount),
            uintCV(withdrawId),
        ],
        validateWithAbi: true,
    } as ContractCallParams;

    const finishedTx = await client.signTransaction(TxType.ContractCall, callArgs);

    return finishedTx;
};
