import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RecipeCardMenu from "./RecipeCardMenu";
import { EditField } from './EditField';
import Button from '@material-ui/core/Button';
import MultiLineEditField  from './MultiLineEditField';
const styles = theme => ({
  card: {
    maxWidth: 400,
    width: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {
  state = { expanded: true };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, recipe } = this.props;
 
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader  
            title={"editing"} 
          />
          <CardMedia
            className={classes.media}
            image="/static/images/cards/paella.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <ul>
            {recipe.ingredients.map( ingredient => {return( 
              <EditField ingredient={ingredient}/>
            ) } ) }
            </ul>
            <Typography component="p"> 
            </Typography>
          </CardContent> 
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                Method:
              </Typography>

              {recipe.steps.map( step => { 
                return(
                  <Typography paragraph>
                    <MultiLineEditField step={step} />
                  </Typography>

                );
               } )} 

            </CardContent>

              <Button variant="text" backgroundColor="red" onClick={ () => this.props.handleEditButton() }>Done</Button>
          </Collapse>
        </Card>
      </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default withStyles(styles)(RecipeReviewCard);