import { client, ContractCallParams, TxType } from '@micro-stacks/client';
import {
    someCV,
    standardPrincipalCV,
    stringUtf8CV,
} from '@stacks/transactions';

const { VITE_CONTRACT_ADDRESS_DEPLOYER: DEPLOYER_ADDRESS } = import.meta.env;
const { VITE_CONTRACT_VERSION: CONTRACT_VERSION } = import.meta.env;

export async function setOperator() {
    await client.signTransaction(TxType.ContractCall, {
        contractAddress: DEPLOYER_ADDRESS,
        contractName: `creature-racer-admin-v${CONTRACT_VERSION}`,
        functionName: 'set-operator',
        fee: 500,
        functionArgs: [someCV(standardPrincipalCV('ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5'))],
        validateWithAbi: true,
    } as ContractCallParams);
}

export async function incrementInvitations() {
    await client.signTransaction(TxType.ContractCall, {
        contractAddress: DEPLOYER_ADDRESS,
        contractName: `creature-racer-referral-nft-v${CONTRACT_VERSION}`,
        functionName: 'increment-invitations',
        fee: 500,
        functionArgs: [
            stringUtf8CV('aaaaa'),
            standardPrincipalCV('ST1331GVQJVR446QQMTD7WR43NN9MRPVVT3G2638A'),
        ],
        validateWithAbi: true,
    } as ContractCallParams);
}

export async function getWithdrawalCount() {
    await client.signTransaction(TxType.ContractCall, {
        contractAddress: DEPLOYER_ADDRESS,
        contractName: `creature-racer-referral-pool-v${CONTRACT_VERSION}`,
        functionName: 'calculate-referral-profit',
        fee: 500,
        functionArgs: [someCV(standardPrincipalCV('ST2DNC8X9GJ0MPQW6QM1J97RNWR06EJ9GRBBVTWWN'))],
        validateWithAbi: true,
    } as ContractCallParams);
}
