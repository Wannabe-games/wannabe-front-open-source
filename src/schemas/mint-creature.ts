import * as yup from 'yup';

export const mintNFTCreatureSchema = yup.object().shape({
    name: yup
        .string()
        .required('Name is required')
        .min(4, 'Name should be at least 4 characters')
        .max(32, 'Name should be at most 32 characters'),
    royalties: yup
        .number()
        .required('Royalties are required')
        .min(1, 'Royalties should be at least 1 digit')
        .lessThan(91, 'Royalties max value is 90'),
});
