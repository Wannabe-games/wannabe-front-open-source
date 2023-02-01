import { useMemo } from 'react';

import { ReactComponent as RNFT } from '@/assets/img/rnft.svg';
import inviteAndEarnSrc from '@/assets/img/shorts/invite-and-earn.png';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Typography } from '@/components/atoms/Typography';
import { MintNFTReferralPopUp } from '@/components/molecules/Popups/MintNFTReferral';
import config from '@/config';
import { copyTextToClipboard } from '@/helpers/copy-text-to-clipboard';
import { truncateWithSeparator } from '@/helpers/truncate-with-separator';
import { useModal } from '@/hooks/useModal';
import { ROUTE } from '@/routing/routes.types';
import { useTypedSelector } from '@/store';
import { selectCurrentUser } from '@/store/slices/account.slice';
import { theme } from '@/theme/mainTheme';

import { Short } from '../Short';
import * as Styled from './InviteAndEarn.styles';

const { STORYBOOK: isStorybook } = import.meta.env;

const {
    referralCode: { truncatedLength: refCodeMaxLength },
} = config;

export const InviteAndEarn = () => {
    const user = useTypedSelector(selectCurrentUser);

    const { showModal: showMintNFTReferralPopUp, hideModal: hideMintNFTReferralPopUp } = useModal(
        () => <MintNFTReferralPopUp hide={hideMintNFTReferralPopUp} />,
    );

    const onModalOpen = () => {
        !isStorybook && showMintNFTReferralPopUp();
    };

    const renderContentBasedOnRefCode = useMemo(() => {
        const refCode = user?.myReferralNft?.refCode;

        if (refCode) {
            const truncatedReferralCode =
                refCode && truncateWithSeparator(refCode, refCodeMaxLength, '(...)');

            return (
                <>
                    <Typography variant="h5" color={theme.color.white}>
                        <Styled.Wrapper>
                            <RNFT />
                            {truncatedReferralCode}{' '}
                            <button type="button" onClick={() => copyTextToClipboard(refCode)}>
                                <Icon name={ICON.COPY} width="2.4rem" />
                            </button>
                        </Styled.Wrapper>
                    </Typography>

                    <Short.Button primary label={'Manage rNFT'} route={ROUTE.REFERRALS} />
                </>
            );
        }

        return (
            <>
                <Typography variant="h6" color={theme.color.whiteAlpha.a60}>
                    Mint your Referral Code rNFT
                </Typography>

                <Short.ButtonWrapper>
                    <Short.Button secondary label={'Mint rNFT'} onClick={onModalOpen} />
                </Short.ButtonWrapper>
            </>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.myReferralNft?.refCode]);

    return (
        <Short>
            <Short.Header
                sx={28.7}
                infoContent={
                    <Styled.Link href="https://www.creatureracer.com/assumption-of-risk">
                        <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                            https://www.creatureracer.com/assumption-of-risk
                        </Typography>
                    </Styled.Link>
                }
            >
                Invite & Earn
            </Short.Header>
            {renderContentBasedOnRefCode}
            <img
                src={inviteAndEarnSrc}
                style={{
                    width: '20rem',
                    position: 'absolute',
                    right: '-4rem',
                    bottom: '-1rem',
                }}
            />
        </Short>
    );
};
