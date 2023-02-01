import { RegistryIn } from '@/interfaces/user/RegistryIn';

export interface IRegisterForm extends RegistryIn {
    passwordConfirm: string;
    apiError?: string;
}

export interface ICredentials {
    passwordConfirm: string;
    apiError?: string | undefined;
    nick: string;
    email: string;
    password: string;
}
