import { client, ContractCallParams, TxType } from '@micro-stacks/client';
import {
    AnchorMode,
    createAssetInfo,
    makeContractNonFungiblePostCondition,
    NonFungibleConditionCode,
    PostCondition,
    PostConditionMode,
    uintCV,
} from '@stacks/transactions';

const {
    VITE_CONTRACT_ADDRESS_DEPLOYER: DEPLOYER_ADDRESS,
    VITE_CONTRACT_VERSION: CONTRACT_VERSION,
} = import.meta.env;

export const unstakeCreature = async (nftId: number) => {
    const postConditionCode = NonFungibleConditionCode.Sends;
    const assetContractName = `creature-racer-nft-v${CONTRACT_VERSION}`;
    const assetName = 'creature-racer-creature-nft';
    const tokenAssetName = uintCV(nftId);
    const nonFungibleAssetInfo = createAssetInfo(DEPLOYER_ADDRESS, assetContractName, assetName);

    const postConditions = [
        makeContractNonFungiblePostCondition(
            DEPLOYER_ADDRESS,
            'creature-racer-staking-v2',
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
        functionName: 'leave-staking',
        postConditionMode: PostConditionMode.Deny,
        postConditions,
        validateWithAbi: true,
    } as ContractCallParams;

    const finishedTx = await client.signTransaction(TxType.ContractCall, callArgs);

    return finishedTx;
};
