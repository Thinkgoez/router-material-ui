import { Button, Box, Typography, ButtonGroup, Divider, Container } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import {
    Switch, Route, Link, NavLink, useHistory, useRouteMatch, useLocation
} from "react-router-dom";

export default function Example() {
    let { path, url } = useRouteMatch()


    let history = useHistory();
    // let match = useRouteMatch();
    // let location = useLocation();
    // let params = useParams();
    // console.log('params:', params);
    // console.log('history:', history);
    // console.log('location:', location);
    // console.log('match:', match);

    function handleClick() { history.push(url) }
    return (
        <Container maxWidth="lg">
            <Box p={3}>
                <Button variant='outlined' startIcon={<HomeIcon />} onClick={handleClick}>Home</Button>
                <Divider variant='middle' style={{ margin: '20px 0' }} />
                <Switch>
                    <Route exact path={`${url}`}>
                        <Typography gutterBottom variant='h4'>Main page</Typography>
                        <ButtonGroup variant="text">
                            <Button component={Link} to={`${url}/blog/2`}>FAQs</Button>
                            <Button component={Link} to={`${url}/blog/1`}>1 blog</Button>
                        </ButtonGroup>

                    </Route>
                    <Route path={`${path}/blog/:slug`} component={({ match }) => <BlogPost baseUrl={url} match={match} />} />
                </Switch>
            </Box>
        </Container>
    );
}

function BlogPost({ match, baseUrl, ...props }) {
    let { pathname } = useLocation()
    console.log('12345' - '12');
    let { slug } = match.params;
    let disabled = pathname === `${baseUrl}/blog/2` ? true : false
    let buttonProps = {
        variant: 'contained',
        disabled,
        component: NavLink,
    }
    return (
        <>
            <Button to={`${baseUrl}/blog/2`} {...buttonProps}>FAQs</Button>
            <Typography variant='h5'>Now showing post <b>{slug}</b></Typography>
        </>
    )
}