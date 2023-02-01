import { withDesign } from 'storybook-addon-designs';

import { ReactComponent as UserIcon } from '@/assets/icons/user.svg';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './Button';

export default {
    title: 'Atoms/Button',
    component: Button,
    argTypes: {
        label: {
            name: 'label',
            type: { name: 'string', required: false },
        },
        primary: { table: { disable: true } },
        secondary: { table: { disable: true } },
        tertiary: { table: { disable: true } },
        rightIcon: { table: { disable: true } },
        onClick: { table: { disable: true } },
        className: { table: { disable: true } },
        stake: { table: { disable: true } },
        route: { table: { disable: true } },
        state: { table: { disable: true } },
        replace: { table: { disable: true } },
        type: { table: { disable: true } },
    },
    decorators: [withDesign],
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: 'Label',
    primary: true,
    disabled: false,
};
Primary.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=50%3A427',
    },
};

export const Secondary = Template.bind({});
Secondary.args = {
    ...Primary.args,
    label: 'Label',
    primary: false,
    secondary: true,
};
Secondary.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=105%3A766',
    },
};

export const Tertiary = Template.bind({});
Tertiary.args = {
    ...Primary.args,
    label: 'Label',
    primary: false,
    tertiary: true,
    rightIcon: <UserIcon />,
};
Tertiary.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=52%3A71',
    },
};
