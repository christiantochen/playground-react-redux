import 'tw-elements';
import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import store from './store/configureStore';

import AppContextProvider from './contexts/AppContextProvider';

import Routes from './Routes';

(async () => {
    ReactDOM.render(
        <React.StrictMode>
            <ReduxProvider store={store}>
                <AppContextProvider>
                    <Routes />
                </AppContextProvider>
            </ReduxProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
})();
