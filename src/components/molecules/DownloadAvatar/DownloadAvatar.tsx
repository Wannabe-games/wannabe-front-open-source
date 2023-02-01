import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Typography } from '@/components/atoms/Typography';
import { theme } from '@/theme/mainTheme';

import * as Styled from './DownloadAvatar.styles';

const socialMediaList = [ICON.DISCORD, ICON.TELEGRAM, ICON.INSTAGRAM, ICON.FACEBOOK];

export const DownloadAvatar = ({ type }: { type: string }) => {
    return (
        <Styled.DownloadAvatar>
            <Typography variant="h6" weight="bold">
                Download
            </Typography>
            <Typography variant="body1" color={theme.color.whiteAlpha.a60}>
                Set your creature as a social media avatar
            </Typography>
            <Styled.SocialMediaBox>
                {socialMediaList.map((socialMedia, index) => (
                    <Icon key={index} name={socialMedia} width={24} />
                ))}
                <Styled.SocialMediaLink href={`/creatures/${type}.png`} download="avatar.png">
                    <Typography variant="body2" ml={2} color={theme.color.yellow}>
                        get it now
                    </Typography>
                </Styled.SocialMediaLink>
            </Styled.SocialMediaBox>
        </Styled.DownloadAvatar>
    );
};
