import styled, { css } from 'styled-components';

import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';

export const ShareAndJoin = styled.div`
    align-items: flex-end;
    background: linear-gradient(0deg, #4b5753, #12242f); //12242f #101F2C
    border-radius: 2.4rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    overflow: auto;
    padding: 4.9rem 7.8rem 7.8rem 5.4rem;
    position: relative;
    width: 122rem;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 100%;
    @media (max-width: 800px) {
        padding: 1.6rem;
        width: 100%;
    }
`;
export const Box = styled.div`
    align-items: center;
    background: ${({ theme }) => theme.color.blackLike};
    border-radius: 1.2rem;
    color: ${({ theme }) => theme.color.white};
    display: flex;
    justify-content: space-between;
    padding: 1.6rem;
    position: relative;
    max-width: 44.8rem;
    z-index: 0;
    width: 100%;
`;
export const RewardPool = styled(Box)`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
`;
export const PoolShare = styled(Box)`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
`;
export const FirstRow = styled.div`
    display: grid;
    gap: 1.6rem;
    grid-template-columns: 31.2rem 12rem;
    @media (max-width: 650px) {
        grid-template-columns: 1fr 12rem;
        width: 100%;
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
        width: 100%;
    }
`;
export const Title = styled.div<{ type: string }>(({ type }) => {
    const display =
        type === 'join'
            ? css`
                  align-items: flex-end;
                  display: flex;
                  flex-direction: column;
              `
            : css`
                  display: grid;
                  grid-template-areas:
                      'a b'
                      'c b';
                  span {
                      letter-spacing: 0.02rem;
                      text-align: right;
                  }
                  span:nth-of-type(2) {
                      grid-area: c;
                  }
                  div {
                      grid-row: 1/3;
                  }
              `;
    return css`
        gap: 0.8rem;
        margin-bottom: 2.4rem;
        margin-top: 1.8rem;
        ${display};
        @media (max-width: 800px) {
            margin-top: 0;
        }
        @media (max-width: 500px) {
            margin-top: 4.8rem;
        }
    `;
});
export const Logo = styled.img`
    left: 5.4rem;
    position: absolute;
    max-width: 20.8rem;
    @media (max-width: 800px) {
        top: 3.2rem;
        width: 10rem;
    }
`;
export const Creatures = styled.img`
    bottom: 1.7rem;
    left: 0;
    position: absolute;
    @media (max-width: 800px) {
        display: none;
    }
`;
export const Rocket = styled.img`
    bottom: 0;
    left: 0;
    position: absolute;
    z-index: 0;
`;
export const SocialIcons = styled.div`
    align-items: center;
    display: flex;
    gap: 1rem;
    justify-content: center;
`;
export const QRCode = styled.div`
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 0.9rem;
    height: 10rem;
    overflow: hidden;
    width: 10rem;
    img {
        height: 10rem;
        width: 10rem;
    }
`;
export const QRCodeCenter = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    @media (min-width: 501px) {
        display: none;
    }
`;
export const QRCodeOuter = styled.div`
    background: linear-gradient(95.3deg, #6720f8 0%, #f6c944 50.52%, #1ef6df 100%);
    border-radius: 0.9rem;
    padding: 0.3rem;
`;
export const Stores = styled.div`
    display: flex;
    gap: 1.6rem;
    justify-content: flex-end;
    margin-left: 2.4rem;
    width: 100%;
    @media (max-width: 500px) {
        justify-content: space-around;
    }
`;
export const GoToDashboard = styled(Button)`
    margin-top: 1.4rem;
`;
export const InviteAndEarn = styled.button`
    border: 1px solid;
    border-radius: 100rem;
    font-size: 1.2rem;
    padding: 0.4rem 0.7rem;
    color: ${({ theme }) => theme.color.white};
    border: solid 1px transparent;
    background-image: linear-gradient(#faa, #faa),
        linear-gradient(95.3deg, #6720f8 0%, #f6c944 50.52%, #1ef6df 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    box-shadow: 2px 1000px 1px ${({ theme }) => theme.color.blackLike} inset;
`;

export const RNFT = styled(Typography)`
    background: ${({ theme }) => theme.color.gradient.linear.multicolor.first};
    display: inline-block;
    font-weight: 700;
    margin-left: 0.8rem;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;
export const RNFTCenter = styled(RNFT)`
    text-align: center;
`;
export const RNFTContainer = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export const Referral = styled.div`
    display: flex;
    gap: 2.4rem;
    margin-top: 1.6rem;
    @media (max-width: 350px) {
        span {
            font-size: 1rem;
        }
    }
`;
export const ReferralText = styled(Typography)`
    width: 18.8rem;
`;
export const ReferralSubtitle = styled(Typography)`
    display: block;
    margin-top: 0.8rem;
`;
export const QRCodeContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    @media (max-width: 500px) {
        display: none;
    }
`;
export const Avatar = styled.div`
    align-items: center;
    background: ${({ theme }) => theme.color.blackAlpha.a85};
    border: 1px ${({ theme }) => theme.color.whiteAlpha.a40} solid;
    border-radius: 5.6rem;
    display: flex;
    float: left;
    height: 5.6rem;
    justify-content: center;
    overflow: hidden;
    width: 5.6rem;
    img {
        width: 5.6rem;
    }
`;
export const USDTetherContainer = styled.div`
    align-items: center;
    display: inline-flex;
    flex-direction: column;
    margin-left: 0.8rem;
`;
export const RewardPoolValue = styled.div`
    align-items: center;
    display: flex;
    margin-top: 0.8rem;
`;
export const TetherIcon = styled(Icon)`
    position: absolute;
    right: 1.6rem;
    top: 1.6rem;
`;

export const InviteAndEarnBorder = styled.div`
    background-color: ${({ theme }) => theme.color.blackLike};
    border-radius: 10rem;
    font-size: 1rem;
    top: 0;
    z-index: 1;
    position: relative;
    & > div {
        background: ${({ theme }) => theme.color.blackLike};
        border-radius: 10rem;
        padding: 0.4rem 1.2rem;
        width: 100%;
        & > span {
            font-weight: bold;
        }
    }
    &::before {
        background: linear-gradient(95.3deg, #6720f8 0%, #f6c944 50.52%, #1ef6df 100%);
        border-radius: 10rem;
        bottom: -0.1rem;
        content: '';
        left: -0.1rem;
        position: absolute;
        right: -0.1rem;
        top: -0.1rem;
        z-index: -1;
    }
`;

export const RNFTImage = styled.img`
    margin-bottom: 0.5rem;
    margin-left: 1.1rem;
`;
export const RNFTImageSmall = styled(RNFTImage)`
    display: block;
    height: 0.7rem;
    margin-top: 0.6rem;
    width: 2.4rem;
`;
export const Footer = styled(Box)`
    @media (max-width: 500px) {
        flex-direction: column;
        gap: 1.6rem;
    }
`;
export const Money = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
