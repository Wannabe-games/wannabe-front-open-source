import { Dispatch, SetStateAction } from 'react';

import { BADGE_TYPE } from '@/components/atoms/Badge/Badge.types';
import config from '@/config';
import history from '@/customHistory';
import { stakeCreatureAction } from '@/helpers/actions/stakeCreatureAction';
import { upgradeCreatureAction } from '@/helpers/actions/upgradeCreatureAction';
import { microStxToStx } from '@/helpers/stacks/micro-stx-to-stx';
import { truncateText } from '@/helpers/truncate-text';
import {
    IBodyPart,
    IUpgrade,
    UserCreaturesDetailsOut,
} from '@/interfaces/portal/UserCreaturesDetailsOut';
import { UPGRADE_TYPE } from '@/pages/UpgradeCreature/UpgradeCreature.types';
import { ROUTE } from '@/routing/routes.types';
import { BUTTON_ACTION } from '@/types/buttons';

const {
    creature: { truncatedIdLength },
} = config;

export class UserCreatureDetailsModel {
    private readonly _id: string;
    private readonly _creatureId: number;
    private readonly _name: string;
    private readonly _type: string;
    private readonly _bodyParts: { [key: string]: IBodyPart };
    private readonly _performance: { [key: string]: IUpgrade };
    private readonly _contract: string | null;
    private readonly _isForGame: boolean;
    private readonly _bonus: boolean;
    private readonly _nftExpiryDate: string;
    private readonly _rewardPool: number | null;
    private readonly _hash: string | null;
    private readonly _nftName: string | null;
    private readonly _royalties: number | null;
    private _shouldRedirectToStep5 = false;

    constructor(definition: UserCreaturesDetailsOut) {
        this._id = definition.id;
        this._creatureId = definition.creatureId;
        this._name = definition.name;
        this._type = definition.type;
        this._bodyParts = {
            fuel: definition.fuel,
            boost: definition.boost,
            heart: definition.heart,
            lungs: definition.lungs,
            muscles: definition.muscles,
        };
        this._performance = {
            acceleration: definition.acceleration,
            fuelVolume: definition.boostTime,
            boostPower: definition.boostAcceleration,
            speed: definition.speed,
        };
        this._contract = definition.contract;
        this._isForGame = definition.isForGame;
        this._bonus = definition.bonus;
        this._nftExpiryDate = definition.nftExpiryDate;
        this._rewardPool = definition.rewardPool;
        this._hash = definition.hash;
        this._nftName = definition.nftName;
        this._royalties = definition.royalties;
    }

    public get bonus(): boolean {
        return this._bonus;
    }

    public get contract(): string | null {
        return this._contract;
    }

    public get id(): string {
        return this._id.toString();
    }

    public get type(): string {
        return this._type;
    }

    public get isActiveInGame(): boolean {
        return this._isForGame;
    }

    public get name(): string {
        return this._name;
    }

    public get bodyParts() {
        return this._bodyParts;
    }

    public get performance() {
        return this._performance;
    }

    public get nftExpirationDate(): string | undefined {
        if (this.isNFT) {
            return this._nftExpiryDate;
        }
    }

    public get royalties(): number | null {
        return this._royalties;
    }

    public get isNFT(): boolean {
        // isNFT === isMinted
        return !!this._hash;
    }

    public get nftName(): string | null {
        return this._nftName;
    }

    public get badge() {
        const type = this.badgeType();

        switch (type) {
            case BADGE_TYPE.NFT:
                return {
                    type: BADGE_TYPE.NFT,
                    value: 'NFT',
                };
        }
    }

    private badgeType(): BADGE_TYPE | undefined {
        if (this.isNFT) {
            return BADGE_TYPE.NFT;
        }
    }

    private get shouldRedirectToStep5(): boolean {
        return this._shouldRedirectToStep5;
    }

    private set shouldRedirectToStep5(value: boolean) {
        this._shouldRedirectToStep5 = value;
    }

    public get creatureId(): number {
        return this._creatureId;
    }

    public get displayName(): string | null {
        const truncatedId = truncateText(this.id, truncatedIdLength);

        return this.nftName || truncatedId;
    }

    public bodyPartStacksPrice(upgradeType: UPGRADE_TYPE): number {
        const microStxPrice = this.bodyParts[upgradeType].next.priceStacks;
        const stxPrice = microStxToStx(microStxPrice);

        return stxPrice;
    }

    public get displayNameOrType(): string {
        return this.nftName || this.type;
    }

    public onUpgradeAction = async (
        upgradeType: UPGRADE_TYPE,
        setPending: Dispatch<SetStateAction<string | undefined>>,
    ) => {
        setPending(BUTTON_ACTION.UPGRADE);

        const upgrade = this.bodyParts[upgradeType].next;
        const { priceStacks: stacks, priceGold: gold, level } = upgrade;

        const upgradeCreatureParams = { type: upgradeType, level, creatureId: this.id };

        try {
            const creatureId = await upgradeCreatureAction({
                stacks,
                gold,
                upgradeCreatureParams,
            });

            if (!creatureId) {
                return;
            }

            this.shouldRedirectToStep5
                ? history.push(ROUTE.REGISTER_STEP5, {
                      from: ROUTE.REGISTER_STEP4,
                  })
                : history.push(`${ROUTE.CREATURE_PROFILE}/${creatureId}`);
        } finally {
            setPending(undefined);
        }
    };

    // ? Temporarily disabled
    // public get onMintAsNewAction() {
    //     return async () => {
    //         try {
    //             await mintCreatureAction(this.id);
    //         } catch (e) {
    //             const err = e as any;

    //             console.log(err);
    //         }
    //     };
    // }

    public onStakeAction = async (setPending: Dispatch<SetStateAction<string | undefined>>) => {
        try {
            setPending(BUTTON_ACTION.STAKE);
            if (this.isNFT) {
                const hash = this._hash as string;
                const params = { creatureId: this.id, nftId: hash, stake: true };

                await stakeCreatureAction(params);
            }
        } finally {
            setPending(undefined);
        }
    };

    public redirectToStep5(): void {
        this.shouldRedirectToStep5 = true;
    }
}
