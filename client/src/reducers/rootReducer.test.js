import rootReducer from './index'
import actions from '../actions/index'
import { ADD_GENRE, ADD_RECIPE, ADD_INGREDIENT } from '../constants/action-types';
import { REMOVE_GENRE } from '../constants/action-types';
import { REMOVE_RECIPE } from '../constants/action-types';
import { REMOVE_INGREDIENT } from '../constants/action-types';
import { REMOVE_STEP } from '../constants/action-types';
describe('tests actions from root reducer', ()=> {

    it('Adds desserts to genre list', () => {
        expect(rootReducer(undefined, {type: ADD_GENRE, payload: "desserts"} )).toEqual([
            {              
                genre: 'entrees', 
                recipes: 
                [
                    { 
                        title: 'Oven-Roasted Garlic Chicken', 
                        ingredients: ['Chicken', 'garlic'], 
                        steps: ['Stick in oven', 'wait 30 minutes ']
                    }
                ]
            },
            {
                genre: 'desserts',
                recipes: []
            }
    ]  )
    })

    it('adds pizza to recipe list of entrees', () => {
        expect(rootReducer(undefined, {type: ADD_RECIPE, genre:'entrees', recipeTitle: 'pizza' })).toEqual(
            [
            {              
                genre: 'entrees', 
                recipes: 
                [
                    { 
                        title: 'Oven-Roasted Garlic Chicken', 
                        ingredients: ['Chicken', 'garlic'], 
                        steps: ['Stick in oven', 'wait 30 minutes ']
                    },
                    {
                        title: 'pizza',
                        ingredients:[],
                        steps: []
                    }
                ]
            },
 
    ]  )
    })

    it('adds olive oil to ingredients of Oven-Roasted Garlic Chicken of entrees', () => {
        expect(rootReducer(undefined, {type: ADD_INGREDIENT, genre: 0, recipe: 'Oven-Roasted Garlic Chicken', ingredientTitle: 'Olive Oil' } )).
        toEqual(
            [  
                {              
                    genre: 'entrees', 
                    recipes: 
                    [
                        { 
                            title: 'Oven-Roasted Garlic Chicken', 
                            ingredients: ['Chicken', 'garlic', 'Olive Oil'], 
                            steps: ['Stick in oven', 'wait 30 minutes ']
                        }
                    ]
                }
        ]  
            
 
      )
    })

    it('tests remove genre', () => {
        expect(rootReducer(undefined, { type: REMOVE_GENRE, payload: 'entrees' })).toEqual( [] )
    } )


    it('tests remove recipe', () => { 
        expect(rootReducer(undefined, {type: REMOVE_RECIPE, indexOfGenreOfRecipe: 0, title: 'Oven-Roasted Garlic Chicken' } )).toEqual( [] )
    })

    it('tests removeIngredient', () => {
        expect(rootReducer(undefined, { 
            type: REMOVE_INGREDIENT, 
            indexOfGenreOfRecipe: 0, 
            recipeTitleOfIngredient: 'Oven-Roasted Garlic Chicken',
            ingredientToBeRemoved: 'Chicken' })).toEqual(['garlic'])
    })

    it('tests removevStep', () => { 
        expect(rootReducer(undefined, {
            type: REMOVE_STEP,
            indexOfGenreOfRecipe: 0,
            recipeTitleOfStep: 'Oven-Roasted Garlic Chicken',
            stepToBeRemoved: 'Stick in oven'
        } )).toEqual(['wait 30 minutes '] )
    })
})
