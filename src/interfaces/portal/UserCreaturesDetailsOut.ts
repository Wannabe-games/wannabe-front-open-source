export interface IUpgrade {
    value: number;
    max: number;
    min: number;
}

type PerformanceTypes = 'boost_power' | 'speed' | 'acceleration' | 'boost_time';
export interface IBodyPart {
    level: number;
    next: {
        level: number;
        priceStacks: number;
        priceGold: number;
        deliveryWaitingTime: number;
        upgradeChanges: Record<PerformanceTypes, number>;
    };
    upgradeDateEnd: string | null;
}

interface AdditionalState {
    isFetching: boolean;
    isSuccess: boolean;
}

// Do not reorder
export interface UserCreaturesDetailsOut {
    id: string;
    creatureId: number;
    name: string;
    type: string;
    fuel: IBodyPart;
    boost: IBodyPart;
    heart: IBodyPart;
    lungs: IBodyPart;
    muscles: IBodyPart;
    acceleration: IUpgrade;
    boostAcceleration: IUpgrade;
    boostTime: IUpgrade;
    speed: IUpgrade;
    contract: string | null;
    isForGame: boolean;
    bonus: boolean;
    isStaked: boolean;
    nftExpiryDate: string;
    rewardPool: number | null;
    hash: string | null;
    nftName: string | null;
    royalties: number | null;
}

export interface UserCreaturesOutState extends AdditionalState {
    data: UserCreaturesDetailsOut[];
}
