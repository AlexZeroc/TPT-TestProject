import React from 'react';
import App from './App';
import RegistrationRequest from "./components/registrationRequest";
import CommentaryRequest from "./components/commentaryRequest";
import AuthorizationRequest from "./components/authorizationRequest";
import './route.css'
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const RouteApp = () => (
    <div className='route'>
        <Router>
            <div>
                <div className="header">
                    <div className="header-text">
                        <h1 align="center" className="header-text">Test project</h1>
                    </div>
                </div>
                <div className='menu'>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/comment/:id" component={CommentaryRequest}/>
                    <Route exact path="/registration" component={RegistrationRequest}/>
                    <Route exact path="/authorization" component={AuthorizationRequest}/>
                </div>
                <div className="footer">
                </div>
            </div>
        </Router>
    </div>
);

export default RouteApp;