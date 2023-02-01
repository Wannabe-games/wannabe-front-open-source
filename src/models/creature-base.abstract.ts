import { CreaturesOut } from '@/interfaces/portal/CreaturesOut';
import { UserCreaturesOut } from '@/interfaces/portal/UserCreaturesOut';
import { store } from '@/store';
import { coinGeckoApi } from '@/store/services/coingecko.service';

export abstract class Creature {
    private readonly _id: string | number;
    private readonly _name: string;
    private readonly _type: string;

    constructor(definition: UserCreaturesOut | CreaturesOut) {
        this._id = definition.id;
        this._name = definition.name;
        this._type = definition.type;
    }

    public get id(): string {
        return this._id.toString();
    }

    public get type(): string {
        return this._type;
    }

    public get name(): string {
        return this._name;
    }

    public static get usdPerStacks(): number {
        const { data: usdPerStacks } = coinGeckoApi.endpoints.usdPerStacks.select(null)(
            store.getState(),
        );

        return usdPerStacks || 1.44;
    }
}
