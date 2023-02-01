import { memo, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button } from '@/components/atoms/Button';
import { Modal } from '@/components/atoms/Modal';
import { Typography } from '@/components/atoms/Typography';
import { Form } from '@/components/molecules/Form';
import { NOTIFICATION_TYPE } from '@/components/molecules/NotificationBar/NotificationBar.types';
import { useLogout } from '@/hooks/auth/useLogout';
import { useNotification } from '@/hooks/useNotification';
import { IPopupProps } from '@/interfaces/Popup';
import { editPersonalDataSchema } from '@/schemas/edit-personal-data';
import { useTypedDispatch, useTypedSelector } from '@/store';
import { useUpdateUserMutation } from '@/store/services/creatureRacer.service';
import { assignUser, selectCurrentUser } from '@/store/slices/account.slice';
import { ApiError } from '@/types/error';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Styled from './EditPersonalData.styles';
import { IEditPersonalDataForm } from './EditPersonalData.types';

const validationOpt = { resolver: yupResolver(editPersonalDataSchema) };

const EditPersonalDataPopupRaw = ({ hide }: IPopupProps) => {
    const { logout } = useLogout();
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
    const { notification, setNotification } = useNotification();
    const currentUser = useTypedSelector(selectCurrentUser);
    const dispatch = useTypedDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IEditPersonalDataForm>(validationOpt);

    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const onSubmit = handleSubmit(async (userData) => {
        const { firstName, lastName, email, nick } = currentUser;
        try {
            const user = {
                firstName,
                lastName,
                email: userData.email || email,
                nick: userData.nick || nick,
            };
            const data = await updateUser(user).unwrap();
            dispatch(assignUser(data));
            setIsSuccessfullySubmitted(true);
            setNotification({
                type: NOTIFICATION_TYPE.SUCCESS,
                message: 'Your personal data has been sucessfully saved',
            });

            if (userData.email && userData.email !== email) {
                toast.info('Please log in again to continue.');
                logout({ keepToasts: true });
            }

            reset();
        } catch (err) {
            const error = err as ApiError;
            setIsSuccessfullySubmitted(false);
            setNotification({
                type: NOTIFICATION_TYPE.ERROR,
                message: error.data?.title || 'Error occured. Contact us.',
            });
        }
    });

    const SubmitBtn = useMemo(() => {
        const text = isSuccessfullySubmitted ? 'OK' : 'Save data';
        const handleClick = isSuccessfullySubmitted ? hide : onSubmit;

        return (
            <Button
                primary
                onClick={handleClick}
                label={isLoading ? 'Saving...' : text}
                disabled={isLoading}
            />
        );
    }, [hide, isLoading, isSuccessfullySubmitted, onSubmit]);

    return (
        <Modal hideModal={hide}>
            <Styled.EditPersonalData>
                <Typography variant="h2" weight="bold">
                    Edit personal data
                </Typography>
                <Styled.InputGroup>
                    <Form.Field>
                        <Form.Label>Change nickname</Form.Label>
                        <Form.Input
                            control={control}
                            name="nick"
                            type="text"
                            placeholder="Enter new nickname"
                        />
                        {errors.nick && <Form.Error>{errors.nick.message}</Form.Error>}
                    </Form.Field>
                </Styled.InputGroup>
                <Styled.InputGroup>
                    <Form.Field>
                        <Form.Label>Change e-mail</Form.Label>
                        <Form.Input
                            control={control}
                            name="email"
                            type="email"
                            placeholder="Enter new address e-mail"
                        />
                        {errors.email && <Form.Error>{errors.email.message}</Form.Error>}
                    </Form.Field>
                </Styled.InputGroup>
                {errors.nickOrEmail && <Form.Error>{errors.nickOrEmail.message}</Form.Error>}
                {notification && (
                    <Modal.NotificationBar
                        type={notification.type}
                        message={notification.message}
                    />
                )}
                <Styled.Actions>
                    <Button secondary onClick={hide} label="Cancel" />
                    {SubmitBtn}
                </Styled.Actions>
            </Styled.EditPersonalData>
        </Modal>
    );
};

export const EditPersonalDataPopup = memo(EditPersonalDataPopupRaw);
