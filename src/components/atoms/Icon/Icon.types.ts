import { FunctionComponent, SVGProps } from 'react';
import { LayoutProps, SpaceProps } from 'styled-system';

import { CURRENCY } from '@/types/currency';

export enum ICON {
    ACCELERATION = 'acceleration',
    ARROW_DOWN = 'arrow_down',
    ARROW_LEFT = 'arrow_left',
    ARROW_RIGHT = 'arrow_right',
    ARROW_UP = 'arrow_up',
    BOOST_POWER = 'boost_power',
    BROWSE = 'browse',
    CHEVRON_DOWN = 'chevron_down',
    CHEVRON_UP = 'chevron_up',
    CLOSE = 'close',
    COPY = 'copy',
    DASHBOARD = 'dashboard',
    DISCORD = 'discord',
    DOWNLOAD_AS_AVATAR = 'download_as_avatar',
    EDIT = 'edit',
    EXCHANGE = 'exchange',
    FACEBOOK = 'facebook',
    FUEL = 'fuel',
    FUEL_VOLUME = 'fuel_volume',
    GOLD_COIN = 'gold_coin',
    INFO = 'info',
    INSTAGRAM = 'instagram',
    MENU = 'menu',
    OFF = 'off',
    PHOTO = 'photo',
    SPEED = 'speed',
    TELEGRAM = 'telegram',
    TIMER = 'timer',
    TRAIT_BELLY = 'belly',
    TRAIT_BUTTOCKS = 'buttocks',
    TRAIT_HEART = 'heart',
    TRAIT_LUNGS = 'lungs',
    TRAIT_MUSCLES = 'muscles',
    UPGRADE_BOOST_POWER = 'upgrade_boost_power',
    USER = 'user',
}

export interface IIcon extends LayoutProps, SpaceProps {
    svgIcon?: React.ReactElement;
    name?: ICON | CURRENCY;
    className?: string;
    fill?: string;
    path?: string;
}

export type Icons = {
    [key in ICON | CURRENCY]: FunctionComponent<
        SVGProps<SVGSVGElement> & { title?: string | undefined }
    >;
};
