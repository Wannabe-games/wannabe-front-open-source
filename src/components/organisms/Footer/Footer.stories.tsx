import { withDesign } from 'storybook-addon-designs';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Footer } from './Footer';

export default {
    title: 'Organism/Footer',
    component: Footer,
    argTypes: {
        className: { table: { disable: true } },
    },
    decorators: [withDesign],
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => {
    return <Footer />;
};

export const Default = Template.bind({});
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=460%3A2380',
    },
};
