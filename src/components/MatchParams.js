import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

export default function MatchParams({ match }) {
    let { url } = match;
    return (
        <Router basename={url}>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/topics'>Topics</Link></li>
            </ul>
            <Switch>
                <Route path='/about' component={About} />
                <Route path='/topics' component={Topics} />
                <Route path='/' component={Home} />
            </Switch>
        </Router>
    );
}

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>

function Topics({ match }) {
    let { url, path } = match;

    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li><Link to={`${url}/components`}>Components</Link></li>
                <li><Link to={`${url}/props-v-state`}>Props v. State</Link></li>
            </ul>
            <Switch>
                <Route path={`${path}/:topicId`} component={Topic} />
                <Route path={path}><h3>Please select a topic.</h3></Route>
            </Switch>
        </div>
    );
}

const Topic = ({ match }) => <h3>Requested topic ID: {match.params.topicId}</h3>
