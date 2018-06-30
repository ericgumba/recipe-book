import {
    ADD_GENRE,
    ADD_RECIPE,
    ADD_INGREDIENT,
    ADD_STEP,
    REMOVE_GENRE,
    REMOVE_RECIPE,
    REMOVE_INGREDIENT,
    REMOVE_STEP
} from '../constants/action-types'


const initialState = [  
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
        }
]  
const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_GENRE:
            return [ ...state, { genre: action.payload, recipes: [] }  ]

        case ADD_RECIPE: // we're adding a new object, to the recipes array. 
            // console.log(state[action.genre].recipes)
            // const updatedArticleList = state[action.genre].recipes
            const updatedArticleList = state.map( article => {
                if( article.genre === action.genre ){ 
                    return { genre: article.genre, recipes: [...article.recipes, 
                        {title: action.title, ingredients: [], steps: [] }] 
                        }
                    }
                return article
            }
        )
        console.log(updatedArticleList)
        
            return updatedArticleList

        case ADD_INGREDIENT: 
            const updatedIngredientList = state.map( (article, index) => {
                if (action.genre === index){
                    const newRecipes = article.recipes.map( recipe => {
                        if ( recipe.title === action.recipe ){ 
                            let ingredients = [...recipe.ingredients, action.ingredientTitle]
                            console.log('new ingredienst is ', ingredients)
                            return { title: recipe.title,
                            ingredients: [...recipe.ingredients, action.ingredientTitle],
                        steps: recipe.steps}
                        }
                        return recipe
                    } )

                    return {genre: article.genre, recipes: newRecipes}
                }
                return article
            } ) 
            return updatedIngredientList

        case ADD_STEP:
            const updatedStepList = state.map( (article, index) => {
                if (action.genreIndex === index){
                    const newRecipes = article.recipes.map( recipe => {
                        if ( recipe.title === action.recipeTitle ){ 
                            return { title: recipe.title,
                            ingredients: [...recipe.ingredients],
                        steps: [...recipe.steps, action.stepTitle ]}
                        }
                        return recipe
                    } )

                    return {genre: article.genre, recipes: newRecipes}
                }
                return article
            } ) 
            return updatedStepList
            
        case REMOVE_GENRE: 
            const prunedGenres = state.filter( article => { return article.genre  !== action.payload })
            return prunedGenres

        case REMOVE_RECIPE:  
            const prunedRecipes = state.map( article => { 
                if (article.genre === action.genreTitle) {
                    const newRecipes = article.recipes.filter( recipe => { return recipe.title !== action.recipeTitle } ) 
 
                    return { genre: article.genre, recipes: newRecipes }
                }
                return article
            
            } )

            return prunedRecipes

        case REMOVE_INGREDIENT:
            const prunedIngredients = state.map( article => { 
                if (article.genre === action.genreTitle) {
                    const newRecipes = article.recipes.map( recipe => { 
                        if (recipe.title === action.recipeTitle){
                            const newIngredients = recipe.ingredients.filter( ingredient => { return ingredient !== action.ingredientTitle } )
                            
                            return {title: recipe.title, ingredients: newIngredients, steps: recipe.steps}
                        }
                        return recipe
                    } ) 

                    return { genre: article.genre, recipes: newRecipes }
                }
                return article
            
            } )

            return prunedIngredients 

        case REMOVE_STEP: 
        const prunedSteps = state.map( article => { 
            if (article.genre === action.genreTitle) {
                const newRecipes = article.recipes.map( recipe => { 
                    if (recipe.title === action.recipeTitle){
                        const newSteps = recipe.steps.filter( step => { return step !== action.stepTitle } )
                        
                        return {title: recipe.title, ingredients: recipe.ingredients, steps: newSteps}
                    }
                    return recipe
                } ) 

                return { genre: article.genre, recipes: newRecipes }
            }
            return article
        
        } )

        return prunedSteps 

        default:
            return state;
    }
}

export default rootReducer;