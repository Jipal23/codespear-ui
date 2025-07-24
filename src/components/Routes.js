import { Route, Switch } from 'react-router-dom';
import { Second } from "./Second.js";
import { LoanApplicationForm } from "./LoanApplicationForm.js";
import Home from "./Home.js";

export default function Routes(props) {

    return (
        <Switch>
            <Route exact path="/" ><Home {...props} /> </Route>
            <Route exact path="/second" > <Second {...props} /></Route>
            <Route exact path="/form" > <LoanApplicationForm {...props} /></Route>
        </Switch >
    );
}