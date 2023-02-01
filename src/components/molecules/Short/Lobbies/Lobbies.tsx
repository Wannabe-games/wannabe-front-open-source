import birdSrc from '@/assets/img/shorts/bird.png';
import { ROUTE } from '@/routing/routes.types';

import { Short } from '../Short';

export const Lobbies = () => (
    <Short>
        <Short.Header>Flappy Pets</Short.Header>
        <Short.Subheader>Win racing bets</Short.Subheader>
        <Short.Button primary label={'Go to lobbies'} route={ROUTE.LOBBIES} />
        <img
            src={birdSrc}
            style={{ width: '16.5rem', position: 'absolute', right: '-3.8rem', bottom: '-0.5rem' }}
        />
    </Short>
);
