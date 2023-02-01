import { ReactComponent as DiscordIcon } from '@/assets/icons/discord.svg';
import { ReactComponent as FacebookIcon } from '@/assets/icons/facebook.svg';
import { ReactComponent as InstagramIcon } from '@/assets/icons/instagram.svg';
import { ReactComponent as TelegramIcon } from '@/assets/icons/telegram.svg';
import { ComponentStory } from '@storybook/react';

import { SocialMediaAvatar } from './SocialMediaAvatar';

export default {
    title: 'Molecules/SocialMediaAvatar',
    component: SocialMediaAvatar,
};

const socialMediaList = [
    { name: 'Discord', url: 'https://facebook.com', icon: DiscordIcon },
    { name: 'Telegram', url: 'https://telegram.org', icon: TelegramIcon },
    { name: 'Instagram', url: 'https://instagram.com', icon: InstagramIcon },
    { name: 'Facebook', url: 'https://facebook.com', icon: FacebookIcon },
];

const Template: ComponentStory<typeof SocialMediaAvatar> = () => {
    return <SocialMediaAvatar socialMediaList={socialMediaList} action="https://google.com/" />;
};

export const Default = Template.bind({});
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=207%3A9094',
    },
};
