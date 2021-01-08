import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ImageIcon from '@material-ui/icons/Image';
import PaletteIcon from '@material-ui/icons/Palette';
import {
    Switch,
    Route,
    Link,
    useHistory,
    useLocation,
    useRouteMatch,
    NavLink
} from 'react-router-dom';
import {
    Box, Button, ButtonGroup, Container, Divider, GridList, GridListTile, List, ListItem,
    ListItemIcon, ListItemText, makeStyles, Paper, Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    selected: {
        backgroundColor: theme.palette.action.focus
    },
    paperLink: {
        border: '1.5px #ccc solid',
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'reverse',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10px',
    }
}))

const IMAGES = [
    { id: 0, title: 'Dark Orchid', color: 'DarkOrchid' },
    { id: 1, title: 'Lime Green', color: 'LimeGreen' },
    { id: 2, title: 'Tomato', color: 'Tomato' },
    { id: 3, title: 'Seven Ate Nine', color: '#789' },
    { id: 4, title: 'Crimson', color: 'Crimson' }
];


export default function ModalSwitch() {
    let { path, url } = useRouteMatch()
    const classes = useStyles()
    let location = useLocation();
    let { pathname } = location
    let background = location.state && location.state.background
    return (
        <Container maxWidth="lg">
            <Box p={3}>
                <ButtonGroup variant='text'>
                    <Button className={pathname === `${url}` ? classes.selected : ''} startIcon={<HomeIcon />} component={NavLink} to={`${url}`}>Home</Button>
                    <Button className={pathname === `${url}/gallery` ? classes.selected : ''} startIcon={<ImageIcon />} component={NavLink} to={`${url}/gallery`}>Visit the Gallery</Button>
                </ButtonGroup>
                <Divider variant='middle' style={{ margin: '20px 0' }} />
                <Switch location={background || location}>
                    <Route exact path={`${path}`} component={Home} />
                    <Route path={`${path}/gallery`} ><Gallery baseUrl={url} /></Route>
                    <Route path={`${path}/img/:id`} component={ImageView} />
                </Switch>

                {background && <Route path={`${path}/img/:id`} component={Modal} />}

            </Box>
        </Container>
    );
}

function Thumbnail({ color }) {
    return (
        <div
            style={{
                width: 150,
                height: 150,
                background: color
            }}
        />
    );
}

function Image({ color }) {
    return (
        <div
            style={{
                width: '100%',
                height: 400,
                background: color,
                margin: '0 auto'
            }}
        />
    );
}

function Home() {
    return (
        <>
            <Typography variant='h4'>Featured Images</Typography>
            <div style={{ width: '20%' }}>
                <List>
                    <ListItem button to='/modalg/img/2' component={Link}>
                        <ListItemIcon>
                            <PaletteIcon style={{ color: 'Tomato' }} />
                        </ListItemIcon>
                        <ListItemText primary="Tomato" />
                    </ListItem>
                    <ListItem button to='/modalg/img/4' component={Link}>
                        <ListItemIcon>
                            <PaletteIcon style={{ color: 'Crimson' }} />
                        </ListItemIcon>
                        <ListItemText primary="Crimson" />
                    </ListItem>
                </List>
            </div>
        </>
    );
}

function Gallery({ baseUrl }) {
    const classes = useStyles()
    const location = useLocation();
    return (
        <div>
            <GridList cellHeight={200} cols={5} spacing={30}>
                {IMAGES.map(image => (
                    <GridListTile key={image.id} cols={image.cols || 1}>
                        <Paper variant="outlined" className={classes.paperLink}>
                            <Link
                                to={{
                                    pathname: `${baseUrl}/img/${image.id}`,
                                    state: { background: location }
                                }}
                            >
                                <Thumbnail color={image.color} />
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                <PaletteIcon style={{ color: image.color, paddingRight: '5px' }}/>
                                <Typography gutterBottom variant='subtitle1' color='textPrimary'>{image.title}</Typography>
                                </div>
                            </Link>
                        </Paper>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

function ImageView({ match }) {
    let { id } = match.params
    let image = IMAGES[parseInt(id, 10)];

    if (!image) return <div>Image not found</div>;

    return (
        <div>
            <h1>{image.title}</h1>
            <Image color={image.color} />
        </div>
    );
}

function Modal({ match }) {
    let history = useHistory();
    let { id } = match.params
    let image = IMAGES[parseInt(id, 10)];

    if (!image) return null;

    let back = e => {
        e.stopPropagation();
        history.goBack();
    };

    return (
        <div
            onClick={back}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                background: 'rgba(0, 0, 0, 0.25)'
            }}
        >
            <div
                className='modal'
                style={{
                    position: 'absolute',
                    background: '#fff',
                    top: 80,
                    left: '10%',
                    right: '10%',
                    padding: 15,
                    border: '2px solid #444'
                }}
            >
                <Typography gutterBottom variant='h3'>Name: {image.title}</Typography>
                <Image color={image.color} />
                <Button variant='outlined' color='secondary' style={{ marginTop: '5px', border: '1.9px solid' }} onClick={back}>Close</Button>
            </div>
        </div>
    );
}
