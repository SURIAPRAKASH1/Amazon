import { orders } from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct, products } from '../data/products.js';
import updateCartQuantity from './update-cart.js';
import { addToCart } from '../data/cart.js';


updateCartQuantity();


function loadPage() {

    let ordersHtml = '';

    orders.forEach((order) => {


        if (!order.errorMessage) {
            order = order;


            const orderTimeString = dayjs(order.orderTime).format('MMMM D');

            ordersHtml += `
            <div class="order-container">

                <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${orderTimeString}</div>
                    </div>
                    <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>₹${order.totalCostCents}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                </div>
                </div>

                <div class="order-details-grid">
                    ${productListHtml(order)}
                </div>
            </div>
                `


        };


    });

    function productListHtml(order) {

        let productListHtml = '';

        order.products.forEach((productDetails) => {

            const product = getProduct(productDetails.productId);

            productListHtml += `
            <div class="product-image-container">
            <img src="${product.image}">
        </div>

        <div class="product-details">
            <div class="product-name">
            ${product.name}
            </div>
            <div class="product-delivery-date">
            Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
                }
            </div>
            <div class="product-quantity">
            Quantity: ${productDetails.quantity}
            </div>
            <button class="buy-again-button button-primary
             js-buy-again" data-product-id="${product.id}"
             data-quantity=${productDetails.quantity}>
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
            </button>
        </div>

        <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
                Track package
            </button>
            </a>
        </div>

        
        `;

        });
        return productListHtml;

    };
    document.querySelector('.js-orders-grid').innerHTML = ordersHtml;

    document.querySelectorAll('.js-buy-again').forEach((button) => {

        button.addEventListener('click', () => {
            addToCart(button.dataset.productId, Number(button.dataset.quantity));

            updateCartQuantity();

            button.innerHTML = 'Added';
            setTimeout(() => {
                button.innerHTML = `
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">But it again </span>
                
                `;

            }, 1000);
        });
    });
};

loadPage();

