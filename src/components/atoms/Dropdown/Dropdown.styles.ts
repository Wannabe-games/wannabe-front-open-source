// TODO: Refactor

import styled, { css } from 'styled-components';

import { Icon } from '../Icon';
import { ProgressBar } from '../ProgressBar';
import { IOpenDropdown } from './Dropdown.types';

export const DropdownButton = styled.button<IOpenDropdown>(({ theme, open }) => {
    const bottomRadiusBorder =
        open &&
        css`
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        `;
    return css`
        align-items: center;
        background-color: ${theme.color.blackLike};
        border-radius: 2.4rem;
        color: ${theme.color.whiteAlpha.a60};
        display: flex;
        font-size: ${theme.font.size.body2};
        gap: 1.8rem;
        height: 4.8rem;
        justify-content: space-between;
        outline: 4px ${theme.color.blackAlpha.a10} solid;
        padding: 1.2rem 2.4rem;
        width: 100%;
        ${bottomRadiusBorder}
        & > div {
            flex: 1;
        }
    `;
});

export const Dropdown = styled.div`
    position: relative;
`;

export const Menu = styled.div(({ theme }) => {
    return css`
        background-color: ${theme.color.blackLike};
        border-bottom-left-radius: 2.4rem;
        border-bottom-right-radius: 2.4rem;
        border-top: 1px solid ${theme.color.stone};
        color: ${theme.color.whiteAlpha.a60};
        display: flex;
        flex-direction: column;
        font-size: ${theme.font.size.body2};
        max-height: 40rem;
        overflow: auto;
        position: absolute;
        z-index: 10;

        &::-webkit-scrollbar {
            margin: 20rem;
            width: 1.2rem;
        }
        &::-webkit-scrollbar-track {
            border-radius: 1rem;
        }
        ::-webkit-scrollbar-thumb {
            border-radius: 1rem;
            background-color: ${({ theme }) => theme.color.whiteAlpha.a60};
        }
        a {
            align-items: center;
            cursor: pointer;
            display: flex;
            gap: 1.8rem;
            padding: 1.6rem 2.4rem;
            & > div {
                flex: 1;
            }
        }
    `;
});

export const List = styled.ul<IOpenDropdown>`
    background-color: ${({ theme }) => theme.color.blackLike};
    border-bottom-left-radius: 2.4rem;
    border-bottom-right-radius: 2.4rem;
    border-top: 1px solid ${({ theme }) => theme.color.stone};
    box-sizing: padding-box;
    display: ${({ open }) => (open ? 'flex' : 'none')};
    flex-direction: column;
    left: 0;
    opacity: ${({ open }) => (open ? 1 : 0)};
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 0;
`;

export const ListItem = styled.li`
    align-items: center;
    cursor: pointer;
    display: flex;
    gap: 1.8rem;
    padding: 1.6rem 2.4rem;
    transition: ${({ theme }) => theme.transition.duration.default};
    z-index: 6;
    &:hover {
        background-color: ${({ theme }) => theme.color.whiteAlpha.a20};
    }
`;

export const Chevron = styled(Icon)<IOpenDropdown>`
    transform: ${({ open }) => (open ? 'rotate(180deg) translateY(0.4rem)' : 'rotate(0deg)')};
    transition: ${({ theme }) => theme.transition.duration.default};
`;

export const ProgressBarStyled = styled(ProgressBar)``;
