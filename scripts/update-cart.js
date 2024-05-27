import { cart } from "../data/cart.js";


export default function updateCartQuantity() {

    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
};
