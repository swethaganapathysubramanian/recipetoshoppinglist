
export default class Search {
    constructor(query){
        this.query = query;
    }

async getRecipes() {
    const key = process.env.API_KEY;
    try {
        const number = 30;
        const url = `https://api.spoonacular.com/recipes/search?apiKey=${key}&query=${this.query}&number=${number}`
        //console.log(url);
        const get = await fetch(url);
        const recipes = await get.json();
        this.result = recipes.results;
        //console.log(recipes.results);
    } catch (error) {
        console.log(error);
    }
}

}
