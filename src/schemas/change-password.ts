import * as yup from 'yup';

export const changePasswordSchema = yup.object().shape({
    newPassword: yup
        .string()
        .required('New password is required')
        .min(4, 'Password length should be at least 4 characters'),
    newPasswordConfirm: yup
        .string()
        .required('Confirm password is required')
        .oneOf([yup.ref('newPassword')], 'Passwords must and should match'),
});
