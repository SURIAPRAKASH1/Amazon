import { renderOrderSummary } from "../scripts/checkout/orderSummary";

describe("test suite : render order summary", () => {

    it('displays cart', () => {

        document.querySelector('.js-test-container').innerHTML = `
        <div class='js-order-summary'></div>
        `;


    });

});