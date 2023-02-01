import { Chip } from '@/components/atoms/Chip';
import { Typography } from '@/components/atoms/Typography';

import * as Styled from './FilteringSection.styles';
import { IFilteringSection } from './FilteringSection.types';

export const FilteringSection = ({
    filters,
    selectedFilter,
    handleFilterChange,
}: IFilteringSection) => (
    <Styled.FilteringSection>
        <Typography variant="h5">Show only</Typography>
        {filters.map(({ label, value }) => (
            <Chip
                key={label}
                label={label}
                isSelected={selectedFilter === value}
                onClick={() => handleFilterChange(value)}
            />
        ))}
    </Styled.FilteringSection>
);
