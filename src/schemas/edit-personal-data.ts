import * as yup from 'yup';

export const editPersonalDataSchema = yup
    .object({
        nick: yup
            .string()
            .notRequired()
            .when({
                is: (value: string) => value?.length,
                then: (rule) => rule.min(3),
            }),
        email: yup.string().when({
            is: (value: string) => value?.length,
            then: (rule) => rule.email('Invalid email format'),
        }),
    })
    .test((value) => {
        if (value.nick || value.email) {
            return true;
        }

        return new yup.ValidationError('At least one field must be filled.', null, 'nickOrEmail');
    });
