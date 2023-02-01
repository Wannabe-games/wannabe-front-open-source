import { withDesign } from 'storybook-addon-designs';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Chip } from './';

export default {
    title: 'Atoms/Chip',
    component: Chip,
    argTypes: {},
    decorators: [withDesign],
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'label',
    isSelected: false,
    disabled: false,
};
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=105%3A606',
    },
};
