export const orders = JSON.parse(localStorage.getItem('order')) || [];

export function addOrder(order) {

    orders.unshift(order);
    saveToStorage();

};

function saveToStorage() {
    localStorage.setItem('order', JSON.stringify(orders));
}


export function getOrder(orderId) {
    let mathchingOrder;

    orders.forEach((order) => {
        if (order.id === orderId) {
            mathchingOrder = order;
        }

    });

    return mathchingOrder;
};

