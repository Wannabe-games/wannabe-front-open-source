import Countdown, { CountdownRenderProps } from 'react-countdown';

import { IOption } from '@/components/atoms/Dropdown/Dropdown.types';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Tooltip } from '@/components/atoms/Tooltip';
import { Typography } from '@/components/atoms/Typography';
import { truncateWithSeparator } from '@/helpers/truncate-with-separator';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import * as Styled from './LobbyList.styles';
import { ILobby, ILobbyListProps, LOBBY_STATUS } from './LobbyList.types';

interface IRowProps {
    lobby: ILobby;
    userLobbies: boolean;
}

const sortBy = [
    { label: 'Value', value: 'value' },
    { label: 'Score', value: 'score' },
    { label: 'Time left', value: 'time_left' },
];

const tooltips = {
    play: 'You must race at your facility to make it active on the dashboard and accessible to others. An inactive bet is completed within one week of its creation, if not filled by the owner. STX will be charged to the Reward pool.',
    timeLeft:
        "An active bet will be completed one week after activation if it is not filled by the participant's website. STX are returned to the owner (commission is charged for the bet created).",
};

const Row = ({ lobby, userLobbies }: IRowProps) => {
    const { value, username, score, timeLeft, status, isOwner } = lobby;
    const isDraft = status === LOBBY_STATUS.DRAFT;

    const renderButton = () => {
        if (isDraft) {
            const tooltip = () => {
                return (
                    <Typography variant="body2" weight="regular" color={theme.color.whiteAlpha.a60}>
                        {tooltips.play}
                    </Typography>
                );
            };

            const label = () => {
                return (
                    <>
                        Play <Tooltip element={tooltip()} sx={37.8} iconSize={18} left="0.7rem" />
                    </>
                );
            };

            return <Styled.Button secondary label={label()} />;
        }

        if (isOwner) {
            return <Styled.Button secondary label="Check your lobby" />;
        }

        return <Styled.Button secondary label="Join lobby" />;
    };

    const dateRenderer = ({ days = 1, hours, minutes, seconds }: CountdownRenderProps) => {
        return `${days * hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <Styled.Tr isDraft={isDraft}>
            <Styled.Td>
                <Styled.StacksAmount>
                    <Icon name={CURRENCY.STACKS} width="2.4rem" />
                    {truncateWithSeparator(value.toString(), 11, '...', 5)}
                </Styled.StacksAmount>
            </Styled.Td>
            <Styled.Td>
                {!userLobbies && (
                    <Styled.Username>
                        <Styled.UserIconWrapper>
                            <Icon name={ICON.USER} width="1rem" />
                        </Styled.UserIconWrapper>
                        {username?.name}
                    </Styled.Username>
                )}
            </Styled.Td>
            <Styled.Td>
                {score ? <Styled.Score>{score}</Styled.Score> : score}{' '}
                <Styled.MobileLabel>Points to beat</Styled.MobileLabel>
            </Styled.Td>
            <Styled.Td>
                <Countdown date={timeLeft} renderer={dateRenderer} />
                <Styled.MobileLabel>Time left</Styled.MobileLabel>
            </Styled.Td>
            <Styled.Td>{renderButton()}</Styled.Td>
        </Styled.Tr>
    );
};

export const LobbyList = ({ heading, lobbies, userLobbies = false }: ILobbyListProps) => {
    const handleChangeSortBy = ({ value }: IOption) => {
        console.log(value);
    };

    const tooltip = () => {
        return (
            <Typography variant="body2" weight="regular" color={theme.color.whiteAlpha.a60}>
                {tooltips.timeLeft}
            </Typography>
        );
    };

    const TableHeadings = () => {
        if (userLobbies) {
            return (
                <Styled.Tr>
                    <Styled.Th>Value</Styled.Th>
                    <Styled.Th></Styled.Th>
                    <Styled.Th>Score</Styled.Th>
                    <Styled.Th>
                        Time left{' '}
                        <Tooltip element={tooltip()} sx={37.8} iconSize={21} left="0.7rem" />
                    </Styled.Th>
                    <Styled.Th></Styled.Th>
                </Styled.Tr>
            );
        } else {
            return (
                <Styled.Tr>
                    <Styled.Th>Value</Styled.Th>
                    <Styled.Th>Username</Styled.Th>
                    <Styled.Th>Score</Styled.Th>
                    <Styled.Th>
                        Time left{' '}
                        <Tooltip element={tooltip()} sx={37.8} iconSize={21} left="0.7rem" />
                    </Styled.Th>
                    <Styled.Th></Styled.Th>
                </Styled.Tr>
            );
        }
    };

    return (
        <div>
            <Styled.Header>
                <Styled.Heading variant="h2">{heading}</Styled.Heading>
                <Styled.SortBy
                    label="Sort by"
                    options={sortBy}
                    onChangeAction={handleChangeSortBy}
                />
            </Styled.Header>
            <Styled.Table>
                <TableHeadings />
                {lobbies.map((lobby) => (
                    <Row key={lobby.id} lobby={lobby} userLobbies={userLobbies} />
                ))}
            </Styled.Table>
        </div>
    );
};
