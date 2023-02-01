import { ROUTE } from '@/routing/routes.types';

type actions = 'buy';

export interface ILocationState {
    from?: ROUTE | actions;
}

export interface IStep4LocationState extends ILocationState {
    creatureId?: string;
}
