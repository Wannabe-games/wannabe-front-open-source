import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { PROGRESS_BAR_TYPES } from '@/components/atoms/ProgressBar/ProgressBar.types';
import { Switch } from '@/components/atoms/Switch';
import { Typography } from '@/components/atoms/Typography';
import { useSetActiveInGame } from '@/hooks/useSetActiveInGame';
import { UserCreatureModel } from '@/models/user-creature.model';
import { ROUTE } from '@/routing/routes.types';
import { CURRENCY } from '@/types/currency';

import * as StyledBase from '../CreatureCard.styles';
import * as Styled from './UserCreatureCard.styles';

// TODO: handle isLoading state

export const UserCreatureCard = ({
    creature,
    isForUser = true,
    as = 'div',
}: {
    creature: UserCreatureModel;
    isForUser?: boolean;
    as?: React.ElementType;
}) => {
    const [pendingButton, setPendingButton] = useState<string>();
    const { handleSetActiveInGame } = useSetActiveInGame(creature.id, creature.isStaked);

    const {
        id,
        buttons,
        badge,
        displayName,
        name,
        type,
        rewardPool,
        performance,
        isActiveInGame,
        isNFT,
        isStaked,
        nftExpirationDate,
        royalties,
    } = creature;
    const { acceleration, boostPower, fuelVolume, speed } = performance;

    return (
        <Styled.CreatureCardContainer
            isNFT={isNFT}
            isStaked={isStaked}
            isForUser={isForUser}
            as={as}
        >
            <>
                <StyledBase.Creature>
                    <StyledBase.NameHeader>
                        <StyledBase.Name>
                            {badge && <Badge $type={badge.type}>{badge.value}</Badge>}
                            <Typography variant="h5" weight="bold">
                                {displayName}
                            </Typography>
                        </StyledBase.Name>
                        {rewardPool && (
                            <Styled.RewardPool>
                                <Typography variant="body2">Pool rewards</Typography>
                                <Icon name={CURRENCY.STACKS} width={44} />
                                <Typography variant="h4">
                                    <>{rewardPool}%</>
                                </Typography>
                            </Styled.RewardPool>
                        )}
                    </StyledBase.NameHeader>
                    {isForUser && !isStaked ? (
                        <Link to={`${ROUTE.CREATURE_PROFILE}/${id}`}>
                            <img
                                src={`/creatures/${type}.png`}
                                alt={name}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = '/creatures/bird.png';
                                }}
                            />
                        </Link>
                    ) : (
                        <img
                            src={`/creatures/${type}.png`}
                            alt={name}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = '/creatures/bird.png';
                            }}
                        />
                    )}
                </StyledBase.Creature>
                <StyledBase.Stats isForUser={isForUser}>
                    <StyledBase.Row>
                        <Styled.Description>
                            {nftExpirationDate && (
                                <>
                                    <dt>Exp. date:</dt>
                                    <dd>{nftExpirationDate}</dd>
                                </>
                            )}
                            {royalties && (
                                <>
                                    <dt>Royalties:</dt>
                                    <dd>
                                        <Typography variant="body2"> {royalties}%</Typography>
                                    </dd>
                                </>
                            )}
                        </Styled.Description>
                        {/* {description?.map((desc: any) => (
                            <>
                                <dt>{desc.label}:</dt>
                                <dd>{desc.value}</dd>
                            </>
                        ))} */}

                        {isForUser && (
                            <div>
                                <Switch
                                    label={isActiveInGame ? 'Active' : 'Inactive'}
                                    checked={isActiveInGame}
                                    disabled={isStaked}
                                    onChange={handleSetActiveInGame}
                                />
                            </div>
                        )}
                    </StyledBase.Row>
                    <StyledBase.Traits>
                        <StyledBase.TwoColumns>
                            <ProgressBar
                                percent={Math.round(speed.percentage)}
                                variant={PROGRESS_BAR_TYPES.FIRST}
                                header={
                                    <StyledBase.Header>
                                        Speed
                                        <Icon name={ICON.SPEED} width="2rem" />
                                    </StyledBase.Header>
                                }
                            />
                            <ProgressBar
                                percent={acceleration.percentage}
                                variant={PROGRESS_BAR_TYPES.FIRST}
                                header={
                                    <StyledBase.Header>
                                        Acceleration
                                        <Icon name={ICON.ACCELERATION} width="2rem" />
                                    </StyledBase.Header>
                                }
                            />
                        </StyledBase.TwoColumns>
                        <StyledBase.TwoColumns>
                            <ProgressBar
                                percent={boostPower.percentage}
                                variant={PROGRESS_BAR_TYPES.FIRST}
                                header={
                                    <StyledBase.Header>
                                        Boost power
                                        <Icon name={ICON.BOOST_POWER} width="1.8rem" />
                                    </StyledBase.Header>
                                }
                            />
                            <ProgressBar
                                percent={fuelVolume.percentage}
                                variant={PROGRESS_BAR_TYPES.FIRST}
                                header={
                                    <StyledBase.Header>
                                        Fuel volume
                                        <Icon name={ICON.FUEL_VOLUME} width="1.4rem" />
                                    </StyledBase.Header>
                                }
                            />
                        </StyledBase.TwoColumns>
                    </StyledBase.Traits>
                    {isForUser && (
                        <StyledBase.ActionBar>
                            {buttons.map(
                                ({ label, primary, secondary, tertiary, action, route, stake }) => (
                                    <Button
                                        key={label}
                                        label={label}
                                        disabled={pendingButton === label}
                                        primary={primary}
                                        secondary={secondary}
                                        tertiary={tertiary}
                                        stake={stake}
                                        route={route}
                                        onClick={() => {
                                            action?.(setPendingButton);
                                        }}
                                    />
                                ),
                            )}
                        </StyledBase.ActionBar>
                    )}
                </StyledBase.Stats>
            </>
        </Styled.CreatureCardContainer>
    );
};
