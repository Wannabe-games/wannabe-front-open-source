import { withDesign } from 'storybook-addon-designs';

import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Switch } from './Switch';
import { ISwitch } from './Switch.types';

export default {
    title: 'Atoms/Switch',
    component: Switch,
    argTypes: {
        onChange: { table: { disable: true } },
        readOnly: { table: { disable: true } },
    },
    decorators: [withDesign],
} as ComponentMeta<typeof Switch>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: ComponentStory<typeof Switch> = ({ ...args }: ISwitch) => {
    const [{ checked }, updateArgs] = useArgs();

    const handleChange = () => updateArgs({ checked: !checked });

    return <Switch {...args} onChange={handleChange} checked={checked} />;
};

export const Default = Template.bind({});
Default.args = {
    checked: false,
    disabled: false,
    readOnly: false,
    label: 'Label',
};
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=110%3A1284',
    },
};
