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
            console.log(2);
            const index = this.items.findIndex(el => el.ingredient === item.ingredient)
            const updatedCount = Number(this.items[index].count) + Number(item.count);
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
        console.log(1);
        this.items.find(el => el.id === id).count = Number(count) + Number(newCount);
    }

    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index,1)
    }

    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount;
    }
}