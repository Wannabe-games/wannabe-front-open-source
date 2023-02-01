import { useCallback } from 'react';

import { useSetActiveInGameMutation } from '@/store/services/creatureRacer.service';

// TODO: check dependency array

export const useSetActiveInGame = (id?: string, isStaked = false) => {
    const [setActiveInGame, { isLoading }] = useSetActiveInGameMutation();

    const handleSetActiveInGame = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!id) {
            return;
        }

        const setActive = async () => {
            const params = { creatureId: id, isActive: e.target.checked };

            !isStaked && (await setActiveInGame(params));
        };

        setActive();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { handleSetActiveInGame, isLoading };
};
