import React from 'react';

export enum SOCIAL_MEDIA_TYPE {
    SHARE = 'share',
    DOWNLOAD = 'download',
    EARN = 'earn',
}
export interface IStyledSocialMediaAvatar {
    type?: SOCIAL_MEDIA_TYPE;
}
export interface SocialMedia {
    name: string;
    url: string;
    icon: React.FunctionComponent;
}

export interface ISocialMediaAvatar {
    type?: SOCIAL_MEDIA_TYPE;
    socialMediaList: SocialMedia[];
    action: string;
}
