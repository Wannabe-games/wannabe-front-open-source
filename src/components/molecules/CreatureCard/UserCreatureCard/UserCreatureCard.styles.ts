import styled, { css } from 'styled-components';

import { CreatureCardContainer as BaseCreatureCardContainer, Stats } from '../CreatureCard.styles';

export const CreatureCardContainer = styled(BaseCreatureCardContainer)`
    ${({ theme, isNFT, isStaked }) => {
        if (isStaked) {
            return css`
                &::before {
                    content: '';
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    border: 5px solid ${theme.color.neon.pink};
                    position: absolute;
                    border-radius: 1.2rem;
                    pointer-events: none;
                }
            `;
        }

        if (isNFT) {
            return css`
                background: linear-gradient(
                    to right,
                    ${theme.color.neon.violet},
                    ${theme.color.neon.yellow},
                    ${theme.color.neon.aqua}
                );
                -webkit-background-clip: text;
                background-clip: text;
                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 1.2rem;
                    border: 5px solid transparent;
                    background: inherit;
                    background-origin: border-box;
                    background-clip: border-box;
                    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: destination-out;
                    mask-composite: exclude;
                    -webkit-mask-repeat: no-repeat;
                    pointer-events: none;
                }
                ${Stats} {
                    border-bottom-left-radius: 20px;
                    border-bottom-right-radius: 20px;
                }
            `;
        }
    }}
`;

export const RewardPool = styled.div`
    display: grid;
    grid-template-areas:
        'a b'
        'c b';
    span:nth-of-type(2) {
        grid-area: b;
        margin-left: 1.2rem;
    }
    span:nth-of-type(3) {
        text-align: right;
    }
`;

export const Description = styled.dl`
    font-size: ${({ theme }) => theme.font.size.body2};
    row-gap: 0.4rem;
`;
