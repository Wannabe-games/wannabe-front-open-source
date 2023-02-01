import birdSrc from '@/assets/img/shorts/bird.png';
import { Button } from '@/components/atoms/Button';
import { Headers } from '@/components/molecules/Headers';
import { STAT_TYPES } from '@/components/molecules/Headers/Headers.types';
import { CreateNewLobbyPopup } from '@/components/molecules/Popups/CreateNewLobby';
import { LobbyList } from '@/components/organisms/LobbyList';
import { ILobby, LOBBY_STATUS } from '@/components/organisms/LobbyList/LobbyList.types';
import { useModal } from '@/hooks/useModal';

import * as Styled from './Lobbies.styles';

const userLobbies: ILobby[] = [
    {
        id: '1',
        value: 34,
        username: {
            id: '1',
            name: 'Username',
            avatar: '',
        },
        score: 0,
        timeLeft: 1669881218000,
        status: LOBBY_STATUS.DRAFT,
        isOwner: true,
    },
    {
        id: '2',
        value: 34,
        username: {
            id: '1',
            name: 'Username',
            avatar: '',
        },
        score: 15,
        timeLeft: 1669868608000,
        status: LOBBY_STATUS.ACTIVE,
        isOwner: true,
    },
];

const lobbies: ILobby[] = [
    {
        id: '1',
        value: 12,
        username: {
            id: '1',
            name: 'Username',
            avatar: '',
        },
        score: 15,
        timeLeft: 1669857705000,
        status: LOBBY_STATUS.ACTIVE,
        isOwner: false,
    },
    {
        id: '2',
        value: 421111,
        username: {
            id: '1',
            name: 'Username',
            avatar: '',
        },
        score: 244,
        timeLeft: 1669875132000,
        status: LOBBY_STATUS.ACTIVE,
        isOwner: false,
    },
    {
        id: '3',
        value: 673121124111,
        username: {
            id: '1',
            name: 'Username',
            avatar: '',
        },
        score: 67,
        timeLeft: 1669882272000,
        status: LOBBY_STATUS.ACTIVE,
        isOwner: false,
    },
    {
        id: '4',
        value: 358357917,
        username: {
            id: '1',
            name: 'Username',
            avatar: '',
        },
        score: 568,
        timeLeft: 1669857705000,
        status: LOBBY_STATUS.ACTIVE,
        isOwner: false,
    },
];

export const LobbiesPage = () => {
    const { showModal: showMintNFTReferralPopUp, hideModal: hideCreateNewLobbyPopup } = useModal(
        () => <CreateNewLobbyPopup hide={hideCreateNewLobbyPopup} />,
    );

    return (
        <>
            <Styled.LobbiesPage>
                <Styled.HeaderWrapper>
                    <Headers
                        rightImage={birdSrc}
                        stats={[
                            {
                                label: 'Active lobbies count',
                                value: `12`,
                                type: STAT_TYPES.VALUE,
                            },
                            {
                                label: 'All bets amount',
                                value: `320`,
                                type: STAT_TYPES.VALUE,
                            },
                            {
                                label: 'Average bet amount',
                                value: `26`,
                                type: STAT_TYPES.VALUE,
                            },
                        ]}
                        title="Flappy&nbsp;Pets"
                    />
                </Styled.HeaderWrapper>
                <Styled.ButtonWrapper>
                    <Button primary label="Create new lobby" onClick={showMintNFTReferralPopUp} />
                </Styled.ButtonWrapper>

                <Styled.LobbyListWrapper>
                    <LobbyList heading="Your lobbies" lobbies={userLobbies} userLobbies />
                    <LobbyList heading="All lobbies" lobbies={lobbies} />
                </Styled.LobbyListWrapper>
            </Styled.LobbiesPage>
        </>
    );
};
