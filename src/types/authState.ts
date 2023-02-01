export type AuthState = {
    token: string | null;
    email: string | null;
    expiresAt: number | null;
    refreshToken: string | null;
};
