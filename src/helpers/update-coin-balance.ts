import { store } from '@/store';
import { saveCoins } from '@/store/slices/coins.slice';

export const updateCoinBalance = (stacksCost: number) => {
    const balance = store.getState().coins;

    if (stacksCost && balance.stacks) {
        store.dispatch(saveCoins({ ...balance, stacks: balance.stacks - stacksCost }));
    }
};
