import { NavLink, Route, Switch } from 'react-router-dom';
import { AppBar, Button, Container, makeStyles, Toolbar } from '@material-ui/core';
import './App.css'

import SimpleRouting from './components/SimpleRouting';
import MatchParams from './components/MatchParams';
import Example from './components/Example';
import ModalGallery from './components/ModalGallery';

const PAGES = [
  { title: 'home', path: '/', content: 'Home' },
  { title: 'example', path: '/example', content: 'Example with testing posibility' },
  { title: 'matchparams', path: '/matchparams', content: 'Example with match & params' },
  { title: 'routing', path: '/routing', content: 'Simple Routing' },
  { title: 'modalg', path: '/modalg', content: 'Modal Gallery' },
]

const useStyles = makeStyles((theme) => ({
  navlinkText: {
    color: 'white'
  },
  navbar: {
    justifyContent: 'space-between'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  main: {
    marginTop: 64
  }
}));

export default function App(props) {
  const classes = useStyles();
  return (
    <>
      <AppBar position='fixed' className={classes.appBar}>
        <Container fixed >
          <Toolbar className={classes.navbar}>
            {PAGES.map((page) => (
              <NavLink to={page.path} key={page.title}>
                <Button classes={{ text: classes.navlinkText }}>{page.content}</Button>
              </NavLink>
            ))}
          </Toolbar>
        </Container>
      </AppBar>
      <main className={classes.main}>
        <Switch>
          <Route path='/' exact>Welcome to main page</Route>
          <Route path='/example' component={Example} />
          <Route path='/matchparams' component={MatchParams} />
          <Route path='/routing' component={SimpleRouting} />
          <Route path='/modalg' component={ModalGallery} />
          <Route path='*'>404 eeeeeeee</Route>
        </Switch>
      </main>
    </>
  );
}