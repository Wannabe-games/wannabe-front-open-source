import { IUserCreaturesFilter } from '@/hooks/useGetUserCreatures';
import { UserCreatureDetailsModel } from '@/models/user-creature-details.model';
import { UserCreatureModel } from '@/models/user-creature.model';

export interface ICreatureProfile {
    creature: UserCreatureDetailsModel;
    allCreatures: UserCreatureModel[];
    filters: IUserCreaturesFilter[];
    selectedFilter: 'all' | 'staked' | 'nft' | 'mint' | 'expired';
    handleFilterChange: (value: 'all' | 'staked' | 'nft' | 'mint' | 'expired') => void;
}
