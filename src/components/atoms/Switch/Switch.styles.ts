import styled, { css } from 'styled-components';

export const SwitchButton = styled.span`
    content: '';
    position: absolute;
    top: 3px;
    left: 4px;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    transition: 0.2s;
    background-color: ${({ theme }) => theme.color.yellow};
`;

export const SwitchCheckbox = styled.input.attrs(() => ({
    type: 'checkbox',
}))`
    height: 0;
    width: 0;
    visibility: hidden;

    &:checked + ${SwitchButton} {
        transform: translateX(100%);
        background-color: ${({ theme }) => theme.color.black};
    }
`;

export const SwitchInput = styled.div<{ disabled?: boolean; checked?: boolean }>`
    cursor: pointer;
    width: 4.8rem;
    height: 2.6rem;
    background-color: ${({ theme }) => theme.color.stone};
    border-radius: 10rem;
    position: relative;
    transition: background-color 0.2s;

    ${({ checked }) =>
        checked &&
        css`
            background-color: ${({ theme }) => theme.color.yellow};
        `}

    ${({ disabled }) =>
        disabled &&
        css`
            cursor: not-allowed;

            ${SwitchButton} {
                background-color: ${({ theme }) => theme.color.black};
            }
        `}
`;

export const SwitchLabel = styled.label`
    color: ${({ theme }) => theme.color.white};
    display: inline-flex;
    align-items: center;
    gap: 1.5rem;
    font-size: 1.2rem;
`;
