import styled from 'styled-components';

export const Revenue = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    max-height: calc(100vh - 210px);
    overflow-y: auto;
    padding: 0 0.4rem;
    width: 81.7rem;
    @media (max-width: 950px) {
        font-size: 30%;
        width: auto;
    }
`;
export const Divider = styled.hr`
    border: none;
    border-top: 0.1rem ${({ theme }) => theme.color.whiteAlpha.a20} solid;
    grid-column: 1/4;
    margin: 0;
    width: 100%;
`;
export const Actions = styled.div`
    text-align: right;
    button:nth-of-type(2) {
        margin-right: 2.4rem;
    }
    @media (max-width: 600px) {
        align-items: center;
        display: flex;
        flex-direction: column-reverse;
        gap: 2.4rem;
        button:nth-of-type(2) {
            margin-right: 0;
        }
    }
`;
export const Row = styled.div`
    display: grid;
    gap: 0.8rem;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 600px) {
        grid-template-columns: 1fr 10rem 1fr;
    }
`;
export const Money = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;
export const Header = styled.header`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;
export const Tooltip = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr;
`;
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
`;
