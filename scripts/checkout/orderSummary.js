import { cart, removeFromCart, updateDeliveryOption, updateQuantity } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deleviryOptions, getDeleviryOption } from '../../data/deleviryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { isCartEmpty } from '../checkout.js';


export function renderOrderSummary() {

    let cartSummaryHtml = '';


    cart.forEach((cartItem) => {

        const productId = cartItem.productId;

        const matchingPoduct = getProduct(productId);

        const deleviryOptionId = cartItem.deleviryOptionId;

        const deleviryOption = getDeleviryOption(deleviryOptionId);

        const today = dayjs();
        const deleviryDate = today.add(deleviryOption.deleviryDate, 'days');

        const dateString = deleviryDate.format('dddd, MMMM, D');


        cartSummaryHtml +=
            `  

        <div class="cart-item-container js-cart-item-container-${matchingPoduct.id}">
        <div class="delivery-date">
        Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingPoduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingPoduct.name}
            </div>
            <div class="product-price">
                ₹${matchingPoduct.priceCents}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingPoduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id ="${matchingPoduct.id}">
                Update
                </span>

                <input class="quantity-input js-quantity-input-${matchingPoduct.id}">
                <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingPoduct.id}">Save</span>

                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingPoduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHtml(matchingPoduct, cartItem)}
            </div>
        </div>
        </div>


        `

    });


    function deliveryOptionsHtml(matchingPoduct, cartItem) {
        let html = '';
        deleviryOptions.forEach((deleviryOption) => {
            const today = dayjs();
            const deleviryDate = today.add(deleviryOption.deleviryDate, 'days');

            const dateString = deleviryDate.format('dddd, MMMM D');

            const priceString = deleviryOption.priceCents === 0
                ? 'FREE'
                : `₹${deleviryOption.priceCents} - :`

            const isChecked = deleviryOption.id === cartItem.deleviryOptionId;

            html +=
                `
            <div class="delivery-option js-deleviry-option" data-product-id = "${matchingPoduct.id}"
            data-deleviry-option-id = "${deleviryOption.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingPoduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                ${priceString} Shipping
                </div>
                </div>
            </div>
                `

        });
        return html
    };


    function updateCartQuantity() {

        let cartQuantity = 0;

        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;

    };

    updateCartQuantity();



    document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            container.remove();
            updateCartQuantity();

            renderPaymentSummary();
            isCartEmpty();

        })
    });

    document.querySelectorAll('.js-deleviry-option').forEach((element) => {
        element.addEventListener('click', () => {
            const { productId, deleviryOptionId } = element.dataset;
            updateDeliveryOption(productId, deleviryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });


    document.querySelectorAll('.js-update-link').forEach((link) => {

        link.addEventListener('click', () => {
            const productId = link.dataset.productId;


            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            container.classList.add('is-editing-quantity');
        });


    });

    document.querySelectorAll('.js-save-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            container.classList.remove('is-editing-quantity');

            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

            const newQuantity = Number(quantityInput.value);

            updateQuantity(productId, newQuantity);

            const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

            quantityLabel.innerHTML = newQuantity;
            updateCartQuantity();
            renderPaymentSummary();

        })
    });



};

