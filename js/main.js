function renderProducts(container, products, options = {}) {
    container.innerHTML = "";

    if (products.length === 0) {
        container.textContent = "No Products Yet";
        renderTotal(options.storageKey);
        return;
    }

    var cardsDiv = document.createElement('div');
    cardsDiv.classList.add('cards');

    products.forEach(function(product) {
        var card = createCard(product, options);
        cardsDiv.appendChild(card);
    });

    container.appendChild(cardsDiv);
};

function createCard(product, options = {}) {
    var card = document.createElement('div');
    card.classList.add('card');

    var imageDiv = document.createElement('div');
    imageDiv.classList.add('card-image');

    var img = document.createElement('img');
    img.src = product.image;

    var info = document.createElement('div');
    info.classList.add('info');

    var title = document.createElement('h4');
    title.textContent = product.name; // title

    var price = document.createElement('span');
    price.classList.add('price');
    price.textContent = "$" + product.price;

    imageDiv.appendChild(img);
    info.append(title, price);

    if (options.showAddToCart) {
        var addBtn = document.createElement('button');
        addBtn.textContent = "Add to Cart";
        addBtn.classList.add('addToCart');

        addBtn.addEventListener('click', function () {
            addToCart(product);
        });

        info.appendChild(addBtn);
    };

    if (options.showFavorite) {
        var favBtn = document.createElement('button');
        favBtn.textContent = "❤";
        favBtn.classList.add('favorite');

        favBtn.addEventListener('click', function () {
            addToFavorite(product);
        });

        info.appendChild(favBtn);
    };

    if (options.showQuantity) {
        var quantity = document.createElement('div');
        quantity.classList.add('quantity');

        var decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = "-";

        var countSpan = document.createElement('span');
        countSpan.classList.add('count');
        countSpan.textContent = product.quantity || 1;

        var increaseBtn = document.createElement('button');
        increaseBtn.textContent = "+";

        decreaseBtn.addEventListener('click', function () {
            if (product.quantity > 1) {
                product.quantity--;
                updateQuantity(product, options.storageKey);
                countSpan.textContent = product.quantity;
                updateSubTotal();
                renderTotal(options.storageKey);
            } else {
                removeProduct(product, options.storageKey);
                renderProducts(
                    document.querySelector('.content'),
                    JSON.parse(localStorage.getItem(options.storageKey)),
                    options
                );
                renderTotal(options.storageKey);
            }
        });

        increaseBtn.addEventListener('click', function () {
            product.quantity++;
            updateQuantity(product, options.storageKey);
            countSpan.textContent = product.quantity;
            updateSubTotal();
            renderTotal(options.storageKey);
        });

        quantity.append(decreaseBtn, countSpan, increaseBtn);
        info.appendChild(quantity);
    };

    if (options.showSubTotal) {
        var subTotal = document.createElement('div');
        subTotal.classList.add('sub-total');
        function updateSubTotal() {
            subTotal.textContent = "Subtotal: $" + (product.price * product.quantity);
        };
        updateSubTotal();
        info.appendChild(subTotal)
    };

    if (options.showRemove) {
        var removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('removeFromCart');

        removeBtn.addEventListener('click', function () {
            var updatedItems = removeProduct(product, options.storageKey);
            renderProducts(
                document.querySelector('.content'),
                updatedItems,
                options
            );
            renderTotal(options.storageKey);
        });
        info.appendChild(removeBtn);
    };

    card.append(imageDiv, info);
    return card;
};

function addToCart(product) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    var existingProduct = cart.find(function(item) {
        return item.id === product.id
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert("Added to cart");
};

function addToFavorite(product) {
    var favorite = JSON.parse(localStorage.getItem('favorite')) || [];

    favorite.push(product);

    localStorage.setItem('favorite', JSON.stringify(favorite));

    alert("Added to Favorite");
};

function removeProduct(product, storageKey) {
    var items = JSON.parse(localStorage.getItem(storageKey)) || [];

    filteredProducts = items.filter(function(item) {
        return item.id !== product.id;
    });

    localStorage.setItem(storageKey, JSON.stringify(filteredProducts));

    alert("Removed From cart");

    return filteredProducts;
};

function updateQuantity(product, storageKey) {
    var items = JSON.parse(localStorage.getItem(storageKey)) || [];

    items = items.map(function(item) {
        if (item.id === product.id) {
            item.quantity = product.quantity;
        }
        return item;
    });

    localStorage.setItem(storageKey, JSON.stringify(items));
};

function calculateTotal(storageKey) {
    var items = JSON.parse(localStorage.getItem(storageKey)) || [];

    var total = 0;
    items.forEach(function(item) {
        return total += item.price * item.quantity;
    });

    return total;
};

function renderTotal(storageKey) {
    var totalDiv = document.querySelector('.total');
    if (!totalDiv) return;
    totalDiv.innerHTML = "";

    var totalPrice = document.createElement('h3');
    totalPrice.textContent = "Total: $" + calculateTotal(storageKey);

    totalDiv.appendChild(totalPrice);
};