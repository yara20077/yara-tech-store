
// ======================================
// YARA TECH STORE - JavaScript
// ======================================

// 1. قائمة المنتجات
const products = [
  {
    id: 1,
    name: "iPhone 15",
    category: "phones",
    price: 3200,
    icon: "📱"
  },
  {
    id: 2,
    name: "Samsung S24",
    category: "phones",
    price: 2800,
    icon: "📱"
  },
  {
    id: 3,
    name: "MacBook Air",
    category: "laptops",
    price: 4500,
    icon: "💻"
  },
  {
    id: 4,
    name: "Lenovo IdeaPad",
    category: "laptops",
    price: 2400,
    icon: "💻"
  },
  {
    id: 5,
    name: "Wireless Headphones",
    category: "accessories",
    price: 350,
    icon: "🎧"
  },
  {
    id: 6,
    name: "Smart Watch",
    category: "accessories",
    price: 500,
    icon: "⌚"
  }
];

// 2. استرجاع السلة المحفوظة
let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("yaraTechCart")) || [];
} catch (error) {
  cart = [];
}

// 3. عناصر الصفحة
const productsGrid = document.getElementById("products-grid");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const cartPanel = document.getElementById("cart-panel");

// 4. عرض المنتجات
function displayProducts(items) {
  if (!productsGrid) return;

  productsGrid.innerHTML = "";

  if (items.length === 0) {
    productsGrid.innerHTML =
      "<p>لا توجد منتجات مطابقة للبحث.</p>";
    return;
  }

  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        ${product.icon}
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>

        <p class="product-price">
          ${product.price.toLocaleString("en-US")} ريال
        </p>

        <button
          class="add-button"
          onclick="addToCart(${product.id})">
          أضف إلى السلة
        </button>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

// 5. البحث والتصنيف
function filterProducts() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedCategory = categorySelect.value;

  const filteredProducts = products.filter(product => {
    const matchesName =
      product.name.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesName && matchesCategory;
  });

  displayProducts(filteredProducts);
}

// 6. حفظ السلة
function saveCart() {
  try {
    localStorage.setItem(
      "yaraTechCart",
      JSON.stringify(cart)
    );
  } catch (error) {
    console.error("تعذر حفظ السلة:", error);

    alert("مساحة التخزين ممتلئة. سيتم إعادة ضبط السلة.");

    cart = [];

    try {
      localStorage.removeItem("yaraTechCart");
    } catch (e) {
      console.error(e);
    }

    displayCart();
  }
}

// 7. إضافة منتج للسلة
function addToCart(productId) {
  const product = products.find(
    item => item.id === productId
  );

  if (!product) return;

  const existingItem = cart.find(
    item => item.id === productId
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  displayCart();

  // تأكيد الإضافة
  console.log("تمت إضافة المنتج:", product.name);
}

// 8. حذف منتج من السلة
function removeFromCart(productId) {
  cart = cart.filter(
    item => item.id !== productId
  );

  saveCart();
  displayCart();
}

// 9. عرض محتويات السلة وحساب الإجمالي والعدد
function displayCart() {
  if (!cartItems || !cartTotal || !cartCount) return;

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <span>
        ${item.name} × ${item.quantity}
      </span>

      <span>
        ${(item.price * item.quantity).toLocaleString("en-US")} ريال
      </span>

      <button onclick="removeFromCart(${item.id})">
        حذف
      </button>
    `;

    cartItems.appendChild(row);
  });

  cartTotal.textContent =
    total.toLocaleString("en-US") + " ريال";

  cartCount.textContent = count;
}

// 10. فتح وإغلاق السلة
function toggleCart() {
  if (cartPanel) {
    cartPanel.classList.toggle("active");
  }
}

// 11. ربط البحث والتصنيف
if (searchInput) {
  searchInput.addEventListener(
    "input",
    filterProducts
  );
}

if (categorySelect) {
  categorySelect.addEventListener(
    "change",
    filterProducts
  );
}

// 12. تشغيل المتجر عند فتح الصفحة
displayProducts(products);
displayCart();

console.log("Products:", products);
console.log("Add function:", typeof addToCart);
console.log("Grid:", document.getElementById("products-grid"));