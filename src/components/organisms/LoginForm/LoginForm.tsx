import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Form } from '@/components/molecules/Form';
import { NotificationBar } from '@/components/molecules/NotificationBar';
import { NOTIFICATION_TYPE } from '@/components/molecules/NotificationBar/NotificationBar.types';
import { TokenIn } from '@/interfaces/user/TokenIn';
import { ROUTE } from '@/routing/routes.types';
import { useTypedDispatch } from '@/store';
import { useTokenMutation } from '@/store/services/creatureRacer.service';
import { storeToken } from '@/store/slices/auth.slice';
import { ApiError } from '@/types/error';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Styled from './LoginForm.styles';

const formSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(4, 'Password length should be at least 4 characters'),
});

const validationOpt = { resolver: yupResolver(formSchema) };

export const LoginForm = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<TokenIn>(validationOpt);

    const [login, { isLoading }] = useTokenMutation();

    const onSubmit = handleSubmit(async (credentials) => {
        try {
            const data = await login(credentials).unwrap();
            dispatch(storeToken(data));
            navigate(ROUTE.REGISTER_STEP3);
        } catch (err) {
            const error = err as ApiError;

            setError('apiError', {
                type: 'manual',
                message: error.data?.message || 'Error occured. Contact us.',
            });
        }
    });

    return (
        <Styled.LoginForm>
            <Typography variant="h1" weight="bold">
                Sign in
            </Typography>
            <Styled.Subtitle variant="h3">and mint your Creatures NFT!</Styled.Subtitle>

            <Form.Input
                control={control}
                name="email"
                type="text"
                placeholder="E-mail"
                autoComplete="off"
                required
            />
            {errors.email && <Form.Error>{errors.email.message}</Form.Error>}

            <Form.Input
                control={control}
                name="password"
                type="password"
                placeholder="Password"
                required
            />
            {errors.password && <Form.Error>{errors.password.message}</Form.Error>}

            {errors.apiError?.message && (
                <NotificationBar message={errors.apiError.message} type={NOTIFICATION_TYPE.ERROR} />
            )}

            <Styled.LoginFormActions>
                <Button
                    primary
                    onClick={onSubmit}
                    label={isLoading ? 'Wait...' : 'Log in'}
                    disabled={isLoading}
                    type="submit"
                />
                {/* <Typography variant="h6" color="#F6C944">
                    Forgot password
                </Typography> */}
            </Styled.LoginFormActions>
        </Styled.LoginForm>
    );
};
