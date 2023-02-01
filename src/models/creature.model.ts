import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { BADGE_TYPE } from '@/components/atoms/Badge/Badge.types';
import { IAction } from '@/components/molecules/CreatureCard/CreatureCard.types';
import history from '@/customHistory';
import { buyCreatureAction } from '@/helpers/actions/buyCreatureAction';
import { calcPercentage } from '@/helpers/calculate-percentage';
import { microStxToStx } from '@/helpers/stacks/micro-stx-to-stx';
import { CreaturesOut, IBadge } from '@/interfaces/portal/CreaturesOut';
import { IUpgradeWithPercentage } from '@/interfaces/portal/UserCreaturesOut';
import { ROUTE } from '@/routing/routes.types';
import { store } from '@/store';
import { creatureRacerApi } from '@/store/services/creatureRacer.service';
import { BUTTON_TYPE } from '@/types/buttons';

import { Creature } from './creature-base.abstract';

export class CreatureModel extends Creature {
    private readonly _tier: number;
    private readonly _priceMicroStx: number;
    private readonly _priceGold: number;
    private readonly _deliveryPriceStacks: number;
    private readonly _deliveryWaitingTime: number;
    private readonly _performance: { [key: string]: IUpgradeWithPercentage };
    public shouldCostNoStacks = false;
    public shouldCostNoGold = false;
    public shouldRedirectToStep4 = false;

    constructor(definition: CreaturesOut) {
        super(definition);
        this._deliveryPriceStacks = definition.deliveryPriceStacks;
        this._priceMicroStx = definition.priceStacks;
        this._priceGold = definition.priceGold;
        this._tier = definition.tier;
        this._deliveryWaitingTime = definition.deliveryWaitingTime;

        const performance: { [key: string]: IUpgradeWithPercentage } = {};
        definition.upgradeChanges.forEach((u) => {
            if (u.name === 'acceleration') {
                performance.acceleration = {
                    value: u.value,
                    max: definition.accelerationMax,
                    min: definition.accelerationMin,
                    percentage: calcPercentage(u.value, definition.accelerationMax),
                };
            }
            if (u.name === 'speed') {
                performance.speed = {
                    value: u.value,
                    max: definition.speedMax,
                    min: definition.speedMin,
                    percentage: calcPercentage(u.value, definition.speedMax),
                };
            }
            if (u.name === 'fuel_volume') {
                performance.fuelVolume = {
                    value: u.value,
                    max: definition.boostTimeMax,
                    min: definition.boostTimeMin,
                    percentage: calcPercentage(u.value, definition.boostTimeMax),
                };
            }
            if (u.name === 'boost_power') {
                performance.boostPower = {
                    value: u.value,
                    max: definition.boostAccelerationMax,
                    min: definition.boostTimeMin,
                    percentage: calcPercentage(u.value, definition.boostAccelerationMax),
                };
            }
        });

        this._performance = performance;
    }

    public get buttons(): IAction[] {
        const type = this.buttonType();

        switch (type) {
            case BUTTON_TYPE.FREE:
                return [this.freeButton()];
            case BUTTON_TYPE.BUY:
                return [this.buyButton()];
            default:
                return [];
        }
    }

    public get badge(): IBadge | undefined {
        const type = this.badgeType();

        switch (type) {
            case BADGE_TYPE.FREE:
                return {
                    type: BADGE_TYPE.FREE,
                    value: 'FREE',
                };
            case BADGE_TYPE.BUY:
                return {
                    type: BADGE_TYPE.BUY,
                    value: 'BUY',
                };
        }
    }

    public get tier(): number {
        return this._tier;
    }

    private badgeType(): BADGE_TYPE | undefined {
        if (this.shouldCostNoStacks) {
            return BADGE_TYPE.FREE;
        } else {
            return BADGE_TYPE.BUY;
        }
    }

    private buttonType(): BUTTON_TYPE | undefined {
        if (this.shouldCostNoStacks) {
            return BUTTON_TYPE.FREE;
        } else {
            return BUTTON_TYPE.BUY;
        }
    }

    private buyButton(): IAction {
        const priceMicroStx = this._priceMicroStx;
        const priceStx = microStxToStx(priceMicroStx);
        const gold = this.gold;
        // * Hidden for later use
        // const usdPerStacks = CreatureModel.usdPerStacks;
        // const usd = Math.round(priceStx * usdPerStacks);
        // const label = `~${usd} USDT / ${priceStx} Stacks`;
        const label = `${priceStx} STX`;
        const fetchingLabel = 'Confirm transaction';

        return {
            label,
            fetchingLabel,
            primary: true,
            secondary: false,
            tertiary: false,
            action: async (setIsPending) => {
                const setPending = setIsPending as Dispatch<SetStateAction<string | undefined>>;
                const goldPrice = this.shouldCostNoGold ? 0 : gold;

                try {
                    setPending(label);
                    const buyResponse = await buyCreatureAction({
                        priceMicroStx,
                        gold: goldPrice,
                        type: this.type,
                    });

                    if (!buyResponse) {
                        return;
                    }

                    const { creatureId } = buyResponse;

                    this.shouldRedirectToStep4
                        ? history.push(ROUTE.REGISTER_STEP4, {
                              from: ROUTE.REGISTER_STEP3,
                              creatureId,
                          })
                        : history.push(ROUTE.MY_PETS, { from: 'buy' });
                } catch (e) {
                    const err = e as Error;

                    console.error(err);
                } finally {
                    setPending(undefined);
                }
            },
        };
    }

    private freeButton(): IAction {
        return {
            label: 'Get for free',
            primary: true,
            secondary: false,
            tertiary: false,
            action: async () => {
                const buyResponse = await store.dispatch(
                    creatureRacerApi.endpoints.buyCreature.initiate({ type: this.type }),
                );

                if (!('data' in buyResponse)) {
                    toast.error('Something went wrong. Try again.');

                    return;
                }

                const { creatureId } = buyResponse.data;

                if (creatureId) {
                    this.shouldRedirectToStep4
                        ? history.push(ROUTE.REGISTER_STEP4, {
                              from: ROUTE.REGISTER_STEP3,
                              creatureId,
                          })
                        : history.push(ROUTE.DASHBOARD);
                }
            },
        };
    }

    public primaryAction(): IAction {
        return this.buyButton();
    }

    public get performance() {
        return this._performance;
    }

    public get gold(): number {
        return this._priceGold;
    }

    public get additionalText(): string | undefined {
        const type = this.badgeType();

        switch (type) {
            case BADGE_TYPE.BUY:
                return 'Buy and upgrade';
        }
    }
}
