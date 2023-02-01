import styled from 'styled-components';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Header } from './Header';

export default {
    title: 'Organism/Header',
    component: Header,
} as ComponentMeta<typeof Header>;

const StyledWrapper = styled.div`
    max-width: 128rem;
`;

const Template: ComponentStory<typeof Header> = () => {
    return (
        <StyledWrapper>
            <Header />
        </StyledWrapper>
    );
};

export const Default = Template.bind({});
