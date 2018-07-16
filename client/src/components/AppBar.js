import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}; 

function ButtonAppBar(props) {
  const { classes, openPopup, nameDisplay } = props; 
  let loginInfo
  if (nameDisplay !== ''){
      loginInfo = <Button color="inherit" onClick={() => props.openPopup("")}> {nameDisplay} - LOGOUT </Button>
  } else {
      loginInfo = <Button color="inherit" onClick={() => props.openPopup("login")}> LOGIN </Button>
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"> 
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            My Recipebook
          </Typography>
          <Button color="inherit" onClick={() => props.openPopup("register") }> Register </Button>
          { loginInfo /* <Button color="inherit" onClick={() => props.openPopup()}>{loginInfo}  LOGOUT </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(ButtonAppBar); 