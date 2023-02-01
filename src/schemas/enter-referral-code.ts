import * as yup from 'yup';

export const enterReferralCodeSchema = yup.object({
    refCode: yup
        .string()
        .when({
            is: (value: string) => value?.length > 0,
            then: yup.string().min(4, 'Referral code should be at least 4 characters'),
        })
        .max(150, 'Referral code should be at most 150 characters')
        .notRequired()
        .default(undefined),
});
