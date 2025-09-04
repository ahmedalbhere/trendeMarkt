// عناصر DOM
const adminProductsContainer = document.getElementById('admin-products-container');
const addProductForm = document.getElementById('add-product-form');
const productsCount = document.getElementById('products-count');
const ordersCount = document.getElementById('orders-count');
const usersCount = document.getElementById('users-count');

// التحقق من تسجيل الدخول
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'admin-login.html';
    }
}

// تسجيل الخروج
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin-login.html';
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadProducts();
    updateStats();
    
    // إضافة منتج جديد
    addProductForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newProduct = {
            id: Date.now(),
            title: document.getElementById('product-title').value,
            price: parseInt(document.getElementById('product-price').value),
            image: document.getElementById('product-image').value,
            description: document.getElementById('product-description').value,
            category: document.getElementById('product-category').value
        };
        
        addProduct(newProduct);
        addProductForm.reset();
        
        alert('تم إضافة المنتج بنجاح!');
    });
});

// تحميل المنتجات من localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('trendyMarketProducts')) || [];
    renderProducts(products);
}

// إضافة منتج جديد
function addProduct(product) {
    let products = JSON.parse(localStorage.getItem('trendyMarketProducts')) || [];
    products.push(product);
    localStorage.setItem('trendyMarketProducts', JSON.stringify(products));
    renderProducts(products);
    updateStats();
}

// عرض المنتجات
function renderProducts(products) {
    adminProductsContainer.innerHTML = '';
    
    if (products.length === 0) {
        adminProductsContainer.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <h3>لا توجد منتجات حالياً</h3>
                <p>استخدم النموذج أعلاه لإضافة منتجات جديدة</p>
            </div>
        `;
        return;
    }
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'admin-product-card';
        productElement.innerHTML = `
           
