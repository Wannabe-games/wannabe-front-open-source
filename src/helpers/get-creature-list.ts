import { UserCreatureModel } from '@/models/user-creature.model';

export const getCreaturesList = (
    current: UserCreatureModel[],
    data: UserCreatureModel[],
): UserCreatureModel[] => {
    const creatures = {} as { [key: string]: UserCreatureModel };

    [...current, ...data].forEach((item: UserCreatureModel) => {
        creatures[item.id] = item;
    });

    return Object.values(creatures);
};
