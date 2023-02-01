import ReactGA from 'react-ga4';
import { useRoutes } from 'react-router-dom';

import { routes as routesObj } from '@/routing/routes';
import { MainTemplate } from '@/templates/MainTemplate';

const { VITE_REACT_GA_TRACKING_ID: REACT_GA_TRACKING_ID } = import.meta.env;

function App() {
    ReactGA.initialize(REACT_GA_TRACKING_ID);
    ReactGA.send('pageview');

    const routes = useRoutes(routesObj);

    return <MainTemplate>{routes}</MainTemplate>;
}

export default App;
