import tigerSrc from '@/assets/img/shorts/tiger.png';
import { Typography } from '@/components/atoms/Typography';
import { useGetUserCreatures } from '@/hooks/useGetUserCreatures';
import { ROUTE } from '@/routing/routes.types';
import { theme } from '@/theme/mainTheme';

import { Short } from '../Short';
import * as Styled from './MyPets.styles';

export const MyPets = () => {
    const { totalResults: creaturesAmount } = useGetUserCreatures();

    return (
        <Short>
            <Short.Header>My Pets</Short.Header>
            <Typography variant="h6" color={theme.color.whiteAlpha.a60}>
                check all your creatures
            </Typography>

            <Styled.AllPetsWrapper>
                <Short.ButtonWrapper>
                    <Short.Button secondary label={'View all'} route={ROUTE.MY_PETS} />
                </Short.ButtonWrapper>
                <Typography variant="body1" color={theme.color.whiteAlpha.a60}>
                    ({creaturesAmount})
                </Typography>
            </Styled.AllPetsWrapper>
            <img
                src={tigerSrc}
                style={{
                    width: '22rem',
                    position: 'absolute',
                    right: '-5rem',
                    bottom: '-2rem',
                }}
            />
        </Short>
    );
};
