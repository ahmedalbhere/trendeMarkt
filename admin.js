// كلمة المرور للإدارة
const ADMIN_PASSWORD = "0987";

// عناصر DOM
const loginPage = document.getElementById('login-page');
const adminPage = document.getElementById('admin-page');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('login-error');
const adminProductsContainer = document.getElementById('admin-products-container');
const addProductForm = document.getElementById('add-product-form');
const productsCount = document.getElementById('products-count');
const ordersCount = document.getElementById('orders-count');
const usersCount = document.getElementById('users-count');

// التحقق من تسجيل الدخول
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        showAdminPage();
    } else {
        showLoginPage();
    }
}

// إظهار صفحة تسجيل الدخول
function showLoginPage() {
    loginPage.style.display = 'block';
    adminPage.style.display = 'none';
}

// إظهار صفحة الإدارة
function showAdminPage() {
    loginPage.style.display = 'none';
    adminPage.style.display = 'block';
    loadProducts();
    updateStats();
}

// تسجيل الدخول
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = passwordInput.value;
    
    if (password === ADMIN_PASSWORD) {
        // تسجيل الدخول ناجح
        sessionStorage.setItem('adminLoggedIn', 'true');
        showAdminPage();
    } else {
        // تسجيل الدخول فاشل
        errorMessage.style.display = 'block';
        passwordInput.value = '';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});

// تسجيل الخروج
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    showLoginPage();
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
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
            <img src="${product.image}" alt="${product.title}" class="admin-product-image">
            <h4>${product.title}</h4>
            <p><strong>السعر:</strong> ${product.price.toLocaleString()} ج.م</p>
            <p><strong>الفئة:</strong> ${getCategoryName(product.category)}</p>
            <div class="admin-product-actions">
                <button class="edit-btn" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i> تعديل
                </button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> حذف
                </button>
           
