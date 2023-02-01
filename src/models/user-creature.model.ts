import { Dispatch, SetStateAction } from 'react';

import { BADGE_TYPE } from '@/components/atoms/Badge/Badge.types';
import { IAction } from '@/components/molecules/CreatureCard/CreatureCard.types';
import { stakeCreatureAction } from '@/helpers/actions/stakeCreatureAction';
import { unstakeCreatureAction } from '@/helpers/actions/unstakeCreatureAction';
import { calcPercentage } from '@/helpers/calculate-percentage';
import { IUpgradeWithPercentage, UserCreaturesOut } from '@/interfaces/portal/UserCreaturesOut';
import { ROUTE } from '@/routing/routes.types';
import { store } from '@/store';
import { assignCurrentlyMintedCreature } from '@/store/slices/creatures.slice';
import { BUTTON_TYPE } from '@/types/buttons';

import { Creature } from './creature-base.abstract';

export class UserCreatureModel extends Creature {
    private readonly _creatureId: number;
    private readonly _performance: { [key: string]: IUpgradeWithPercentage };
    private readonly _contract: number | null;
    private readonly _isForGame: boolean;
    private readonly _isStaked: boolean;
    private readonly _nftExpiryDate: string;
    private readonly _rewardPool: number | null;
    private readonly _bonus: boolean;
    private readonly _hash: string | null;
    private readonly _nftName: string | null;
    private readonly _bodyParts: { [key: string]: number };
    private readonly _royalties: number | null;

    constructor(definition: UserCreaturesOut) {
        super(definition);
        this._creatureId = definition.creatureId;
        this._bodyParts = {
            fuel: definition.fuel,
            boost: definition.boost,
            heart: definition.heart,
            lungs: definition.lungs,
            muscles: definition.muscles,
        };
        this._performance = {
            acceleration: {
                ...definition.acceleration,
                percentage: calcPercentage(
                    definition.acceleration.value,
                    definition.acceleration.max,
                ),
            },
            fuelVolume: {
                ...definition.boostTime,
                percentage: calcPercentage(definition.boostTime.value, definition.boostTime.max),
            },
            boostPower: {
                ...definition.boostAcceleration,
                percentage: calcPercentage(
                    definition.boostAcceleration.value,
                    definition.boostAcceleration.max,
                ),
            },
            speed: {
                ...definition.speed,
                percentage: calcPercentage(definition.speed.value, definition.speed.max),
            },
        };
        this._contract = definition.contract;
        this._isForGame = definition.isForGame;
        this._isStaked = definition.isStaked;
        this._nftExpiryDate = definition.nftExpiryDate;
        this._rewardPool = definition.rewardPool;
        this._bonus = definition.bonus;
        this._hash = definition.hash;
        this._nftName = definition.nftName;
        this._royalties = definition.royalties;
    }

    public get buttons(): IAction[] {
        const type = this.buttonType();

        switch (type) {
            case BUTTON_TYPE.MINT:
                return [this.mintButton(), this.upgradeButton()];
            case BUTTON_TYPE.STAKED:
                return [this.unstakeButton()];
            case BUTTON_TYPE.MINTED_NON_STAKED:
                return [this.stakeButton(), this.upgradeButton()];
            case BUTTON_TYPE.NFT:
                return [this.upgradeButton()];
            default:
                return [];
        }
    }

    public get badge() {
        const type = this.badgeType();

        switch (type) {
            case BADGE_TYPE.NFT:
                return {
                    type: BADGE_TYPE.NFT,
                    value: 'NFT',
                };
            case BADGE_TYPE.STAKED:
                return {
                    type: BADGE_TYPE.STAKED,
                    value: 'Staked',
                };
        }
    }

    private badgeType(): BADGE_TYPE | undefined {
        if (this._isStaked) {
            return BADGE_TYPE.STAKED;
        } else if (this.isNFT) {
            return BADGE_TYPE.NFT;
        }
    }

    private buttonType(): BUTTON_TYPE | undefined {
        const isAlreadyMinted = this.isNFT;
        const isStaked = !!this._isStaked;

        if (isStaked) {
            return BUTTON_TYPE.STAKED;
        } else if (isAlreadyMinted) {
            return BUTTON_TYPE.MINTED_NON_STAKED;
        } else {
            return BUTTON_TYPE.MINT;
        }
    }

    private upgradeButton(): IAction {
        const label = 'Upgrade';

        return {
            label,
            primary: true,
            secondary: false,
            tertiary: false,
            route: `${ROUTE.UPGRADE_CREATURE}/${this.id}`,
        };
    }

    private mintButton(): IAction {
        return {
            label: 'Mint',
            primary: false,
            secondary: true,
            tertiary: false,
            action: () => {
                store.dispatch(assignCurrentlyMintedCreature(this.id));
            },
        };
    }

    // ? Temporarily disabled
    // private mintAsNewButton(): IAction {
    //     return {
    //         label: 'Mint as new',
    //         primary: false,
    //         secondary: true,
    //         tertiary: false,
    //         action: () => {
    //             toast.warning('Mint is not available yet.');
    //         },
    //     };
    // }

    private stakeButton(): IAction {
        const label = 'Stake';

        return {
            label,
            primary: false,
            secondary: false,
            tertiary: false,
            stake: true,
            action: async (setIsPending) => {
                const setPending = setIsPending as Dispatch<SetStateAction<string | undefined>>;

                try {
                    setPending(label);

                    if (this.isNFT) {
                        const hash = this._hash as string;
                        const params = { creatureId: this.id, nftId: hash, stake: true };

                        await stakeCreatureAction(params);
                    }
                } finally {
                    setPending(undefined);
                }
            },
        };
    }

    private unstakeButton(): IAction {
        const label = 'Unstake';

        return {
            label: 'Unstake',
            primary: false,
            secondary: true,
            tertiary: false,
            stake: false,
            action: async (setIsPending) => {
                const setPending = setIsPending as Dispatch<SetStateAction<string | undefined>>;

                try {
                    setPending(label);
                    if (this.isNFT) {
                        const params = { creatureId: this.id, nftId: this.nftId as number };
                        await unstakeCreatureAction(params);
                    }
                } finally {
                    setPending(undefined);
                }
            },
        };
    }

    public get nftName(): string | null {
        return this._nftName;
    }

    public get isNFT(): boolean {
        return !!this._hash;
    }

    public get isStaked(): boolean {
        return this._isStaked;
    }

    public get rewardPool(): number | null {
        return this._rewardPool;
    }

    public get performance() {
        return this._performance;
    }

    public get nftExpirationDate() {
        if (this.isNFT) {
            const expDate = this._nftExpiryDate.split(' ')[0];

            return expDate;
        }
    }

    public get royalties(): number | null {
        return this._royalties;
    }

    public get bodyParts() {
        return this._bodyParts;
    }

    public get isActiveInGame(): boolean {
        return this._isForGame;
    }

    public get displayName(): string | null {
        return this._nftName || this.name;
    }

    public get nftId(): number | null {
        return this._contract;
    }
}
