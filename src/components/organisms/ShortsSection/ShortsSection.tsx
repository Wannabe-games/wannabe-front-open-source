import creatureTeamSrc from '@/assets/img/shorts/creature-team-3.png';
import { InviteAndEarn } from '@/components/molecules/Short/InviteAndEarn';
import { Lobbies } from '@/components/molecules/Short/Lobbies/Lobbies';
import { MincapStats } from '@/components/molecules/Short/MincapStats';
import { MyPets } from '@/components/molecules/Short/MyPets';
import { PlayAndEarn } from '@/components/molecules/Short/PlayAndEarn';
import { RewardPool } from '@/components/molecules/Short/RewardPool';
import { StakedCreatures } from '@/components/molecules/Short/StakedCreatures';
import { UpgradeOrBuyNew } from '@/components/molecules/Short/UpgradeOrBuyNew';

import * as Styled from './ShortsSection.styles';

export const ShortsSection = () => {
    return (
        <Styled.ShortsList>
            <StakedCreatures />
            <MincapStats />
            <InviteAndEarn />
            <RewardPool />
            <UpgradeOrBuyNew />
            <PlayAndEarn />
            <MyPets />
            <Lobbies />
            <Styled.ShortsPlaceholder>
                <img src={creatureTeamSrc} alt="" />
            </Styled.ShortsPlaceholder>
        </Styled.ShortsList>
    );
};
