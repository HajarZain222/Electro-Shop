addEventListener('load', function () {
    var contentDiv = document.querySelector('.content');
    var searchInput = document.getElementById('searchInput');
    var products = [];

    function getData() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "data/products.json", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                products = JSON.parse(xhr.responseText);

                renderProducts(contentDiv, products, {
                    showAddToCart: true,
                    showFavorite: true
                });
            }
        };
        xhr.send();
    };

    searchInput.addEventListener('input', function () {
        var value = searchInput.value.toLowerCase();
        var filteredProducts = products.filter(function(product) {
            return product.title.toLowerCase().includes(value);
        });

        renderProducts(contentDiv, filteredProducts, {
            showAddToCart: true,
            showFavorite: true
        });
    });
    getData();
});
