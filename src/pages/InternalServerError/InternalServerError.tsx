import { useLocation } from 'react-router-dom';

import { InternalServerError } from '@/components/molecules/InternalServerError';
import history from '@/customHistory';
import { ILocationState } from '@/interfaces/LocationState';
import { ROUTE } from '@/routing/routes.types';
import { useTypedDispatch } from '@/store';
import { creatureRacerApi } from '@/store/services/creatureRacer.service';

export const InternalServerErrorPage = () => {
    const dispatch = useTypedDispatch();
    const location = useLocation();
    const state = location.state as ILocationState;
    const prevPath = state?.from;

    const handleTryAgainClick = async () => {
        const { error } = await dispatch(
            creatureRacerApi.endpoints.getUserCreatures.initiate(null),
        );

        if (!error) {
            if (prevPath) {
                history.replace(prevPath);
            } else {
                history.replace(ROUTE.DASHBOARD);
            }
        }
    };

    return <InternalServerError handleTryAgainClick={handleTryAgainClick} />;
};
