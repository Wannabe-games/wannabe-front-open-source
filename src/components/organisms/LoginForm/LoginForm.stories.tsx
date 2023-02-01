import { ICON } from '@/components/atoms/Icon/Icon.types';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LoginForm } from './LoginForm';

export default {
    title: 'Organism/LoginForm',
    component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = () => {
    return <LoginForm />;
};

const menuItems = [
    { label: 'Dashboard', color: 'white', icon: ICON.DASHBOARD },
    { label: 'Create an account' },
];

export const Default = Template.bind({});
Default.args = { menuItems };
