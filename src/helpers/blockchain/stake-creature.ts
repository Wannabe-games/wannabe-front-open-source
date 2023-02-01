const {
    VITE_CONTRACT_ADDRESS_DEPLOYER: DEPLOYER_ADDRESS,
    VITE_CONTRACT_VERSION: CONTRACT_VERSION,
} = import.meta.env;
import { client, ContractCallParams, TxType } from '@micro-stacks/client';
import {
    AnchorMode,
    contractPrincipalCV,
    createAssetInfo,
    makeStandardNonFungiblePostCondition,
    NonFungibleConditionCode,
    PostCondition,
    PostConditionMode,
    trueCV,
    uintCV,
} from '@stacks/transactions';

export const stakeCreature = async (nftId: number, address: string) => {
    const postConditionCode = NonFungibleConditionCode.Sends;
    const assetContractName = `creature-racer-nft-v${CONTRACT_VERSION}`;
    const assetName = 'creature-racer-creature-nft';
    const tokenAssetName = uintCV(nftId);
    const nonFungibleAssetInfo = createAssetInfo(DEPLOYER_ADDRESS, assetContractName, assetName);
    const postConditions = [
        makeStandardNonFungiblePostCondition(
            address,
            postConditionCode,
            nonFungibleAssetInfo,
            tokenAssetName,
        ),
    ] as (string | PostCondition)[];

    const callArgs = {
        anchorMode: AnchorMode.Any,
        contractAddress: DEPLOYER_ADDRESS,
        contractName: `creature-racer-staking-v${CONTRACT_VERSION}`,
        fee: 600,
        functionArgs: [uintCV(nftId)],
        functionName: 'enter-staking',
        postConditionMode: PostConditionMode.Deny,
        postConditions,
        validateWithAbi: true,
    } as ContractCallParams;

    const finishedTx = await client.signTransaction(TxType.ContractCall, callArgs);

    return finishedTx;
};

export async function approveForTransfer(nftId: number) {
    const callArgs = {
        contractAddress: DEPLOYER_ADDRESS,
        contractName: `creature-racer-nft-v${CONTRACT_VERSION}`,
        functionName: 'approve',
        fee: 500,
        functionArgs: [
            contractPrincipalCV(DEPLOYER_ADDRESS, `creature-racer-staking-v${CONTRACT_VERSION}`),
            uintCV(nftId),
            trueCV(),
        ],
        validateWithAbi: true,
        anchorMode: AnchorMode.Any,
    } as ContractCallParams;

    const result = await client.signTransaction(TxType.ContractCall, callArgs);

    return result?.txId;
}
