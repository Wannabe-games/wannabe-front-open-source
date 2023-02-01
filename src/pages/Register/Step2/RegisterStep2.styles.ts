import styled from 'styled-components';

import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Form } from '@/components/molecules/Form';

export const RegisterPageStep2 = styled.section`
    align-items: flex-start;
    background: url(/static/creature-team-3.png);
    background-position: bottom right 4.8rem;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 4rem;
    max-width: 1440px;
    min-height: 451px;
    margin-top: 5.3rem;
    padding-bottom: 6rem;
    padding-left: 6.5rem;
    @media (max-width: 1100px) {
        background: none;
    }
    @media (max-width: 700px) {
        > span:nth-child(1) {
            font-size: ${({ theme }) => theme.font.size.h2};
            line-height: calc(2rem * 1.182);
            margin-top: 0;
        }
        > span:nth-child(2) {
            font-size: ${({ theme }) => theme.font.size.h4};
            line-height: calc(2rem * 1.182);
        }
        > span:nth-child(3) {
            font-size: ${({ theme }) => theme.font.size.h6};
            line-height: calc(2rem * 1.182);
        }
    }
    @media (max-width: 560px) {
        padding-left: 0;
    }
    @media (max-width: 450px) {
        button {
            margin: 0 auto;
        }
    }
`;
export const RegisterPageImage = styled.img`
    height: 531px;
    width: 683px;
`;
export const TypographyMarginLeft = styled(Typography)`
    line-height: 1.875rem;
    margin-left: 2.4rem;
`;
export const ConnectWalletButton = styled(Button)`
    margin: 4rem 0 0 0;
`;
export const BackButton = styled(Button)`
    margin: 0 4rem 0 0;
`;
export const RNFTText = styled(Typography)`
    background: ${({ theme }) => theme.color.gradient.linear.multicolor.first};
    display: inline-block;
    font-weight: 700;
    margin-left: 1.6rem;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;
export const ReferralInputContainer = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 3.2rem;
    position: relative;
    width: 46.2rem;
    label {
        width: 100%;
        align-items: flex-start;
    }
    @media (max-width: 500px) {
        width: 100%;
    }
`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ReferralInput = styled(Form.Input)<any>`
    height: 5.6rem;
    padding-left: 1.6rem;
    position: relative;
    padding: 1.6rem;
    border: double 3px transparent;
    border-radius: 50rem;
    background-image: ${({ theme }) =>
        `linear-gradient(${theme.color.blackLike}, ${theme.color.blackLike}), ${theme.color.gradient.linear.multicolor.first};`};
    background-origin: border-box;
    background-clip: padding-box, border-box;
    &::placeholder {
        font-size: 1.4rem;
        left: 2rem;
        padding-left: 0.6rem;
    }
    &::placeholder-show {
        text-overflow: ellipsis;
    }
    @media (max-width: 500px) {
    }
`;
export const Test = styled.div`
    position: absolute;
`;
export const RegisterContainer = styled.main`
    padding: 8rem 0 12rem 0;
`;
export const Link = styled.a`
    color: ${({ theme }) => theme.color.whiteAlpha.a60};
    text-decoration: underline;
`;
