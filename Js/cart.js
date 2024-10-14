var btnlogout = document.querySelector("#buttonLogout");

btnlogout?.addEventListener("click", function () {
    localStorage.removeItem("loggedInUserName");
    open("./login.html", "_self");
});

document.querySelector(".back-home")?.addEventListener("click", function () {
    open("./homepage.html", "_self");
});

document.addEventListener("DOMContentLoaded", function () {
    var userName = localStorage.getItem("loggedInUserName");

    if (userName && document.getElementById("userNameDisplay")) {
        document.getElementById("userNameDisplay").textContent = userName;
    }

    initCart(); 
});

document.querySelector(".cart")?.addEventListener("click", function () {
    open("./cart.html", "_self");
});

let cartItems = JSON.parse(localStorage.getItem("Products")) || [];
updateCartCount();

function updateCartCount() {
    const cartCountElement = document.querySelector(".all-item");
    if (cartCountElement) {
        cartCountElement.innerHTML = `${cartItems.length}`;
    } 
}

function initCart() {
    displayAllProduct();
    calculateTotal();
    updateCartCount();
}

function addToCart() {
    document.querySelectorAll(".Add").forEach(btn => {
        btn.addEventListener("click", function () {
            let selectedElement = this.closest("figure");
            const product = {
                id: selectedElement.getAttribute("data-id"),
                name: selectedElement.getAttribute("data-name"),
                price: selectedElement.getAttribute("data-price"),
                image: selectedElement.getAttribute("data-img"),
                quantity: 1,
            };

            let existingProduct = cartItems.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cartItems.push(product);
            }

            localStorage.setItem("Products", JSON.stringify(cartItems));
            updateCartCount();
            showAlert(`Added ${product.name} to cart successfully 👏`);
        });
    });
}

function displayAllProduct() {
    let cart = JSON.parse(localStorage.getItem("Products")) || [];

    const cartItemsContainer = document.querySelector("#cart-items");
    const mainPriceElement = document.querySelector(".main-price");

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-white text-center bg-black fs-3">Your cart is empty</p>`;
        if (mainPriceElement) mainPriceElement.classList.add("d-none");
        return;
    }

    let cartona = "";
    cart.forEach((pro, inx) => {
        cartona += `  
        <div class="col-12 bg-white p-3 mb-3 border-bottom border-1 border-black mb-1">
            <div class="d-flex align-items-center gap-3 justify-content-between">
                <div>
                    <img src="${pro.image}" class="img-fluid w-75" alt="Product Image">
                    <div>
                        <h5>${pro.name}</h5>
                        <p class="fw-bold m-0 p-0">$${pro.price}</p> 
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-center">
                    <button onclick="decrement('${pro.id}', this)" class="down d-flex justify-content-center align-items-center style-icon">-</button>
                    <span class="text-black mx-2">${pro.quantity}</span>
                    <button onclick="increment('${pro.id}')" class="d-flex justify-content-center align-items-center style-icon">+</button>
                    <button onclick="deleteElement(${inx})" class="d-flex justify-content-center ms-3 align-items-center style-icon">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>`;
    });

    if (mainPriceElement) mainPriceElement.classList.replace("d-none", "d-block");
    cartItemsContainer.innerHTML = cartona;
}


function calculateTotal() {
    let cart = JSON.parse(localStorage.getItem("Products")) || [];
    let total = 0;

    cart.forEach(product => {
        total += product.price * product.quantity;
    });

    document.getElementById("total-price").textContent = `Total cart Price: $${total}`;
}

function deleteElement(inx) {
    let cart = JSON.parse(localStorage.getItem("Products")) || [];
    cart.splice(inx, 1);
    localStorage.setItem("Products", JSON.stringify(cart));
    initCart();
}

function increment(id) {
    let cart = JSON.parse(localStorage.getItem("Products")) || [];
    cart.forEach((item) => {
        if (item.id == id) {
            item.quantity += 1;
        }
    });
    localStorage.setItem("Products", JSON.stringify(cart));
    initCart();
}

function decrement(id, button) {
    let cart = JSON.parse(localStorage.getItem("Products")) || [];
    cart.forEach((item) => {
        if (item.id == id) {
            if (item.quantity == 1) {
                button.setAttribute("disabled", true);
            } else {
                item.quantity -= 1;
            }
        }
    });
    localStorage.setItem("Products", JSON.stringify(cart));
    initCart();
}


function showAlert(message) {
    const alertElement = document.getElementById("alert");
    alertElement.textContent = message; 
    alertElement.classList.remove("hidden"); 
    alertElement.classList.add("visible");


    setTimeout(() => {
        alertElement.classList.remove("visible"); 
        alertElement.classList.add("hidden"); 
    }, 1000); 
}



addToCart();
initCart();



