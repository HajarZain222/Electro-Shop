addEventListener('load', function() {
    var contentDiv = document.querySelector('.content');

    var cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

    renderProducts(contentDiv, cartProducts, {
        showRemove: true,
        showQuantity: true,
        showSubTotal: true,
        storageKey: 'cart'
    });
    renderTotal('cart');
});

