import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/atoms/Button';
import { Modal } from '@/components/atoms/Modal';
import { Form } from '@/components/molecules/Form';
import { mintCreatureAction } from '@/helpers/actions/mintCreatureAction';
import { handleRoyaltiesInputChange } from '@/helpers/royalties-input';
import { IPopupProps } from '@/interfaces/Popup';
import { mintNFTCreatureSchema } from '@/schemas/mint-creature';
import { useTypedDispatch, useTypedSelector } from '@/store';
import {
    assignCurrentlyMintedCreature,
    selectCurrentlyMintedCreature,
} from '@/store/slices/creatures.slice';
import { theme } from '@/theme/mainTheme';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Styled from './MintNFTCreature.styles';
import { IMintNFTCreatureForm } from './MintNFTCreature.types';

export const MintNFTCreaturePopupRaw = ({ hide }: IPopupProps) => {
    const [pending, setPending] = useState(false);
    const creatureIdStore = useTypedSelector(selectCurrentlyMintedCreature);
    const [creatureId, setCreatureId] = useState(creatureIdStore || '');
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if (creatureIdStore) {
            setCreatureId(creatureIdStore);
        }
    }, [creatureIdStore]);

    useEffect(() => {
        dispatch(assignCurrentlyMintedCreature(null));
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IMintNFTCreatureForm>({
        resolver: yupResolver(mintNFTCreatureSchema),
        mode: 'onChange',
    });

    const onSubmit = handleSubmit(async (mintData) => {
        const { name, royalties } = mintData;

        try {
            setPending(true);
            await mintCreatureAction(creatureId, name, royalties);
            reset();
            hide();
        } finally {
            setPending(false);
        }
    });

    const handleHideModal = useCallback(() => {
        if (!pending) {
            hide();
        }
        // TODO: Should be checked
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pending]);

    const SubmitBtn = useMemo(() => {
        return (
            <Button
                primary
                onClick={onSubmit}
                label={pending ? 'Minting...' : 'Mint'}
                disabled={pending}
            />
        );
    }, [onSubmit, pending]);

    return (
        <Modal hideModal={handleHideModal}>
            <Styled.MintUp>
                <Styled.TypographyStyled variant="h2" weight="bold">
                    Mint your creature
                </Styled.TypographyStyled>
                <Styled.InputGroup>
                    <Form.Field>
                        <Form.Label>Your NFT name</Form.Label>
                        <Form.Input
                            control={control}
                            name="name"
                            type="text"
                            placeholder="$gameCreatureNameAsPlaceholder"
                        />
                        {errors.name && <Form.Error>{errors.name.message}</Form.Error>}
                    </Form.Field>
                </Styled.InputGroup>

                <Styled.InputGroup>
                    <Form.Field>
                        <Form.Label>Royalties*</Form.Label>
                        <Form.Input
                            control={control}
                            name="royalties"
                            type="number"
                            rules={{ maxLength: 2, max: 90 }}
                            onChange={handleRoyaltiesInputChange}
                            placeholder="%"
                        />
                        {errors.royalties && <Form.Error>{errors.royalties.message}</Form.Error>}
                    </Form.Field>
                    <Styled.TypographyStyled variant="body1" color={theme.color.whiteAlpha.a60}>
                        {`Each buy/sell transaction of your Creature NFT will give you a percentage share of the transactions`}
                    </Styled.TypographyStyled>
                </Styled.InputGroup>

                <Styled.TypographyStyled variant="body2" color={theme.color.whiteAlpha.a60}>
                    <>
                        *Royalties work only on certain marketplaces.
                        <br />
                        Until we roll out our Wannabe Marketplace we cannot make sure you will
                        receive your royalties.
                    </>
                </Styled.TypographyStyled>
                <Styled.Actions>
                    <Button secondary onClick={hide} disabled={pending} label="Don't Mint" />
                    {SubmitBtn}
                </Styled.Actions>
            </Styled.MintUp>
        </Modal>
    );
};

export const MintNFTCreaturePopup = React.memo(MintNFTCreaturePopupRaw);
