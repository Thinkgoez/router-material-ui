import {
    BrowserRouter as Router,
    Switch, Route, Link, NavLink
} from "react-router-dom";

export default function Example({ match }) {
    let { url } = match

    // let history = useHistory();
    // let match = useRouteMatch();
    // let location = useLocation();
    // let params = useParams();
    // console.log('params:', params);
    // console.log('history:', history);
    // console.log('location:', location);
    // console.log('match:', match);

    // function handleClick() { history.push(url) }
    return (
        <Router basename={url}>
            <button><Link to='/'>Home</Link></button>
            <Switch>
                <Route exact path='/'>
                    Main page
                    <NavLink to='/blog/2'>FAQs</NavLink>
                    <Link to='/blog/1'>1 blog</Link>
                </Route>
                <Route path='/blog/:slug' component={BlogPost} />
            </Switch>
        </Router>
    );
}

function BlogPost({match}) {
    let { slug } = match.params;
    return(
        <>
            <NavLink to={`/blog/2`} activeStyle={{ fontWeight: "bold", color: "green" }}>FAQs</NavLink>
            <div>Now showing post {slug}</div>
        </>
    )
}