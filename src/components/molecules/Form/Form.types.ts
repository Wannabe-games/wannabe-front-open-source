import { FieldValues, UseControllerProps } from 'react-hook-form';

export interface IFormProps {
    children: React.ReactNode;
    className?: string;
}

export interface IInputProps<T extends FieldValues> extends UseControllerProps<T> {
    autoComplete?: string;
    className?: string;
    error?: boolean;
    placeholder?: string;
    required?: boolean;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => string;
    disabled?: boolean;
}
