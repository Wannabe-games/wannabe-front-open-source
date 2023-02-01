// TODO: Refactor

import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';

import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Typography } from '@/components/atoms/Typography';
import { ShareAndJoin } from '@/components/organisms/ShareAndJoin';
import { copyTextToClipboard } from '@/helpers/copy-text-to-clipboard';
import { UserCardOut } from '@/interfaces/contract/UserCardOut';
import { useTypedSelector } from '@/store';
import { selectCurrentUser, selectCurrentUserReferral } from '@/store/slices/account.slice';
import { theme } from '@/theme/mainTheme';

import * as Styled from './SocialMediaAvatar.styles';
import { ISocialMediaAvatar, SOCIAL_MEDIA_TYPE } from './SocialMediaAvatar.types';

const { STORYBOOK: isStorybook } = import.meta.env;

const texts = {
    share: {
        title: 'Share',
        text: `Let your friends know you're in game and share your rNFT token!`,
        actionText: 'share and invite!',
    },
    download: {
        title: 'Download',
        text: `Set your creature as a social media avatar`,
        actionText: 'get it now',
    },
    earn: {
        title: 'Invite & Earn',
        text: `Share your Referral Code to get a percentage of what your friends spend in the game`,
        actionText: 'share and invite!',
    },
};

export const SocialMediaAvatar = ({
    // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
    socialMediaList,
    type = SOCIAL_MEDIA_TYPE.DOWNLOAD,
}: ISocialMediaAvatar) => {
    const [userCard] = useState<UserCardOut>({
        avatar: null,
        nick: '',
        poolShare: '0',
        referralCode: null,
        referralLevel: null,
        rewardPool: 0,
        qrCode: '',
    });
    const shareRef = useRef<HTMLDivElement>(null);
    const myReferralNFT =
        useTypedSelector(selectCurrentUserReferral) || isStorybook ? '0x123456789' : '';
    const { id } = useTypedSelector(selectCurrentUser) || {};
    // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
    const [userImage, setUserImage] = useState<string>('');
    // const { data: userImageURL } = usePostUserShareImageQuery(
    //     { userImage, id: id ? `${id}` : '' },
    //     { skip: userImage === '' },
    // );

    if (!myReferralNFT) {
        return null;
    }
    const share = (pictureURL: string) => {
        window.FB.ui({
            display: 'dialog',
            method: 'share_open_graph',
            action_type: 'og.likes',
            hashtag: '#Testing',
            action_properties: JSON.stringify({
                object: {
                    'og:image': pictureURL,
                    'og:image:secure_url': pictureURL,
                    'og:image:type': 'image/png',
                    'og:image:width': 1200,
                    'og:image:height': 600,
                    'og:image:alt': 'Share image',
                    'og:url': `http://stage.wannabe.games/share/${id}`,
                    'og:title': 'Join and play',
                    'og:description': 'Description',
                },
            }),
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
    const generateImage = async () => {
        if (shareRef.current) {
            const image = await html2canvas(shareRef.current);

            return image.toDataURL();
        } else {
            return false;
        }
    };

    return (
        <Styled.SocialMediaAvatar type={type}>
            <div style={{ position: 'absolute', left: '-200vw', top: '-100vh' }} ref={shareRef}>
                <ShareAndJoin type="share" data={userCard} />
            </div>
            <Typography variant="h6" weight="bold">
                {texts[type].title}
            </Typography>
            <Typography variant="body1" color={theme.color.whiteAlpha.a60}>
                {texts[type].text}
            </Typography>
            <Styled.SocialMediaBox>
                <a
                    href={`https://t.me/share?url=${window.location.origin}/share/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon name={ICON.TELEGRAM} width={24} />
                </a>

                <a href="#" onClick={shareOnFacebook}>
                    <Icon name={ICON.FACEBOOK} width={24} />
                </a>
                <button
                    type="button"
                    onClick={() => copyTextToClipboard(`${window.location.origin}/share/${id}`)}
                >
                    <Icon name={ICON.COPY} width="2.4rem" />
                </button>
                {/* <Styled.SocialMediaLink href="#!"> */}
                <Typography variant="body2" ml={2}>
                    {texts[type].actionText}
                </Typography>
                {/* </Styled.SocialMediaLink> */}
            </Styled.SocialMediaBox>
        </Styled.SocialMediaAvatar>
    );
};
