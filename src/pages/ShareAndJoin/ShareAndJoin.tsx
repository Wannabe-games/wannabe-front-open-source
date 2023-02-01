import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Typography } from '@/components/atoms/Typography';
import { ShareAndJoin as Share } from '@/components/organisms/ShareAndJoin';
import { UserCardOut } from '@/interfaces/contract/UserCardOut';
import { useGetUserCardQuery } from '@/store/services/creatureRacer.service';
import { theme } from '@/theme/mainTheme';

import * as Styled from './ShareAndJoin.styles';

export const ShareAndJoin = () => {
    const [userCard, setUserCard] = useState<UserCardOut>({
        avatar: null,
        nick: '',
        poolShare: '0',
        referralCode: null,
        referralLevel: null,
        rewardPool: 0,
        qrCode: '',
    });
    const { id } = useParams();
    const { data: fetchedUserCard, error, isLoading } = useGetUserCardQuery({ id });

    useEffect(() => {
        fetchedUserCard && setUserCard(fetchedUserCard);
    }, [fetchedUserCard]);
    if (!id) return null;
    if (isLoading)
        return (
            <Typography variant="h4" color={theme.color.white}>
                Loading...
            </Typography>
        );
    if (error)
        return (
            <Typography variant="h4" color={theme.color.white}>
                Something went wrong. Please try again later.
            </Typography>
        );

    return (
        <>
            <Share type="share" data={userCard} />
            <Styled.FooterSpacer />
        </>
    );
};
