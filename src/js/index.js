
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import XlsExport from 'xlsexport';
import * as searchView from './views/SearchView';
import * as recipeView from './views/RecipeView';
import * as ListView from './views/ListView';
import * as LikesView from './views/LikesView';

import { elements, renderLoader, clearLoader } from './views/base';


/**Global state of app
 * Search Object
 * current Recipe
 * shopping list
 * liked recipes 
 * */

 // Search Controller
 const state = {

 };



 const controlSearch = async () =>{
    //get query from view
    const query = searchView.getInput();
    console.log(query);
    if(query){
        //new search obj and add to state
        state.search = new Search(query);
        //preparae UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try{
        //search for recipes
         await state.search.getRecipes();
         //result on UI
         clearLoader();
         searchView.renderResults(state.search.result)
        } catch (err) {
            alert ('Error processing request');
            clearLoader();
        }
    }
 }

elements.searchForm.addEventListener('submit',e =>{
     e.preventDefault();
     controlSearch();
 })


 elements.searchResPages.addEventListener('click', e =>{
     const btn = e.target.closest('.btn-inline');
     //console.log(btn)
     if (btn){
         const goToPage = parseInt(btn.dataset.goto, 10);
         searchView.clearResults();
         searchView.renderResults(state.search.result, goToPage);
         //console.log(goToPage);
     }
 })

// Recipe Controller

const controlecipe = async () => {
    //Get ID from URL
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id){
        //prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        //highlight selected search
        //if (state.search) searchView.highlightSelected(id);
        //createnew Recipe object
        if (state.recipe) {
            searchView.highlightSelected(id, state.recipe.id);
        } else if (state.search) {
            searchView.highlightSelected(id);
        }
        
        state.recipe = new Recipe(id);
        //getRecipe data
        
        try{
        await state.recipe.getRecipedetails();
        state.recipe.parseIngredients();
        //console.log('1');
        //calc servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();
        //render recipe
        clearLoader();
        recipeView.renderRecipe(
            state.recipe,
            state.likes.isLiked(id)
            );
        } catch (error){
            console.log(error);
            alert ( 'Error processing Recipe');
        }
    }
}

//window.addEventListener('hashchange', controlecipe);
//window.addEventListener('load', controlecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlecipe));


//list controller

const controlList = () =>{
    if(!state.list) state.list = new List();
    //Add items to list
    ListView.clearButton();
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        console.log(item)
        //render items in UI
        if(item.ingredient){
            ListView.renderItem(item);
            
        } else {
            
            ListView.updateCount(item)
        }
    });
 ListView.visibleButton();
    
    
}

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    //deleteItem
    if(e.target.matches('.shopping__delete, .shopping__delete *')){

        ListView.deleteItem(id);

        state.list.deleteItem(id);
    
     } else if (e.target.matches('.shopping__count-value')){

        //update countin likes lis
        const val =parseFloat(e.target.value, 10);
            state.list.updateCount(id,val);
    }
})

// Like Controller 

//testing for global scope



const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    if (!state.likes.isLiked(currentID)){
        //Add likes to state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.duration,
            state.recipe.img
            );


        //toggle button
        LikesView.toggleLikeButton(true);
        //add like to UI list
        LikesView.renderLike(newLike);
        console.log(state.likes)
    } else {

         //Remove likes to state
        state.likes.deleteLike(currentID);
        //toggle button
        LikesView.toggleLikeButton(false);
        //Remove like from UI list
       
        LikesView.deleteLike(currentID);
    }

    LikesView.toggleLikeMenu(state.likes.getNumLikes());
}
//restore likes on pageload
  window.addEventListener('load',() =>{
      state.likes = new Likes();
      //restore likes
      state.likes.readStorage();
      //toggle button
      LikesView.toggleLikeMenu(state.likes.getNumLikes());
      //Render existing likes
      state.likes.likes.forEach(like => LikesView.renderLike(like));
  } )

//recipe button click handles
elements.recipe.addEventListener('click', e =>{
    if (e.target.matches('.minus, .minus *')){
        //console.log('reduce')
        if( state.recipe.servings > 1){
        state.recipe.updateServings('dec');
            recipeView.updateServingIngredients(state.recipe);
        }
    } else if (e.target.matches('.plus, .plus *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingIngredients(state.recipe);      
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
    
    //console.log(state.recipe);
})

elements.shopping.addEventListener('click', e => {
    if (e.target.matches('.checkout *')) {
        var listOfItems = state.list.items;
        console.log(listOfItems);
        const xls = new XlsExport(listOfItems,"Shopping List");
        xls.exportToXLS('export.xls')
    }
})


