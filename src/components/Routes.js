import { Route, Switch } from 'react-router-dom';
import { Second } from "./Second.js";
import Home from "./Home.js";

export default function Routes(props) {

    return (
        <Switch>
            <Route exact path="/" ><Home {...props} /> </Route>
            <Route exact path="/second" > <Second {...props} /></Route>
        </Switch >
    );
}