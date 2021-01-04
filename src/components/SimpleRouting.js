import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

export default function Example1({ match }) {
    let { url } = match
    return (
        <Router basename={url}>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/users'>Users</Link></li>
            </ul>
            <Switch>
                <Route path='/about'><About /></Route>
                <Route path='/users'><Users /></Route>
                <Route path='/'><Home /></Route>
            </Switch>
        </Router>
    );
}

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Users = () => <h2>Users</h2>