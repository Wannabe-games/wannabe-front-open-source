import mincapStatsSrc from '@/assets/img/shorts/dragon.png';
import { ROUTE } from '@/routing/routes.types';

import { Short } from '../Short';

export const MincapStats = () => (
    <Short>
        <Short.Header>Mincap Stats</Short.Header>
        <Short.Subheader>Browse availability</Short.Subheader>
        <Short.Button secondary label={'Compare'} route={ROUTE.MINTCAP_STATISTICS} />
        <img
            src={mincapStatsSrc}
            style={{ width: '20rem', position: 'absolute', right: '-3.8rem', bottom: 0 }}
        />
    </Short>
);
