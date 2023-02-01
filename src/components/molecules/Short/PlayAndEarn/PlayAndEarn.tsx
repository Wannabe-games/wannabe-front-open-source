import creatureTeamSrc from '@/assets/img/shorts/creature-team-2.png';
import { Typography } from '@/components/atoms/Typography';
import { CalculatorPopup } from '@/components/molecules/Popups/Calculator/Calculator';
import { RevenuePopup } from '@/components/molecules/Popups/Revenue';
import { useModal } from '@/hooks/useModal';
import { theme } from '@/theme/mainTheme';

import { Short } from '../Short';
import * as Styled from './PlayAndEarn.styles';

export const PlayAndEarn = () => {
    const { showModal: showCalculatorModal, hideModal: hideCalculatorModal } = useModal(() => (
        <CalculatorPopup hide={hideCalculatorModal} showRevenueCalculator={showRevenueModal} />
    ));
    const { showModal: showRevenueModal, hideModal: hideRevenueModal } = useModal(() => (
        <RevenuePopup hide={hideRevenueModal} showExtendedCalculator={showCalculatorModal} />
    ));
    return (
        <Short>
            <Short.Header
                sx={28.7}
                infoContent={
                    <Styled.Link href="https://www.creatureracer.com/assumption-of-risk">
                        <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                            https://www.creatureracer.com/assumption-of-risk
                        </Typography>
                    </Styled.Link>
                }
            >
                Play & Earn
            </Short.Header>
            <Short.Subheader>Calculate your earnings</Short.Subheader>
            <Styled.Actions>
                <Short.Button primary label={'Calculator'} onClick={showRevenueModal} />
            </Styled.Actions>
            <img
                src={creatureTeamSrc}
                style={{
                    width: '16.6rem',
                    position: 'absolute',
                    right: '-2.5rem',
                    bottom: '-0.2rem',
                }}
            />
        </Short>
    );
};
