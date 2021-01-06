import React from 'react'
import {
    Switch,
    Route,
    Link,
    useLocation,
    useRouteMatch,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, MenuList, Box } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    menuList: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

function Example() {
    let { path, url } = useRouteMatch()
    let { pathname } = useLocation()
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <MenuList className={classes.menuList}>
                <MenuItem component={Link} to={`${url}`} selected={`${url}` === pathname}>Home</MenuItem>
                <MenuItem component={Link} to={`${url}/about`} selected={`${url}/about` === pathname}>About</MenuItem>
                <MenuItem component={Link} to={`${url}/users`} selected={`${url}/users` === pathname}>Users</MenuItem>
            </MenuList>
            <Box p={3}>
                <Switch>
                    <Route path={`${path}/about`}><About /></Route>
                    <Route path={`${path}/users`}><Users /></Route>
                    <Route path={`${path}/`}><Home /></Route>
                </Switch>
            </Box>
        </div>
    );
}

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Users = () => <h2>Users</h2>

export default Example