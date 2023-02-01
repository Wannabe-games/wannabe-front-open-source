import React from 'react';

import * as Styled from './Switch.styles';
import { ISwitch } from './Switch.types';

const SwitchRaw = ({ checked, disabled, label, onChange, readOnly }: ISwitch) => (
    <Styled.SwitchLabel>
        {label}
        <Styled.SwitchInput disabled={disabled} checked={checked}>
            <Styled.SwitchCheckbox
                disabled={disabled}
                checked={checked}
                onChange={onChange}
                readOnly={readOnly}
            />
            <Styled.SwitchButton />
        </Styled.SwitchInput>
    </Styled.SwitchLabel>
);

export const Switch = React.memo(SwitchRaw);
