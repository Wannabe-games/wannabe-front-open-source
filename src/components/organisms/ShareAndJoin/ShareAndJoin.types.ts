import { UserCardOut } from '@/interfaces/contract/UserCardOut';

export interface IShareAndJoin {
    type: 'join' | 'share';
    data: UserCardOut;
}
