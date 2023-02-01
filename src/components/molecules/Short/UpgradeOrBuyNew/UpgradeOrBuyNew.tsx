import creatureTeamSrc from '@/assets/img/shorts/rhino.png';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { PROGRESS_BAR_TYPES } from '@/components/atoms/ProgressBar/ProgressBar.types';
import { ROUTE } from '@/routing/routes.types';

import { Short } from '../Short';
import * as Styled from './UpgradeOrBuyNew.styles';

export const UpgradeOrBuyNew = () => (
    <Short>
        <Short.Header>Upgrade or buy new</Short.Header>

        <Styled.IconsWrapper>
            <Styled.Icon name={ICON.TRAIT_BELLY} />
            <Styled.Icon name={ICON.TRAIT_BUTTOCKS} />
            <Styled.Icon name={ICON.TRAIT_HEART} />
            <Styled.Icon name={ICON.TRAIT_LUNGS} />
            <Styled.Icon name={ICON.TRAIT_MUSCLES} />
        </Styled.IconsWrapper>

        <Styled.ProgressBar percent={75} variant={PROGRESS_BAR_TYPES.PURPLE} />

        <Short.ButtonWrapper>
            <Short.Button
                primary
                label={`Upgrade`}
                route={ROUTE.UPGRADE_BUY_CREATURES}
                state={{ filter: 'upgrade' }}
            />
            <Short.Button
                secondary
                label={`Buy`}
                route={ROUTE.UPGRADE_BUY_CREATURES}
                state={{ filter: 'buy' }}
            />
        </Short.ButtonWrapper>

        <img
            src={creatureTeamSrc}
            style={{ width: '20rem', position: 'absolute', right: '-4.2rem', bottom: '0.5rem' }}
        />
    </Short>
);
