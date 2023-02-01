import { Typography } from '@/components/atoms/Typography';
import { CreatureCard } from '@/components/molecules/CreatureCard';
import { WizzPanel } from '@/components/molecules/WizzPanel';
import { useGetRegistrationCreatures } from '@/hooks/useGetRegistrationCreatures';
import { useTypedSelector } from '@/store';
import { AccountState } from '@/store/slices/account.slice';

import * as Styled from './RegisterStep3.styles';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

// TODO: handle error, loading state
export const RegisterPageStep3 = () => {
    const { user } = useTypedSelector<AccountState>((state) => state.account);
    const fromReferral = user?.fromReferralNft?.refCode;
    const { creatures, isFetching } = useGetRegistrationCreatures(!!fromReferral);

    if (isFetching) {
        return null;
    }

    return (
        <Styled.Container>
            <WizzPanel steps={steps} activeStep={3} />
            <Styled.RegisterPageStep3>
                <Typography variant="h1" weight="bold" color="#F6C944">
                    Step 3
                </Typography>
                <Typography variant="h1" weight="bold">
                    Pick your Creature
                </Typography>
                <Typography variant="h3">
                    buy and upgrade your creature or select one for free
                </Typography>
            </Styled.RegisterPageStep3>
            <Styled.CreaturesList>
                {creatures.map((creature) => (
                    <CreatureCard key={creature.id} creature={creature} />
                ))}
            </Styled.CreaturesList>
        </Styled.Container>
    );
};
