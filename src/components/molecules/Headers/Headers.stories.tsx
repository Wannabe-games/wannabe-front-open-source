import type { ComponentStory, Meta } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import styled from 'styled-components';

import creatureTeamSrc from '@/assets/img/shorts/creature-team.png';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import { Headers } from './Headers';
import { IHeader, STAT_TYPES } from './Headers.types';

const stats = [
    { label: 'Ready to upgrade', value: '384', type: STAT_TYPES.VALUE },
    { label: 'Total staked', value: '6', type: STAT_TYPES.VALUE },
    { label: 'Pool share', value: '23%', type: STAT_TYPES.VALUE },
    {
        label: (
            <>
                USD Tether{' '}
                <Icon name={ICON.EXCHANGE} width="1.6rem" fill={theme.color.whiteAlpha.a60} />{' '}
                Stacks
            </>
        ),
        stacks: { value: 2903, currency: CURRENCY.STACKS },
        tether: { value: 2947, currency: CURRENCY.TETHER },
        type: STAT_TYPES.MONEY,
    },
];
export default {
    title: 'Molecules/Headers',
    component: Headers,
    decorators: [withDesign],
} as Meta<IHeader>;

const DropdownWrapper = styled.div`
    margin: 0 auto;
    width: 1280px;
`;
const Template: ComponentStory<typeof Headers> = (args) => (
    <DropdownWrapper>
        <Headers {...args} />
    </DropdownWrapper>
);

export const Default = Template.bind({});
Default.args = { stats, rightImage: creatureTeamSrc, title: 'Staked Creatures' };
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=1256%3A15376',
    },
};
