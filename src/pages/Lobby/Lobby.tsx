import { useParams } from 'react-router-dom';

export const LobbyPage = () => {
    const { id = '' } = useParams<{ id: string }>();

    console.log(id);

    return null;
};
