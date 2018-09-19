
import React from 'react';
 import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert'; 

// the issue could also be because of the form data object. 

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  }; 

  upload = async fileToUpload => { 
    let form = new FormData();

    form.append("file", fileToUpload);
 
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
     
    this.upload(input.files[0]).then( res => { 
      this.props.setImag(res.msg); 
    
    } ).catch( err => { console.log("file upload fail")} );


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
            <input type="file" name="images" id="imgUpload" onChange={this.handleFileChange} hidden />
            <input type="submit" value="Upload" id="imgSubmit" onClick={this.handleFileSubmit} hidden />
          </form>
          <MenuItem onClick={this.handleUploadPhoto}> Upload Photo </MenuItem>
        </Menu>
      </div>  
    );
  }
}
 
export default SimpleMenu;