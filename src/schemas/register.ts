import * as Yup from 'yup';

export const registerFormSchema = Yup.object().shape({
    nick: Yup.string(),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(4, 'Password length should be at least 4 characters'),
    passwordConfirm: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must and should match'),
});
