import { Typography } from '@/components/atoms/Typography';
import { theme } from '@/theme/mainTheme';

import * as Styled from './RegisterForm.styles';

export const NextTooltipContent = () => (
    <Typography variant="body1" color={theme.color.whiteAlpha.a60}>
        {`By clicking "Next" you confirm that you are 18+ years old and you have read and understood
        our `}
        <Styled.Link
            href="https://www.creatureracer.com/terms-conditions/"
            target="_blank"
            rel="noopener noreferrer"
        >
            Terms & Conditions
        </Styled.Link>
    </Typography>
);
