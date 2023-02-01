/* eslint-disable @typescript-eslint/no-explicit-any */
export type Filter = 'all' | 'upgrade' | 'buy';

export interface IFilteringSection {
    filters: Array<any>;
    selectedFilter: string;
    handleFilterChange: (value: any) => void;
}
