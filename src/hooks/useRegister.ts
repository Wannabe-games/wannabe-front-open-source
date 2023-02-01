import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
    ICredentials,
    IRegisterForm,
} from '@/components/organisms/RegisterForm/RegisterForm.types';
import { ROUTE } from '@/routing/routes.types';
import { registerFormSchema } from '@/schemas/register';
import { useTypedDispatch } from '@/store';
import { useRegistryMutation } from '@/store/services/creatureRacer.service';
import { storeToken } from '@/store/slices/auth.slice';
import { ApiError } from '@/types/error';
import { yupResolver } from '@hookform/resolvers/yup';

const validationOpt = { resolver: yupResolver(registerFormSchema) };

export const useRegister = () => {
    const [credentials, setCredentials] = useState<ICredentials>({
        passwordConfirm: '',
        apiError: undefined,
        nick: '',
        email: '',
        password: '',
    });
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isValid, isSubmitted },
    } = useForm<IRegisterForm>(validationOpt);

    const [registry, { isLoading }] = useRegistryMutation();

    const handleRegister = async () => {
        const { nick, email, password } = credentials;

        try {
            const data = await registry({ nick, email, password }).unwrap();
            dispatch(storeToken(data));
            navigate(ROUTE.REGISTER_STEP2);
        } catch (err) {
            const error = err as ApiError;

            setError('apiError', {
                type: 'manual',
                message: error.data?.title || 'Error occured. Contact us.',
            });
        }
    };

    const onSubmit = handleSubmit((credentials) => {
        setCredentials(credentials);
    });

    return {
        control,
        isValid,
        errors,
        isLoading,
        onRegister: handleRegister,
        onSubmit,
        isSubmitted,
    };
};
