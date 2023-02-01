import { Navigate, useParams } from 'react-router-dom';

import { CreatureProfile } from '@/components/organisms/CreatureProfile';
import { useGetCreatureDetails } from '@/hooks/useGetCreatureDetails';
import { useGetUserCreatures } from '@/hooks/useGetUserCreatures';
import { ROUTE } from '@/routing/routes.types';

export const CreatureProfilePage = () => {
    const { id = '' } = useParams<{ id: string }>();

    const {
        creatures: allCreatures,
        isLoading: isLoadingAllCreatures,
        filters,
        selectedFilter,
        handleFilterChange,
    } = useGetUserCreatures();

    const {
        creature,
        error: creatureError,
        isLoading: isLoadingCreature,
    } = useGetCreatureDetails(id);

    if (isLoadingCreature || isLoadingAllCreatures) {
        return null;
    }

    if (!creature || creatureError) {
        return <Navigate to={ROUTE.NOT_FOUND} replace />;
    }

    return (
        <CreatureProfile
            creature={creature}
            allCreatures={allCreatures}
            filters={filters}
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
        />
    );
};
