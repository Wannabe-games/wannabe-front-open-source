import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import * as Styled from '../RewardPoolList.styles';
import { IMoney } from '../RewardPoolList.types';

export const Money = ({ money, size = 'h5', color = theme.color.yellow }: IMoney) => {
    return (
        <Styled.Money>
            <Typography variant={size}>~</Typography>{' '}
            <Typography variant={size} color={color} weight="bold">
                {money.usdt}
            </Typography>{' '}
            <Icon name={CURRENCY.TETHER} width={'2.4rem'} /> <Typography variant="h3">/</Typography>{' '}
            <Typography variant={size} color={color} weight="bold">
                {money.stacks}
            </Typography>{' '}
            <Icon name={CURRENCY.STACKS} width={'2.4rem'} />
        </Styled.Money>
    );
};
