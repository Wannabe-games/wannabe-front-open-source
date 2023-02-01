export interface ILobbyListProps {
    heading: string;
    lobbies: ILobby[];
    userLobbies?: boolean;
}

export enum LOBBY_STATUS {
    ACTIVE = 'active',
    DRAFT = 'draft',
    FINISHED = 'finished',
}

export interface ILobby {
    id: string;
    value: number;
    username?: IUser;
    score: number;
    timeLeft: number;
    status: LOBBY_STATUS;
    isOwner: boolean;
}

export interface IUser {
    id: string;
    name: string;
    avatar: string;
}
