import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";


import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function Example1({ match }) {
    let { url } = match
    const classes = useStyles();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Router basename={url}>
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                    variant='standart'
                >
                    <Tab label={<Link to='/'>Home</Link>} />
                    <Tab label={<Link to='/about'>About</Link>} />
                    <Tab label={<Link to='/users'>Users</Link>} />
                </Tabs>
                <Box p={3}>
                    <Switch>
                        <Route path='/about'><About /></Route>
                        <Route path='/users'><Users /></Route>
                        <Route path='/'><Home /></Route>
                    </Switch>
                </Box>
            </div>
        </Router>
    );
}

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Users = () => <h2>Users</h2>