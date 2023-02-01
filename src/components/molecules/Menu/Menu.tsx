import { ColorProps } from 'styled-system';

import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Typography } from '@/components/atoms/Typography';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import * as Styled from './Menu.styles';
import { IMenu, IMenuItem } from './Menu.types';

const Menu = ({ children, className }: IMenu) => {
    return <Styled.Menu className={className}>{children}</Styled.Menu>;
};

const List = ({ children }: IMenu) => {
    return <Styled.MenuList>{children}</Styled.MenuList>;
};

// TODO: Should contain an anchor/button
const ListItem: React.FC<IMenuItem & ColorProps> = ({
    icon: svgIcon,
    children,
    ...props
}: IMenuItem) => (
    <Styled.MenuListItem {...props}>
        {children}
        {svgIcon && <Icon name={svgIcon} width="2.4rem" ml="0.6rem" />}
    </Styled.MenuListItem>
);

const Wallet = ({ children }: { children: React.ReactNode }) => (
    <div>
        <Styled.WalletCurrenciesWrapper>{children}</Styled.WalletCurrenciesWrapper>
    </div>
);

const GoldCoin = ({ amount }: { amount: number }) => {
    const nf = new Intl.NumberFormat('de-DE');
    return (
        <Styled.GoldCoin>
            <Typography color={theme.color.yellow} variant="h4" weight="bold">
                {nf.format(amount).replaceAll('.', ' ')}
            </Typography>
            <Icon name={ICON.GOLD_COIN} width="2.4rem" ml="0.4rem" />
        </Styled.GoldCoin>
    );
};

const WalletCurrency = ({ amount, currency }: { amount: string; currency: CURRENCY }) => (
    <Styled.WalletCurrency>
        {currency === CURRENCY.TETHER && <Typography variant="body1">~</Typography>}
        <Typography color={theme.color.yellow} variant="h4" weight="bold">
            {amount}
        </Typography>{' '}
        <Icon name={currency} width="2.4rem" />
    </Styled.WalletCurrency>
);

Menu.List = List;
Menu.ListItem = ListItem;
Menu.Link = Styled.MenuLink;
Menu.GoldCoin = GoldCoin;
Menu.Wallet = Wallet;
Menu.WalletCurrency = WalletCurrency;
Menu.WalletWrapper = Styled.WalletWrapper;

export { Menu };
