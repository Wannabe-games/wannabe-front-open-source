import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export function useFormWithSchema<T extends yup.AnyObjectSchema>(
    schema: T,
    useFormProps?: UseFormProps<yup.Asserts<T>>,
): UseFormReturn<yup.Asserts<T>> {
    return useForm({ ...useFormProps, resolver: yupResolver(schema) });
}
