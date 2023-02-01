import { CreaturesOutState } from '@/interfaces/portal/CreaturesOut';
import { UserCreaturesOutState } from '@/interfaces/portal/UserCreaturesOut';
import { creatureRacerApi } from '@/store/services/creatureRacer.service';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../';

export type CreaturesState = {
    creatures: CreaturesOutState;
    userCreatures: UserCreaturesOutState;
    currentlyMintedCreature: string | null;
};

const initialState: CreaturesState = {
    creatures: {
        data: [],
        isFetching: false,
        isSuccess: false,
        isError: false,
    },
    userCreatures: {
        data: [],
        isFetching: false,
        isSuccess: false,
        isError: false,
    },
    currentlyMintedCreature: null,
};

export const creaturesSlice = createSlice({
    name: 'creatures',
    initialState,
    reducers: {
        assignCurrentlyMintedCreature: (state, action: PayloadAction<string | null>) => {
            state.currentlyMintedCreature = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(creatureRacerApi.endpoints.getCreatures.matchPending, (state) => {
            state.creatures.isFetching = false;
        });
        builder.addMatcher(
            creatureRacerApi.endpoints.getCreatures.matchFulfilled,
            (state, { payload: creatures }) => {
                if (creatures) {
                    state.creatures = {
                        data: creatures,
                        isFetching: false,
                        isSuccess: true,
                        isError: false,
                    };
                }
            },
        );
        builder.addMatcher(creatureRacerApi.endpoints.getUserCreatures.matchPending, (state) => {
            state.userCreatures.isFetching = true;
        });
        builder.addMatcher(
            creatureRacerApi.endpoints.getUserCreatures.matchFulfilled,
            (state, { payload: userCreatures }) => {
                if (userCreatures?.creatures) {
                    state.userCreatures = {
                        data: userCreatures.creatures,
                        isFetching: false,
                        isSuccess: true,
                        isError: false,
                    };
                }
            },
        );
        builder.addMatcher(creatureRacerApi.endpoints.getUserCreatures.matchRejected, (state) => {
            state.userCreatures.isError = true;
        });
    },
});

const { actions, reducer } = creaturesSlice;

export const { assignCurrentlyMintedCreature } = actions;
export default reducer;
export const selectUserCreatures = (state: RootState) => state.creatures.userCreatures.data;
export const selectCurrentlyMintedCreature = (state: RootState) =>
    state.creatures.currentlyMintedCreature;

export const selectUserAllCreatures = creatureRacerApi.endpoints.getUserCreatures.select(null);
export const selectHasMintedCreature = createSelector(
    selectUserAllCreatures,
    (userCreaturesResult) =>
        userCreaturesResult?.data?.creatures.some((userCreature) => userCreature.hash),
);
