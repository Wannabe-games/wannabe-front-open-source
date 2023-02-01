import { withDesign } from 'storybook-addon-designs';
import styled from 'styled-components';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { WizzPanel } from './WizzPanel';

export default {
    title: 'Molecules/WizzPanel',
    component: WizzPanel,
    decorators: [withDesign],
} as ComponentMeta<typeof WizzPanel>;

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

const Template: ComponentStory<typeof WizzPanel> = (args) => (
    <WizzPanelWrapper>
        <WizzPanel {...args} />
    </WizzPanelWrapper>
);

export const Default = Template.bind({});
Default.args = {
    steps,
};
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=665%3A3117',
    },
};

const WizzPanelWrapper = styled.div`
    max-width: 96.1rem;
    margin-left: auto;
    margin-right: auto;
`;
