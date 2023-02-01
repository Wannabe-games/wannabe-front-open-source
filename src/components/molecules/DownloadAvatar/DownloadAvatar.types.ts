export interface SocialMedia {
    name: string;
    url: string;
    icon: React.FunctionComponent;
}

export interface ISocialMediaAvatar {
    socialMediaList: SocialMedia[];
}
