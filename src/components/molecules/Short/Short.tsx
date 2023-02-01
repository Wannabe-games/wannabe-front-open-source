import { IButton } from '@/components/atoms/Button/Button.types';
import { Tooltip } from '@/components/atoms/Tooltip';
import { Typography } from '@/components/atoms/Typography';
import { theme } from '@/theme/mainTheme';

import * as Styled from './Short.styles';
import { IShort } from './Short.types';

const Short = ({ children }: IShort) => <Styled.Short>{children}</Styled.Short>;

const Header = ({
    infoContent,
    sx = 100,
    children,
}: {
    infoContent?: React.ReactNode;
    sx?: number;
    children: string;
}) => (
    <Styled.Header>
        <Styled.Title variant="h3" weight="bold">
            {children}
        </Styled.Title>
        {infoContent && (
            <Tooltip
                iconSize={21}
                sx={sx}
                element={
                    <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                        {infoContent}
                    </Typography>
                }
            />
        )}
    </Styled.Header>
);

const Subheader = ({ children }: { children: React.ReactElement | string }) => (
    <Typography variant="h4" weight="bold" color={theme.color.yellow}>
        {children}
    </Typography>
);

const ButtonWrapper = ({ children }: { children: React.ReactElement[] | React.ReactElement }) => (
    <Styled.ButtonWrapper>{children}</Styled.ButtonWrapper>
);

const Button = (args: IButton) => <Styled.Button {...args} />;

Short.Header = Header;
Short.Subheader = Subheader;
Short.Image = Image;
Short.ButtonWrapper = ButtonWrapper;
Short.Button = Button;

export { Short };
