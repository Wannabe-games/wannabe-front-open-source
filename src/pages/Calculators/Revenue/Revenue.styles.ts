import styled from 'styled-components';

export const Revenue = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    margin: 0 auto;
    width: 81.7rem;
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
    button:nth-of-type(1) {
        margin-right: 2.4rem;
    }
`;
export const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;
export const Money = styled.div`
    display: flex;
    align-items: center;
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

export const FooterSpacer = styled.div`
    height: 21rem;
`;

export const FullWidthContainer = styled.div`
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: 10rem;
    padding: 1.6rem 0;
    position: relative;
    right: 50%;
    width: 100vw;
    background-color: ${({ theme }) => theme.color.blackAlpha.a10};
`;
