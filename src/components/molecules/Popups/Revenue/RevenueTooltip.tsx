import { Typography } from '@/components/atoms/Typography';
import { theme } from '@/theme/mainTheme';

import * as Styled from './Revenue.styles';

export const RevenueTooltip = () => {
    return (
        <Styled.Tooltip>
            <Typography variant="body2" weight="bold" color={theme.color.whiteAlpha.a60}>
                Projected user growth
            </Typography>
            <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                0.25
            </Typography>
            <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                How many new users will a user invite!
            </Typography>
            <Typography variant="body2" weight="bold" color={theme.color.whiteAlpha.a60}>
                Current userbase
            </Typography>
            <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                20
            </Typography>
            <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                This is how many users we got now!
            </Typography>
            <Typography variant="body2" weight="bold" color={theme.color.whiteAlpha.a60}>
                New users daily growth
            </Typography>
            <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                10
            </Typography>
            <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                How many new users we will onboard
            </Typography>
            <Typography variant="body2" weight="bold" color={theme.color.whiteAlpha.a60}>
                Avarage user spent
            </Typography>
            <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                $27.00
            </Typography>
            <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                How much a typical user will spend in game!
            </Typography>
            <Typography variant="body2" weight="bold" color={theme.color.whiteAlpha.a60}>
                Initial staked
            </Typography>
            <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                $1000.00
            </Typography>
            <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                How much there already is staked!
            </Typography>
            <Typography variant="body2" weight="bold" color={theme.color.whiteAlpha.a60}>
                New users stake delimiter
            </Typography>
            <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                50%
            </Typography>
            <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                This is how much of user spent will be staked!
            </Typography>
        </Styled.Tooltip>
    );
};
