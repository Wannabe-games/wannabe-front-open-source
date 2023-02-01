import { withDesign } from 'storybook-addon-designs';
import styled from 'styled-components';

import { CreatureModel } from '@/models/creature.model';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CreatureCard } from './CreatureCard';

export default {
    title: 'Molecules/CreatureCard',
    component: CreatureCard,
    argTypes: {
        creature: { table: { disable: true } },
    },
    decorators: [withDesign],
} as ComponentMeta<typeof CreatureCard>;

const creatureMock = new CreatureModel({
    id: 1,
    tier: 1,
    type: 'boar',
    name: 'Boar',
    skinColor: 0,
    speed: 0,
    boostAcceleration: 0,
    acceleration: 0,
    boostTime: 0,
    speedMin: 19.492,
    boostAccelerationMin: 1.4718,
    accelerationMin: 0.0887,
    boostTimeMin: 1.9624,
    speedMax: 36.5501,
    accelerationMax: 0.1732,
    boostTimeMax: 2.6312,
    boostAccelerationMax: 5.5854,
    priceStacks: 1,
    priceGold: 4750,
    deliveryPriceStacks: 20,
    deliveryWaitingTime: 120,
    upgradeChanges: [
        {
            name: 'acceleration',
            value: 0.0887,
        },
        {
            name: 'speed',
            value: 19.492,
        },
        {
            name: 'boost_power',
            value: 3.1674,
        },
        {
            name: 'fuel_volume',
            value: 2.5818,
        },
    ],
});

const Template: ComponentStory<typeof CreatureCard> = ({ ...args }) => {
    return (
        <WizzPanelWrapper>
            <CreatureCard {...args} />
        </WizzPanelWrapper>
    );
};

export const Default = Template.bind({});
Default.args = {
    creature: creatureMock,
};
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=476%3A3172',
    },
};

const WizzPanelWrapper = styled.div`
    max-width: 96.1rem;
    margin-left: auto;
    margin-right: auto;
`;
