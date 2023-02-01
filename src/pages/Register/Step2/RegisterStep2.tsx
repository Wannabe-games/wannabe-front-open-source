import { useMemo } from 'react';
import ReactGA from 'react-ga4';

import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Form } from '@/components/molecules/Form';
import { WizzPanel } from '@/components/molecules/WizzPanel';
import { useDebouncedState } from '@/hooks/useDebouncedState';
import { useFormWithSchema } from '@/hooks/useFormWithSchema';
import { enterReferralCodeSchema } from '@/schemas/enter-referral-code';
import { theme } from '@/theme/mainTheme';

import * as Styled from './RegisterStep2.styles';
import { useRegisterStep2 } from './useRegisterStep2';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

export const RegisterPageStep2 = () => {
    ReactGA.event({ category: 'User', action: 'register (start)' });
    const {
        contentByStatus,
        handleAddWallet,
        isConnectButtonDisabled,
        isSubmitting,
        isSubmitButtonDisabled,
        onSubmit,
        fromReferral,
    } = useRegisterStep2();
    const debouncedContentByStatus = useDebouncedState(contentByStatus, (show) => (show ? 150 : 0));

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useFormWithSchema(enterReferralCodeSchema);

    const SubmitBtn = useMemo(() => {
        return (
            <Button
                secondary
                onClick={handleSubmit(onSubmit)}
                label={isSubmitting ? 'Wait...' : 'Next'}
                disabled={isSubmitButtonDisabled}
            />
        );
    }, [handleSubmit, isSubmitting, isSubmitButtonDisabled, onSubmit]);

    return (
        <Styled.RegisterContainer>
            <WizzPanel steps={steps} activeStep={2} />
            <Styled.RegisterPageStep2>
                <Typography variant="h1" weight="bold" color="#F6C944">
                    Step 2
                </Typography>
                <Typography variant="h1" weight="bold">
                    Wallet
                </Typography>
                <Typography variant="h5">add your Hiro wallet to play</Typography>

                <Styled.ConnectWalletButton
                    primary
                    label={debouncedContentByStatus}
                    disabled={isConnectButtonDisabled}
                    onClick={handleAddWallet()}
                />
                <Styled.TypographyMarginLeft variant="body1" color={theme.color.whiteAlpha.a60}>
                    {`New to crypto? It's OK!`}
                    <br />
                    {`Here is a tutorial `}
                    <Styled.Link
                        href="https://wannabe.games/faq/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        how to get started
                    </Styled.Link>
                </Styled.TypographyMarginLeft>
                <Styled.ReferralInputContainer>
                    <Form.Field>
                        <Styled.RNFTText variant="h5" weight="bold">
                            rNFT
                        </Styled.RNFTText>
                        <Styled.ReferralInput
                            control={control}
                            name="refCode"
                            type="text"
                            placeholder="Enter your Referral Code and claim your FREE Creature NFT"
                            defaultValue={fromReferral}
                            disabled={fromReferral}
                        />
                        {errors.refCode && <Form.Error>{errors.refCode.message}</Form.Error>}
                    </Form.Field>
                    <Styled.TypographyMarginLeft variant="body1" color={theme.color.whiteAlpha.a60}>
                        {`Don't have a code? Ask for one on our `}
                        <Styled.Link
                            href="https://discord.gg/fpk5dgftSj"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Discord
                        </Styled.Link>
                    </Styled.TypographyMarginLeft>
                </Styled.ReferralInputContainer>

                {SubmitBtn}
            </Styled.RegisterPageStep2>
        </Styled.RegisterContainer>
    );
};
