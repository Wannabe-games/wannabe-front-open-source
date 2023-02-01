import { withDesign } from 'storybook-addon-designs';

import { theme } from '@/theme/mainTheme';
import { Meta, Story } from '@storybook/react';

import { Typography } from '../Typography';
import { Tooltip } from './Tooltip';
import { ITooltip } from './Tooltip.types';

interface ITooltipProps extends ITooltip {
    text: string;
}

export default {
    title: 'Atoms/Tooltip',
    component: Tooltip,
    argTypes: {
        element: { table: { disable: true } },
    },
    decorators: [withDesign],
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: Story<ITooltipProps> = ({ element: _element, text, ...args }: ITooltipProps) => {
    const TooltipContent = () => (
        <Typography variant="body2" weight="regular" color={theme.color.whiteAlpha.a60}>
            {text}
        </Typography>
    );

    return <Tooltip element={<TooltipContent />} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    sx: 35.8,
    iconSize: 24,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, vel nesciunt quis facere sapiente, reprehenderit ex autem eos beatae distinctio ullam obcaecati perferendis cum asperiores ipsam impedit mollitia. Quibusdam, quaerat!',
};
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=204%3A24962',
    },
};
