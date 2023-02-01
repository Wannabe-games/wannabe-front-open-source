import { useEffect, useMemo } from 'react';
import Scroll from 'react-scroll';

import defaultAvatarSrc from '@/assets/avatar.png';
import edit from '@/assets/edit.png';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Tooltip } from '@/components/atoms/Tooltip';
import { Typography } from '@/components/atoms/Typography/Typography.styles';
import { ChangePasswordPopup } from '@/components/molecules/Popups/ChangePassword';
import { EditPersonalDataPopup } from '@/components/molecules/Popups/EditPersonalData';
import { MintNFTReferralPopUp } from '@/components/molecules/Popups/MintNFTReferral';
import { ShortsSection } from '@/components/organisms/ShortsSection';
import config from '@/config';
import { copyTextToClipboard } from '@/helpers/copy-text-to-clipboard';
import { truncateText } from '@/helpers/truncate-text';
import { useModal } from '@/hooks/useModal';
import { ROUTE } from '@/routing/routes.types';
import { useTypedSelector } from '@/store';
import { selectCurrentUser } from '@/store/slices/account.slice';
import { theme } from '@/theme/mainTheme';

import * as Styled from './UserProfile.styles';

const {
    wallet: { truncatedIdLength },
} = config;

export const UserProfile = () => {
    const { email, nick, wallet, player, myReferralNft } = useTypedSelector(selectCurrentUser);

    const avatar = player?.activeAnimalCreatureType;
    const avatarSrc = avatar ? `/creatures/${avatar}.png` : defaultAvatarSrc;

    const { showModal: showPersonalDataModal, hideModal: hidePersonalDataModal } = useModal(() => (
        <EditPersonalDataPopup hide={hidePersonalDataModal} />
    ));

    const { showModal: showChangePasswordModal, hideModal: hideChangePasswordModal } = useModal(
        () => <ChangePasswordPopup hide={hideChangePasswordModal} />,
    );

    const { showModal: showMintNFTReferralPopUp, hideModal: hideMintNFTReferralPopUp } = useModal(
        () => <MintNFTReferralPopUp hide={hideMintNFTReferralPopUp} />,
    );

    useEffect(() => {
        Scroll.animateScroll.scrollToBottom();
    }, []);

    const truncatedWalletId = truncateText(wallet, truncatedIdLength);

    const renderReferralCodeSection = useMemo(() => {
        if (myReferralNft) {
            return (
                <>
                    <Typography variant="h4" weight="bold" mb="1rem">
                        My Referral Code
                    </Typography>
                    <Styled.ReferralCodeWrapper>
                        <Styled.RNFT variant="h4" mr="1rem">
                            rNFT
                        </Styled.RNFT>{' '}
                        {myReferralNft.refCode}
                        <button
                            type="button"
                            onClick={() => copyTextToClipboard(myReferralNft.refCode)}
                        >
                            <Icon name={ICON.COPY} width="2.4rem" ml="1rem" />
                        </button>
                    </Styled.ReferralCodeWrapper>
                    <Button
                        primary
                        label="Mint"
                        disabled={true}
                        rightIcon={
                            <Tooltip
                                iconSize={20}
                                color={theme.color.white}
                                element={
                                    <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                                        {`Seems like you already have rNFT in your wallet, you need to sell it to mint a new one.`}
                                    </Typography>
                                }
                                sx={26.7}
                            />
                        }
                    />
                </>
            );
        }

        return (
            <>
                <Typography variant="h4" weight="bold" mb="1.6rem">
                    My Referral Code <Styled.RNFT variant="h4">rNFT</Styled.RNFT>
                </Typography>

                <Button
                    primary
                    label="Mint"
                    rightIcon={
                        <Tooltip
                            iconSize={20}
                            color={theme.color.blackLike}
                            element={
                                <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                                    {`Hey, it seems like you are not earning commissions. Mint your rNFT Referral Code and invite friends to Race & Earn`}
                                </Typography>
                            }
                            sx={26.7}
                        />
                    }
                    onClick={showMintNFTReferralPopUp}
                />
            </>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myReferralNft]);

    //TODO: Reusable container and shortslist
    return (
        <Styled.Wrapper>
            <ShortsSection />
            <Styled.FullWidthContainer>
                <Styled.InnerWrapper>
                    <Styled.BackToDashboard to={ROUTE.DASHBOARD}>
                        <Typography variant="body1" color={theme.color.yellow}>
                            <Styled.CenterHorizontally>
                                <Styled.BackArrowIcon
                                    name={ICON.ARROW_LEFT}
                                    fill={theme.color.yellow}
                                />
                                back to dashboard
                            </Styled.CenterHorizontally>
                        </Typography>
                    </Styled.BackToDashboard>
                    <Styled.UserDetails>
                        <Styled.UserAvatarWrapper hasAvatar={!!avatar}>
                            <Styled.UserAvatar
                                src={avatarSrc}
                                alt="Creature"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = defaultAvatarSrc;
                                }}
                            />
                        </Styled.UserAvatarWrapper>
                        <Styled.RightContainer>
                            <Styled.List>
                                <Styled.ListItem>
                                    <Typography variant="h2">{nick || ''}</Typography>
                                </Styled.ListItem>
                                <Styled.ListItem>
                                    <Styled.EditButton
                                        label="Edit "
                                        rightIcon={<img src={edit} alt="" />}
                                        tertiary
                                        onClick={showPersonalDataModal}
                                    />
                                    <Typography variant="h4" weight="bold">
                                        E-mail
                                    </Typography>
                                    <Styled.Subtitle variant="body2"> </Styled.Subtitle>
                                    <Typography variant="h6">{email}</Typography>
                                </Styled.ListItem>
                            </Styled.List>
                            <Styled.Divider />
                            <Styled.List>
                                <Styled.ListItem>
                                    <Typography variant="h4" weight="bold">
                                        Wallet{' '}
                                        <Tooltip
                                            element={
                                                <Typography
                                                    variant="body2"
                                                    weight="regular"
                                                    color={theme.color.whiteAlpha.a60}
                                                >
                                                    Wannabe PSA do not have any access to your
                                                    Wallet, you are fully responsible for holding
                                                    your private keys. If you lose them, you will
                                                    not have access to any blokchchain assets you
                                                    may have in your wallet including Creature Racer
                                                    NFTs
                                                </Typography>
                                            }
                                            iconSize={24}
                                            sx={33.8}
                                        />
                                    </Typography>
                                    <Styled.Subtitle variant="body2">
                                        Your Hiro wallet address
                                    </Styled.Subtitle>
                                    <Typography variant="h6">
                                        {truncatedWalletId}{' '}
                                        <button
                                            type="button"
                                            onClick={() => copyTextToClipboard(wallet)}
                                        >
                                            <Icon name={ICON.COPY} width={24} />
                                        </button>
                                    </Typography>
                                </Styled.ListItem>
                                <Styled.ListItem>
                                    <Styled.EditButton
                                        label="Edit "
                                        rightIcon={<img src={edit} alt="Change password" />}
                                        tertiary
                                        onClick={showChangePasswordModal}
                                    />
                                    <Typography variant="h4" weight="bold">
                                        Password
                                    </Typography>
                                    <Styled.Subtitle variant="body2">
                                        Your password is protected
                                    </Styled.Subtitle>
                                    <Typography variant="h6">*******</Typography>
                                </Styled.ListItem>
                            </Styled.List>
                            <Styled.Divider />
                            <Styled.List>
                                <Styled.ListItem>{renderReferralCodeSection}</Styled.ListItem>
                            </Styled.List>
                        </Styled.RightContainer>
                    </Styled.UserDetails>
                </Styled.InnerWrapper>
            </Styled.FullWidthContainer>
        </Styled.Wrapper>
    );
};
