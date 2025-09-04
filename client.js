// عناصر DOM
const loadingScreen = document.getElementById('loading-screen');
const productsContainer = document.getElementById('products-container');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartCount = document.querySelector('.cart-count');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// تهيئة الموقع
document.addEventListener('DOMContentLoaded', function() {
    // إخفاء شاشة التحميل بعد 3 ثواني
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            loadProducts();
            setupEventListeners();
        }, 500);
    }, 3000);
});

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // تصفية المنتجات حسب الفئة
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            renderProducts(category);
        });
    });
    
    // البحث عن المنتجات
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterProducts(searchInput.value);
        }
    });
    
    searchBtn.addEventListener('click', function() {
        filterProducts(searchInput.value);
    });
}

// تحميل المنتجات من localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('trendyMarketProducts')) || [];
    renderProducts('all', products);
}

// عرض المنتجات
function renderProducts(category = 'all', productsList = null) {
    let products = productsList || JSON.parse(localStorage.getItem('trendyMarketProducts')) || [];
    
    if (category !== 'all') {
        products = products.filter(product => product.category === category);
    }
    
    // عرض المنتجات في صفحة العميل
    productsContainer.innerHTML = '';
    
    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <h3>لا توجد منتجات حالياً</h3>
                <p>سيتم إضافة المنتجات قريباً</p>
            </div>
        `;
        return;
    }
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price.toLocaleString()} ج.م</p>
                <p class="product-description">${product.description}</p>
                <button class="buy-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> أضف إلى السلة
                </button>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
}

// إضافة منتج إلى السلة
function addToCart(productId) {
    let count = parseInt(cartCount.textContent);
    count++;
    cartCount.textContent = count;
    
    // تأثير عند الإضافة
    cartCount.classList.add('pulse');
    setTimeout(() => {
        cartCount.classList.remove('pulse');
    }, 300);
    
    alert('تمت إضافة المنتج إلى سلة التسوق!');
}

// تصفية المنتجات حسب البحث
function filterProducts(searchTerm) {
    const products = JSON.parse(localStorage.getItem('trendyMarketProducts')) || [];
    
    if (!searchTerm || products.length === 0) {
        const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
        renderProducts(activeCategory, products);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    renderProducts('all', filteredProducts);
}
