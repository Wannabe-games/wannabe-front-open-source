import 'react-toastify/dist/ReactToastify.min.css';

import React from 'react';
import { ModalProvider } from 'react-modal-hook';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import { Body } from '@/components/organisms/Body';
import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';
import UserMiddleware from '@/store/middlewares/user.middleware';
import ZonedRedirectMiddleware from '@/store/middlewares/zonedRedirect.middleware';
import GlobalStyle from '@/theme/globalStyle';
import { theme } from '@/theme/mainTheme';

import * as Styled from './MainTemplate.styles';

export const MainTemplate = ({ children }: { children: React.ReactNode }) => (
    <React.Fragment>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Styled.Wrapper>
                <ToastContainer theme="dark" position="bottom-right" newestOnTop />
                <UserMiddleware>
                    <ZonedRedirectMiddleware>
                        <ModalProvider>
                            <Header />
                            <Body>{children}</Body>

                            <Footer />
                        </ModalProvider>
                    </ZonedRedirectMiddleware>
                </UserMiddleware>
            </Styled.Wrapper>
        </ThemeProvider>
    </React.Fragment>
);
