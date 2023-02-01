import ReactGA from 'react-ga4';

import { SignCreatureOut } from '@/interfaces/contract/SignCreatureOut';
import { client, ContractCallParams, TxType } from '@micro-stacks/client';
import {
    AnchorMode,
    bufferCV,
    FungibleConditionCode,
    makeContractSTXPostCondition,
    makeStandardSTXPostCondition,
    PostCondition,
    uintCV,
} from '@stacks/transactions';

import { parseHexString } from '../parse-hex-string';

const {
    VITE_CONTRACT_ADDRESS_DEPLOYER: DEPLOYER_ADDRESS,
    VITE_CONTRACT_VERSION: CONTRACT_VERSION,
} = import.meta.env;

export const mintCreature = async (mint: SignCreatureOut) => {
    // TODO: GA events after successful mint?
    ReactGA.event({ category: 'Creature', action: 'mint (creature)' });
    ReactGA.event({ category: 'Transaction', action: 'mint' });

    const {
        nftId,
        typeId,
        part1,
        part2,
        part3,
        part4,
        part5,
        expiryTimestamp,
        price,
        signature,
        key: ownerPublicKey,
        address: ownerAddress,
    } = mint;

    const postConditions = [
        makeStandardSTXPostCondition(ownerAddress, FungibleConditionCode.LessEqual, BigInt(price)),
        makeContractSTXPostCondition(
            DEPLOYER_ADDRESS,
            `creature-racer-payment-v${CONTRACT_VERSION}`,
            FungibleConditionCode.LessEqual,
            BigInt(price),
        ),
    ] as (string | PostCondition)[];

    const callArgs = {
        anchorMode: AnchorMode.Any,
        contractAddress: DEPLOYER_ADDRESS,
        contractName: `creature-racer-nft-v${CONTRACT_VERSION}`,
        fee: 500,
        functionArgs: [
            uintCV(nftId),
            bufferCV(new Uint8Array([typeId])),
            bufferCV(new Uint8Array([part1, part2, part3, part4, part5])),
            uintCV(expiryTimestamp),
            uintCV(price),
            bufferCV(new Uint8Array(parseHexString(signature))),
            bufferCV(new Uint8Array(parseHexString(ownerPublicKey))),
        ],
        functionName: 'mint',
        postConditions,
        validateWithAbi: true,
    } as ContractCallParams;

    const finishedTx = await client.signTransaction(TxType.ContractCall, callArgs);

    return finishedTx;
};
