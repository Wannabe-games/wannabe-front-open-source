import { Controller, FieldValues } from 'react-hook-form';

import { Input as InputComponent } from '@/components/atoms/Input';

import * as Styled from './Form.styles';
import { IFormProps, IInputProps } from './Form.types';

export const Form = ({ children, className }: IFormProps) => {
    return <Styled.Form className={className}>{children}</Styled.Form>;
};

const Input = <T extends FieldValues>({
    control,
    name,
    type,
    placeholder,
    defaultValue,
    error,
    rules,
    autoComplete = 'off',
    className,
    onChange: callback,
    disabled,
}: IInputProps<T>) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            defaultValue={defaultValue}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, onChange, ...field } }) => {
                const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (callback) {
                        return onChange(callback(e));
                    }

                    return onChange(e);
                };

                return (
                    <InputComponent
                        type={type}
                        required
                        error={error}
                        placeholder={placeholder}
                        value={value || ''}
                        autoComplete={autoComplete}
                        className={className}
                        onChange={handleOnChange}
                        disabled={disabled}
                        {...field}
                    />
                );
            }}
        />
    );
};

Form.Input = Input;
Form.Error = Styled.FormError;
Form.Field = Styled.FormField;
Form.Label = Styled.FormLabel;
