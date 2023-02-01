// TODO:

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/atoms/Button';
import { Modal } from '@/components/atoms/Modal';
import { Tooltip } from '@/components/atoms/Tooltip';
import { Typography } from '@/components/atoms/Typography';
import { Form } from '@/components/molecules/Form';
import { IPopupProps } from '@/interfaces/Popup';
import { createNewLobbySchema } from '@/schemas/create-new-lobby';
import { theme } from '@/theme/mainTheme';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Styled from './CreateNewLobby.styles';
import { ICreateNewLobbyDataForm } from './CreateNewLobby.types';

const validationOpt = { resolver: yupResolver(createNewLobbySchema) };

const createNewLobbyTooltip =
    'Once created, the bet will be inactive until the owner has filled the bet. You can only have one inactive bet.';

export const CreateNewLobbyPopup = ({ hide }: IPopupProps) => {
    const [pending, setPending] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ICreateNewLobbyDataForm>(validationOpt);

    // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
    const submitAction = async (data: ICreateNewLobbyDataForm) => {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    };

    const onSubmit = handleSubmit(async (data) => {
        setPending(true);
        const created = await submitAction(data);
        setPending(false);

        if (created) {
            hide();
        }
    });

    const SubmitBtn = useMemo(() => {
        return (
            <Button
                primary
                onClick={onSubmit}
                label={pending ? 'Saving...' : 'Create'}
                disabled={pending}
            />
        );
    }, [onSubmit, pending]);

    const tooltip = () => {
        return (
            <Typography variant="body2" weight="regular" color={theme.color.whiteAlpha.a60}>
                {createNewLobbyTooltip}
            </Typography>
        );
    };

    return (
        <Modal hideModal={hide}>
            <Styled.CreateNewLobby>
                <Styled.TypographyStyled variant="h2" weight="bold">
                    Create new lobby{' '}
                    <Tooltip
                        element={tooltip()}
                        sx={16.4}
                        iconSize={21}
                        left="0.7rem"
                        toolTipPosition="top"
                    />
                </Styled.TypographyStyled>
                <Styled.InputGroup>
                    <Form.Field>
                        <Form.Label>Bet value</Form.Label>
                        <Form.Input
                            control={control}
                            name="stxAmount"
                            type="text"
                            placeholder="Enter your bet value"
                        />
                        {errors.stxAmount && <Form.Error>{errors.stxAmount.message}</Form.Error>}
                    </Form.Field>
                </Styled.InputGroup>

                <Styled.Actions>
                    <Button secondary onClick={hide} label="Cancel" />
                    {SubmitBtn}
                </Styled.Actions>
            </Styled.CreateNewLobby>
        </Modal>
    );
};
