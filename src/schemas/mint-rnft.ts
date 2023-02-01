import * as yup from 'yup';

export const mintNFTReferralSchema = yup.object().shape({
    refCode: yup
        .string()
        .required('Referral code is required')
        .min(4, 'Referral code should be at least 4 characters')
        .max(150, 'Referral code should be at most 150 characters'),
});
