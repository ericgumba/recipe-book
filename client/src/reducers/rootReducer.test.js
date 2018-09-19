import rootReducer from './index'
import actions from '../actions/index'
import { ADD_GENRE, ADD_RECIPE, ADD_INGREDIENT } from '../constants/action-types';
import { REMOVE_GENRE } from '../constants/action-types';
import { REMOVE_RECIPE } from '../constants/action-types';
import { REMOVE_INGREDIENT } from '../constants/action-types';
import { REMOVE_STEP } from '../constants/action-types';
describe('tests actions from root reducer', ()=> {
 
         
    it('tests removeIngredient', () => {
        expect(rootReducer(undefined, { 
            type: REMOVE_INGREDIENT, 
            genreTitle: "entrees", 
            recipeTitleOfIngredient: 'Oven-Roasted Garlic Chicken',
            ingredientToBeRemoved: 'Chicken' })).toEqual({s:'garlic'})
    })
 
})


// export const removeIngredient = payload => ({
//     type: REMOVE_INGREDIENT,
//     genreTitle: payload.genreTitle,
//     recipeTitle: payload.recipeTitle,
//     ingredientTitle: payload.ingredientTitle
// })