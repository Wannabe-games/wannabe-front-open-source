import { CoinsState } from '@/interfaces/CoinsState';
import { RootState } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

const defaultState: CoinsState = {
    stacks: 0,
    tether: 0,
};

export const coinsSlice = createSlice({
    name: 'coins',
    initialState: defaultState,
    reducers: {
        saveCoins: (state, { payload: { stacks, tether } }) => {
            state.stacks = stacks;
            state.tether = tether;
        },
    },
});

const { actions, reducer } = coinsSlice;

export const { saveCoins } = actions;
export default reducer;

export const selectCoins = (state: RootState) => state.coins;
