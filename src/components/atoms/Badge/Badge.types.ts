export enum BADGE_TYPE {
    BUY = 'buy',
    COLLECTABLE = 'collectable',
    FREE = 'free',
    FREE_COIN = 'free-coin',
    NFT = 'nft',
    STAKED = 'staked',
}

export interface IBadge {
    $type: BADGE_TYPE;
    children: string;
}
