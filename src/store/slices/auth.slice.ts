import { decodeToken } from 'react-jwt';

import { AuthState } from '@/interfaces/AuthState';
import { DecodedToken } from '@/interfaces/DecodedToken';
import { RootState } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

const defaultState: AuthState = {
    token: null,
    email: null,
    expiresAt: null,
    refreshToken: null,
    expiredToken: false,
};

const initialState = () => {
    const token = localStorage.getItem(`token`) || null;
    const refresh_token = localStorage.getItem(`refreshToken`) || null;
    const decodedToken = token ? (decodeToken(token) as DecodedToken) : null;

    if (decodedToken) {
        if (decodedToken.exp < Date.now() / 1000) {
            localStorage.removeItem(`token`);
            return;
        }

        return {
            token,
            email: decodedToken.username,
            expiresAt: decodedToken.exp,
            refreshToken: refresh_token,
            expiredToken: false,
        };
    }

    return defaultState;
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState() || defaultState,
    reducers: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        logout: (state, _payload) => {
            state.token = null;
            state.refreshToken = null;
            state.email = null;
            state.expiresAt = null;
            localStorage.removeItem(`token`);
            localStorage.removeItem(`refreshToken`);
        },
        clearToken: (state) => {
            state.token = null;
        },
        setHasTokenExpired: (state) => {
            state.expiredToken = true;
        },
        storeToken: (state, { payload: { token, refresh_token } }) => {
            const decodedToken = decodeToken(token) as DecodedToken | null;

            if (decodedToken) {
                if (decodedToken.exp < Date.now() / 1000) {
                    localStorage.removeItem(`token`);
                    return;
                }

                state.email = decodedToken.username;
                state.expiresAt = decodedToken.exp;
                state.token = token;
                state.refreshToken = refresh_token;
                state.expiredToken = false;
                localStorage.setItem(`token`, token);
                localStorage.setItem(`refreshToken`, refresh_token);
            }
        },
    },
});

const { actions, reducer } = authSlice;

export const { logout, storeToken, clearToken, setHasTokenExpired } = actions;
export default reducer;
export const selectIsAuthenticated = (state: RootState) => state.auth.token;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
