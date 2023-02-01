import { withDesign } from 'storybook-addon-designs';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NotificationBar } from './';
import {
    INotificationBarProps,
    NOTIFICATION_TYPE,
} from './NotificationBar.types';

export default {
    title: 'Molecules/NotificationBar',
    component: NotificationBar,
    argTypes: {
        type: {
            options: [NOTIFICATION_TYPE.SUCCESS, NOTIFICATION_TYPE.ERROR],
            control: { type: 'radio' },
        },
    },
    decorators: [withDesign],
} as ComponentMeta<typeof NotificationBar>;

const Template: ComponentStory<typeof NotificationBar> = ({ ...args }: INotificationBarProps) => (
    <NotificationBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
    message: 'Your avatar has been successfully saved',
    type: NOTIFICATION_TYPE.SUCCESS,
};

Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=105%3A606',
    },
};
