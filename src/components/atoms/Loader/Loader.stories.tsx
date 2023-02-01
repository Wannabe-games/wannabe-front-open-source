import { withDesign } from 'storybook-addon-designs';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Loader } from './';

export default {
    title: 'Atoms/Loader',
    component: Loader,
    argTypes: {
        className: { table: { disable: true } },
    },
    decorators: [withDesign],
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = ({ ...args }) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Loading',
};

Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=1983%3A23571',
    },
};
