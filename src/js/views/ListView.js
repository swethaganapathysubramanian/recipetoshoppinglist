import { elements } from './base';

export const renderItem = item => {
    const markup = `
     <li class="shopping__item" data-itemid = ${item.id}>
                    <div class="shopping__count">
                        <input type="number" id=${item.id} value=${item.count} step=${item.count} class = "shopping__count-value">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.ingredient}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>

    `
    elements.shopping.insertAdjacentHTML('beforeend',markup);
}

export const visibleButton = () => {
    const markup = `
    <div id="checkout">
        <br>
        <button class="btn-small recipe__btn checkout" >
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Checkout shopping list</span>
                </button>
                <br>
                <br> </div>
            `
     elements.shopping.insertAdjacentHTML('beforeend', markup);
}

export const clearButton = () => {
    const button = document.getElementById('checkout');
    if(button) {
    button.parentElement.removeChild(button);
    }
}



export const deleteItem = id => {

    const item = document.querySelector(`[ data-itemid ="${id}"]`);
    console.log(id)
    item.parentElement.removeChild(item);
}

export const updateCount = ({ id, count }) => {
    const item = document.getElementById(`${id}`);
    item.value = count;
}