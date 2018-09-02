
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';


// the issue could also be because of the form data object. 

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  upload = async fileToUpload => {

    // what is formdata object? What is blob object? 

    let form = new FormData();

    form.append("file", fileToUpload);

    // another possibility is that under headers, it could be the content type is   
    const response = await fetch("/upload", {
      method: "POST", 
      body: form
    });

    const body = await response.json();

    return body;
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleDelete = () => {
    this.props.handleDelete();
    this.setState({ anchorEl: null });
  };

  handleClose = () => { 
    this.setState({ anchorEl: null });
  }

  handleEdit = () => {
    this.props.handleEditButton();
    this.setState({ anchorEl: null});
  }

  handleUploadPhoto = (event) => {
    document.getElementById("imgUpload").click(); 
  }
  // goal, upload photo to the server, i guess using updatebook.
  handleFileChange = selectorFile => {
    console.log(selectorFile);
    // submit should probably generate an event that communicates with the server.  
    document.getElementById("imgSubmit").click();
    // this.upload(selectorFile).then( res => { console.log("file upload success") } ).catch( err => { console.log("file upload fail")} );
  }

  handleFileSubmit = e => {
    e.preventDefault();
    console.log("e.target.files"); 
    var input = document.querySelector('input[type="file"]');
    console.log(input.files[0]);

    this.upload(input.files[0]).then( res => { console.log("file upload success") } ).catch( err => { console.log("file upload fail")} );


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
          <form method="post" encType="multipart/form-data" action="/upload">
            <input type="hidden" name="msgtype" value="2"/>
            <input type="file" name="images" id="imgUpload" onChange={this.handleFileChange} />
            <input type="submit" value="Upload" id="imgSubmit" onClick={this.handleFileSubmit} />
          </form>
          <MenuItem onClick={this.handleUploadPhoto}> Upload Photo </MenuItem>
        </Menu>
      </div>
    );
  }
}

SimpleMenu.propTypes  = { 
    handleDelete: PropTypes.func.isRequired
}
export default SimpleMenu;