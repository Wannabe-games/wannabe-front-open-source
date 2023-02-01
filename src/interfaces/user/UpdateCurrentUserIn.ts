export interface UpdateCurrentUserIn {
    nick: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    password?: string;
}
