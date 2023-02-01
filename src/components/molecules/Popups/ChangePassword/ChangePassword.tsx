import { memo, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button } from '@/components/atoms/Button';
import { Modal } from '@/components/atoms/Modal';
import { Form } from '@/components/molecules/Form';
import { NOTIFICATION_TYPE } from '@/components/molecules/NotificationBar/NotificationBar.types';
import { useLogout } from '@/hooks/auth/useLogout';
import { useNotification } from '@/hooks/useNotification';
import { IPopupProps } from '@/interfaces/Popup';
import { changePasswordSchema } from '@/schemas/change-password';
import { useTypedDispatch, useTypedSelector } from '@/store';
import { useUpdateUserMutation } from '@/store/services/creatureRacer.service';
import { assignUser, selectCurrentUser } from '@/store/slices/account.slice';
import { ApiError } from '@/types/error';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Styled from './ChangePassword.styles';
import { IChangePasswordForm } from './ChangePassword.types';

const validationOpt = { resolver: yupResolver(changePasswordSchema) };

const ChangePasswordPopupRaw = ({ hide }: IPopupProps) => {
    const { logout } = useLogout();
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
    const { notification, setNotification } = useNotification();
    const currentUser = useTypedSelector(selectCurrentUser);
    const dispatch = useTypedDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IChangePasswordForm>(validationOpt);

    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const onSubmit = handleSubmit(async (userData) => {
        const { firstName, lastName, email, nick } = currentUser;

        try {
            const user = {
                firstName,
                lastName,
                email,
                nick,
                password: userData.newPassword,
            };
            const data = await updateUser(user).unwrap();
            dispatch(assignUser(data));
            setIsSuccessfullySubmitted(true);
            setNotification({
                type: NOTIFICATION_TYPE.SUCCESS,
                message: 'Your password has been sucessfully saved',
            });

            toast.info('Please log in again to continue.');
            logout({ keepToasts: true });
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
        const text = isSuccessfullySubmitted ? 'OK' : 'Save password';
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
            <Styled.ChangePassword>
                <Styled.TypographyStyled variant="h2" weight="bold">
                    Change password
                </Styled.TypographyStyled>
                <Styled.InputGroup>
                    <Form.Field>
                        <Form.Label>New password</Form.Label>
                        <Form.Input
                            control={control}
                            name="newPassword"
                            type="password"
                            placeholder="Enter new password"
                        />
                        {errors.newPassword && (
                            <Form.Error>{errors.newPassword.message}</Form.Error>
                        )}
                    </Form.Field>
                </Styled.InputGroup>
                <Styled.InputGroup>
                    <Form.Field>
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Input
                            control={control}
                            name="newPasswordConfirm"
                            type="password"
                            placeholder="Confirm password"
                        />
                        {errors.newPasswordConfirm && (
                            <Form.Error>{errors.newPasswordConfirm.message}</Form.Error>
                        )}
                    </Form.Field>
                </Styled.InputGroup>
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
            </Styled.ChangePassword>
        </Modal>
    );
};

export const ChangePasswordPopup = memo(ChangePasswordPopupRaw);
