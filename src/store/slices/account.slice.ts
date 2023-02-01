import { CurrentUserOut } from '@/interfaces/user/CurrentUserOut';
import { RootState } from '@/store';
import { creatureRacerApi } from '@/store/services/creatureRacer.service';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICurrentUser extends CurrentUserOut {
    wallet: string;
}

export type AccountState = {
    user: CurrentUserOut | null;
};

const initialState: AccountState = {
    user: null,
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        assignUser: (state, action: PayloadAction<Partial<CurrentUserOut>>) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload,
                };
            }
        },
        assignWallet: (state, action: PayloadAction<string>) => {
            if (state.user) {
                state.user.wallet = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            creatureRacerApi.endpoints.getUser.matchFulfilled,
            (state, { payload: userData }) => {
                if (userData) {
                    state.user = userData;
                }
            },
        );
    },
});

const { actions, reducer } = accountSlice;

export const { assignUser, assignWallet } = actions;
export default reducer;
export const selectCurrentUser = (state: RootState) => state.account.user as ICurrentUser;
export const selectCurrentUserWalletId = (state: RootState) => state.account.user?.wallet;
export const selectCurrentUserReferral = (state: RootState) => state.account.user?.myReferralNft;
export const selectGold = (state: RootState) => state.account.user?.player?.gold || 0;
