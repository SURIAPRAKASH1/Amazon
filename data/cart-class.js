class Cart {
    cartItem;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {

        this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey));

        if (!this.cartItem) {
            this.cartItem = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deleviryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deleviryOptionId: '2'
            }];
        };
    }

    savetoStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
    }

    addToCart(productId, quantity) {

        let matchingItem;

        this.cartItem.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += 1;
            matchingItem.quantity += quantity;
        } else {
            this.cartItem.push({
                productId: productId,
                quantity: quantity,
                deleviryOptionId: '1'
            })
        }

        this.savetoStorage();
    }

    removeFromCart(productId) {
        const newCart = [];
        this.cartItem.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            };

        });
        this.cartItem = newCart;

        this.savetoStorage();
    }






    updateDeliveryOption(productId, deleviryOptionId) {
        let matchingItem;

        this.cartItem.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        matchingItem.deleviryOptionId = deleviryOptionId;


    }





    updateQuantity(productId, newQuantity) {
        let matchingItem;

        this.cartItem.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });


        matchingItem.quantity = newQuantity;

        this.savetoStorage();

    }



}




const cart = new Cart('cart-opp');
const businessCart = new Cart('business-cart');



console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);

