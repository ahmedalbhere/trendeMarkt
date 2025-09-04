// كلمة المرور للإدارة
const ADMIN_PASSWORD = "0987";

// عناصر DOM
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('login-error');

// التحقق من تسجيل الدخول
function checkLogin() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'admin-dashboard.html';
    }
}

// إرسال نموذج تسجيل الدخول
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = passwordInput.value;
    
    if (password === ADMIN_PASSWORD) {
        // تسجيل الدخول ناجح
        sessionStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'admin-dashboard.html';
    } else {
        // تسجيل الدخول فاشل
        errorMessage.style.display = 'block';
        passwordInput.value = '';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});

// التحقق من حالة تسجيل الدخول عند تحميل الصفحة
checkLogin();
