import { withDesign } from 'storybook-addon-designs';
import styled from 'styled-components';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ICON } from '../Icon/Icon.types';
import { Dropdown } from './';

export default {
    title: 'Atoms/Dropdown',
    component: Dropdown,
    argTypes: {
        value: { table: { disable: true } },
        className: { table: { disable: true } },
        onChangeAction: { table: { disable: true } },
        progress: { table: { disable: true } },
        icon: { table: { disable: true } },
    },
    decorators: [withDesign],
} as ComponentMeta<typeof Dropdown>;

const DropdownWrapper = styled.div`
    width: 300px;
`;

const Template: ComponentStory<typeof Dropdown> = (args) => (
    <DropdownWrapper>
        <Dropdown {...args} />
    </DropdownWrapper>
);

const options = [
    {
        label: 'Option 1',
        value: 1,
    },
    {
        label: 'Option 2',
        value: 2,
    },
];

const optionsWithProgress = [
    {
        value: 0,
    },
    {
        value: 1,
    },
    {
        value: 2,
    },
    {
        value: 3,
    },
    {
        value: 4,
    },
];

export const Default = Template.bind({});
Default.args = {
    label: 'Stat',
    options,
    value: 1,
};
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=1258%3A19301',
    },
};

export const WithProgress = Template.bind({});
WithProgress.args = {
    icon: ICON.TRAIT_MUSCLES,
    label: 'Muscles',
    max: 5,
    progress: true,
    options: optionsWithProgress,
};
WithProgress.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=1258%3A19400',
    },
};
