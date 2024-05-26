import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
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

