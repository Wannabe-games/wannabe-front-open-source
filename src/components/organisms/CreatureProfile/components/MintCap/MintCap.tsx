import { Button } from '@/components/atoms/Button';
import { Tooltip } from '@/components/atoms/Tooltip';
import { Typography } from '@/components/atoms/Typography';
import { theme } from '@/theme/mainTheme';

import * as Styled from './MintCap.styles';

export const MintCap = () => {
    return (
        <Styled.MintCapWrapper>
            <Styled.MintCap>
                <Typography variant="h4" weight="bold">
                    Mint Cap
                    <Tooltip
                        element={
                            <Typography
                                variant="body2"
                                weight="regular"
                                color={theme.color.whiteAlpha.a60}
                            >
                                For example if your NFT Creature has a mint cap of 100 and a 10%
                                share of Reward Pool your reward will be calculated with equation:
                                10% of Reward Pool : 100 = your staking reward. Your share of reward
                                pool may vary according to filling of a mint cap set for certain
                                Tier and Creature type
                            </Typography>
                        }
                        iconSize={24}
                        sx={33.8}
                        left="0.5rem"
                    />
                </Typography>
                <Styled.Subtitle variant="body2">Check available minting spots</Styled.Subtitle>
                <Typography variant="h6" mt="1rem">
                    Value
                </Typography>
            </Styled.MintCap>
            <Button label="Buy new" secondary onClick={() => ({})} />
        </Styled.MintCapWrapper>
    );
};
