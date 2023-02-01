import { StacksTestnet } from 'micro-stacks/network';
import { useEffect } from 'react';

import { client } from '@micro-stacks/client';
import { useNetwork } from '@micro-stacks/react';

import * as Styled from './Debug.styles';

const envs = import.meta.env;
const TESTNET_URL = envs.VITE_STACKS_TESTNET_URL;

const testnetNetwork = new StacksTestnet({
    url: TESTNET_URL,
});

export const Debug = () => {
    const { network, setNetwork } = useNetwork();
    const isTestnet = !network.isMainnet();
    const isTestnetEnv = !!TESTNET_URL;

    const { version, chainId, broadcastEndpoint, getCoreApiUrl } = network;
    const coreApiUrl = getCoreApiUrl();

    useEffect(() => {
        if (coreApiUrl !== TESTNET_URL) {
            setNetwork(testnetNetwork);
        }

        console.clear();

        console.table({
            version,
            chainId,
            broadcastEndpoint,
            coreApiUrl,
            isTestnet,
        });

        console.log(client.getState());

        console.table(envs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const connectedToNetwork = coreApiUrl.includes('wannabe') ? 'Wannabe Testnet' : 'Testnet';

    const handleSetNetwork = () => {
        setNetwork(testnetNetwork);
        location.reload();
    };

    if (!isTestnetEnv) {
        return null;
    }

    return (
        <Styled.DebugWrapper>
            Connected to {connectedToNetwork} network.{' '}
            <button onClick={handleSetNetwork}>Force set network</button>
        </Styled.DebugWrapper>
    );
};
