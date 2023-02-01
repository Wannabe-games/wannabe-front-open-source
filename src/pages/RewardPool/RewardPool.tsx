import { useMemo } from 'react';

import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Spinner } from '@/components/atoms/Spinner';
import { Typography } from '@/components/atoms/Typography';
import { InternalServerError } from '@/components/molecules/InternalServerError';
import { RewardPoolList } from '@/components/molecules/RewardPoolList';
import { useDebounce } from '@/hooks/useDebounce';
import { useRewardPoolList } from '@/hooks/useRewardPoolList';
import { ROUTE } from '@/routing/routes.types';
import { theme } from '@/theme/mainTheme';

import * as Styled from './RewardPool.styles';

export const RewardPool = () => {
    const { rewards, isFetching, refetch, error } = useRewardPoolList();
    const debouncedIsFetching = useDebounce(isFetching);

    const renderedContent = useMemo(() => {
        if (debouncedIsFetching) {
            return <Spinner />;
        }

        if (rewards) {
            return <RewardPoolList rewards={rewards} />;
        }
    }, [debouncedIsFetching, rewards]);

    if (error && !isFetching) {
        return <InternalServerError handleTryAgainClick={refetch} error={error} withPadding />;
    }

    return (
        <Styled.RewardPool>
            <Styled.BackToDashboard to={ROUTE.DASHBOARD}>
                <Typography variant="body1" color={theme.color.yellow}>
                    <Icon name={ICON.ARROW_LEFT} width={24} fill={theme.color.yellow} />
                    back to dashboard
                </Typography>
            </Styled.BackToDashboard>

            {renderedContent}
        </Styled.RewardPool>
    );
};
