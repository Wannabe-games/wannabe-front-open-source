import styled, { css } from 'styled-components';

export const Agreement = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    height: calc(90vh - 4.8rem);
    position: relative;
    width: 80.8rem;
    @media (max-width: 920px) {
        max-width: 80vw;
    }
`;
export const Scrollable = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    overflow-y: auto;

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
`;
export const Row = styled.div`
    color: ${({ theme }) => theme.color.white};
    font-size: ${({ theme }) => theme.font.size.body1};
    line-height: 1.7rem;
    padding-left: 2.4rem;
    width: 100%;
`;
export const Actions = styled.div`
    align-items: flex-end;
    display: flex;
    gap: 2.4rem;
    justify-content: flex-end;
`;
export const Label = styled.label<{ isAvailableToAccept: boolean }>`
    ${({ isAvailableToAccept }) =>
        !isAvailableToAccept &&
        css`
            opacity: 0.3;
        `}
`;
export const Checkbox = styled.input`
    appearance: none;
    background-color: ${({ theme }) => theme.color.blackLike};
    border-radius: 0.15em;
    display: inline-grid;
    font: inherit;
    height: 1.8rem;
    margin: 0;
    margin-right: 0.8rem;
    place-content: center;
    transform: translateY(-0.075em);
    width: 1.8rem;
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
    &:not(:disabled) {
        cursor: pointer;
    }
    &:not(:disabled):not(:checked) {
        &:hover {
            &::before {
                box-shadow: inset 1em 1em ${({ theme }) => theme.color.whiteAlpha.a60};
                clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
                content: '';
                transform: scale(1);
                height: 1rem;
                width: 1rem;
            }
        }
    }

    &::before {
        box-shadow: inset 1em 1em ${({ theme }) => theme.color.blackLike};
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        content: '';
        height: 1rem;
        transform: scale(0);
        transform-origin: bottom left;
        transition: 120ms transform ease-in-out;
        width: 1rem;
    }
    &:checked {
        background: ${({ theme }) => theme.color.yellow};
    }
    &:checked::before {
        transform: scale(1);
    }
`;
export const Link = styled.a`
    color: ${({ theme }) => theme.color.white};
    text-decoration: underline;
`;
