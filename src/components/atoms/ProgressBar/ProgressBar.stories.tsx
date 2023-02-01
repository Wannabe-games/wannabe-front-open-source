import { withDesign } from 'storybook-addon-designs';
import styled from 'styled-components';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Icon } from '../Icon';
import { ICON } from '../Icon/Icon.types';
import { ProgressBar } from './ProgressBar';

export default {
    title: 'Atoms/ProgressBar',
    component: ProgressBar,
    argTypes: {
        className: { table: { disable: true } },
    },
    decorators: [withDesign],
} as ComponentMeta<typeof ProgressBar>;

const Header = () => {
    return (
        <>
            Muscles <Icon name={ICON.TRAIT_MUSCLES} width="2rem" />
        </>
    );
};

const MultipleProgressBars: ComponentStory<typeof ProgressBar> = () => (
    <ProgressBarWrapper>
        <ProgressBar percent={100} />
        <ProgressBar percent={75} />
        <ProgressBar percent={50} />
        <ProgressBar percent={25} />
        <ProgressBar percent={0} />
    </ProgressBarWrapper>
);

export const Default = MultipleProgressBars.bind({});
Default.parameters = {
    controls: { hideNoControlsWarning: true },
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=188%3A3866',
    },
};

const SingleProgressBar: ComponentStory<typeof ProgressBar> = ({ ...args }) => (
    <div style={{ width: '8.5rem' }}>
        <ProgressBar header={<Header />} {...args} />
    </div>
);

export const WithHeader = SingleProgressBar.bind({});
WithHeader.argTypes = {
    percent: {
        control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    upgrade: {
        control: { type: 'range', min: 0, max: 100, step: 20 },
    },
};
WithHeader.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=188%3A3488',
    },
};

const ProgressBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.2rem;
    padding: 2rem;
    width: 16.9rem;
`;
