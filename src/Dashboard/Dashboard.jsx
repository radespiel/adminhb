import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import Counters from '../Counters/Counters';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Users from '../Users/Users'
import Posts from '../Posts/Posts'
import Comments from '../Comments/Comments'
import Likes from '../Likes/Likes'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    botao:{
        width: "100px",
        paddingBottom: "50"
    },  
    root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("gerais");
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async (evt) => {
    evt.preventDefault();
    localStorage.removeItem('token');
    document.location.reload(true);
    props.updateToken(null);
}

const returnFalse = ()=> {
  return false
}

const selectedOption = () =>{
  switch(selected){
    case "gerais":
    return(<Counters tokenp={props.tokenp}></Counters>)
    case "users":
    return(<Users tokenp={props.tokenp}></Users>)
    case "posts":
    return(<Posts tokenp={props.tokenp}></Posts>)
    case "comments":
    return(<Comments tokenp={props.tokenp}></Comments>)
    case "likes":
    return(<Likes tokenp={props.tokenp}></Likes>)
  }
}

console.log("token no dashboard", props.tokenp)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Hearth Beat Admin
          </Typography>
          <IconButton color="inherit">
            <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.botao}
            onClick={handleLogout}
          >
            Deslogar
          </Button>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
        <div>
    <ListItem selected={(()=>{if(selected==="gerais"){return true} else{return false}})()} button onClick={()=>{setSelected("gerais")}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dados Gerais" />
    </ListItem>
    <ListItem selected={(()=>{if(selected==="users"){return true} else{return false}})()} button onClick={()=>{setSelected("users")}}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuários" />
    </ListItem>
    <ListItem selected={(()=>{if(selected==="posts"){return true} else{return false}})()} button onClick={()=>{setSelected("posts")}}>
      <ListItemIcon>
      <PostAddIcon/>
      </ListItemIcon>
      <ListItemText primary="Postagens" />
    </ListItem>
    <ListItem selected={(()=>{if(selected==="comments"){return true} else{return false}})()} button onClick={()=>{setSelected("comments")}}>
      <ListItemIcon>
        <ChatIcon/>
      </ListItemIcon>
      <ListItemText primary="Comentários" />
    </ListItem>
    <ListItem selected={(()=>{if(selected==="likes"){return true} else{return false}})()}button onClick={()=>{setSelected("likes")}}>
      <ListItemIcon>
        <FavoriteIcon/>
      </ListItemIcon>
      <ListItemText primary="Likes" />
    </ListItem>
  </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Box pt={4} display="flex">
            {selectedOption}
            </Box>
        </Container>
      </main>
    </div>
  );
}