import { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import styled from 'styled-components';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FilteringSection } from './FilteringSection';
import { IFilteringSection } from './FilteringSection.types';

export default {
    title: 'Molecules/FilteringSection',
    component: FilteringSection,
    argTypes: {
        handleFilterChange: { table: { disable: true } },
        selectedFilter: { table: { disable: true } },
    },
    decorators: [withDesign],
} as ComponentMeta<typeof FilteringSection>;

const filters = [
    {
        label: 'all',
        value: 'all',
        disabled: false,
    },
    {
        label: 'staked',
        value: 'staked',
        disabled: false,
    },
    {
        label: 'available for mint',
        value: 'available-for-mint',
        disabled: false,
    },
    {
        label: "my NFT's",
        value: 'my-nfts',
        disabled: false,
    },
    {
        label: 'expired',
        value: 'expired',
        disabled: false,
    },
];

const Template: ComponentStory<typeof FilteringSection> = ({ filters }: IFilteringSection) => {
    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    const handleFilterChange = (value: string) => {
        setSelectedFilter(value);
    };

    return (
        <WizzPanelWrapper>
            <FilteringSection
                filters={filters}
                selectedFilter={selectedFilter}
                handleFilterChange={handleFilterChange}
            />
        </WizzPanelWrapper>
    );
};

export const Type1 = Template.bind({});
Type1.args = {
    filters,
    selectedFilter: 'all',
};
Type1.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=105%3A624',
    },
};

const WizzPanelWrapper = styled.div`
    max-width: 96.1rem;
    margin-left: auto;
    margin-right: auto;
`;
