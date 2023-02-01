import frogSrc from '@/assets/img/frog-lose.png';
import giraffeSrc from '@/assets/img/giraffe-lose.png';
import rhinoSrc from '@/assets/img/rhino-lose.png';
import { Typography } from '@/components/atoms/Typography';
import history from '@/customHistory';

import * as Styled from './NotFound.styles';

export const NotFoundPage = () => (
    <Styled.NotFound style={{ color: '#fff' }}>
        <Styled.Container>
            <Typography variant="h1" weight="bold">
                404
            </Typography>
            <Typography variant="h5">Page not found</Typography>
            <Styled.GoBackButton primary label="Go back" onClick={history.back} />
        </Styled.Container>
        <Styled.Frog src={frogSrc} />
        <Styled.Giraffe src={giraffeSrc} />
        <Styled.Rhino src={rhinoSrc} />
    </Styled.NotFound>
);
