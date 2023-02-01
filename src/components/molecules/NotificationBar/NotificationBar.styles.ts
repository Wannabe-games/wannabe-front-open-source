import styled, { css } from 'styled-components';

import { NOTIFICATION_TYPE } from './NotificationBar.types';

const buildNotificationStyles = (type: NOTIFICATION_TYPE) => {
    switch (type) {
        case NOTIFICATION_TYPE.SUCCESS:
            return css`
                border-color: ${({ theme }) => theme.color.status.success};
                ${CloseButton} {
                    &::before,
                    &::after {
                        background-color: ${({ theme }) => theme.color.status.success};
                    }
                }
            `;
        case NOTIFICATION_TYPE.ERROR:
            return css`
                border-color: ${({ theme }) => theme.color.status.error};
                ${CloseButton} {
                    &::before,
                    &::after {
                        background-color: ${({ theme }) => theme.color.status.error};
                    }
                }
            `;
    }
};

export const Wrapper = styled.div<{ type: NOTIFICATION_TYPE }>(({ theme, type }) => {
    return css`
        --horizontal-padding: 2.4rem;
        --vertical-padding: 0.85rem;
        backdrop-filter: blur(2.4rem);
        background-color: ${theme.color.blackAlpha.a10};
        border-radius: 1.2rem;
        border: 1px solid transparent;
        color: ${theme.color.white};
        font-size: ${theme.font.size.h6};
        padding: var(--vertical-padding) var(--horizontal-padding);
        position: relative;
        text-align: center;
        width: 100%;
        ${buildNotificationStyles(type)};
    `;
});

export const CloseButton = styled.button.attrs({
    type: 'button',
})`
    --size: 1.6rem;
    display: inline-block;
    height: var(--size);
    opacity: 1;
    position: absolute;
    right: 1.7rem;
    top: 0.1rem;
    width: var(--size);
    &::before,
    &::after {
        background-color: #333;
        content: ' ';
        height: var(--size);
        left: 0.8rem;
        position: absolute;
        width: 1px;
    }
    &::before {
        transform: rotate(45deg);
    }
    &::after {
        transform: rotate(-45deg);
    }
`;
