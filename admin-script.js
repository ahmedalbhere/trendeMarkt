// عناصر DOM
const adminProductsContainer = document.getElementById('admin-products-container');
const addProductForm = document.getElementById('add-product-form');
const productsCount = document.getElementById('products-count');
const ordersCount = document.getElementById('orders-count');
const usersCount = document.getElementById('users-count');

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
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
            </div>
        `;
        adminProductsContainer.appendChild(productElement);
    });
}

// الحصول على اسم الفئة بالعربية
function getCategoryName(category) {
    switch(category) {
        case 'electronics': return 'إلكترونيات';
        case 'fashion': return 'موضة';
        case 'home': return 'منزلية';
        default: return category;
    }
}

// حذف منتج
function deleteProduct(productId) {
    if (confirm('هل أنت متأكد من أنك تريد حذف هذا المنتج؟')) {
        let products = JSON.parse(localStorage.getItem('trendyMarketProducts')) || [];
        products = products.filter(product => product.id !== productId);
        localStorage.setItem('trendyMarketProducts', JSON.stringify(products));
        renderProducts(products);
        updateStats();
    }
}

// حذف جميع المنتجات
function deleteAllProducts() {
    if (confirm('هل أنت متأكد من أنك تريد حذف جميع المنتجات؟ لا يمكن التراجع عن هذا الإجراء.')) {
        localStorage.removeItem('trendyMarketProducts');
        renderProducts([]);
        updateStats();
        alert('تم حذف جميع المنتجات بنجاح!');
    }
}

// تعديل منتج
function editProduct(productId) {
    let products = JSON.parse(localStorage.getItem('trendyMarketProducts')) || [];
    const product = products.find(p => p.id === productId);
    
    if (product) {
        document.getElementById('product-title').value = product.title;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-category').value = product.category;
        
        // حذف المنتج القديم
        products = products.filter(p => p.id !== productId);
        localStorage.setItem('trendyMarketProducts', JSON.stringify(products));
        renderProducts(products);
        updateStats();
        
        alert('يمكنك الآن تعديل بيانات المنتج وتأكيد الإضافة مرة أخرى');
    }
}

// تحديث الإحصائيات
function updateStats() {
    const products = JSON.parse(localStorage.getItem('trendyMarketProducts')) || [];
    productsCount.textContent = products.length;
    
    // إحصائيات افتراضية (يمكن تطويرها لاستخدام بيانات حقيقية)
    ordersCount.textContent = Math.floor(Math.random() * 100);
    usersCount.textContent = Math.floor(Math.random() * 500);
