import { Link } from 'react-router-dom';

import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Typography } from '@/components/atoms/Typography';
import { ROUTE } from '@/routing/routes.types';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import * as Styled from './Headers.styles';
import { ICurrencyStat, IHeader, IStat, STAT_TYPES } from './Headers.types';

const Stat = ({ label, value = '' }: IStat) => {
    return (
        <Styled.Stat>
            <Styled.Value variant="h2" color={theme.color.yellow} weight="bold">
                {value}
            </Styled.Value>
            <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                <>{label}</>
            </Typography>
        </Styled.Stat>
    );
};
const CurrencyStat = ({ stacks, tether, label }: ICurrencyStat) => {
    const nf = new Intl.NumberFormat('de-DE');
    return (
        <Styled.Stat>
            <Styled.Row>
                <span></span>
                <Typography variant="h2">~</Typography>{' '}
                <Typography variant="h2" color={theme.color.yellow} weight="bold">
                    {nf.format(stacks.value).replaceAll('.', ' ')}
                </Typography>{' '}
                <Icon name={CURRENCY.TETHER} width="2.4rem" />{' '}
                <Typography variant="h2">/</Typography> <span></span>
                <Typography variant="h2" color={theme.color.yellow} weight="bold">
                    {nf.format(tether.value).replaceAll('.', ' ')}
                </Typography>{' '}
                <Icon name={CURRENCY.STACKS} width="2.4rem" />
            </Styled.Row>
            <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                <>{label}</>
            </Typography>
        </Styled.Stat>
    );
};

export const Headers = ({ rightImage, stats, title }: IHeader) => {
    return (
        <>
            <Link to={ROUTE.DASHBOARD}>
                <Typography variant="body1" color={theme.color.yellow}>
                    <Styled.CenterHorizontally>
                        <Styled.BackArrowIcon name={ICON.ARROW_LEFT} fill={theme.color.yellow} />
                        back to dashboard
                    </Styled.CenterHorizontally>
                </Typography>
            </Link>
            <Styled.Headers>
                <Styled.Title variant="h3" weight="bold">
                    {title}
                </Styled.Title>
                {stats.map((stat, index) =>
                    stat.type === STAT_TYPES.VALUE ? (
                        <Stat {...stat} key={index} />
                    ) : (
                        <CurrencyStat
                            stacks={stat.stacks ?? { value: 0, currency: CURRENCY.STACKS }}
                            tether={stat.tether ?? { value: 0, currency: CURRENCY.TETHER }}
                            label={stat.label}
                            key={index}
                        />
                    ),
                )}
                <Styled.CreaturesImage src={rightImage} alt="" />
            </Styled.Headers>
        </>
    );
};
