import { 
    ADD_GENRE,
    ADD_RECIPE,
    ADD_INGREDIENT,
    ADD_STEP,
    REMOVE_GENRE,
    REMOVE_RECIPE,
    LOG_IN,
    REMOVE_INGREDIENT,
    REMOVE_STEP,
    LOG_OUT
} from '../constants/action-types'

export const showGenre = () => ({
    type: "SHOW_GENRE"
});

export const showRecipe = genreIndex => ({
    type: "SHOW_RECIPE",
    payload: genreIndex
    
});

export const login = payload => ({
    type: LOG_IN,
    payload: payload.recipeBook,
    username: payload.username
})

export const logout = () => ({
    type: LOG_OUT
})

export const addGenre = genre => ({type: ADD_GENRE, payload: genre})

export const addRecipe = recipe => ({type: ADD_RECIPE, genre: recipe.genre, title: recipe.title})

export const addIngredient = ingredient => (
    {
        type: ADD_INGREDIENT, 
        recipe: ingredient.recipe, // string
        genre: ingredient.genre, 
        ingredientTitle: ingredient.ingredientTitle
    })
export const addStep = step => (
    { 
        type: ADD_STEP,  
        genreIndex: step.genreIndex,
        recipeTitle: step.recipeTitle,
        stepTitle: step.stepTitle
    })
export const removeGenre = genre => (
    {
        type: REMOVE_GENRE,
        payload: genre
    }
)

export const removeRecipe = payload => ( { 
    type: REMOVE_RECIPE,
    genreTitle: payload.genreTitle,
    recipeTitle: payload.recipeTitle 
})

export const removeIngredient = payload => ({
    type: REMOVE_INGREDIENT,
    genreTitle: payload.genreTitle,
    recipeTitle: payload.recipeTitle,
    ingredientTitle: payload.ingredientTitle
})

export const removeStep = payload => ({
    type: REMOVE_STEP,
    genreTitle: payload.genreTitle,
    recipeTitle: payload.recipeTitle,
    stepTitle: payload.stepTitle
})
