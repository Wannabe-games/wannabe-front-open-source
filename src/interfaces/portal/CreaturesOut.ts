import { BADGE_TYPE } from '@/components/atoms/Badge/Badge.types';

type UpgradeTypes = 'acceleration' | 'speed' | 'fuel_volume' | 'boost_power';

export interface IUpgradeChanges {
    name: UpgradeTypes;
    value: number;
}

export interface IPerformance {
    name: UpgradeTypes;
    value: number;
}

interface AdditionalState {
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export interface IBadge {
    type: BADGE_TYPE;
    value: string;
}

export interface CreaturesOut {
    id: number;
    tier: number;
    type: string;
    name: string;
    skinColor: number;
    speed: number;
    boostAcceleration: number;
    acceleration: number;
    boostTime: number;
    speedMin: number;
    boostAccelerationMin: number;
    accelerationMin: number;
    boostTimeMin: number;
    speedMax: number;
    accelerationMax: number;
    boostTimeMax: number;
    boostAccelerationMax: number;
    priceStacks: number;
    priceGold: number;
    deliveryPriceStacks: number;
    deliveryWaitingTime: number;
    upgradeChanges: IUpgradeChanges[];
}

export interface CreaturesOutState extends AdditionalState {
    data: CreaturesOut[];
}
