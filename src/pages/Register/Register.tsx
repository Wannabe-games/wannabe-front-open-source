import { Typography } from '@/components/atoms/Typography';
import { WizzPanel } from '@/components/molecules/WizzPanel';
import { RegisterForm } from '@/components/organisms/RegisterForm';

import * as Styled from './Register.styles';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

export const RegisterPage = () => {
    return (
        <Styled.Container>
            <WizzPanel steps={steps} activeStep={1} />

            <Styled.RegisterPage>
                <Styled.RegisterForm>
                    <Styled.Title variant="h1" weight="bold" color="#F6C944">
                        Step 1
                    </Styled.Title>
                    <Typography variant="h1" weight="bold">
                        Create an account
                    </Typography>

                    <RegisterForm />
                </Styled.RegisterForm>
            </Styled.RegisterPage>
        </Styled.Container>
    );
};
