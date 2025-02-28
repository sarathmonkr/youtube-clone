import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutContainer from '../Components/Layout';
import { lazy, Suspense } from 'react';
import WelcomeAnimation from '../Components/WelcomeAnimation';
const VideosList = lazy(() => import('../Pages/VideosList'));
const ViewVideo = lazy(() => import('../Pages/ViewVideo'));

const routes = [
    {
        path: '/',
        component: VideosList,
    },
    {
        path: '/view-video/:id',
        component: ViewVideo
    }
]

const RoutesHandler = () => {
    return (
        <Router>
            <Suspense fallback={<WelcomeAnimation />}>
                <Routes>
                    <Route element={<LayoutContainer />} >
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={<route.component />}
                            />
                        ))}
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default RoutesHandler;
