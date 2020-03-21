import uniqid from 'uniqid';

export default class List {
    constructor(){
        this.items = []; 
    }

    addItem( count, unit, ingredient){
        //console.log(this.items)
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        if(this.items.find(el => el.ingredient === item.ingredient)){
            const index = this.items.findIndex(el => el.ingredient === item.ingredient)
            const updatedCount = this.items[index].count + item.count;
            console.log(item.count)
            this.items[index].count = updatedCount
            const newItem = {
                id: this.items[index].id,
                count : updatedCount
            }
            return newItem
        } 
        this.items.push(item);
        return item
        
    }

    increaseCount (id, newCount){
        this.items.find(el => el.id === id).count = count + newCount;
    }

    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index,1)
    }

    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount;
    }
}