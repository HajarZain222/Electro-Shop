addEventListener('load', function() {
    var contentDiv = document.querySelector('.content');

    var favorite = JSON.parse(localStorage.getItem('favorite')) || [];

    renderProducts(contentDiv, favorite, {
        showRemove: true,
        storageKey: 'favorite'
    });
});
