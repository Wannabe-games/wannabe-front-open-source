import frogSrc from '@/assets/img/frog-lose.png';
import giraffeSrc from '@/assets/img/giraffe-lose.png';
import rhinoSrc from '@/assets/img/rhino-lose.png';
import { Typography } from '@/components/atoms/Typography';

import * as Styled from './InternalServerError.styles';
import { IInternalServerErrorProps } from './InternalServerError.types';

export const InternalServerError = ({
    // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
    error,
    handleTryAgainClick,
    withPadding,
}: IInternalServerErrorProps) => {
    return (
        <Styled.NotFound style={{ color: '#fff' }} withPadding={withPadding}>
            <Typography variant="h1" weight="bold">
                500
            </Typography>
            <Typography variant="h5">Internal Server Error</Typography>
            <Styled.GoBackButton primary label="Try again" onClick={handleTryAgainClick} />
            <Styled.Frog src={frogSrc} />
            <Styled.Giraffe src={giraffeSrc} />
            <Styled.Rhino src={rhinoSrc} />
        </Styled.NotFound>
    );
};
