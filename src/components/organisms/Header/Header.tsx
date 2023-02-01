import { useState } from 'react';
import { isIOS, isMobile } from 'react-device-detect';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import creatureRacerLogoMobile from '@/assets/img/creature-racer-logo-web-m.png';
import creatureRacerLogo from '@/assets/img/creature-racer-logo-web.png';
import { Button } from '@/components/atoms/Button';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Typography } from '@/components/atoms/Typography';
import { Menu } from '@/components/molecules/Menu';
import { useLogout } from '@/hooks/auth/useLogout';
import { useGetBalance } from '@/hooks/useGetBalance';
import { ROUTE } from '@/routing/routes.types';
import { useTypedSelector } from '@/store';
import { selectCurrentUserWalletId } from '@/store/slices/account.slice';
import { selectIsAuthenticated } from '@/store/slices/auth.slice';
import { selectUserCreatures } from '@/store/slices/creatures.slice';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import * as Styled from './Header.styles';

function goto(url: string, fallback: string) {
    const script = document.createElement('script');

    script.onload = function () {
        document.location = url;
    };
    script.onerror = function () {
        document.location = fallback;
    };
    script.setAttribute('src', url);

    document.getElementsByTagName('head')[0].appendChild(script);
}

const SignUpOrIn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSignUpPage = location.pathname === ROUTE.REGISTER;

    if (isSignUpPage) {
        return (
            <Button
                secondary
                label="Sign in"
                onClick={() => {
                    navigate(ROUTE.LOGIN);
                }}
            />
        );
    } else {
        return (
            <Button
                secondary
                label="Create an account"
                onClick={() => {
                    navigate(ROUTE.REGISTER);
                }}
            />
        );
    }
};

const LoggedInMenu = () => (
    <Menu.List>
        <Menu.ListItem icon={ICON.DASHBOARD}>
            <Menu.Link to={ROUTE.DASHBOARD}>Dashboard</Menu.Link>
        </Menu.ListItem>
        <Menu.ListItem icon={ICON.USER}>
            <Menu.Link to={ROUTE.PROFILE}>Profile</Menu.Link>
        </Menu.ListItem>
    </Menu.List>
);

const AuthenticatedMenu = ({ isMobile = false }: { isMobile?: boolean }) => {
    const { logout } = useLogout();
    return (
        <Menu.List>
            <Menu.ListItem>
                {/* TODO: */}
                {isMobile ? (
                    <a
                        href="https://www.moonpay.com/buy"
                        target="_blank"
                        rel="noopener, noreferrer"
                    >
                        <Typography variant="h6" color={theme.color.yellow}>
                            Buy crypto
                        </Typography>
                    </a>
                ) : (
                    <Button
                        secondary
                        label="Buy crypto"
                        onClick={() => {
                            window.open(
                                'https://www.moonpay.com/buy',
                                '_blank',
                                'noopener,noreferrer',
                            );
                        }}
                    />
                )}
            </Menu.ListItem>
            <Menu.ListItem>
                <Menu.Link to={ROUTE.LOGIN} color={theme.color.yellow} onClick={() => logout()}>
                    Logout
                </Menu.Link>
            </Menu.ListItem>
        </Menu.List>
    );
};

const LoggedInContent = () => {
    return (
        <>
            <LoggedInMenu />
            <BalanceContent />
        </>
    );
};

const BalanceContent = () => {
    const { gold: goldAmount, tether: tetherAmount, stacks: stacksAmount } = useGetBalance();

    return (
        <Styled.Money className="money">
            <Menu.GoldCoin amount={goldAmount} />

            <Menu.WalletWrapper>
                <Menu.Wallet>
                    <Menu.WalletCurrency amount={tetherAmount} currency={CURRENCY.TETHER} />
                    <Menu.WalletCurrency amount={stacksAmount} currency={CURRENCY.STACKS} />
                </Menu.Wallet>
            </Menu.WalletWrapper>
        </Styled.Money>
    );
};

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const isAuthenticated = useTypedSelector(selectIsAuthenticated);
    const wallet = useTypedSelector(selectCurrentUserWalletId);
    const userCreatures = useTypedSelector(selectUserCreatures);
    const location = useLocation();
    const detectRegister = () => {
        return !!location.pathname.match(/register/);
    };

    const isRegisteredUser = isAuthenticated && wallet && userCreatures?.length > 0;

    return (
        <Styled.Header>
            <Link to={ROUTE.HOME}>
                <img
                    src={creatureRacerLogo}
                    srcSet={`${creatureRacerLogo} 1200w, ${creatureRacerLogoMobile} 800w`}
                    sizes="(max-width: 800px) 400px,(max-width: 1200px) 800px, 1200px"
                    alt="Creature Racer Logo"
                />
            </Link>
            <Styled.RightContainer>
                <Styled.HeaderMenu>
                    {isRegisteredUser && <LoggedInContent />}

                    {isAuthenticated ? (
                        <AuthenticatedMenu />
                    ) : (
                        <Menu.List>
                            <Menu.ListItem>
                                <SignUpOrIn />
                            </Menu.ListItem>
                        </Menu.List>
                    )}
                    {isAuthenticated ? (
                        <Styled.MenuButton
                            label=""
                            rightIcon={
                                <Styled.MenuIcon
                                    name={menuOpen ? ICON.CLOSE : ICON.MENU}
                                    size={24}
                                />
                            }
                            onClick={() => setMenuOpen((prev) => !prev)}
                        />
                    ) : (
                        <Styled.MobileButtons>
                            <SignUpOrIn />
                        </Styled.MobileButtons>
                    )}
                </Styled.HeaderMenu>
                {isAuthenticated && !detectRegister() && (
                    <Styled.Quote>
                        <Typography variant="h1" weight="bold">
                            So you think you can Race & Earn?
                        </Typography>
                        {isMobile && (
                            <Button
                                primary
                                label="Play game"
                                onClick={() =>
                                    goto(
                                        'creatureracer://',
                                        isIOS
                                            ? 'https://apps.apple.com/pl/app/creature-racer/id1597507077?l=pl'
                                            : 'http://play.google.com/store/apps/details?id=com.itm8.wannabe.creatureracer',
                                    )
                                }
                            />
                        )}
                    </Styled.Quote>
                )}
            </Styled.RightContainer>
            <Styled.MobileMenu open={menuOpen} onClick={() => setMenuOpen(false)}>
                {isRegisteredUser && (
                    <>
                        <LoggedInMenu />
                        <AuthenticatedMenu isMobile />
                    </>
                )}
            </Styled.MobileMenu>
        </Styled.Header>
    );
};
