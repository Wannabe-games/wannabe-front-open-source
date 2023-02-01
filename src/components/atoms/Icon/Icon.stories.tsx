import { withDesign } from 'storybook-addon-designs';
import styled from 'styled-components';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Icon } from './';
import { ICON, IIcon } from './Icon.types';

export default {
    title: 'Atoms/Icon',
    component: Icon,
    argTypes: {
        onCompleted: { table: { disable: true } },
        onError: { table: { disable: true } },
        name: { options: Object.values(ICON), control: 'radio' },
    },

    decorators: [withDesign],
} as ComponentMeta<typeof Icon>;

const StyledIcon = styled(Icon)`
    max-width: 5.6rem;
    display: block;
`;

const Template: ComponentStory<typeof Icon> = (args: IIcon) => {
    return <StyledIcon {...args} />;
};

export const Default = Template.bind({});

Default.args = { name: ICON.TRAIT_BUTTOCKS };
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=1256%3A17702',
    },
};
