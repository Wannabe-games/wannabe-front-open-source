import React from 'react';

import { Button } from '@/components/atoms/Button';
import { Tooltip } from '@/components/atoms/Tooltip';
import { Form } from '@/components/molecules/Form';
import { NotificationBar } from '@/components/molecules/NotificationBar';
import { NOTIFICATION_TYPE } from '@/components/molecules/NotificationBar/NotificationBar.types';
import { Agreement } from '@/components/molecules/Popups/Agreement';
import { useModal } from '@/hooks/useModal';
import { useRegister } from '@/hooks/useRegister';

import { NextTooltipContent } from './NextTooltipContent';

export const RegisterForm = () => {
    const { control, onRegister, errors, onSubmit, isLoading, isValid, isSubmitted } =
        useRegister();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit();

        isValid && showAgreementModal();
    };

    const { showModal: showAgreementModal, hideModal: hideAgreementModal } = useModal(() => {
        return <Agreement hide={hideAgreementModal} handleRegister={onRegister} />;
    }, [onRegister]);

    return (
        <Form>
            <Form.Input control={control} name="nick" type="text" placeholder="Nickname" />

            <Form.Input control={control} name="email" type="text" placeholder="E-mail" required />
            {errors.email && <Form.Error>{errors.email.message}</Form.Error>}

            <Form.Input
                control={control}
                name="password"
                type="password"
                placeholder="Password"
                required
            />
            {errors.password && <Form.Error>{errors.password.message}</Form.Error>}

            <Form.Input
                control={control}
                name="passwordConfirm"
                type="password"
                placeholder="Confirm Password"
                required
            />
            {errors.passwordConfirm && <Form.Error>{errors.passwordConfirm.message}</Form.Error>}

            {errors.apiError?.message && (
                <NotificationBar message={errors.apiError.message} type={NOTIFICATION_TYPE.ERROR} />
            )}

            <Button
                secondary
                onClick={handleSubmit}
                type="submit"
                label={isLoading ? 'Wait...' : 'Next'}
                disabled={isLoading || (!isValid && isSubmitted)}
                rightIcon={
                    !isLoading ? (
                        <Tooltip element={<NextTooltipContent />} iconSize={17} sx={22} top="0" />
                    ) : undefined
                }
            />
        </Form>
    );
};
