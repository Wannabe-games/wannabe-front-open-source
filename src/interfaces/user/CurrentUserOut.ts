interface IGroup {
    id: number;
    name: string;
}

interface IPlayer {
    gold: number;
    activeAnimalCreatureType: string | null;
}

interface IMyReferralNft {
    refCode: string;
    hash: string;
}

interface IFromReferralNft {
    hash: string;
    refCode: string;
}

export interface CurrentUserOut {
    createdAt: string;
    email: string;
    firstName: string | null;
    groups: IGroup[];
    lastName: string | null;
    nick: string | null;
    wallet: string | null;
    player: IPlayer | null;
    myReferralNft: IMyReferralNft | null;
    id: number;
    fromReferralNft: IFromReferralNft | null;
}
