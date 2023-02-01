import React from 'react';

import { icons } from '@/assets/icons/icons';

import * as Styled from './Icon.styles';
import { IIcon } from './Icon.types';

const IconMemo = (props: IIcon) => {
    const { name, ...rest } = props;

    const Icon = () => {
        if (!name || !icons[name]) {
            return null;
        }

        const Component = icons[name];

        return <Component />;
    };

    return (
        <Styled.Wrapper {...rest}>
            <Icon />
        </Styled.Wrapper>
    );
};

export const Icon = React.memo(IconMemo);
