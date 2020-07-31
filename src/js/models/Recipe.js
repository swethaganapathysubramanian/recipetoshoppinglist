import { key, key2 } from '../config';
import { Fractional } from 'fractional';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipedetails() {
        try {
            
            const number = 30;
            const url = `https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}&includeNutrition=false`
            //console.log(url);
            const get = await fetch(url);
            const recipe = await get.json();
            console.log(recipe);
            this.title = recipe.title;
            this.img = recipe.image;
            this.duration = recipe.readyInMinutes;
            this.source = recipe.sourceName;
            this.url = recipe.sourceUrl;
           // console.log(this.url);
            this.ingredients = recipe.extendedIngredients;
            this.servings = recipe.servings;
        } catch (error) {
            console.log(error);
        }
    }
    calcTime(){

    }
    calcServings(){

    }
    parseIngredients(){
       // console.log(this.ingredients);
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'lb', 'pound.' ]
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'pound', 'pound']
        const newIngredients = this.ingredients.map( el =>{
           
          let objIng ={
                count: el.measures.us.amount,
                unit: el.unit.toLowerCase(),
                ingredient: el.name
            }
            return objIng;
    });
        this.ingredients = newIngredients;
}

    updateServings (type) {
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        //modify ingredients based on servings
        this.ingredients.forEach(ingredient =>{
            //console.log(eval(ingredient.count))
            ingredient.count = ((newServings / this.servings) * ingredient.count).toFixed(1);
            console.log("Update Servings");
        
            console.log(newServings / this.servings, ingredient.count);
            
        });

        this.servings = newServings
    }

}
