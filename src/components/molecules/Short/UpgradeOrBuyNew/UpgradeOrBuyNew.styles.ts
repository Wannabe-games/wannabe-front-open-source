import styled from 'styled-components';

import { Icon as IconComponent } from '@/components/atoms/Icon';
import { ProgressBar as ProgressBarComponent } from '@/components/atoms/ProgressBar';

export const IconsWrapper = styled.div`
    display: flex;
    gap: 1.5rem;
    justify-content: flex-start;
    margin-top: 0.5rem;
    width: 100%;
`;

export const Icon = styled(IconComponent)`
    width: 2.5rem;
`;

export const ProgressBar = styled(ProgressBarComponent)`
    width: 23.2rem;
`;
