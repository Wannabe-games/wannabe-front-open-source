import { LoginForm } from '@/components/organisms/LoginForm';

import * as Styled from './Login.styles';

export const LoginPage = () => {
    return (
        <>
            <Styled.LoginPage>
                <LoginForm />
            </Styled.LoginPage>
            <Styled.FooterSpacer />
        </>
    );
};
