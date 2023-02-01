import { withDesign } from 'storybook-addon-designs';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Typography } from './Typography';
import { ITypography } from './Typography.types';

export default {
    title: 'Atoms/Typography',
    component: Typography,
    argTypes: {
        className: { table: { disable: true } },
    },
    decorators: [withDesign],
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = ({
    children,
    color,
    variant,
    weight,
}: ITypography) => {
    return (
        <Typography color={color} variant={variant} weight={weight}>
            {children}
        </Typography>
    );
};

export const Default = Template.bind({});
Default.args = { children: 'text', variant: 'h1', color: 'white', weight: 'regular' };
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=1083%3A3704',
    },
};
