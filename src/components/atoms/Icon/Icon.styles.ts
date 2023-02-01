import styled, { css } from 'styled-components';
import { layout, space } from 'styled-system';

import { IIcon } from './Icon.types';

export const Wrapper = styled('span').withConfig({
    shouldForwardProp: (prop) => !['width', 'height', 'path'].includes(prop),
})(({ fill, path }: IIcon) => {
    const svgFillStyles =
        fill &&
        css`
            svg {
                fill: ${fill};
            }
        `;
    const svgPathStyles =
        path &&
        css`
            path {
                stroke: ${path};
            }
        `;

    return css`
        display: inline-block;
        overflow: hidden;
        ${layout}
        ${space}
        ${svgFillStyles}
        ${svgPathStyles}
        svg {
            display: block;
        }
    `;
});
