// بيانات المنتجات الأولية (منتجات حقيقية بأسعار بالجنيه المصري)
let products = [
    {
        id: 1,
        title: "هاتف Samsung Galaxy A54",
        price: 12500,
        image: "https://images.samsung.com/is/image/samsung/p6pim/eg/sm-a546elgism/gallery/eg-galaxy-a54-5g-sm-a546-sm-a546elgism-534864229?$650_519_PNG$",
        description: "هاتف ذكي بشاشة 6.4 بوصة، كاميرا 50 ميجابكسل، ذاكرة 8/256 جيجا، مقاوم للماء",
        category: "electronics"
    },
    {
        id: 2,
        title: "حذاء Adidas Originals",
        price: 2200,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/450c50b488f140e6b12aad340107cb2e_9366/%D8%AD%D8%B0%D8%A7%D8%A1_Superstar_XLG_%D8%A3%D8%A8%D9%8A%D8%B6_%D8%A5%D9%8A%D9%81%D9%88%D8%B1%D9%8A_EG9757_01_standard.jpg",
        description: "حذاء رياضي كلاسيكي من adidas، مريح ومناسب للاستخدام اليومي",
        category: "fashion"
    },
    {
        id: 3,
        title: "ماكينة قهوة Delonghi",
        price: 8500,
        image: "https://m.media-amazon.com/images/I/71fX+2+-HaL._AC_SL1500_.jpg",
        description: "ماكينة قهوة اسبريسو أوتوماتيكية، تحضر القهوة بلمسة واحدة، مع طاحونة مدمجة",
        category: "home"
    },
    {
        id: 4,
        title: "ساعة Apple Watch Series 8",
        price: 14500,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQDY3ref_VW_PF+watch-45-alum-midnight-nc-8s_VW_PF_WF_SI?wid=2000&hei=2000&fmt=p-jpg&qlt=95&.v=1683224241054",
        description: "ساعة ذكية مع شاشة دائماً نشطة، مقاومة للماء، تتبع اللياقة والصحة",
        category: "electronics"
    },
    {
        id: 5,
        title: "حقيبة Louis Vuitton",
        price: 45000,
        image: "https://eg.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-%D8%AD%D9%82%D8%A7%D8%A6%D8%A8-%D8%A3%D9%8A%D8%AF%D9%8A-%D9%86%D8%B9%D8%B1%D9%81%D9%87%D8%A7-%D8%A8%D8%A3%D8%B3%D9%85-néonoé--%D8%A7%D9%84%D9%86%D8%B9%D8%B1%D9%81%D9%87-%D8%A8%D8%A3%D8%B3%D9%85-M44839_PM2_Front%20view.jpg",
        description: "حقيبة يد فاخرة من الجلد الطبيعي، تصميم أنيق وعصري",
        category: "fashion"
    },
    {
        id: 6,
        title: "مكنسة كهربائية Dyson",
        price: 11000,
        image: "https://www.dyson.com.eg/dam/jcr:9d2d5b8a-9c6e-4d6c-bc8d-3d9f5e6c6b6a/21U0TTR_ECOSYSTEM_PLPs_Handhelds_Blue_1.webp",
        description: "مكنسة لاسلكية قوية، بطارية تدوم حتى 60 دقيقة، مع عدة ملحقات",
        category: "home"
    }
];

// عناصر DOM
const loadingScreen = document.getElementById('loading-screen');
const clientPage = document.getElementById('client-page');
const adminPage = document.getElementById('admin-page');
const productsContainer = document.getElementById('products-container');
const adminProductsContainer = document.getElementById('admin-products-container');
const addProductForm = document.getElementById('add-product-form');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartCount = document.querySelector('.cart-count');

// تهيئة الموقع
document.addEventListener('DOMContentLoaded', function() {
    // إخفاء شاشة التحميل بعد 3 ثواني
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            
            // التحقق من وجود كلمة السر في الرابط
            if (window.location.hash === '#0987') {
                showAdminPage();
            } else {
                showClientPage();
            }
            
            renderProducts();
            setupEventListeners();
        }, 500);
    }, 3000);
});

// إعداد مستمعي الأحداث
function setupEventListeners() {
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
        
        products.push(newProduct);
        renderProducts();
        addProductForm.reset();
        
        alert('تم إضافة المنتج بنجاح!');
    });
    
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
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterProducts(searchInput.value);
        }
    });
    
    searchButton.addEventListener('click', function() {
        filterProducts(searchInput.value);
    });
}

// عرض صفحة العميل
function showClientPage() {
    clientPage.style.display = 'block';
    adminPage.style.display = 'none';
}

// عرض صفحة الإدارة
function showAdminPage() {
    clientPage.style.display = 'none';
    adminPage.style.display = 'block';
}

// تسجيل الخروج من صفحة الإدارة
function logout() {
    window.location.hash = '';
    showClientPage();
}

// عرض المنتجات
function renderProducts(category = 'all') {
    let filteredProducts = products;
    
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    // عرض المنتجات في صفحة العميل
    productsContainer.innerHTML = '';
    filteredProducts.forEach(product => {
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
    
    // عرض المنتجات في صفحة الإدارة
    adminProductsContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'admin-product-card';
        productElement.innerHTML = `
            <h4>${product.title}</h4>
            <p><strong>السعر:</strong> ${product.price.toLocaleString()} ج.م</p>
            <p><strong>الفئة:</strong> ${getCategoryName(product.category)}</p>
            <div class="admin-product-actions">
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
        products = products.filter(product => product.id !== productId);
        renderProducts();
    }
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
    if (!searchTerm) {
        const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
        renderProducts(activeCategory);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    productsContainer.innerHTML = '';
    filteredProducts.forEach(product => {
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
