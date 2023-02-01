// TODO:

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/atoms/Button';
import { Modal } from '@/components/atoms/Modal';
import { Form } from '@/components/molecules/Form';
import { useHandleMintNftReferral } from '@/hooks/useHandleMintNFTReferral';
import { IPopupProps } from '@/interfaces/Popup';
import { mintNFTReferralSchema } from '@/schemas/mint-rnft';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Styled from './MintNFTReferral.styles';
import { IMintNFTReferralDataForm } from './MintNFTReferral.types';

const validationOpt = { resolver: yupResolver(mintNFTReferralSchema) };

export const MintNFTReferralPopUp = ({ hide }: IPopupProps) => {
    const { isLoading, isSuccessfullySubmitted, submitAction } = useHandleMintNftReferral();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IMintNFTReferralDataForm>(validationOpt);

    const onSubmit = handleSubmit(async (data) => {
        await submitAction(data);
        hide();
    });

    const SubmitBtn = useMemo(() => {
        return (
            <Button
                primary
                onClick={onSubmit}
                label={isLoading ? 'Saving...' : 'Mint'}
                disabled={isLoading}
            />
        );
    }, [onSubmit, isLoading]);

    return (
        <Modal hideModal={hide}>
            <Styled.MintNFTReferral>
                <Styled.TypographyStyled variant="h2" weight="bold">
                    <>
                        Mint your{' '}
                        <Styled.RNFTText variant="h2" weight="bold">
                            rNFT
                        </Styled.RNFTText>{' '}
                        Referral code
                    </>
                </Styled.TypographyStyled>
                <Styled.InputGroup>
                    <Form.Field>
                        <Form.Label>Your rNFT Referral code name</Form.Label>
                        <Form.Input
                            control={control}
                            name="refCode"
                            type="text"
                            placeholder="$Go$Play$Mate$"
                        />
                        {errors.refCode && <Form.Error>{errors.refCode.message}</Form.Error>}
                    </Form.Field>
                </Styled.InputGroup>

                <Styled.Actions>
                    {!isSuccessfullySubmitted && (
                        <Button secondary onClick={hide} label="Don't Mint" disabled={isLoading} />
                    )}
                    {SubmitBtn}
                </Styled.Actions>
            </Styled.MintNFTReferral>
        </Modal>
    );
};
