// ========== AUTH HANDLER ==========
class AuthHandler {
    constructor() {
        this.initLoginForm();
        this.initSignupForm();
    }

    initLoginForm() {
        const loginForm = document.getElementById('login-form');
        if (!loginForm) return;

        loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        
        document.getElementById('google-login-btn')?.addEventListener('click', () => this.handleSocialLogin('google'));
        document.getElementById('facebook-login-btn')?.addEventListener('click', () => this.handleSocialLogin('facebook'));
        document.getElementById('forgot-password')?.addEventListener('click', (e) => {
            e.preventDefault();
            NotificationManager.showNotification('Chức năng quên mật khẩu đang được phát triển', 'info');
        });
    }

    initSignupForm() {
        const signupForm = document.getElementById('signup-form');
        if (!signupForm) return;

        signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        
        document.getElementById('google-signup-btn')?.addEventListener('click', () => this.handleSocialSignup('google'));
        document.getElementById('facebook-signup-btn')?.addEventListener('click', () => this.handleSocialSignup('facebook'));

        // Password validation
        const passwordInput = document.getElementById('signup-password');
        const confirmInput = document.getElementById('signup-confirm-password');
        const emailInput = document.getElementById('signup-email');

        if (passwordInput) {
            passwordInput.addEventListener('input', () => this.checkPasswordStrength(passwordInput.value));
        }

        if (confirmInput) {
            confirmInput.addEventListener('input', () => {
                const password = document.getElementById('signup-password').value;
                const matchElement = confirmInput.parentNode.querySelector('.password-match');
                
                if (confirmInput.value && password) {
                    if (confirmInput.value === password) {
                        confirmInput.style.borderColor = '#16a34a';
                        matchElement.innerHTML = '<i class="fas fa-check-circle" style="color:#16a34a"></i> Mật khẩu khớp';
                        matchElement.style.color = '#16a34a';
                        matchElement.style.display = 'block';
                    } else {
                        confirmInput.style.borderColor = '#dc2626';
                        matchElement.innerHTML = '<i class="fas fa-times-circle" style="color:#dc2626"></i> Mật khẩu không khớp';
                        matchElement.style.color = '#dc2626';
                        matchElement.style.display = 'block';
                    }
                } else {
                    matchElement.style.display = 'none';
                }
            });
        }

        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                const feedback = emailInput.parentNode.querySelector('.email-feedback');
                if (DonationManager.validateEmail(emailInput.value)) {
                    emailInput.style.borderColor = '#16a34a';
                    feedback.innerHTML = '<i class="fas fa-check-circle" style="color:#16a34a"></i> Email hợp lệ';
                    feedback.style.color = '#16a34a';
                    feedback.style.display = 'block';
                } else if (emailInput.value) {
                    emailInput.style.borderColor = '#dc2626';
                    feedback.innerHTML = '<i class="fas fa-times-circle" style="color:#dc2626"></i> Email không hợp lệ';
                    feedback.style.color = '#dc2626';
                    feedback.style.display = 'block';
                } else {
                    feedback.style.display = 'none';
                }
            });
        }
    }

    handleLogin(event) {
        event.preventDefault();
        const submitBtn = document.getElementById('login-submit');
        
        submitBtn.classList.add('loading');
        
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            ModalManager.closeModal('login-modal');
            NotificationManager.showNotification('✅ Đăng nhập thành công!', 'success');
            this.updateUIAfterLogin();
        }, 500);
    }

    handleSocialLogin(provider) {
        NotificationManager.showNotification(`Đang đăng nhập với ${provider}...`, 'info');
        setTimeout(() => {
            ModalManager.closeModal('login-modal');
            NotificationManager.showNotification(`✅ Đăng nhập với ${provider} thành công!`, 'success');
            this.updateUIAfterLogin();
        }, 800);
    }

    handleSignup(event) {
        event.preventDefault();
        
        const submitBtn = document.getElementById('signup-submit');
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        // Check password match
        if (password !== confirmPassword) {
            document.getElementById('signup-confirm-password').style.borderColor = '#dc2626';
            NotificationManager.showNotification('Mật khẩu xác nhận không khớp!', 'error');
            return;
        }
        
        // Check password strength
        if (!this.checkPasswordStrength(password)) {
            NotificationManager.showNotification('Mật khẩu chưa đủ mạnh. Vui lòng kiểm tra các yêu cầu!', 'error');
            return;
        }
        
        submitBtn.classList.add('loading');
        
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            ModalManager.closeModal('signup-modal');
            NotificationManager.showNotification('🎉 Đăng ký thành công! Chào mừng bạn đến với GreenLife.', 'success');
            this.updateUIAfterLogin();
        }, 500);
    }

    handleSocialSignup(provider) {
        NotificationManager.showNotification(`Đang kết nối với ${provider}...`, 'info');
        setTimeout(() => {
            ModalManager.closeModal('signup-modal');
            NotificationManager.showNotification(`✅ Đăng ký với ${provider} thành công!`, 'success');
            this.updateUIAfterLogin();
        }, 800);
    }

    checkPasswordStrength(password) {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        
        this.updatePasswordRequirement('req-length', hasMinLength);
        this.updatePasswordRequirement('req-uppercase', hasUpperCase);
        this.updatePasswordRequirement('req-lowercase', hasLowerCase);
        this.updatePasswordRequirement('req-number', hasNumbers);
        this.updatePasswordRequirement('req-special', hasSpecialChar);
        
        let strength = 0;
        if (hasMinLength) strength++;
        if (hasUpperCase) strength++;
        if (hasLowerCase) strength++;
        if (hasNumbers) strength++;
        if (hasSpecialChar) strength++;
        
        const strengthBar = document.getElementById('password-strength');
        strengthBar.className = 'password-strength';
        
        if (strength < 3) {
            strengthBar.classList.add('weak');
            return false;
        } else if (strength < 5) {
            strengthBar.classList.add('medium');
            return true;
        } else {
            strengthBar.classList.add('strong');
            return true;
        }
    }
    
    updatePasswordRequirement(elementId, isMet) {
        const element = document.getElementById(elementId);
        if (element) {
            element.className = isMet ? 'requirement-met' : 'requirement-not-met';
            element.querySelector('i').className = isMet ? 'fas fa-check-circle' : 'fas fa-circle';
        }
    }

    updateUIAfterLogin() {
        const userMenuBtn = document.querySelector('.user-menu-btn');
        if (userMenuBtn) {
            userMenuBtn.innerHTML = '<i class="fas fa-user-circle"></i> Tài khoản <i class="fas fa-chevron-down"></i>';
            
            const dropdown = document.getElementById('user-menu-dropdown');
            dropdown.innerHTML = `
                <a href="#" style="color: #16a34a; font-weight: 600;">
                    <i class="fas fa-user-check"></i> Đã đăng nhập
                </a>
                <a href="#" id="transparency-link">
                    <i class="fas fa-chart-line"></i> Minh bạch tài chính
                </a>
                <a href="#" id="progress-link">
                    <i class="fas fa-chart-bar"></i> Xem tiến độ
                </a>
                <a href="#" onclick="AuthHandler.showMyDonations()">
                    <i class="fas fa-history"></i> Lịch sử quyên góp
                </a>
                <a href="#" onclick="AuthHandler.handleLogout()" style="color: #dc2626;">
                    <i class="fas fa-sign-out-alt"></i> Đăng xuất
                </a>
            `;
            
            // Re-attach event listeners
            document.getElementById('transparency-link')?.addEventListener('click', (e) => {
                e.preventDefault();
                ModalManager.openTransparencyModal();
                UserMenu.toggleUserMenu();
            });
            
            document.getElementById('progress-link')?.addEventListener('click', (e) => {
                e.preventDefault();
                ModalManager.openModal('progress-modal');
                UserMenu.toggleUserMenu();
            });
        }
    }
    
    static showMyDonations() {
        NotificationManager.showNotification('Lịch sử quyên góp sẽ hiển thị khi có kết nối backend', 'info');
    }
    
    static handleLogout() {
        const userMenuBtn = document.querySelector('.user-menu-btn');
        if (userMenuBtn) {
            userMenuBtn.innerHTML = 'Tài khoản <i class="fas fa-chevron-down"></i>';
            
            const dropdown = document.getElementById('user-menu-dropdown');
            dropdown.innerHTML = `
                <a href="#" id="login-link">Đăng nhập</a>
                <a href="#" id="signup-link">Đăng ký</a>
                <a href="#" id="transparency-link">Minh bạch tài chính</a>
                <a href="#" id="progress-link">Xem tiến độ</a>
            `;
            
            // Re-attach event listeners
            ModalManager.initModalEvents();
        }
        
        NotificationManager.showNotification('Đã đăng xuất thành công', 'info');
    }
}

// Khởi tạo auth handler
const authHandler = new AuthHandler();