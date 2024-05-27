import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { cart } from '../data/cart.js';
//import '../data/backend-practice.js';

//import '../data/cart-class.js'



/*new Promise((resolve) => {
    console.log('start loading')
    const is_perfect = true

    if (is_perfect) {
        console.log("some thing");
        resolve();
    }
}).then(() => console.log("next step")) 
*/




renderOrderSummary();
renderPaymentSummary();
isCartEmpty()



export function isCartEmpty() {

    if (cart.length === 0) {

        document.querySelector('.js-order-summary').innerHTML = `
        <div class="review-to-product">
            <p>Your cart is empty</p>
            <a href="amazon.html"><button id="review-to-product-button">View products</button></a>
        </div>
        `;


        const placeOrderButton = document.querySelector('.js-place-order');

        placeOrderButton.style.backgroundColor = 'hsla(56, 99%, 90%, 0.979)';
        placeOrderButton.disabled = true;
        placeOrderButton.style.border = 'none';
        placeOrderButton.style.pointerEvents = 'none';
    };


}





