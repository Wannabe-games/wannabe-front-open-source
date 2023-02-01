import { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    register?: UseFormRegister<FormData>;
    error?: boolean;
}
