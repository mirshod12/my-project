const phones = [
  { id: 1, name: "iPhone 16 Pro Max", tagline: "Titanium. So strong. So light.", price: 1199, emoji: "📱", badge: "New" },
  { id: 2, name: "iPhone 16 Pro",     tagline: "Pro camera. Pro chip. Pro you.", price: 999,  emoji: "📱", badge: "New" },
  { id: 3, name: "iPhone 16",         tagline: "Powerful. Playful. Brilliant.",  price: 799,  emoji: "📱", badge: null },
  { id: 4, name: "iPhone 16 Plus",    tagline: "All the power. Bigger canvas.",  price: 899,  emoji: "📱", badge: null },
  { id: 5, name: "iPhone 15",         tagline: "Dynamic Island comes to all.",   price: 699,  emoji: "📱", badge: "Sale" },
  { id: 6, name: "iPhone SE (4th)",   tagline: "Serious performance. Low price.",price: 499,  emoji: "📱", badge: null },
];

let cart = [];

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = phones.map(p => `
    <div class="product-card">
      <div class="product-emoji">${p.emoji}</div>
      <h3>${p.name}${p.badge ? `<span class="badge">${p.badge}</span>` : ""}</h3>
      <p class="tagline">${p.tagline}</p>
      <div class="price">$${p.price.toLocaleString()}</div>
      <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

function addToCart(id) {
  const phone = phones.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...phone, qty: 1 });
  }
  updateCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cartCount").textContent = count;

  const itemsEl = document.getElementById("cartItems");
  const footerEl = document.getElementById("cartFooter");

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    footerEl.style.display = "none";
    return;
  }

  itemsEl.innerHTML = cart.map(i => `
    <div class="cart-item">
      <div class="cart-item-emoji">${i.emoji}</div>
      <div class="cart-item-info">
        <strong>${i.name}</strong>
        <span>$${i.price.toLocaleString()} × ${i.qty}</span>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i.id})">✕</button>
    </div>
  `).join("");

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById("cartTotal").textContent = total.toLocaleString();
  footerEl.style.display = "flex";
}

function toggleCart() {
  document.getElementById("cartSidebar").classList.toggle("open");
  document.getElementById("cartOverlay").classList.toggle("open");
}

function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}

function checkout() {
  alert("Thank you for your order! 🎉\nTotal: $" + cart.reduce((s,i) => s + i.price * i.qty, 0).toLocaleString());
  cart = [];
  updateCart();
  toggleCart();
}

function submitForm(e) {
  e.preventDefault();
  document.getElementById("formSuccess").style.display = "block";
  e.target.reset();
}

renderProducts();
