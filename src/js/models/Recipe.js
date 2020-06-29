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
            //remove units
        // let ingredient = el.originalString.toLowerCase();
        // unitsLong.forEach((unit, i) =>{
        //     ingredient = ingredient.replace(unit, unitsShort[i]);
        // })
        //     //remove parentheses
        // ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
        // ingredient = ingredient.replace(/ *\*[^*]*\ */g, ' ');
        //     //parse ing into count unit and ingredients
        // const arrIng = ingredient.split(' ');
        // //console.log(arrIng);
        // const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));
        //     //console.log(unitIndex);
        // let objIng;
        // if(unitIndex > -1){
        //         // there is a unit
        //     const arrCount = arrIng.slice(0, unitIndex);
        //     //console.log(arrCount);
            
        //     let count;
        //     if( arrCount.length === 1){
        //         let integ = arrIng[0].replace('-','+')
        //        // console.log(integ)
        //         //console.log(parseInt(integ,10))
        //         if(integ.includes('/')){
        //             console.log(integ)
        //         }
        //         count = integ;
                
        //         //console.log(count);
                   
        //     } else {
        //         let form = arrIng.slice(0, unitIndex).join('+');
        //         //console.log(form);
        //         count = eval(form);
        //     }
        //     objIng = {
        //         count,
        //         unit: arrIng[unitIndex],
        //         ingredient: arrIng.slice(unitIndex + 1).join(' ') 
        //     }
        
        // } else if (parseInt(arrIng[0],10)){
        //     objIng = {
        //         count: parseInt(arrIng[0], 10),
        //         unit: '',
        //         ingredient: arrIng.slice(1).join(' ')
        //     }
        // } else if (unitIndex === -1){
        //         //no unit or no number in 1st position
        //     objIng = {
        //         count: 1,
        //         unit: '',
        //         ingredient
        //     }  
        // }

        //     return objIng;
        // });
        //     //console.log(newIngredients);
        // this.ingredients = newIngredients;
    });
        this.ingredients = newIngredients;
}

    updateServings (type) {
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        //modify ingredients based on servings
        this.ingredients.forEach(ingredient =>{
            //console.log(eval(ingredient.count))
            ingredient.count = ((newServings / this.servings) * ingredient.count).toFixed(1);

        
            console.log(newServings / this.servings, ingredient.count);
            
        });

        this.servings = newServings
    }

}
