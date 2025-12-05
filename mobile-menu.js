// ========== MOBILE MENU ==========
class MobileMenu {
    static init() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const userMenu = document.querySelector('.user-menu');
        
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navLinks.classList.toggle('active');
                userMenu.classList.toggle('active');
            });
        }
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                userMenu.classList.remove('active');
            });
        });
    }
}

// ========== USER MENU ==========
class UserMenu {
    static toggleUserMenu() {
        const menu = document.querySelector(".user-menu");
        menu.classList.toggle("open");
    }

    static init() {
        const menuBtn = document.getElementById('user-menu-btn');
        if (menuBtn) {
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleUserMenu();
            });
        }

        window.addEventListener("click", function (e) {
            const menu = document.querySelector(".user-menu");
            if (menu && menu.classList.contains("open")) {
                if (!menu.contains(e.target)) {
                    menu.classList.remove("open");
                }
            }
        });
    }
}

// Khởi tạo mobile menu và user menu
MobileMenu.init();
UserMenu.init();