
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", function () {
  const productId = getQueryParam("productId");
  if (productId) {
      fetchProductDetails(productId);
  }


  const filterDropdowns = document.querySelectorAll(".filters select");
  filterDropdowns.forEach(function (dropdown) {
      dropdown.addEventListener("change", filterProducts);
  });

  const sortDropdown = document.querySelector("#sort");
  sortDropdown.addEventListener("change", sortProducts);


  updateProductGrid();
});

function filterProducts() {

  const filterBar = document.querySelector(".filter-bar");
  const flowerTypeSelect = filterBar.querySelector("#flower-type");
  const occasionSelect = filterBar.querySelector("#occasion");
  const colorSelect = filterBar.querySelector("#color");

  const flowerType = flowerTypeSelect.value;
  const occasion = occasionSelect.value;
  const color = colorSelect.value;


  const allProducts = document.querySelectorAll(".product-card");
  allProducts.forEach(function (product) {
      const productId = product.id;
      const productFlowerType = product.getAttribute("data-flower-type");
      const productOccasion = product.getAttribute("data-occasion");
      const productColor = product.getAttribute("data-color");

    
      const isFlowerTypeMatch = flowerType === "all" || productFlowerType === flowerType;
      const isOccasionMatch = occasion === "all" || productOccasion === occasion;
      const isColorMatch = color === "all" || productColor === color;


      if (isFlowerTypeMatch || isOccasionMatch || isColorMatch) {
          product.style.display = "block";
          product.addEventListener("click", function() {
              window.location.href = `add-to-basket.html?productId=${productId}`;
          });
      } else {
          product.style.display = "none";
      }
  });
}

function sortProducts() {
  const sortDropdown = document.querySelector("#sort");
  const selectedOption = sortDropdown.value;


  const productGrid = document.querySelector(".product-grid");
  const products = Array.from(productGrid.children);


  if (selectedOption === "price-low-high") {
      products.sort((a, b) => {
          const priceA = parseInt(a.getAttribute("data-price"));
          const priceB = parseInt(b.getAttribute("data-price"));
          return priceA - priceB;
      });
  } else if (selectedOption === "price-high-low") {
      products.sort((a, b) => {
          const priceA = parseInt(a.getAttribute("data-price"));
          const priceB = parseInt(b.getAttribute("data-price"));
          return priceB - priceA;
      });
  }


  productGrid.innerHTML = ""; 
  products.forEach(product => productGrid.appendChild(product));
}

function updateProductGrid() {
  const products = document.querySelectorAll(".product-card");
  products.forEach(function (product) {
      product.style.display = "block";
  });
}

function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
      const cartCount = localStorage.getItem('cartCount') || 0;
      cartCountElement.textContent = cartCount;
  }
}

updateCartCount();