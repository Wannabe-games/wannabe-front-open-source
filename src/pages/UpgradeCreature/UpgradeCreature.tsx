// TODO: Refactor

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import creatureTeamSrc from '@/assets/img/shorts/rhino.png';
import { ReactComponent as Discord } from '@/assets/social-icons/discord.svg';
import { ReactComponent as Facebook } from '@/assets/social-icons/facebook.svg';
import { ReactComponent as Instagram } from '@/assets/social-icons/instagram.svg';
import { ReactComponent as Telegram } from '@/assets/social-icons/telegram.svg';
import bellyw56Src from '@/assets/trait-icons/belly-w56.png';
import heartw56Src from '@/assets/trait-icons/heart-w56.png';
import lungsw56Src from '@/assets/trait-icons/lungs-w56.png';
import musclesw56Src from '@/assets/trait-icons/muscles-w56.png';
import rocketw56Src from '@/assets/trait-icons/rocket-w56.png';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { Switch } from '@/components/atoms/Switch';
import { Tooltip } from '@/components/atoms/Tooltip';
import { Typography } from '@/components/atoms/Typography';
import { Headers } from '@/components/molecules/Headers';
import { STAT_TYPES } from '@/components/molecules/Headers/Headers.types';
import { SocialMediaAvatar } from '@/components/molecules/SocialMediaAvatar';
import { microStxToStx } from '@/helpers/stacks/micro-stx-to-stx';
import { useGetCreatureDetails } from '@/hooks/useGetCreatureDetails';
import { useSetActiveInGame } from '@/hooks/useSetActiveInGame';
import { HeaderStatisticsOut } from '@/interfaces/contract/HeaderStatisticsOut';
import { ROUTE } from '@/routing/routes.types';
import { useUsdPerStacksQuery } from '@/store/services/coingecko.service';
import { useGetUserStatisticQuery } from '@/store/services/creatureRacer.service';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import * as Styled from './UpgradeCreature.styles';
import { UPGRADE_TYPE } from './UpgradeCreature.types';

//TODO:
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

export const UpgradeCreature = () => {
    const [pendingButton, setPendingButton] = useState<string>();
    const [upgradeType, setUpgradeType] = useState<UPGRADE_TYPE>();
    const [headerStatistics, setHeaderStatistics] = useState<HeaderStatisticsOut>({
        expiresSoon: 0,
        mintedInTotal: 0,
        myPoolShare: '0',
        readyToUpgrade: 0,
        referralLevel: null,
        rewardPool: 0,
        totalPoolShare: '0',
        totalStaked: 0,
    });
    const { id } = useParams<{ id: string }>();
    const { creature, error: creatureError } = useGetCreatureDetails(id);
    const { data: statistics } = useGetUserStatisticQuery(null);
    const stacksToUSD = useUsdPerStacksQuery(null);

    const exchangeRate = stacksToUSD?.data ? stacksToUSD.data : 0;

    useEffect(() => {
        statistics && setHeaderStatistics(statistics);
    }, [statistics]);

    const rewardPool =
        headerStatistics?.rewardPool && Math.round(microStxToStx(headerStatistics?.rewardPool));

    const { handleSetActiveInGame } = useSetActiveInGame(id);

    if (!creature || creatureError) {
        return <>Creature does not exist</>;
    }
    const {
        badge,
        bodyPartStacksPrice,
        bodyParts,
        displayName,
        isActiveInGame,
        name,
        nftExpirationDate,
        onUpgradeAction,
        performance,
        royalties,
        type,
    } = creature;
    const { fuel, boost, heart, lungs, muscles } = bodyParts;
    const { acceleration, speed, fuelVolume, boostPower } = performance;
    const nf = new Intl.NumberFormat('de-DE');

    const handleSetActiveUpgrade = (type: UPGRADE_TYPE) => () => {
        setUpgradeType(type);
    };

    const checkDate = (date: string | null) => {
        if (date) {
            const currentTime = new Date().getTime();
            const endTime = new Date(date).getTime();
            return endTime - currentTime > 0 ? true : false;
        }
        return false;
    };

    const calculateCooldownTime = (time: string | null) => {
        if (time) {
            const currentTime = new Date().getTime();
            const endTime = new Date(time).getTime();

            const diff = (endTime - currentTime) / 1000;
            if (diff < 0) return null;
            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff - hours * 3600) / 60);
            const seconds = diff - hours * 3600 - minutes * 60;

            return hours + 'h ' + minutes + 'm ' + Math.round(seconds) + 's';
        }
    };

    return (
        <Styled.UpgradeCreature>
            <Headers
                stats={[
                    {
                        label: 'Ready to upgrade',
                        value: `${headerStatistics?.readyToUpgrade}`,
                        type: STAT_TYPES.VALUE,
                    },
                    {
                        label: 'Expires soon',
                        value: `${headerStatistics?.expiresSoon}`,
                        type: STAT_TYPES.VALUE,
                    },
                    {
                        label: 'Pool share',
                        value: `${headerStatistics?.myPoolShare} %`,
                        type: STAT_TYPES.VALUE,
                    },
                    {
                        label: (
                            <>
                                USD Tether{' '}
                                <Icon
                                    name={ICON.EXCHANGE}
                                    width="1.6rem"
                                    fill={theme.color.whiteAlpha.a60}
                                />{' '}
                                Stacks
                            </>
                        ),
                        stacks: {
                            value: rewardPool ? Number((rewardPool * exchangeRate).toFixed(2)) : 0,
                            currency: CURRENCY.TETHER,
                        },
                        tether: {
                            value: rewardPool ? rewardPool : 0,
                            currency: CURRENCY.STACKS,
                        },
                        type: STAT_TYPES.MONEY,
                    },
                ]}
                rightImage={creatureTeamSrc}
                title="Upgrade or buy new"
            />
            <Styled.FullWidthContainer>
                <Styled.CreatureDetails>
                    <Styled.LeftContainer>
                        <Link to={ROUTE.UPGRADE_BUY_CREATURES}>
                            <Typography variant="body1" color={theme.color.yellow}>
                                <Styled.CenterHorizontally>
                                    <Styled.BackArrowIcon
                                        name={ICON.ARROW_LEFT}
                                        fill={theme.color.yellow}
                                    />
                                    back to all
                                </Styled.CenterHorizontally>
                            </Typography>
                        </Link>
                        <Styled.CreatureImage src={`/creatures/${type}.png`} alt="Creature" />
                        <Styled.ActiveSwitch>
                            <Typography variant="body1">
                                Set {name} as {isActiveInGame ? 'inactive' : 'active'}
                            </Typography>
                            <Switch checked={isActiveInGame} onChange={handleSetActiveInGame} />
                        </Styled.ActiveSwitch>
                        <SocialMediaAvatar socialMediaList={socialMediaList} action={'Get'} />
                    </Styled.LeftContainer>
                    <Styled.RightContainer>
                        {badge && <Badge $type={badge.type}>{badge.value}</Badge>}
                        <Typography variant="h2">{displayName}</Typography>
                        <Typography variant="h6" color="#F6C944">
                            {name}
                        </Typography>
                        <Styled.DescriptionList>
                            {nftExpirationDate && (
                                <Styled.Description>
                                    <Typography variant="body2" color="#ffffff90">
                                        Exp. date:
                                    </Typography>
                                    <Typography variant="body2"> {nftExpirationDate}</Typography>
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
                            <Styled.Divider />
                            <Styled.BodyPartTitle variant="h4" weight="bold">
                                Body parts{' '}
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
                                    iconSize={24}
                                    sx={18.7}
                                />
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
                                            {checkDate(fuel.upgradeDateEnd) && (
                                                <Styled.CooldownIcon name={ICON.TIMER} size={24} />
                                            )}
                                            <img alt="" src={bellyw56Src} />
                                        </Styled.IconButton>
                                        <Styled.IconButton
                                            onClick={handleSetActiveUpgrade(UPGRADE_TYPE.LUNGS)}
                                            active={upgradeType === UPGRADE_TYPE.LUNGS}
                                        >
                                            {checkDate(lungs.upgradeDateEnd) && (
                                                <Styled.CooldownIcon name={ICON.TIMER} size={24} />
                                            )}
                                            <img alt="" src={lungsw56Src} />
                                        </Styled.IconButton>
                                        <Styled.IconButton
                                            onClick={handleSetActiveUpgrade(UPGRADE_TYPE.BOOST)}
                                            active={upgradeType === UPGRADE_TYPE.BOOST}
                                        >
                                            {checkDate(boost.upgradeDateEnd) && (
                                                <Styled.CooldownIcon name={ICON.TIMER} size={24} />
                                            )}
                                            <img alt="" src={rocketw56Src} />
                                        </Styled.IconButton>
                                        <Styled.IconButton
                                            onClick={handleSetActiveUpgrade(UPGRADE_TYPE.MUSCLES)}
                                            active={upgradeType === UPGRADE_TYPE.MUSCLES}
                                        >
                                            {checkDate(muscles.upgradeDateEnd) && (
                                                <Styled.CooldownIcon name={ICON.TIMER} size={24} />
                                            )}
                                            <img alt="" src={musclesw56Src} />
                                        </Styled.IconButton>
                                        <Styled.IconButton
                                            onClick={handleSetActiveUpgrade(UPGRADE_TYPE.HEARTH)}
                                            active={upgradeType === UPGRADE_TYPE.HEARTH}
                                        >
                                            {checkDate(heart.upgradeDateEnd) && (
                                                <Styled.CooldownIcon name={ICON.TIMER} size={24} />
                                            )}
                                            <img alt="" src={heartw56Src} />
                                        </Styled.IconButton>
                                    </Styled.UpgradeButtons>
                                    <Styled.Price>
                                        {upgradeType &&
                                        !calculateCooldownTime(
                                            bodyParts[upgradeType].upgradeDateEnd,
                                        ) ? (
                                            <>
                                                <Typography variant="h5">Selected:</Typography>
                                                <Typography variant="h4" weight="bold">
                                                    {bodyPartLabels[upgradeType]}
                                                </Typography>
                                                <span>
                                                    <Typography variant="h4">~</Typography>{' '}
                                                    <Typography
                                                        variant="h4"
                                                        color={theme.color.yellow}
                                                    >
                                                        {nf
                                                            .format(
                                                                bodyPartStacksPrice.apply(
                                                                    creature,
                                                                    [upgradeType],
                                                                ) * exchangeRate,
                                                            )
                                                            .replace('.', ' ')}
                                                    </Typography>{' '}
                                                    <Icon name={CURRENCY.TETHER} width="2.4rem" />{' '}
                                                    <Typography variant="h4">/</Typography>{' '}
                                                    <Typography
                                                        variant="h4"
                                                        color={theme.color.yellow}
                                                    >
                                                        {nf
                                                            .format(
                                                                bodyPartStacksPrice.apply(
                                                                    creature,
                                                                    [upgradeType],
                                                                ),
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
                                                        onUpgradeAction(
                                                            upgradeType,
                                                            setPendingButton,
                                                        );
                                                    }}
                                                />
                                            </>
                                        ) : upgradeType && bodyParts[upgradeType].upgradeDateEnd ? (
                                            <Styled.Cooldown>
                                                <Typography
                                                    variant="h5"
                                                    color={theme.color.whiteAlpha.a60}
                                                    weight="bold"
                                                >
                                                    Upsss...{' '}
                                                    <Typography
                                                        variant="h5"
                                                        color={theme.color.white}
                                                    >
                                                        Muscles
                                                    </Typography>{' '}
                                                    are on a cooldown
                                                </Typography>
                                                <Styled.CooldownTime
                                                    variant="h3"
                                                    color={theme.color.whiteAlpha.a60}
                                                    weight="bold"
                                                >
                                                    5h 46m 32s
                                                    {calculateCooldownTime(
                                                        bodyParts[upgradeType].upgradeDateEnd,
                                                    )}
                                                </Styled.CooldownTime>
                                                <span>
                                                    <Typography variant="h5">Don`t wait</Typography>
                                                    <Typography variant="h4">~</Typography>{' '}
                                                    <Typography
                                                        variant="h4"
                                                        color={theme.color.yellow}
                                                    >
                                                        {nf
                                                            .format(
                                                                bodyParts[upgradeType].next
                                                                    .priceStacks * exchangeRate,
                                                            )
                                                            .replace('.', ' ')}
                                                    </Typography>{' '}
                                                    <Icon name={CURRENCY.TETHER} width="2.4rem" />{' '}
                                                    <Typography variant="h4">/</Typography>{' '}
                                                    <Typography
                                                        variant="h4"
                                                        color={theme.color.yellow}
                                                    >
                                                        {nf
                                                            .format(
                                                                bodyParts[upgradeType].next
                                                                    .priceStacks,
                                                            )
                                                            .replace('.', ' ')}
                                                    </Typography>{' '}
                                                    <Icon name={CURRENCY.STACKS} width="2.4rem" />
                                                    <Styled.UpgradeButton
                                                        primary
                                                        label="Skip to upgrade"
                                                        onClick={() => {
                                                            console.log('Skip to upgrade');
                                                        }}
                                                    />
                                                </span>
                                                <Typography
                                                    variant="h6"
                                                    color={theme.color.whiteAlpha.a60}
                                                >
                                                    or <a href="#">skip all</a> pending cooldowns at
                                                    once
                                                </Typography>
                                            </Styled.Cooldown>
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
                                                    Improve your stature, increase the muscle
                                                    volume, slow down your heart rate and strive for
                                                    the most powerful version of your creature.
                                                </Typography>
                                            </Styled.UpgradeText>
                                        )}
                                    </Styled.Price>
                                </Styled.UpgradeType>
                            </Styled.UpgradeSection>
                            {/* <dd>
                            <Typography variant="body2" color="#ffffff90">
                                Royalties:
                            </Typography>
                            <Typography variant="body2"> XX/YY %</Typography>
                        </dd> */}
                        </Styled.DescriptionList>
                    </Styled.RightContainer>
                </Styled.CreatureDetails>
            </Styled.FullWidthContainer>
        </Styled.UpgradeCreature>
    );
};
