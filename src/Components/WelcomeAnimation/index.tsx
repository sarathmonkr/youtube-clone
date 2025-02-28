import React from 'react';
import { Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const WelcomeAnimation: React.FC = () => {
    return (
        <div className="welcome-animation vh-100 w-100 d-flex justify-content-center align-items-center">
            <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>
    );
};

export default WelcomeAnimation;
