
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleDelete = () => {
    this.props.handleDelete();
    this.setState({ anchorEl: null });
  }

  handleClose = () => { 
    this.setState({ anchorEl: null });
  }

  handleEdit = () => {
    this.props.handleEditButton();
    this.setState({ anchorEl: null});
  }
 

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
      <IconButton
        aria-label="More"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        onClick={this.handleClick}
      >
        <MoreVertIcon />
      </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
          <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
          <MenuItem onClick={this.handleClose}>Upload Photo</MenuItem>
        </Menu>
      </div>
    );
  }
}

SimpleMenu.propTypes  = { 
    handleDelete: PropTypes.func.isRequired
}
export default SimpleMenu;