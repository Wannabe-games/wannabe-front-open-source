import { ReactComponent as WannabeLogo } from '@/assets/img/wannabe-logo.svg';
import { Typography } from '@/components/atoms/Typography';
import { Menu } from '@/components/molecules/Menu';
import { Wrapper as PageWrapper } from '@/templates/MainTemplate/MainTemplate.styles';
import { theme } from '@/theme/mainTheme';

import * as Styled from './Footer.styles';

export const Footer = () => {
    return (
        <Styled.Footer>
            <PageWrapper>
                <Styled.FooterInner>
                    <WannabeLogo />
                    <Styled.RightContainer>
                        <Menu>
                            {/* TODO: */}
                            <Menu.List>
                                <Menu.ListItem>
                                    <Menu.Link
                                        to={{
                                            pathname: '//www.creatureracer.com',
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Creature Racer
                                    </Menu.Link>
                                </Menu.ListItem>
                                <Menu.ListItem>
                                    <Menu.Link
                                        to={{
                                            pathname: '//www.creatureracer.com/privacy-policy/',
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Privacy Policy
                                    </Menu.Link>
                                </Menu.ListItem>
                                <Menu.ListItem>
                                    <Menu.Link
                                        to={{
                                            pathname: '//www.creatureracer.com/terms-conditions/',
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Terms & Conditions
                                    </Menu.Link>
                                </Menu.ListItem>
                                <Menu.ListItem>
                                    <Menu.Link
                                        to={{
                                            pathname: '//www.creatureracer.com/assumption-of-risk/',
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Assumption of Risk
                                    </Menu.Link>
                                </Menu.ListItem>
                            </Menu.List>
                        </Menu>
                        <Styled.FooterQuote variant="h3" weight="bold">
                            <>
                                Mint your Creature{' '}
                                <Typography variant="h3" color={theme.color.yellow}>
                                    NFTs
                                </Typography>
                                , Race & Earn Crypto!
                            </>
                        </Styled.FooterQuote>
                        <Typography variant="h5" color={theme.color.whiteAlpha.a60}>
                            &copy; 2022 Wannabe PSA, All Rights Reserved.
                        </Typography>
                    </Styled.RightContainer>
                </Styled.FooterInner>
            </PageWrapper>
        </Styled.Footer>
    );
};
