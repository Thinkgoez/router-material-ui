import { Box, CssBaseline, Drawer, makeStyles, MenuItem, MenuList, Typography } from "@material-ui/core";
import { Switch, Route, Link, useRouteMatch, useLocation } from "react-router-dom";
import React from "react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
        alignItems: 'stretch',
        position: 'relative',
        minHeight: 200,
    },
    menuList: {
        minWidth: 150,
        overflow: 'auto',
        marginTop: 64
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
    },
    flexMenuList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    }
}))

export default function MatchParams() {
    let { path, url } = useRouteMatch()
    let { pathname } = useLocation()
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <MenuList className={classes.menuList}>
                    <MenuItem component={Link} to={`${url}`} selected={`${url}` === pathname}>Home</MenuItem>
                    <MenuItem component={Link} to={`${url}/about`} selected={`${url}/about` === pathname}>About</MenuItem>
                    <MenuItem component={Link} to={`${url}/topics`} selected={pathname.includes(`${url}/topics`)}>Topics</MenuItem>
                </MenuList>
            </Drawer>
            <main className={classes.content}>
                <Box p={3}>
                    <Switch>
                        <Route path={`${path}/about`} component={About} />
                        <Route path={`${path}/topics`} component={Topics} />
                        <Route path={`${path}/`} component={Home} />
                    </Switch>
                </Box>
            </main>
        </div>
    );
}

const Home = () => <Typography variant='h4' gutterBottom>Home</Typography>
const About = () => <Typography variant='h4' gutterBottom>About</Typography>

function Topics({ match }) {
    let { pathname } = useLocation()
    let { url, path } = match;

    return (
        <div>
        <Typography variant='h4' gutterBottom>Topics</Typography>
            <div>
                <MenuList style={{ display: 'flex' }} >
                    <MenuItem component={Link} to={`${url}/components`} selected={`${url}/components` === pathname}>Components</MenuItem>
                    <MenuItem component={Link} to={`${url}/props-v-state`} selected={`${url}/props-v-state` === pathname}>Props v. State</MenuItem>
                </MenuList>
            </div>

            <Switch>
                <Route path={`${path}/:topicId`} component={Topic} />
                <Route path={path}><Typography color='textSecondary' variant='h5'>Please select a topic.</Typography></Route>
            </Switch>
        </div>
    );
}

const Topic = ({ match }) => <Typography variant='h5'>Requested topic ID: {match.params.topicId}</Typography>