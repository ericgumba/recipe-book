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
import  EditField  from './EditField';
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
  state = { 
      expanded: true,
      steps: this.props.recipe.steps,
      ingredients: this.props.recipe.ingredients


    };



  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleFinishedEditing = () => {
      // when creating an object, with another objects fields as its fields, we need to explicitly
      // declare what the field is called. Otherwies it wil lautomatically have fields which is called
      // the vvariable name. Furthermore
      this.props.handleRecipeEdit(this.state.steps, this.state.ingredients);
      this.props.handleEditButton();
  }

  addIngredient = () => { 
    this.setState({ingredients: [...this.state.ingredients, ""]});
  }
  addStep = () => {
    this.setState({steps: [...this.state.steps, ""] });
  }

  handleStepEdit(index, value){
    console.log("handleStepEdit in editcard called"); 
    let newSteps = [...this.state.steps]; 
    newSteps[index] = value;
    console.log(newSteps);
    this.setState({steps: newSteps});
  }

  handleIngredientEdit(index, value){
      console.log("handle ingredient in editcard called");
      let newIngredients = [...this.state.ingredients];
      newIngredients[index] = value;
      console.log(newIngredients);
      this.setState({ingredients: newIngredients});
  }

  handleDone(){
   }
  render() {
    const { classes, recipe } = this.props;
    const { steps, ingredients } = this.state;
 

    // attempting to replace recipe with state in order to fix bug with adding step/recipe
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
            {ingredients.map( (ingredient, index) => {return( 
              <EditField ingredient={ingredient} index={index} handleIngredientEdit={(index, value) => this.handleIngredientEdit(index, value)}/>
            ) } ) }
            </ul>

            <Button style={{backgroundColor:"green"}} onClick={this.addIngredient}> Add Ingredient </Button>

            <Typography component="p"> 
            </Typography>
          </CardContent> 
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                Method:
              </Typography>

              {steps.map( (step, index) => { 
                return(
                  <Typography paragraph>
                    <MultiLineEditField step={step} index={index} handleStepEdit={(index,value) => this.handleStepEdit(index, value)} />
                  </Typography>

                );
               } )}

               <Button style={{backgroundColor:"green"}} onClick={this.addStep}> Add Step </Button> 

            </CardContent>

              <Button variant="text" style={{backgroundColor:"red"}} onClick={this.handleFinishedEditing}>Done</Button>
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