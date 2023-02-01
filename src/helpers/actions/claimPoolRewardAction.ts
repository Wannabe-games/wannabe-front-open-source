import { toast } from 'react-toastify';

import * as msg from '@/constants';

// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
export const claimPoolRewardAction = async (id: string) => {
    const notifyId = toast.loading('Please wait...', { toastId: 1 });

    try {
        throw new Error('Not implemented');

        // const exposure = await store.dispatch(
        //     creatureRacerApi.endpoints.rewardPoolWithdraw.initiate(id),
        // );

        // if (!('data' in exposure)) {
        //     toast.update(notifyId, {
        //         render: msg.STH_WENT_WRONG_TRY_AGAIN,
        //         type: 'error',
        //         isLoading: false,
        //         autoClose: 5000,
        //     });

        //     return;
        // }

        // toast.update(notifyId, {
        //     render: msg.WAITING_FOR_CONFIRMATION,
        //     type: 'info',
        //     isLoading: true,
        // });

        // const pendingTx = await claimPoolReward(exposure.data as RewardPoolWithdrawOut);

        // toast.update(notifyId, {
        //     render: 'Withdrawing funds',
        // });

        // await pendingTx.wait();

        // toast.update(notifyId, {
        //     render: msg.FINALIZING,
        // });

        // await store.dispatch(creatureRacerApi.endpoints.rewardPoolWithdrawReceived.initiate(id));

        // toast.update(notifyId, {
        //     render: 'Reward claimed!',
        //     type: 'success',
        //     isLoading: false,
        //     autoClose: 5000,
        // });
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = e as any;
        let errorMessage = err?.message || msg.STH_WENT_WRONG;

        if (err && 'data' in err) {
            const { title } = err.data;
            errorMessage = title;
        }

        toast.update(notifyId, {
            render: errorMessage,
            type: 'error',
            isLoading: false,
            autoClose: 5000,
        });
    }
};
