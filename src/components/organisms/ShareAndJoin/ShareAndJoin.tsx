// TODO: Should be checked and refactored

import html2canvas from 'html2canvas';
import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import defaultAvatarSrc from '@/assets/avatar.png';
import { ReactComponent as AppStore } from '@/assets/img/app-store.svg';
import creatureRacerLogo from '@/assets/img/creature-racer-logo-web.png';
import { ReactComponent as GooglePlayStore } from '@/assets/img/google-play-store.svg';
import rnft24wSrc from '@/assets/img/rnft-24w.png';
import rnftSrc from '@/assets/img/rnft.png';
import rocket from '@/assets/img/rocket-background.png';
import shareCreatures from '@/assets/img/share-creatures.png';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Typography } from '@/components/atoms/Typography';
import { copyTextToClipboard } from '@/helpers/copy-text-to-clipboard';
import { UserCardOut } from '@/interfaces/contract/UserCardOut';
import { ROUTE } from '@/routing/routes.types';
import { useUsdPerStacksQuery } from '@/store/services/coingecko.service';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import * as Styled from './ShareAndJoin.styles';
import { IShareAndJoin } from './ShareAndJoin.types';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        FB: any;
    }
}

const QRCode = ({
    data,
    shareOnFacebook,
}: {
    data: UserCardOut;
    shareOnFacebook: (e: React.MouseEvent<HTMLElement>) => void;
}) => {
    return (
        <>
            <Styled.SocialIcons>
                <a
                    href={`https://t.me/share?url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon name={ICON.TELEGRAM} width={10} />
                </a>
                <a href="#" onClick={shareOnFacebook}>
                    <Icon name={ICON.FACEBOOK} width={10} />
                </a>
                <button type="button" onClick={() => copyTextToClipboard('abc')}>
                    <Icon name={ICON.COPY} width="1rem" />
                </button>
            </Styled.SocialIcons>
            <Styled.QRCodeOuter>
                <Styled.QRCode>
                    <img src={data.qrCode} alt="QR Code" />
                </Styled.QRCode>
            </Styled.QRCodeOuter>
            <Styled.RNFTImageSmall src={rnft24wSrc} alt="rnft" />
        </>
    );
};

const Money = ({ stacks, tether }: { stacks: number; tether: number }) => {
    const nf = new Intl.NumberFormat('de-DE');

    return (
        <Styled.Money>
            <Typography variant="h2">~</Typography>{' '}
            <Typography variant="h2" color={theme.color.yellow} weight="bold">
                {nf.format(stacks).replaceAll('.', ' ')}
            </Typography>{' '}
            <Icon name={CURRENCY.TETHER} width="3.2rem" /> <Typography variant="h2">/</Typography>{' '}
            <span></span>
            <Typography variant="h2" color={theme.color.yellow} weight="bold">
                {nf.format(tether).replaceAll('.', ' ')}
            </Typography>{' '}
            <Icon name={CURRENCY.STACKS} width="3.2rem" />
        </Styled.Money>
    );
};

export const ShareAndJoin = ({ type = 'join', data }: IShareAndJoin) => {
    const { id } = useParams();
    // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
    const [userImage, setUserImage] = useState<string>('');
    const navigate = useNavigate();
    const shareRef = useRef(null);
    const tmp = useRef<HTMLDivElement>(null);

    const stacksToUSD = useUsdPerStacksQuery(null);

    const exchangeRate = stacksToUSD?.data ? stacksToUSD.data : 0;
    // const { data: userImageURL, isLoading } = usePostUserShareImageQuery(
    //     { userImage, id: id ? id : '' },
    //     { skip: userImage === '' },
    // );

    const generateImage = async () => {
        if (shareRef.current) {
            const image = await html2canvas(shareRef.current);

            return image.toDataURL();
        } else {
            return false;
        }
    };
    const share = (pictureURL: string) => {
        window.FB.ui({
            method: 'feed',
            action_type: 'og.shares',
            picture: pictureURL,
            link: `https://stage.wannabe.games/share/${id}`,
            // href: `https://stage.wannabe.games/share/${id}`,
            hashtag: '#Testing',
            caption: 'your_caption',
            description: 'your_description',
            // method: 'share_open_graph',
            // action_type: 'og.shares',
            // display: 'popup',caption: '#TODO-ADDCOPY',
            // action_properties: JSON.stringify({
            //     object: {
            //         'og:url': `https://stage.wannabe.games/share/${id}`,
            //         'og:title': 'Title to show',
            //         'og:description': 'The description',
            //         'og:image': pictureURL,
            //     },
            // }),
        });
    };
    const shareOnFacebook = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const image = await generateImage();

        image && setUserImage(image.split(',')[1]);
        share(
            'https://api.stage.wannabe.games/api/portal/user/image?hash=eb8e5e4e7027d49e9851b26d5158e1dd',
        );
    };
    return (
        <Styled.ShareAndJoin ref={shareRef}>
            <div ref={tmp}></div>
            <Styled.Rocket src={rocket} alt="Creature Racer logo" />
            <Styled.Logo src={creatureRacerLogo} alt="Creature Racer logo" />
            <Styled.Creatures src={shareCreatures} alt="Creature Racer logo" />
            <Styled.Title type={type}>
                {type === 'join' ? (
                    <>
                        <Typography variant="h3">Congratulations!</Typography>
                        <Typography variant="h6" weight="bold">
                            Now you can{' '}
                            <Typography variant="h6" color={theme.color.yellow}>
                                Rookie
                            </Typography>
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="h3">{data.nick ? data.nick : ' '}</Typography>
                        <Typography variant="h6" weight="bold">
                            my Referral NFT level{' '}
                            <Typography variant="h6" color={theme.color.yellow}>
                                {data.referralLevel ? data.referralLevel : 'Rookie'}
                            </Typography>
                        </Typography>
                        <Styled.Avatar>
                            <img
                                src={
                                    data.avatar
                                        ? `/creatures/${data.avatar.split('_')[0]}.png`
                                        : defaultAvatarSrc
                                }
                            />
                        </Styled.Avatar>
                    </>
                )}
            </Styled.Title>

            {type === 'join' ? (
                <Styled.Box>
                    <div>
                        <Typography variant="h6">Join our discord!</Typography>
                        <br />
                        <Typography variant="body1" color={theme.color.whiteAlpha.a60}>
                            Meet new friends,
                        </Typography>
                        <br />
                        <Typography variant="body1" color={theme.color.whiteAlpha.a60}>
                            share your Refferal Code rNFT and GLHF!
                        </Typography>
                    </div>
                    <Button
                        primary
                        label="Join discord"
                        onClick={() => console.log('Join discord')}
                    />
                </Styled.Box>
            ) : (
                <Styled.FirstRow>
                    <Styled.RewardPool>
                        <Typography variant="h6" weight="bold">
                            Reward Pool
                        </Typography>
                        <Typography
                            variant="body2"
                            weight="regular"
                            color={theme.color.whiteAlpha.a60}
                        >
                            <>{new Date().toLocaleString().substring(0, 10)}</>
                        </Typography>
                        <Styled.RewardPoolValue>
                            <Money
                                stacks={Math.round(data.rewardPool)}
                                tether={Math.round(data.rewardPool * exchangeRate)}
                            />
                        </Styled.RewardPoolValue>
                    </Styled.RewardPool>
                    <Styled.PoolShare>
                        <Typography variant="h6" weight="bold">
                            Pool share
                        </Typography>
                        <Typography variant="body1" color={theme.color.whiteAlpha.a60}>
                            My revenue
                        </Typography>
                        <Typography variant="h2" weight="bold" color={theme.color.yellow}>
                            {data.poolShare}{' '}
                            <Typography variant="h2" color={theme.color.white} weight="light">
                                %
                            </Typography>
                        </Typography>
                    </Styled.PoolShare>
                </Styled.FirstRow>
            )}
            <Styled.Box>
                <div>
                    <Typography variant="h6" color={theme.color.whiteAlpha.a60}>
                        Use my Referral Code to Race & Earn:
                    </Typography>
                    <br />
                    <Styled.ReferralSubtitle variant="h5" weight="bold">
                        {data.referralCode}
                    </Styled.ReferralSubtitle>
                    <br />
                    <Styled.Referral>
                        <Styled.RNFTContainer>
                            <Styled.RNFTImage src={rnftSrc} alt="rnft" />
                            <Styled.InviteAndEarnBorder>
                                <div>Invite & Earn</div>
                            </Styled.InviteAndEarnBorder>
                        </Styled.RNFTContainer>
                        <Styled.ReferralText variant="body1" color={theme.color.whiteAlpha.a60}>
                            Use{' '}
                            <Typography
                                variant="body1"
                                weight="bold"
                                color={theme.color.whiteAlpha.a60}
                            >
                                Referral Code
                            </Typography>{' '}
                            to get one{' '}
                            <Typography variant="body1" color={theme.color.white}>
                                Creature NFT worth up to
                                <br />
                                28 STX for
                            </Typography>{' '}
                            <Typography variant="body1" color={theme.color.yellow}>
                                FREE
                            </Typography>
                        </Styled.ReferralText>
                    </Styled.Referral>
                </div>
                <Styled.QRCodeContainer>
                    <QRCode data={data} shareOnFacebook={shareOnFacebook} />
                </Styled.QRCodeContainer>
            </Styled.Box>
            <Styled.QRCodeCenter>
                <QRCode data={data} shareOnFacebook={shareOnFacebook} />
            </Styled.QRCodeCenter>
            <Styled.Footer>
                <div>
                    <Typography variant="body1">Play and earn crypto</Typography>
                    <br />

                    <a
                        href="https://www.creatureracer.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                            www.creatureracer.com
                        </Typography>
                    </a>

                    <br />
                </div>
                <Styled.Stores>
                    <a
                        href="http://play.google.com/store/apps/details?id=com.itm8.wannabe.creatureracer"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <GooglePlayStore />
                    </a>
                    <a
                        href="https://apps.apple.com/pl/app/creature-racer/id1597507077?l=pl"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <AppStore />
                    </a>
                </Styled.Stores>
            </Styled.Footer>
            {type !== 'share' && (
                <Styled.GoToDashboard
                    secondary
                    label="Go to dashboard"
                    onClick={() => navigate(ROUTE.DASHBOARD, { replace: true })}
                />
            )}
        </Styled.ShareAndJoin>
    );
};
