import { useMemo, useState } from 'react';

import { Badge } from '@/components/atoms/Badge';
import { BADGE_TYPE } from '@/components/atoms/Badge/Badge.types';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { PROGRESS_BAR_TYPES } from '@/components/atoms/ProgressBar/ProgressBar.types';
import { Typography } from '@/components/atoms/Typography';
import { formatBalance } from '@/helpers/format-balance';
import { CreatureModel } from '@/models/creature.model';

import * as Styled from './CreatureCard.styles';

const CreatureCardMemo = ({ creature }: { creature: CreatureModel }) => {
    const [pendingButton, setPendingButton] = useState<string>();
    const { buttons, badge, performance, name, type, gold, shouldCostNoGold, additionalText } =
        creature;
    const { acceleration, fuelVolume, boostPower, speed } = performance;

    const GoldContainer = useMemo(() => {
        if (gold > 0) {
            const goldAmount = formatBalance(gold);

            return (
                <Styled.Gold isFree={shouldCostNoGold}>
                    {shouldCostNoGold && (
                        <Styled.GoldBadge $type={BADGE_TYPE.FREE_COIN}>FREE</Styled.GoldBadge>
                    )}
                    <Styled.GoldAmount>+ {goldAmount}</Styled.GoldAmount>
                    <Icon name={ICON.GOLD_COIN} width={19} mr="1.8rem" />
                </Styled.Gold>
            );
        }
    }, [gold, shouldCostNoGold]);

    return (
        <Styled.CreatureCardContainer>
            <Styled.Creature>
                <Styled.NameHeader>
                    <Styled.Name>
                        {badge && <Badge $type={badge.type}>{badge.value}</Badge>}
                        <Typography variant="h5" weight="bold">
                            {name}
                        </Typography>
                    </Styled.Name>
                </Styled.NameHeader>
                <img
                    src={`/creatures/${type}.png`}
                    alt={name}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = '/creatures/bird.png';
                    }}
                />
            </Styled.Creature>
            <Styled.Stats>
                <Styled.Row>
                    {additionalText && (
                        <Styled.AdditionalText>{additionalText}</Styled.AdditionalText>
                    )}
                </Styled.Row>
                <Styled.Traits>
                    <Styled.TwoColumns>
                        <ProgressBar
                            percent={speed.percentage}
                            variant={PROGRESS_BAR_TYPES.FIRST}
                            header={
                                <Styled.Header>
                                    Speed
                                    <Icon name={ICON.SPEED} width="2rem" height="2.3rem" />
                                </Styled.Header>
                            }
                        />
                        <ProgressBar
                            percent={acceleration.percentage}
                            variant={PROGRESS_BAR_TYPES.FIRST}
                            header={
                                <Styled.Header>
                                    Acceleration
                                    <Icon name={ICON.ACCELERATION} width="2rem" />
                                </Styled.Header>
                            }
                        />
                    </Styled.TwoColumns>
                    <Styled.TwoColumns>
                        <ProgressBar
                            percent={boostPower.percentage}
                            variant={PROGRESS_BAR_TYPES.FIRST}
                            header={
                                <Styled.Header>
                                    Boost power
                                    <Icon name={ICON.BOOST_POWER} width="1.8rem" height="2.1rem" />
                                </Styled.Header>
                            }
                        />
                        <ProgressBar
                            percent={fuelVolume.percentage}
                            variant={PROGRESS_BAR_TYPES.FIRST}
                            header={
                                <Styled.Header>
                                    Fuel volume
                                    <Icon name={ICON.FUEL_VOLUME} width="1.4rem" />
                                </Styled.Header>
                            }
                        />
                    </Styled.TwoColumns>
                </Styled.Traits>
                <Styled.ActionBar>
                    {buttons.map(({ label, primary, secondary, tertiary, route, action }) => (
                        <Button
                            key={label}
                            label={label}
                            disabled={pendingButton === label}
                            primary={primary}
                            secondary={secondary}
                            tertiary={tertiary}
                            route={route}
                            onClick={() => action?.(setPendingButton)}
                        />
                    ))}
                    {GoldContainer}
                </Styled.ActionBar>
            </Styled.Stats>
        </Styled.CreatureCardContainer>
    );
};

export const CreatureCard = CreatureCardMemo;
