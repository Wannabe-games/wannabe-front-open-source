import { withDesign } from 'storybook-addon-designs';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Badge } from './';
import { BADGE_TYPE } from './Badge.types';

export default {
    title: 'Atoms/Badge',
    component: Badge,
    argTypes: {
        children: { name: 'label' },
        $type: { options: Object.values(BADGE_TYPE), control: 'radio' },
    },
    decorators: [withDesign],
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Default = Template.bind({});

Default.args = {
    children: 'NFT',
    $type: BADGE_TYPE.NFT,
};

Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=208%3A17997',
    },
};
