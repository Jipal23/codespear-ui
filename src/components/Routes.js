import { Route, Switch } from 'react-router-dom';
import { LoanApplicationForm } from "./LoanApplicationForm.js";
import Home from "./Home.js";
import MobileLogin from './MobileLogin.js';
import { ApplicationStatus } from './ApplicationStatus.js';
import VideoRecorder from './VideoKyc.js';
import Logout from './Logout.js';

export default function Routes(props) {

    return (
        <Switch>
            <Route exact path="/" ><Home {...props} /> </Route>
            <Route exact path="/form" > <LoanApplicationForm {...props} /></Route>
            <Route exact path="/login" > <MobileLogin {...props} /></Route>
            <Route exact path="/status"><ApplicationStatus /></Route>
            <Route exact path="/videokyc"><VideoRecorder /></Route>
            <Route exact path="/logout"><Logout/></Route>

        </Switch >
    );
}