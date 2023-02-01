import GlobalStyle from '../src/theme/globalStyle';
import { theme } from '../src/theme/mainTheme';
import { ThemeProvider } from 'styled-components';
import { MainTemplate } from '../src/templates/MainTemplate';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { ModalProvider } from 'react-modal-hook';

import './styles.css';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [
    (Story) => (
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <ModalProvider>
                        <Story />
                    </ModalProvider>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    ),
];
