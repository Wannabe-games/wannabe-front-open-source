import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color } from 'styled-system';

// Menu
export const Menu = styled.div`
    align-items: center;
    color: ${({ theme }) => theme.color.white};
    display: inline-flex;
    list-style: none;
`;

export const MenuList = styled.ul`
    align-items: center;
    display: inline-flex;
`;

export const MenuListItem = styled.li`
    ${color};
    align-items: center;
    display: flex;
    margin-left: 2.4rem;
`;

export const MenuLink = styled(Link).withConfig({
    shouldForwardProp: (prop) => !['color'].includes(prop),
})`
    color: #fff;
    ${color}
`;

// Gold coin
export const GoldCoin = styled.div`
    display: flex;
    align-items: center;
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    &::before,
    &::after {
        content: '';
        height: 2.4rem;
        width: 1px;
        background-color: rgba(255, 255, 255, 0.2);
    }
    &::before {
        margin-right: 2.4rem;
    }
    &::after {
        margin-left: 2.4rem;
    }
`;

// Wallet
export const WalletWrapper = styled.div`
    align-items: center;
    display: flex;
`;

export const Wallet = styled.div``;

export const WalletCurrenciesWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const WalletCurrency = styled.span`
    align-items: center;
    display: inline-flex;
    gap: 0.5rem;
    &:not(:first-child)::before {
        color: #fff;
        content: ' / ';
        display: inline-block;
        font-size: 2.6rem;
        font-weight: 300;
        margin-left: 0.7rem;
        margin-right: 0.7rem;
    }
`;
