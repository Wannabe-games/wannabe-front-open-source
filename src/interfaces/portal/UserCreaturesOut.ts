export interface IUpgrade {
    value: number;
    max: number;
    min: number;
}

export interface IUpgradeWithPercentage extends IUpgrade {
    percentage: number;
}

interface AdditionalState {
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export interface GetUserCreaturesOut {
    creatures: UserCreaturesOut[];
    maxResults: number;
}

export interface UserCreaturesOut {
    id: string;
    creatureId: number;
    name: string;
    type: string;
    tier: number;
    cohort: number;
    acceleration: IUpgrade;
    boostAcceleration: IUpgrade;
    boostTime: IUpgrade;
    speed: IUpgrade;
    fuel: number;
    boost: number;
    heart: number;
    lungs: number;
    muscles: number;
    createdAt: {
        date: string;
        timezone_type: number;
        timezone: string;
    };
    contract: number | null;
    isForGame: boolean;
    isStaked: boolean;
    nftExpiryDate: string;
    rewardPool: null;
    bonus: boolean;
    skinColor: number;
    hash: string | null;
    nftName: string | null;
    royalties: number | null;
}

export interface UserCreaturesOutState extends AdditionalState {
    data: UserCreaturesOut[];
}
