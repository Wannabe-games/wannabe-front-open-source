import { withDesign } from 'storybook-addon-designs';

import { ComponentMeta } from '@storybook/react';

import { InviteAndEarn } from './InviteAndEarn';
import { MincapStats } from './MincapStats';
import { PlayAndEarn } from './PlayAndEarn';
import { RewardPool } from './RewardPool';
import { Short } from './Short';
import { StakedCreatures } from './StakedCreatures';
import { UpgradeOrBuyNew } from './UpgradeOrBuyNew';

export default {
    title: 'Molecules/Short',
    component: Short,
    decorators: [withDesign],
    argTypes: { action: { action: 'clicked' } },
} as ComponentMeta<typeof Short>;

export const RewardPoolShort = () => {
    return <RewardPool />;
};

RewardPoolShort.storyName = 'Reward Pool';

RewardPoolShort.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=752%3A5390',
    },
};

export const StakedCreaturesShort = () => {
    return <StakedCreatures />;
};

StakedCreaturesShort.storyName = 'Staked Creatures';
StakedCreaturesShort.argTypes = {
    infoContent: { table: { disable: true } },
};
StakedCreaturesShort.args = {
    pool: 23,
    action: () => ({}),
    amount: 6,
};

StakedCreaturesShort.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=752%3A5390',
    },
};

export const MincapStatsShort = () => {
    return <MincapStats />;
};

MincapStatsShort.storyName = 'Mincap Stats';
MincapStatsShort.argTypes = {
    infoContent: { table: { disable: true } },
};
MincapStatsShort.args = {
    action: () => ({}),
};

export const PlayAndEarnShort = () => {
    return <PlayAndEarn />;
};

PlayAndEarnShort.storyName = 'Play & Earn';
PlayAndEarnShort.argTypes = {
    infoContent: { table: { disable: true } },
};
PlayAndEarnShort.args = {
    action: () => ({}),
};

export const UpgradeOrBuyNewShort = () => {
    return <UpgradeOrBuyNew />;
};

UpgradeOrBuyNewShort.storyName = 'Upgrade or buy new';
UpgradeOrBuyNewShort.argTypes = {
    infoContent: { table: { disable: true } },
};
UpgradeOrBuyNewShort.args = {
    action: () => ({}),
    buyAction: () => ({}),
};

export const InviteAndEarnShort = () => {
    return <InviteAndEarn />;
};

InviteAndEarnShort.storyName = 'Invite & Earn';
InviteAndEarnShort.argTypes = {
    infoContent: { table: { disable: true } },
};
InviteAndEarnShort.args = {
    action: () => ({}),
    walletId: '0xdac17f958d2ee523a2206206994597c13d831ec7',
};
