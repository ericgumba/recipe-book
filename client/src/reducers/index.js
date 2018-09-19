import {
    ADD_GENRE,
    ADD_RECIPE,
    ADD_INGREDIENT,
    ADD_STEP,
    REMOVE_GENRE,
    REMOVE_RECIPE,
    REMOVE_INGREDIENT,
    REMOVE_STEP,
    LOG_IN,
    LOG_OUT
} from '../constants/action-types'




const initialState =   
        {
            articles: [{
                genre: 'entrees', 
                recipes: 
                [
                    { 
                        title: 'Oven-Roasted Garlic Chicken', 
                        ingredients: ['Chicken', 'garlic'], 
                        steps: ['Stick in oven', 'wait 30 minutes '],
                        image: ''
                    }
                ]
            }],
            username: "",
            showGenres: true,
            genreIndex: 0
        };
         

        // Everything in the rootReducer function returns the object, { articles: <new article array> }

const newState = (state, object) => {
    return Object.assign( {}, state, object )
}
 
const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_IMAGE":
            return newState( state, {articles: action.payload });
        case "EDIT_RECIPE": 
            return newState( state, {articles: action.payload}); 
        case "SHOW_GENRE":
            return newState( state, {showGenres: true} );
        case "SHOW_RECIPE":
            return newState( state, {showGenres: false, genreIndex: action.payload} );
        case LOG_OUT:
            return newState( state, {username: ""} )
        case LOG_IN:
            return {articles: action.payload, username: action.username} 
        case ADD_GENRE:  
            console.log(state)  
            return newState( state , {articles: [ ...state.articles, { genre: action.payload, recipes: [] }  ]})

        case ADD_RECIPE: 
            const updatedArticleList = state.articles.map( article => {
                if( article.genre === action.genre ){ 
                    return { genre: article.genre, recipes: [...article.recipes, 
                        {title: action.title, ingredients: [], steps: [], image: "" }] 
                        }
                    }
                return article
            }
        )  
            return newState(state, {articles: updatedArticleList})

        case ADD_INGREDIENT: 
            const updatedIngredientList = state.articles.map( (article, index) => {
                if (action.genre === index){
                    const newRecipes = article.recipes.map( recipe => {
                        if ( recipe.title === action.recipe ){ 
                            let ingredients = [...recipe.ingredients, action.ingredientTitle]
                            console.log('new ingredienst is ', ingredients)
                            return { title: recipe.title,
                            ingredients: [...recipe.ingredients, action.ingredientTitle],
                        steps: recipe.steps, image: recipe.image}
                        }
                        return recipe
                    } )

                    return {genre: article.genre, recipes: newRecipes}
                }
                return article
            } ) 
            return newState(state, {articles: updatedIngredientList})

        case ADD_STEP:
            const updatedStepList = state.articles.map( (article, index) => {
                if (action.genreIndex === index){
                    const newRecipes = article.recipes.map( recipe => {
                        if ( recipe.title === action.recipeTitle ){ 
                            return { title: recipe.title,
                            ingredients: [...recipe.ingredients],
                        steps: [...recipe.steps, action.stepTitle ], image: recipe.image}
                        }
                        return recipe;
                    } )

                    return {genre: article.genre, recipes: newRecipes}
                }
                return article;
            } ) 

            return newState(state, {articles: updatedStepList})
            
        case REMOVE_GENRE: 
            const prunedGenres = state.articles.filter( article => { return article.genre  !== action.payload })
            return newState(state, { articles: prunedGenres } )

        case REMOVE_RECIPE:  
            const prunedRecipes = state.articles.map( article => { 
                if (article.genre === action.genreTitle) {
                    const newRecipes = article.recipes.filter( recipe => { return recipe.title !== action.recipeTitle } ) 
 
                    return { genre: article.genre, recipes: newRecipes }
                }
                return article
            
            } )

            return newState( state, {articles:prunedRecipes} )

        case REMOVE_INGREDIENT:
            const prunedIngredients = state.articles.map( article => { 
                if (article.genre === action.genreTitle) {
                    const newRecipes = article.recipes.map( recipe => { 
                        if (recipe.title === action.recipeTitle){
                            const newIngredients = recipe.ingredients.filter( ingredient => { return ingredient !== action.ingredientTitle } )
                            
                            return {title: recipe.title, ingredients: newIngredients, steps: recipe.steps, image: recipe.image}
                        }
                        return recipe
                    } ) 

                    return { genre: article.genre, recipes: newRecipes }
                }
                return article
            
            } )

            return newState( state, { articles: prunedIngredients } )

        case REMOVE_STEP: 
            const prunedSteps = state.articles.map( article => { 
                if (article.genre === action.genreTitle) {
                    const newRecipes = article.recipes.map( recipe => { 
                        if (recipe.title === action.recipeTitle){
                            const newSteps = recipe.steps.filter( step => { return step !== action.stepTitle } )
                            
                            return {title: recipe.title, ingredients: recipe.ingredients, steps: newSteps, image: recipe.image}
                        }
                        return recipe
                    } ) 

                    return { genre: article.genre, recipes: newRecipes }
                }
                return article
            
            } )

            return newState( state, {articles: prunedSteps } );

        default:
            return state;
    }
}

export default rootReducer;