import * as Styled from './WizzPanel.styles';
import { IWizzPanel } from './WizzPanel.types';

export const WizzPanel = ({ steps, activeStep }: IWizzPanel) => (
    <Styled.WizzPanel>
        {steps.map((label, index) => (
            <Styled.WizzPanelItem key={label}>
                <Styled.WizzPanelTitle index={index + 1} active={activeStep} />
            </Styled.WizzPanelItem>
        ))}
    </Styled.WizzPanel>
);
