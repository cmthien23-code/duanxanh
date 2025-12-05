// ========== MODAL MANAGER ==========
class ModalManager {
    static openModal(id) {
        document.getElementById(id).classList.add("active");
        document.body.style.overflow = 'hidden';
    }

    static closeModal(id) {
        document.getElementById(id).classList.remove("active");
        document.body.style.overflow = 'auto';
    }

    static openTransparencyModal() {
        document.getElementById('transparency-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    static closeTransparencyModal() {
        document.getElementById('transparency-modal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    static openProjectDetail(projectName) {
        const project = projects[projectName];
        if (!project) return;
        
        document.getElementById('project-detail-title').textContent = projectName;
        
        const content = document.getElementById('project-detail-content');
        content.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <h3 style="color: #166534; margin-bottom: 0.5rem;">Mô tả dự án</h3>
                <p>${project.description}</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                <div style="background: #f0fdf4; padding: 1rem; border-radius: 8px;">
                    <div style="font-size: 0.9rem; color: #6b7280;">Mục tiêu</div>
                    <div style="font-weight: 600; color: #166534;">${project.target}</div>
                </div>
                <div style="background: #f0fdf4; padding: 1rem; border-radius: 8px;">
                    <div style="font-size: 0.9rem; color: #6b7280;">Hiện tại</div>
                    <div style="font-weight: 600; color: #16a34a;">${project.current}</div>
                </div>
                <div style="background: #f0fdf4; padding: 1rem; border-radius: 8px;">
                    <div style="font-size: 0.9rem; color: #6b7280;">Người tham gia</div>
                    <div style="font-weight: 600; color: #166534;">${project.participants}</div>
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="color: #166534; margin-bottom: 0.5rem;">Thông tin thời gian</h3>
                <div style="display: flex; gap: 2rem;">
                    <div>
                        <div style="font-size: 0.9rem; color: #6b7280;">Ngày bắt đầu</div>
                        <div style="font-weight: 500;">${project.startDate}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.9rem; color: #6b7280;">Ngày kết thúc</div>
                        <div style="font-weight: 500;">${project.endDate}</div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 style="color: #166534; margin-bottom: 0.5rem;">Ngân sách</h3>
                <div style="background: linear-gradient(135deg, #16a34a, #15803d); color: white; padding: 1rem; border-radius: 8px; font-weight: 600;">
                    ${project.budget}
                </div>
            </div>
        `;
        
        this.openModal('project-detail-modal');
    }

    static initModalEvents() {
        // Close modals when clicking outside
        window.addEventListener("click", function (e) {
            document.querySelectorAll(".modal.active").forEach(function (modal) {
                if (e.target === modal) {
                    modal.classList.remove("active");
                    document.body.style.overflow = 'auto';
                }
            });
            
            const transparencyModal = document.getElementById('transparency-modal');
            if (transparencyModal.classList.contains('active') && e.target === transparencyModal) {
                transparencyModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close buttons
        document.getElementById('project-modal-close')?.addEventListener('click', () => this.closeModal('project-detail-modal'));
        document.getElementById('project-close-btn')?.addEventListener('click', () => this.closeModal('project-detail-modal'));
        document.getElementById('transparency-modal-close')?.addEventListener('click', () => this.closeTransparencyModal());
        document.getElementById('login-modal-close')?.addEventListener('click', () => this.closeModal('login-modal'));
        document.getElementById('signup-modal-close')?.addEventListener('click', () => this.closeModal('signup-modal'));
        document.getElementById('progress-modal-close')?.addEventListener('click', () => this.closeModal('progress-modal'));
        
        // Modal buttons
        document.getElementById('project-transparency-btn')?.addEventListener('click', () => {
            this.closeModal('project-detail-modal');
            this.openTransparencyModal();
        });
        
        document.getElementById('transparency-btn')?.addEventListener('click', () => this.openTransparencyModal());
        document.getElementById('financial-report-btn')?.addEventListener('click', () => this.showFinancialReport());
        document.getElementById('progress-report-btn')?.addEventListener('click', () => this.showProgressReport());
        document.getElementById('photo-gallery-btn')?.addEventListener('click', () => this.showPhotoGallery());
        
        // Login/Signup links
        document.getElementById('login-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal('login-modal');
            UserMenu.toggleUserMenu();
        });
        
        document.getElementById('transparency-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openTransparencyModal();
            UserMenu.toggleUserMenu();
        });
        
        document.getElementById('progress-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal('progress-modal');
            UserMenu.toggleUserMenu();
        });
        
        document.getElementById('signup-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal('login-modal');
            this.openModal('signup-modal');
        });
        
        document.getElementById('login-switch-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal('signup-modal');
            this.openModal('login-modal');
        });
    }

    static showFinancialReport() {
        NotificationManager.showNotification(
            'BÁO CÁO TÀI CHÍNH DỰ ÁN GREENLIFE\n\n' +
            '• Tổng thu: 0 VNĐ\n' +
            '• Tổng chi: 0 VNĐ\n' +
            '• Quỹ còn lại: 0 VNĐ\n' +
            '• Hiệu suất sử dụng: 0%',
            'info'
        );
    }

    static showProgressReport() {
        NotificationManager.showNotification(
            'BÁO CÁO TIẾN ĐỘ TRỒNG CÂY\n\n' +
            '• Tổng cây đã trồng: 1 cây\n' +
            '• Tỷ lệ sống: 100%\n' +
            '• Trường học đã triển khai: 1 trường',
            'info'
        );
    }

    static showPhotoGallery() {
        NotificationManager.showNotification(
            'THƯ VIỆN HÌNH ẢNH MINH CHỨNG\n\n' +
            '📸 Bao gồm:\n' +
            '• Ảnh hoạt động trồng cây\n' +
            '• Biên bản bàn giao\n' +
            '• Hình ảnh cây phát triển\n' +
            '• Ảnh sinh viên tham gia',
            'info'
        );
    }
}

// Khởi tạo modal events
ModalManager.initModalEvents();