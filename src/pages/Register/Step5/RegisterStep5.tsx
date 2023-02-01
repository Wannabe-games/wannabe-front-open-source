import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { Navigate, useLocation } from 'react-router-dom';

import { ReactComponent as Discord } from '@/assets/social-icons/discord.svg';
import { ReactComponent as Facebook } from '@/assets/social-icons/facebook.svg';
import { ReactComponent as Instagram } from '@/assets/social-icons/instagram.svg';
import { ReactComponent as Telegram } from '@/assets/social-icons/telegram.svg';
import { Button } from '@/components/atoms/Button';
import { Tooltip } from '@/components/atoms/Tooltip';
import { Typography } from '@/components/atoms/Typography';
import { MintNFTReferralPopUp } from '@/components/molecules/Popups/MintNFTReferral';
import { RegisterSuccess } from '@/components/molecules/Popups/RegisterSuccess';
import { SocialMediaAvatar } from '@/components/molecules/SocialMediaAvatar';
import { SOCIAL_MEDIA_TYPE } from '@/components/molecules/SocialMediaAvatar/SocialMediaAvatar.types';
import { WizzPanel } from '@/components/molecules/WizzPanel';
import history from '@/customHistory';
import { useModal } from '@/hooks/useModal';
import { ILocationState } from '@/interfaces/LocationState';
import { ROUTE } from '@/routing/routes.types';
import { useTypedSelector } from '@/store';
import { selectCurrentUser } from '@/store/slices/account.slice';
import { theme } from '@/theme/mainTheme';

import * as Styled from './RegisterStep5.styles';

export const RegisterPageStep5 = () => {
    const user = useTypedSelector(selectCurrentUser);
    const refCode = user?.myReferralNft?.refCode;
    const location = useLocation();
    const state = location.state as ILocationState;
    const prevPath = state?.from;

    console.log(prevPath, 'asd');

    const { showModal: showMintNFTReferralPopUp, hideModal: hideMintNFTReferralPopUp } = useModal(
        () => <MintNFTReferralPopUp hide={hideMintNFTReferralPopUp} />,
    );

    const { showModal: showSuccessModal } = useModal(() => <RegisterSuccess />);

    useEffect(() => {
        if (refCode) {
            showSuccessModal();
        }
    }, [refCode, showSuccessModal]);

    useEffect(() => {
        ReactGA.event({ category: 'User', action: 'register (finish)' }); // TODO: ???
    }, []);

    if (prevPath !== ROUTE.REGISTER_STEP4) {
        return <Navigate to={ROUTE.DASHBOARD} replace state={{ from: location }} />;
    }

    return (
        <Styled.Referrals>
            <WizzPanel steps={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step5']} activeStep={5} />
            <Styled.RegisterPageStep5>
                <Typography variant="h1" weight="bold" color="#F6C944">
                    Step 5
                </Typography>
                <Typography variant="h1" weight="bold">
                    Create rNFT
                </Typography>
                <Typography variant="h3">
                    Now create your Referral Code rNFT and share it with the world to earn
                    comissions
                </Typography>
                <Styled.ButtonsWrapper>
                    <Button
                        primary
                        label="Skip"
                        onClick={() => {
                            history.replace(ROUTE.DASHBOARD);
                        }}
                    />
                </Styled.ButtonsWrapper>
            </Styled.RegisterPageStep5>
            <Styled.FullWidthContainer>
                <Styled.Container>
                    <Styled.LeftSide>
                        <Styled.ReferralsTitle variant="h2" weight="bold">
                            How{' '}
                            <Typography variant="h2" color={theme.color.yellow}>
                                Referrals
                            </Typography>{' '}
                            works
                        </Styled.ReferralsTitle>
                        <Typography variant="h4">
                            Mint your Referral Code NFT (rNFT) and hold it in your Hiro wallet.
                        </Typography>
                        <Typography variant="h4">
                            Share your rNFT name on your social media. The more people you invite,
                            the more you can earn. Now you will get a commission from every Stacks
                            spent by a user that used your rNFT.
                        </Typography>
                        <Typography variant="h4">
                            Oh! Yes, if you want you can always sell your rNFT and mint a new one.
                            You sneaky Creature!
                        </Typography>
                        <SocialMediaAvatar
                            type={SOCIAL_MEDIA_TYPE.SHARE}
                            socialMediaList={socialMediaList}
                            action={'get'}
                        />
                    </Styled.LeftSide>
                    <Styled.RightSide>
                        <Styled.LevelList>
                            {levels.map((level) => (
                                <Styled.LevelItem
                                    key={level.label}
                                    selected={choosenLevel === level.label}
                                >
                                    <Typography
                                        variant="h2"
                                        color={
                                            choosenLevel === level.label
                                                ? theme.color.white
                                                : theme.color.white
                                        }
                                        weight="bold"
                                    >
                                        {level.label}
                                    </Typography>
                                    <Typography variant="h6" color={theme.color.whiteAlpha.a60}>
                                        <>{level.invited} invited</>
                                    </Typography>
                                    <Typography
                                        variant="h3"
                                        color={
                                            choosenLevel === level.label
                                                ? theme.color.yellow
                                                : theme.color.white
                                        }
                                        weight="bold"
                                    >
                                        {level.revenue}
                                    </Typography>
                                    <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                                        Commision
                                    </Typography>
                                </Styled.LevelItem>
                            ))}
                        </Styled.LevelList>
                        <Styled.ReferralsDetails>
                            <Styled.ReferralsDetail>
                                <Typography variant="h4" weight="bold" mb="1.6rem">
                                    Mint your Referral Code{' '}
                                    <Styled.RNFT variant="h4">rNFT</Styled.RNFT> and start earning
                                </Typography>
                                <Button
                                    primary
                                    label="Mint"
                                    disabled={!!refCode}
                                    rightIcon={
                                        <Tooltip
                                            iconSize={20}
                                            color={theme.color.blackLike}
                                            element={
                                                <Typography
                                                    variant="body2"
                                                    color={theme.color.whiteAlpha.a60}
                                                >
                                                    {
                                                        'Hey, it seems like you are not earning commissions. Mint your rNFT Referral Code and invite friends to Race & Earn'
                                                    }
                                                </Typography>
                                            }
                                            sx={26.7}
                                        />
                                    }
                                    onClick={showMintNFTReferralPopUp}
                                />
                            </Styled.ReferralsDetail>
                        </Styled.ReferralsDetails>
                    </Styled.RightSide>
                </Styled.Container>
            </Styled.FullWidthContainer>
        </Styled.Referrals>
    );
};

const choosenLevel = 'Rookie';

const socialMediaList = [
    { name: 'Discord', url: 'https://discord.com', icon: Discord },
    { name: 'Telegram', url: 'https://telegram.org', icon: Telegram },
    { name: 'Instagram', url: 'https://instagram.com', icon: Instagram },
    { name: 'Facebook', url: 'https://facebook.com', icon: Facebook },
];

const levels = [
    {
        label: 'Rookie',
        revenue: '1%',
        invited: '1 / 24',
    },
    {
        label: 'Newbie',
        revenue: '5%',
        invited: '25 / 74',
    },
    {
        label: 'Pro',
        revenue: '10%',
        invited: '75 / 499',
    },
    {
        label: 'Ultimate',
        revenue: '20%',
        invited: '500 / 1500',
    },
    {
        label: 'Celebrity',
        revenue: '40%',
        invited: '1501+',
    },
];
