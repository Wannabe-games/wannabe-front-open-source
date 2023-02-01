import { store } from '@/store';
import { coinGeckoApi } from '@/store/services/coingecko.service';
import { stacksApi } from '@/store/services/stacks.service';
import { saveCoins } from '@/store/slices/coins.slice';

import { delay } from '../delay';
import { promiseRetry } from '../promise-retry';
import { microStxToStx } from './micro-stx-to-stx';

const getStacksBalance = async () => {
    const walletAddress = store.getState().account.user.wallet;

    const { data: stxBalance } = await store.dispatch(
        stacksApi.endpoints.getStxBalance.initiate(walletAddress),
    );

    return stxBalance;
};

export const updateBalance = async (usdPerStacksValue?: number) => {
    let stacks = 0;

    const { data: fetchUsdPerStacks } = await store.dispatch(
        coinGeckoApi.endpoints.usdPerStacks.initiate(null),
    );

    const usdPerStacks = usdPerStacksValue || fetchUsdPerStacks;

    if (usdPerStacks) {
        const stacksBalance = await promiseRetry(() => getStacksBalance(), 5, 2000);

        if (stacksBalance) {
            stacks = Number(stacksBalance);
            const usd = Math.round(microStxToStx(stacks) * usdPerStacks * 100) / 100;

            stacks && store.dispatch(saveCoins({ stacks, tether: usd }));
        }
    }

    return stacks;
};

export const checkBalance = async ({ stacks = 0, gold = 0 }: { stacks: number; gold?: number }) => {
    const stacksBalance = await updateBalance();
    const goldBalance = store.getState().account.user.player.gold;

    await delay(250);

    if (stacksBalance >= stacks && goldBalance >= gold) {
        return true;
    }

    return false;
};
