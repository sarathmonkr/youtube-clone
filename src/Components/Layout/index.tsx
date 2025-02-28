import React, { useState, useEffect, Fragment } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';
import WelcomeAnimation from '../WelcomeAnimation';

const LayoutContainer: React.FC = () => {
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='min-h-screen flex flex-col'>
            {showWelcome ? (<WelcomeAnimation />) : (
                <Fragment>
                    <Header />
                    <main className="main-content">
                        <Outlet />
                    </main>
                    <Footer />
                </Fragment>
            )}
        </div>
    );
}

export default LayoutContainer;