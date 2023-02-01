import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Scroll from 'react-scroll';

import bellySrc from '@/assets/trait-icons/belly.png';
import heartSrc from '@/assets/trait-icons/heart.png';
import lungsSrc from '@/assets/trait-icons/lungs.png';
import musclesSrc from '@/assets/trait-icons/muscles.png';
import rocketSrc from '@/assets/trait-icons/rocket.png';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { PROGRESS_BAR_TYPES } from '@/components/atoms/ProgressBar/ProgressBar.types';
import { Switch } from '@/components/atoms/Switch';
import { Tooltip } from '@/components/atoms/Tooltip';
import { Typography } from '@/components/atoms/Typography';
import { UserCreatureCard } from '@/components/molecules/CreatureCard/UserCreatureCard';
import { DownloadAvatar } from '@/components/molecules/DownloadAvatar';
import { FilteringSection } from '@/components/molecules/FilteringSection';
import { ShortsSection } from '@/components/organisms/ShortsSection';
import { useSetActiveInGame } from '@/hooks/useSetActiveInGame';
import { ROUTE } from '@/routing/routes.types';
import { theme } from '@/theme/mainTheme';

import { MintCap } from './components/MintCap';
import * as Styled from './CreatureProfile.styles';
import { ICreatureProfile } from './CreatureProfile.types';

// TODO: handle isLoading state

export const CreatureProfileRaw = ({
    creature,
    allCreatures,
    filters,
    selectedFilter,
    handleFilterChange,
}: ICreatureProfile) => {
    const navigate = useNavigate();
    const [pendingButton, setPendingButton] = useState<string>();
    const { handleSetActiveInGame } = useSetActiveInGame(creature.id);

    useEffect(() => {
        Scroll.scroller.scrollTo('upgradeCreatureSection', {});
    }, []);

    const {
        id,
        badge,
        displayName,
        displayNameOrType,
        nftExpirationDate,
        isActiveInGame,
        isNFT,
        name,
        onStakeAction,
        type,
        performance,
        bodyParts,
        royalties,
    } = creature;
    const { fuel, boost, heart, lungs, muscles } = bodyParts;
    const { acceleration, speed, fuelVolume, boostPower } = performance;

    // const handleMintAsNew = async () => {
    //     //TODO:
    //     setPendingButton('mint');
    //     await onMintAsNewAction();
    //     setPendingButton(undefined);
    // };

    return (
        <Styled.CreatureProfile>
            <ShortsSection />
            <Scroll.Element name="upgradeCreatureSection">
                <Styled.FullWidthContainer>
                    <Styled.CreatureDetails>
                        <Styled.LeftContainer>
                            <Styled.CreatureImage src={`/creatures/${type}.png`} alt="Creature" />
                            <Styled.ActiveSwitch>
                                <Typography variant="body1">
                                    Set {displayNameOrType} as{' '}
                                    {isActiveInGame ? 'inactive' : 'active'}
                                </Typography>
                                <Switch checked={isActiveInGame} onChange={handleSetActiveInGame} />
                            </Styled.ActiveSwitch>
                            <DownloadAvatar type={type} />
                        </Styled.LeftContainer>
                        <Styled.RightContainer>
                            {badge && <Badge $type={badge.type}>{badge.value}</Badge>}
                            <Typography variant="h2" weight="bold">
                                {displayName}

                                {!isNFT && (
                                    <Tooltip
                                        element={
                                            <Typography
                                                variant="body2"
                                                weight="regular"
                                                color={theme.color.whiteAlpha.a60}
                                            >
                                                In order to name your Creature, you have to mint it!
                                            </Typography>
                                        }
                                        iconSize={21}
                                        sx={18.7}
                                        top="-0.8rem"
                                    />
                                )}
                            </Typography>
                            <Typography variant="h6" color="#F6C944">
                                {name}
                            </Typography>
                            <Styled.DescriptionList>
                                {nftExpirationDate && (
                                    <Styled.Description>
                                        <Typography variant="body2" color="#ffffff90">
                                            Exp. date:
                                        </Typography>
                                        <Typography variant="body2">
                                            {' '}
                                            {nftExpirationDate}
                                        </Typography>
                                    </Styled.Description>
                                )}
                                {royalties && (
                                    <dd>
                                        <Typography variant="body2" color="#ffffff90">
                                            Royalties:
                                        </Typography>
                                        <Typography variant="body2"> {royalties}%</Typography>
                                    </dd>
                                )}
                            </Styled.DescriptionList>
                            {isNFT && (
                                <Styled.ButtonContainer>
                                    <Button
                                        label="Stake"
                                        primary
                                        disabled={!!pendingButton}
                                        onClick={() => {
                                            onStakeAction(setPendingButton);
                                        }}
                                    />
                                </Styled.ButtonContainer>
                            )}
                            <Styled.Divider />
                            <Typography variant="h4" weight="bold">
                                Body parts
                                <Tooltip
                                    element={
                                        <Typography
                                            variant="body2"
                                            weight="regular"
                                            color={theme.color.whiteAlpha.a60}
                                        >
                                            Bear in mind, that your creature body parts has an
                                            impact on the performance. Pimp your creature!
                                        </Typography>
                                    }
                                    iconSize={21}
                                    sx={18.7}
                                    left="0.5rem"
                                />
                            </Typography>
                            <Styled.BodyPartsStatistics>
                                <ProgressBar
                                    percent={(muscles.level + 1) * 20}
                                    variant={PROGRESS_BAR_TYPES.PURPLE}
                                    barHeight="1rem"
                                    header={
                                        <Styled.ProgressBarHeader>
                                            Muscles
                                            <img alt="" src={musclesSrc} />
                                        </Styled.ProgressBarHeader>
                                    }
                                />
                                <ProgressBar
                                    percent={(heart.level + 1) * 20}
                                    variant={PROGRESS_BAR_TYPES.PURPLE}
                                    barHeight="1rem"
                                    header={
                                        <Styled.ProgressBarHeader>
                                            Heart
                                            <img alt="" src={heartSrc} />
                                        </Styled.ProgressBarHeader>
                                    }
                                />
                                <ProgressBar
                                    percent={(boost.level + 1) * 20}
                                    variant={PROGRESS_BAR_TYPES.PURPLE}
                                    barHeight="1rem"
                                    header={
                                        <Styled.ProgressBarHeader>
                                            Boost power
                                            <img alt="" src={rocketSrc} />
                                        </Styled.ProgressBarHeader>
                                    }
                                />
                                <ProgressBar
                                    percent={(lungs.level + 1) * 20}
                                    variant={PROGRESS_BAR_TYPES.PURPLE}
                                    barHeight="1rem"
                                    header={
                                        <Styled.ProgressBarHeader>
                                            Lungs
                                            <img alt="" src={lungsSrc} />
                                        </Styled.ProgressBarHeader>
                                    }
                                />
                                <ProgressBar
                                    percent={(fuel.level + 1) * 20}
                                    variant={PROGRESS_BAR_TYPES.PURPLE}
                                    barHeight="1rem"
                                    header={
                                        <Styled.ProgressBarHeader>
                                            Fuel
                                            <img alt="" src={bellySrc} />
                                        </Styled.ProgressBarHeader>
                                    }
                                />
                            </Styled.BodyPartsStatistics>
                            <Styled.Performance>
                                <Typography variant="h4" weight="bold">
                                    Performance
                                </Typography>
                                <div></div>
                                <ProgressBar
                                    percent={(speed.value / speed.max) * 100}
                                    barHeight="1rem"
                                    header={
                                        <Styled.ProgressBarHeader>
                                            Speed
                                            <Icon name={ICON.SPEED} width={24} />
                                        </Styled.ProgressBarHeader>
                                    }
                                />
                                <ProgressBar
                                    percent={(acceleration.value / acceleration.max) * 100}
                                    barHeight="1rem"
                                    header={
                                        <Styled.ProgressBarHeader>
                                            Acceleration
                                            <Icon name={ICON.ACCELERATION} width={24} />
                                        </Styled.ProgressBarHeader>
                                    }
                                />
                                <ProgressBar
                                    percent={(fuelVolume.value / fuelVolume.max) * 100}
                                    barHeight="1rem"
                                    header={
                                        <Styled.ProgressBarHeader>
                                            Boost power
                                            <Icon name={ICON.BOOST_POWER} width={24} />
                                        </Styled.ProgressBarHeader>
                                    }
                                />
                                <ProgressBar
                                    percent={(boostPower.value / boostPower.max) * 100}
                                    barHeight="1rem"
                                    header={
                                        <Styled.ProgressBarHeader>
                                            Fuel volume
                                            <Icon name={ICON.FUEL} width={24} />
                                        </Styled.ProgressBarHeader>
                                    }
                                />
                            </Styled.Performance>
                            <Styled.ButtonContainer>
                                <Button
                                    label="Upgrade"
                                    secondary
                                    onClick={() => {
                                        navigate(`${ROUTE.UPGRADE_CREATURE}/${id}`);
                                    }}
                                />
                            </Styled.ButtonContainer>
                            <Styled.Divider />
                            {isNFT && <MintCap />}
                            {/* <Styled.ButtonContainer>
                                <Button
                                    label="Mint as new"
                                    secondary
                                    disabled={pendingButton === 'mint'}
                                    onClick={() => ({})}
                                />
                            </Styled.ButtonContainer> */}
                        </Styled.RightContainer>
                    </Styled.CreatureDetails>

                    <Styled.OtherCreaturesContainer>
                        <Styled.CreatureListHeader>
                            <Typography variant="h4" weight="bold">
                                Your creatures
                            </Typography>
                            <FilteringSection
                                filters={filters}
                                selectedFilter={selectedFilter}
                                handleFilterChange={handleFilterChange}
                            />
                        </Styled.CreatureListHeader>
                        <Styled.CreaturesList>
                            {allCreatures.slice(0, 3).map((creature) => (
                                <UserCreatureCard key={creature.id} creature={creature} as="li" />
                            ))}
                            {/* <Styled.MoreCreaturesButton
                                secondary
                                label="More Creatures! More...!"
                                onClick={() => console.log('click')}
                            /> */}
                        </Styled.CreaturesList>
                    </Styled.OtherCreaturesContainer>
                </Styled.FullWidthContainer>
            </Scroll.Element>
        </Styled.CreatureProfile>
    );
};

export const CreatureProfile = React.memo(CreatureProfileRaw);
