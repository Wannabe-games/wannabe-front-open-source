import * as yup from 'yup';

export const createNewLobbySchema = yup.object().shape({
    stxAmount: yup
        .string()
        .required('Bet value is required')
        .min(1, 'Bet value should be at least 1 STX')
        .max(25, 'Bet value should be at most 25 STX'),
});
