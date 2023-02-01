import { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Input } from './Input';
import { IInput } from './Input.types';

export default {
    title: 'Atoms/Input',
    component: Input,
    argTypes: {
        type: {
            options: ['text', 'password'],
            control: { type: 'radio' },
        },
        onChange: { table: { disable: true } },
        register: { table: { disable: true } },
    },
    decorators: [withDesign],
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = ({
    defaultValue,
    error = false,
    ...args
}: IInput) => {
    const [localValue, setValue] = useState<string | undefined>(defaultValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return <Input {...args} error={error} defaultValue={localValue} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = {
    disabled: false,
    required: true,
    type: 'text',
    defaultValue: 'Test',
    placeholder: 'Label',
    error: false,
};
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=110%3A576',
    },
};
