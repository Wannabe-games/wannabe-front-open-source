import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { AuthState } from '@/interfaces/AuthState';
import {
    AnyAction,
    combineReducers,
    configureStore,
    Reducer,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { ACTION } from './constants';
import { coinGeckoApi } from './services/coingecko.service';
// import { rtkQueryErrorLogger } from '@/store/middlewares/errorLogger.middleware';
import { creatureRacerApi } from './services/creatureRacer.service';
import { stacksApi } from './services/stacks.service';
import accountReducer from './slices/account.slice';
import authReducer from './slices/auth.slice';
import coinsReducer from './slices/coins.slice';
import creaturesReducer from './slices/creatures.slice';

export type { AuthState };

const combinedReducer = combineReducers({
    auth: authReducer,
    account: accountReducer,
    coins: coinsReducer,
    creatures: creaturesReducer,
    [creatureRacerApi.reducerPath]: creatureRacerApi.reducer,
    [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
    [stacksApi.reducerPath]: stacksApi.reducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === ACTION.LOGOUT) {
        if (!action.payload?.keepToasts) {
            toast.dismiss();
        }

        state = {} as RootState;
    }
    return combinedReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            creatureRacerApi.middleware,
            coinGeckoApi.middleware,
            stacksApi.middleware,
            // rtkQueryErrorLogger,
        ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
