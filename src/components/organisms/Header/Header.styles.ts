import styled from 'styled-components';

import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Menu } from '@/components/molecules/Menu';

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    padding-top: 8.2rem;
    @media (max-width: 1200px) {
        padding-top: 1.6rem;
    }
    @media (max-width: 650px) {
        flex-direction: column;
    }
`;
export const RightContainer = styled.div`
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;
    & > span {
        font-size: 4.8rem;
        margin-top: 2.6rem;
    }
`;
export const Spacer = styled.div`
    width: 0.4rem;
`;
export const HeaderMenu = styled(Menu)`
    @media (max-width: 1200px) {
        width: 100%;
    }
    ul {
        @media (max-width: 1200px) {
            display: none;
        }
    }
`;
export const MenuIcon = styled(Icon)`
    display: none;
    position: absolute;
    z-index: 2;
    @media (max-width: 1200px) {
        display: inline-block;
    }
`;
export const Money = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 1200px) {
        margin: 0.4rem auto;
        width: 100%;
        & div:nth-of-type(1) {
            padding-left: 0;
        }
        & div::before {
            display: none;
        }
    }
`;
export const MenuButton = styled(Button)`
    padding-right: 0;
    position: absolute;
    right: 3.6rem;
    top: 2.4rem;
`;
export const MobileMenu = styled.div<{ open: boolean }>`
    background: ${({ theme }) => theme.color.blackLike};
    color: ${({ theme }) => theme.color.white};
    display: flex;
    flex-direction: column;
    left: 0;
    padding: 1.6rem;
    padding-top: 6rem;
    position: absolute;
    right: 0;
    text-align: right;
    top: 0;
    transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-100%)')};
    transition: 0.2s;
    ul {
        align-items: flex-end;
        flex-direction: column;
        li {
            min-height: 2.7rem;
        }
    }
    @media (min-width: 1200px) {
        display: none;
    }
`;
export const MobileButtons = styled.div`
    display: none;
    position: absolute;
    right: 2.4rem;
    top: 2.4rem;
    @media (max-width: 1200px) {
        display: block;
    }
`;
export const Quote = styled.div`
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;
    @media (max-width: 1200px) {
        span {
            font-size: ${({ theme }) => theme.font.size.h2};
            line-height: calc(${({ theme }) => theme.font.size.h2}*1.182);
        }
    }
    @media (max-width: 650px) {
        button {
            margin: 0 auto;
        }
    }
    @media (max-width: 550px) {
        span {
            font-size: ${({ theme }) => theme.font.size.h4};
            line-height: calc(${({ theme }) => theme.font.size.h4}*1.182);
        }
    }
`;
