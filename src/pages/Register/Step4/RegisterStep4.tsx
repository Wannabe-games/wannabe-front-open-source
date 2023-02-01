// TODO: Refactor

import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ReactComponent as Discord } from '@/assets/social-icons/discord.svg';
import { ReactComponent as Facebook } from '@/assets/social-icons/facebook.svg';
import { ReactComponent as Instagram } from '@/assets/social-icons/instagram.svg';
import { ReactComponent as Telegram } from '@/assets/social-icons/telegram.svg';
import bellyw56Src from '@/assets/trait-icons/belly-w56.png';
import heartw56Src from '@/assets/trait-icons/heart-w56.png';
import lungsw56Src from '@/assets/trait-icons/lungs-w56.png';
import musclesw56Src from '@/assets/trait-icons/muscles-w56.png';
import rocketw56Src from '@/assets/trait-icons/rocket-w56.png';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { Typography } from '@/components/atoms/Typography';
import { SocialMediaAvatar } from '@/components/molecules/SocialMediaAvatar';
import { WizzPanel } from '@/components/molecules/WizzPanel';
import { useGetCreatureDetails } from '@/hooks/useGetCreatureDetails';
import { IStep4LocationState } from '@/interfaces/LocationState';
import { UPGRADE_TYPE } from '@/pages/UpgradeCreature/UpgradeCreature.types';
import { ROUTE } from '@/routing/routes.types';
import { useUsdPerStacksQuery } from '@/store/services/coingecko.service';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import * as Styled from './RegisterStep4.styles';

const socialMediaList = [
    { name: 'Discord', url: 'https://discord.com', icon: Discord },
    { name: 'Telegram', url: 'https://telegram.org', icon: Telegram },
    { name: 'Instagram', url: 'https://instagram.com', icon: Instagram },
    { name: 'Facebook', url: 'https://facebook.com', icon: Facebook },
];

const bodyPartLabels = {
    fuel: 'Fuel',
    heart: 'Heart',
    boost: 'Boost power',
    muscles: 'Muscles',
    lungs: 'Lungs',
};

export const RegisterPageStep4 = () => {
    const [pendingButton, setPendingButton] = useState<string>();
    const [upgradeType, setUpgradeType] = useState<UPGRADE_TYPE>();
    const location = useLocation();
    const state = location.state as IStep4LocationState;
    const prevPath = state?.from;
    const creatureId = state?.creatureId || '';
    const stacksToUSD = useUsdPerStacksQuery(null);
    const exchangeRate = stacksToUSD?.data ? stacksToUSD.data : 0;

    const {
        creature,
        isFetching: isFetchingCreature,
        error: creatureError,
    } = useGetCreatureDetails(creatureId);

    if (prevPath !== ROUTE.REGISTER_STEP3) {
        return <Navigate to={ROUTE.DASHBOARD} replace state={{ from: location }} />;
    }

    if (!creature || creatureError) {
        if (!isFetchingCreature) {
            return <Navigate to={ROUTE.NOT_FOUND} replace />;
        }

        return null;
    }

    const { name, type, bodyParts, performance, onUpgradeAction, bodyPartStacksPrice } = creature;
    creature.redirectToStep5();
    const { fuel, boost, heart, lungs, muscles } = bodyParts;
    const { acceleration, speed, fuelVolume, boostPower } = performance;

    const nf = new Intl.NumberFormat('de-DE');

    const handleSetActiveUpgrade = (type: UPGRADE_TYPE) => () => {
        setUpgradeType(type);
    };

    return (
        <Styled.Container>
            <WizzPanel steps={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']} activeStep={4} />
            <Styled.RegisterPageStep4>
                <Typography variant="h1" weight="bold" color="#F6C944">
                    Step 4
                </Typography>
                <Typography variant="h1" weight="bold">
                    Upgrade your Creature
                </Typography>
                <Typography variant="h3">pimp your first Creature and Play to Earn!</Typography>
                <Styled.ButtonsWrapper>
                    <Button
                        primary
                        label="Skip"
                        replace
                        route={ROUTE.REGISTER_STEP5}
                        state={{ from: ROUTE.REGISTER_STEP4 }}
                    />
                </Styled.ButtonsWrapper>
            </Styled.RegisterPageStep4>
            <Styled.FullWidthContainer>
                <Styled.CreatureDetails>
                    <Styled.LeftContainer>
                        <Styled.CreatureImage src={`/creatures/${type}.png`} alt="Creature" />
                        <SocialMediaAvatar socialMediaList={socialMediaList} action={'Get'} />
                        <Styled.NFTInfo variant="body2" color={theme.color.whiteAlpha.a40}>
                            When you upgrade your Creature NFT you have to mint it as new NFT to
                            Stake it.
                        </Styled.NFTInfo>
                    </Styled.LeftContainer>
                    <Styled.RightContainer>
                        <Typography variant="h2" weight="bold">
                            {name}
                        </Typography>
                        <Typography variant="h6" color="#F6C944">
                            {name}
                        </Typography>

                        <Styled.BodyPartTitle variant="h4" weight="bold">
                            Body parts
                        </Styled.BodyPartTitle>
                        <Styled.BodyPartsStatistics>
                            <Styled.BodyPartProgressBar
                                percent={(muscles.level + 1) * 20}
                                header={
                                    <Styled.ProgressBarHeader>
                                        Muscles
                                        <Icon
                                            name={ICON.TRAIT_MUSCLES}
                                            width={27.43}
                                            height={22.29}
                                        />
                                    </Styled.ProgressBarHeader>
                                }
                            />
                            <Styled.BodyPartProgressBar
                                percent={(heart.level + 1) * 20}
                                header={
                                    <Styled.ProgressBarHeader>
                                        Heart
                                        <Icon
                                            name={ICON.TRAIT_HEART}
                                            width={21.14}
                                            height={22.86}
                                        />
                                    </Styled.ProgressBarHeader>
                                }
                            />
                            <Styled.BodyPartProgressBar
                                percent={(boost.level + 1) * 20}
                                header={
                                    <Styled.ProgressBarHeader>
                                        Boost power
                                        <Icon
                                            name={ICON.UPGRADE_BOOST_POWER}
                                            width={31.43}
                                            height={27.14}
                                        />
                                    </Styled.ProgressBarHeader>
                                }
                            />
                            <Styled.BodyPartProgressBar
                                percent={(lungs.level + 1) * 20}
                                header={
                                    <Styled.ProgressBarHeader>
                                        Lungs
                                        <Icon
                                            name={ICON.TRAIT_LUNGS}
                                            width={29.71}
                                            height={21.14}
                                        />
                                    </Styled.ProgressBarHeader>
                                }
                            />
                            <Styled.BodyPartProgressBar
                                percent={(fuel.level + 1) * 20}
                                header={
                                    <Styled.ProgressBarHeader>
                                        Fuel
                                        <Icon
                                            name={ICON.TRAIT_BELLY}
                                            width={26.29}
                                            height={21.14}
                                        />
                                    </Styled.ProgressBarHeader>
                                }
                            />
                        </Styled.BodyPartsStatistics>
                        <Styled.UpgradeSection>
                            <Styled.Performance>
                                <Typography variant="h4" weight="bold">
                                    Performance
                                </Typography>
                                <ProgressBar
                                    percent={(speed.value / speed.max) * 100}
                                    upgrade={
                                        upgradeType
                                            ? ((speed.value +
                                                  bodyParts[upgradeType].next.upgradeChanges[
                                                      'speed'
                                                  ]) /
                                                  speed.max) *
                                              100
                                            : 0
                                    }
                                    header={
                                        <Styled.ProgressBarHeader>
                                            Speed
                                            <Icon name={ICON.SPEED} width={24} />
                                        </Styled.ProgressBarHeader>
                                    }
                                />
                                <ProgressBar
                                    percent={(acceleration.value / acceleration.max) * 100}
                                    upgrade={
                                        upgradeType
                                            ? ((speed.value +
                                                  bodyParts[upgradeType].next.upgradeChanges[
                                                      'acceleration'
                                                  ]) /
                                                  speed.max) *
                                              100
                                            : 0
                                    }
                                    header={
                                        <Styled.ProgressBarHeader>
                                            Acceleration
                                            <Icon name={ICON.ACCELERATION} width={24} />
                                        </Styled.ProgressBarHeader>
                                    }
                                />
                                <ProgressBar
                                    percent={(fuelVolume.value / fuelVolume.max) * 100}
                                    upgrade={
                                        upgradeType
                                            ? ((speed.value +
                                                  bodyParts[upgradeType].next.upgradeChanges[
                                                      'boost_power'
                                                  ]) /
                                                  speed.max) *
                                              100
                                            : 0
                                    }
                                    header={
                                        <Styled.ProgressBarHeader>
                                            Boost power
                                            <Icon name={ICON.BOOST_POWER} width={24} />
                                        </Styled.ProgressBarHeader>
                                    }
                                />
                                <ProgressBar
                                    percent={(boostPower.value / boostPower.max) * 100}
                                    upgrade={
                                        upgradeType
                                            ? ((speed.value +
                                                  bodyParts[upgradeType].next.upgradeChanges[
                                                      'boost_time'
                                                  ]) /
                                                  speed.max) *
                                              100
                                            : 0
                                    }
                                    header={
                                        <Styled.ProgressBarHeader>
                                            Fuel volume
                                            <Icon name={ICON.FUEL} width={24} />
                                        </Styled.ProgressBarHeader>
                                    }
                                />
                            </Styled.Performance>
                            <Styled.UpgradeType>
                                <Typography variant="h4" weight="bold">
                                    Choose upgrade type
                                </Typography>
                                <Styled.UpgradeButtons>
                                    <Styled.IconButton
                                        onClick={handleSetActiveUpgrade(UPGRADE_TYPE.FUEL)}
                                        active={upgradeType === UPGRADE_TYPE.FUEL}
                                    >
                                        <img alt="" src={bellyw56Src} />
                                    </Styled.IconButton>
                                    <Styled.IconButton
                                        onClick={handleSetActiveUpgrade(UPGRADE_TYPE.LUNGS)}
                                        active={upgradeType === UPGRADE_TYPE.LUNGS}
                                    >
                                        <img alt="" src={lungsw56Src} />
                                    </Styled.IconButton>
                                    <Styled.IconButton
                                        onClick={handleSetActiveUpgrade(UPGRADE_TYPE.BOOST)}
                                        active={upgradeType === UPGRADE_TYPE.BOOST}
                                    >
                                        <img alt="" src={rocketw56Src} />
                                    </Styled.IconButton>
                                    <Styled.IconButton
                                        onClick={handleSetActiveUpgrade(UPGRADE_TYPE.HEARTH)}
                                        active={upgradeType === UPGRADE_TYPE.HEARTH}
                                    >
                                        <img alt="" src={heartw56Src} />
                                    </Styled.IconButton>
                                    <Styled.IconButton
                                        onClick={handleSetActiveUpgrade(UPGRADE_TYPE.MUSCLES)}
                                        active={upgradeType === UPGRADE_TYPE.MUSCLES}
                                    >
                                        <img alt="" src={musclesw56Src} />
                                    </Styled.IconButton>
                                </Styled.UpgradeButtons>
                                <Styled.Price>
                                    {upgradeType ? (
                                        <>
                                            <Typography variant="h5">Selected:</Typography>
                                            <Typography variant="h4" weight="bold">
                                                {bodyPartLabels[upgradeType]}
                                            </Typography>
                                            <span>
                                                <Typography variant="h4">~</Typography>{' '}
                                                <Typography variant="h4" color={theme.color.yellow}>
                                                    {nf
                                                        .format(
                                                            bodyPartStacksPrice.apply(creature, [
                                                                upgradeType,
                                                            ]) * exchangeRate,
                                                        )
                                                        .replace('.', ' ')}
                                                </Typography>{' '}
                                                <Icon name={CURRENCY.TETHER} width="2.4rem" />{' '}
                                                <Typography variant="h4">/</Typography>{' '}
                                                <Typography variant="h4" color={theme.color.yellow}>
                                                    {nf
                                                        .format(
                                                            bodyPartStacksPrice.apply(creature, [
                                                                upgradeType,
                                                            ]),
                                                        )
                                                        .replace('.', ' ')}
                                                </Typography>{' '}
                                                <Icon name={CURRENCY.STACKS} width="2.4rem" />
                                                <Typography variant="body1" weight="bold">
                                                    + {bodyParts[upgradeType].next.priceGold}
                                                </Typography>
                                                <Icon name={ICON.GOLD_COIN} width="2.4rem" />
                                            </span>
                                            <Styled.UpgradeButton
                                                primary
                                                label="Upgrade"
                                                disabled={!!pendingButton}
                                                onClick={() => {
                                                    onUpgradeAction(upgradeType, setPendingButton);
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <Styled.UpgradeText
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.8rem',
                                                alignItems: 'flex-end',
                                            }}
                                        >
                                            <Typography
                                                variant="h3"
                                                weight="bold"
                                                color={theme.color.whiteAlpha.a60}
                                            >
                                                Choose your creature upgrade
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color={theme.color.whiteAlpha.a60}
                                            >
                                                Improve your stature, increase the muscle volume,
                                                slow down your heart rate and strive for the most
                                                powerful version of your creature.
                                            </Typography>
                                        </Styled.UpgradeText>
                                    )}
                                </Styled.Price>
                            </Styled.UpgradeType>
                        </Styled.UpgradeSection>
                    </Styled.RightContainer>
                </Styled.CreatureDetails>
            </Styled.FullWidthContainer>
        </Styled.Container>
    );
};
