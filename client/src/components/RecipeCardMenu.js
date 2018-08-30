
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

  handleUploadPhoto = (event) => {
    document.getElementById("upload").click(); 
  }
  // goal, upload photo to the server, i guess using updatebook.
  handleFileChange = selectorFile => {
    console.log(selectorFile);
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
          <input type="file" id="upload" onChange={ event => this.handleFileChange(event.target.files) } hidden/>
          <MenuItem onClick={ this.handleUploadPhoto } >Upload Photo</MenuItem> 
        </Menu>
      </div>
    );
  }
}

SimpleMenu.propTypes  = { 
    handleDelete: PropTypes.func.isRequired
}
export default SimpleMenu;