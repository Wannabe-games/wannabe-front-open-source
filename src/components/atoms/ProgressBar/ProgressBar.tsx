import * as Styled from './ProgressBar.styles';
import { IProgressBar, PROGRESS_BAR_TYPES } from './ProgressBar.types';

export const ProgressBar = ({
    percent,
    header,
    className,
    upgrade = 0,
    variant = PROGRESS_BAR_TYPES.FIRST,
    barHeight,
}: IProgressBar) => {
    const Header = () => <Styled.ProgressBarHeader>{header}</Styled.ProgressBarHeader>;

    return (
        <Styled.ProgressBarWrapper>
            {header && <Header />}
            <Styled.ProgressBar className={className}>
                <Styled.Upgrade upgrade={upgrade} percent={percent} />
                <Styled.Progress percent={percent} variant={variant} barHeight={barHeight} />
            </Styled.ProgressBar>
        </Styled.ProgressBarWrapper>
    );
};
