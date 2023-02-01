import { theme } from '@/theme/mainTheme';

import { Icon } from '../Icon';
import { ICON } from '../Icon/Icon.types';
import * as Styled from './Tooltip.styles';
import { ITooltip } from './Tooltip.types';

export const Tooltip = ({
    color = theme.color.white,
    element,
    iconSize = 16,
    sx,
    toolTipPosition,
    ...rest
}: ITooltip) => {
    return (
        <Styled.Container {...rest}>
            <Icon name={ICON.INFO} width={iconSize} height={iconSize} path={color} />
            <Styled.Tooltip sx={sx} className="abc" toolTipPosition={toolTipPosition}>
                {element}
            </Styled.Tooltip>
        </Styled.Container>
    );
};
