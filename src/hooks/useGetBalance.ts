import { formatBalance } from '@/helpers/format-balance';
import { microStxToStx } from '@/helpers/stacks/micro-stx-to-stx';
import { useTypedSelector } from '@/store';
import { selectGold } from '@/store/slices/account.slice';
import { selectCoins } from '@/store/slices/coins.slice';

export const useGetBalance = () => {
    const { tether, stacks } = useTypedSelector(selectCoins);
    const gold = useTypedSelector(selectGold);

    return {
        gold,
        tether: formatBalance(tether),
        stacks: formatBalance(microStxToStx(stacks)),
    };
};
