import { ShortsSection } from '@/components/organisms/ShortsSection';

import * as Styled from './Dashboard.styles';

export const DashboardPage = () => {
    return (
        <Styled.DashboardWrapper>
            <ShortsSection />
        </Styled.DashboardWrapper>
    );
};
