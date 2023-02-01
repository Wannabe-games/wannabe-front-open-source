// TODO: Refactor

import { useEffect, useMemo, useState } from 'react';

import inviteAndEarnSrc from '@/assets/img/shorts/invite-and-earn.png';
import { ReactComponent as Discord } from '@/assets/social-icons/discord.svg';
import { ReactComponent as Facebook } from '@/assets/social-icons/facebook.svg';
import { ReactComponent as Instagram } from '@/assets/social-icons/instagram.svg';
import { ReactComponent as Telegram } from '@/assets/social-icons/telegram.svg';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Tooltip } from '@/components/atoms/Tooltip';
import { Typography } from '@/components/atoms/Typography';
import { Headers } from '@/components/molecules/Headers';
import { STAT_TYPES } from '@/components/molecules/Headers/Headers.types';
import { MintNFTReferralPopUp } from '@/components/molecules/Popups/MintNFTReferral';
import { SocialMediaAvatar } from '@/components/molecules/SocialMediaAvatar';
import { SOCIAL_MEDIA_TYPE } from '@/components/molecules/SocialMediaAvatar/SocialMediaAvatar.types';
import { claimReferralRewardAction } from '@/helpers/actions/claimReferralRewardAction';
import { copyTextToClipboard } from '@/helpers/copy-text-to-clipboard';
import { microStxToStx } from '@/helpers/stacks/micro-stx-to-stx';
import { useModal } from '@/hooks/useModal';
import { HeaderStatisticsOut } from '@/interfaces/contract/HeaderStatisticsOut';
import { useTypedSelector } from '@/store';
import { useUsdPerStacksQuery } from '@/store/services/coingecko.service';
import {
    useGetUserInveteesQuery,
    useGetUserStatisticQuery,
} from '@/store/services/creatureRacer.service';
import { selectCurrentUser } from '@/store/slices/account.slice';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import * as Styled from './Referrals.styles';

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
        invited: ' / 24',
    },
    {
        label: 'Newbie',
        revenue: '5%',
        invited: ' / 74',
    },
    {
        label: 'Pro',
        revenue: '10%',
        invited: ' / 499',
    },
    {
        label: 'Ultimate',
        revenue: '20%',
        invited: ' / 1500',
    },
    {
        label: 'Celebrity',
        revenue: '40%',
        invited: '1501+',
    },
];
export const Referrals = () => {
    const { myReferralNft } = useTypedSelector(selectCurrentUser);
    const [choosenLevel, setChoosenLevel] = useState('Rookie');
    const [totalReward, setTotalReward] = useState(0);
    const [headerStatistics, setHeaderStatistics] = useState<HeaderStatisticsOut>({
        expiresSoon: 0,
        mintedInTotal: 0,
        myPoolShare: '0',
        readyToUpgrade: 0,
        referralLevel: null,
        rewardPool: 0,
        totalPoolShare: '0',
        totalStaked: 0,
    });

    const { showModal: showMintNFTReferralPopUp, hideModal: hideMintNFTReferralPopUp } = useModal(
        () => <MintNFTReferralPopUp hide={hideMintNFTReferralPopUp} />,
    );

    const nf = new Intl.NumberFormat('de-DE');
    const { data: statistics } = useGetUserStatisticQuery(null);
    const { data: invitees, isSuccess } = useGetUserInveteesQuery(null);

    const stacksToUSD = useUsdPerStacksQuery(null);

    const exchangeRate = stacksToUSD?.data ? stacksToUSD.data : 0;

    useEffect(() => {
        if (isSuccess && invitees && invitees.length > 0) {
            if (invitees.length <= 24) {
                setChoosenLevel('Rookie');
            } else if (invitees.length <= 74) {
                setChoosenLevel('Newbie');
            } else if (invitees.length <= 499) {
                setChoosenLevel('Pro');
            } else if (invitees.length <= 1500) {
                setChoosenLevel('Ultimate');
            } else {
                setChoosenLevel('Celebrity');
            }
            invitees.forEach(({ pool }) => setTotalReward((prev) => prev + pool));
        }
    }, [isSuccess, invitees]);

    useEffect(() => {
        statistics && setHeaderStatistics(statistics);
    }, [statistics]);

    const rewardPool =
        headerStatistics?.rewardPool && Math.round(microStxToStx(headerStatistics?.rewardPool));

    const handleClaimClick = async () => {
        if (myReferralNft) {
            await claimReferralRewardAction();
        }
    };

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
    }, [myReferralNft, showMintNFTReferralPopUp]);

    return (
        <Styled.Referrals>
            <Headers
                rightImage={inviteAndEarnSrc}
                title="Referrals"
                stats={[
                    {
                        label: 'My level',
                        value: `${
                            headerStatistics?.referralLevel
                                ? headerStatistics.referralLevel
                                : 'Rookie'
                        }`,
                        type: STAT_TYPES.VALUE,
                    },
                    {
                        label: 'Revenue share',
                        value: `${headerStatistics?.totalPoolShare} %`,
                        type: STAT_TYPES.VALUE,
                    },
                    {
                        label: 'Total invited',
                        value: `${invitees ? invitees.length : 0}`,
                        type: STAT_TYPES.VALUE,
                    },
                    {
                        label: 'Today reward',
                        stacks: {
                            value: Number(
                                (
                                    ((rewardPool * Number(headerStatistics?.myPoolShare)) / 100) *
                                    exchangeRate
                                ).toFixed(2),
                            ),
                            currency: CURRENCY.STACKS,
                        },
                        tether: {
                            value: (rewardPool * Number(headerStatistics?.myPoolShare)) / 100,
                            currency: CURRENCY.TETHER,
                        },
                        type: STAT_TYPES.MONEY,
                    },
                ]}
            />
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
                                        <>
                                            {invitees &&
                                                level.label !== 'Celebrity' &&
                                                invitees.length}
                                            {level.invited} invited
                                        </>
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
                            {myReferralNft && (
                                <Styled.ReferralsDetail>
                                    <Typography variant="h4" weight="bold">
                                        Total Referral Code Rewards
                                    </Typography>
                                    <Styled.TotalRewardsTextWrapper>
                                        <Typography variant="h3">~</Typography>{' '}
                                        <Typography variant="h3" color={theme.color.yellow}>
                                            {nf
                                                .format(Math.round(totalReward * exchangeRate))
                                                .replace('.', ' ')}
                                        </Typography>{' '}
                                        <Icon name={CURRENCY.TETHER} width="2.4rem" />{' '}
                                        <Typography variant="h3">/</Typography>{' '}
                                        <Typography variant="h3" color={theme.color.yellow}>
                                            {nf.format(totalReward).replace('.', ' ')}
                                        </Typography>{' '}
                                        <Icon name={CURRENCY.STACKS} width="2.4rem" />
                                    </Styled.TotalRewardsTextWrapper>
                                    <Button
                                        primary
                                        label="Claim"
                                        rightIcon={
                                            <Tooltip
                                                iconSize={20}
                                                color={theme.color.blackLike}
                                                element={
                                                    <Typography
                                                        variant="body2"
                                                        color={theme.color.whiteAlpha.a60}
                                                    >
                                                        {`Each "claim" action accepts users that used your
                                                    rNFT to be attached to your rNFT address. This
                                                    transaction is one time only, and it needs
                                                    Polygon Gas fee to be paid. For each new user we
                                                    will charge a gas fee of your claim action.`}
                                                    </Typography>
                                                }
                                                sx={26.7}
                                            />
                                        }
                                        onClick={handleClaimClick}
                                    />
                                </Styled.ReferralsDetail>
                            )}
                            <Styled.ReferralsDetail>
                                {renderReferralCodeSection}
                            </Styled.ReferralsDetail>
                        </Styled.ReferralsDetails>
                    </Styled.RightSide>
                </Styled.Container>
            </Styled.FullWidthContainer>
            {myReferralNft && (
                <Styled.ReferralsList>
                    <table>
                        <thead>
                            <tr>
                                <th>My Referred users list</th>
                                <th>Total amount earned from user</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invitees &&
                                invitees.map(({ wallet, pool }) => {
                                    return (
                                        <tr key={wallet}>
                                            <td>{wallet}</td>
                                            <td>
                                                <Typography variant="h3">~</Typography>{' '}
                                                <Typography variant="h3" color={theme.color.yellow}>
                                                    {nf
                                                        .format(Math.round(pool * exchangeRate))
                                                        .replace('.', ' ')}
                                                </Typography>{' '}
                                                <Icon name={CURRENCY.TETHER} width="2.4rem" />{' '}
                                                <Typography variant="h3">/</Typography>{' '}
                                                <Typography variant="h3" color={theme.color.yellow}>
                                                    {nf.format(pool).replace('.', ' ')}
                                                </Typography>{' '}
                                                <Icon name={CURRENCY.STACKS} width="2.4rem" />
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </Styled.ReferralsList>
            )}
        </Styled.Referrals>
    );
};
