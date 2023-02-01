import { StacksTestnet } from 'micro-stacks/network';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import * as MicroStacks from '@micro-stacks/react';

import App from './App';
import { Debug } from './components/molecules/Debug';
import customHistory from './customHistory';
import { CustomRouter } from './CustomRouter';
import reportWebVitals from './reportWebVitals';
import { store } from './store';

const { VITE_STACKS_TESTNET_URL: TESTNET_URL } = import.meta.env;

const root = createRoot(document.getElementById('root') as HTMLElement);
const network = TESTNET_URL ? new StacksTestnet({ url: TESTNET_URL }) : 'mainnet';

root.render(
    <React.StrictMode>
        <MicroStacks.ClientProvider
            appName="Creature Racer"
            appIconUrl={`${window.location.origin}/static/apple-touch-icon.png`}
            network={network}
            enableNetworkSwitching={!!TESTNET_URL}
        >
            <Debug />
            <Provider store={store}>
                <CustomRouter history={customHistory}>
                    <App />
                </CustomRouter>
            </Provider>
        </MicroStacks.ClientProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
