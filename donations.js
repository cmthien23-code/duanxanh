// ========== DONATION MANAGER ==========
class DonationManager {
    static createDonationCard(type, amount) {
        const container = document.getElementById('created-donations');
        if (!container) return;

        const card = document.createElement('div');
        card.className = 'created-card enter';
        card.setAttribute('data-type', type);

        let title, icon;
        switch(type) {
            case 'money':
                title = 'Quyên góp tiền';
                icon = 'fa-money-bill-wave';
                break;
            case 'tree':
                title = 'Quyên góp cây giống';
                icon = 'fa-seedling';
                break;
            case 'supplies':
                title = 'Quyên góp vật tư';
                icon = 'fa-tools';
                break;
            case 'volunteer':
                title = 'Đăng ký tình nguyện';
                icon = 'fa-hands-helping';
                break;
            default:
                title = 'Quyên góp';
                icon = 'fa-gift';
        }

        card.innerHTML = `
            <div class="created-card-header">
                <div class="created-title">
                    <i class="fas ${icon}"></i>
                    ${title}
                </div>
                <button class="created-close">&times;</button>
            </div>
            <form class="created-form">
                ${type === 'money' ? `
                    <div class="form-group">
                        <label><i class="fas fa-money-bill-wave"></i> Số tiền quyên góp (VNĐ):</label>
                        <input type="number" class="created-amount" value="${amount || ''}" min="10000" required>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-tree"></i> Số cây quy đổi:</label>
                        <div class="created-tree-count" style="font-weight:600;color:#16a34a; padding: 0.5rem; background: #f0fdf4; border-radius: 4px;">
                            ${amount ? Math.floor(amount / 25000) : 0} cây
                        </div>
                    </div>
                ` : ''}
                
                ${type === 'tree' ? `
                    <div class="form-group">
                        <label><i class="fas fa-tree"></i> Loại cây giống:</label>
                        <select class="created-tree-type" required>
                            <option value="">-- Chọn loại cây --</option>
                            <option value="Cây bàng">Cây bàng</option>
                            <option value="Cây phượng">Cây phượng</option>
                            <option value="Cây bằng lăng">Cây bằng lăng</option>
                            <option value="Cây hoa sữa">Cây hoa sữa</option>
                            <option value="Cây sao đen">Cây sao đen</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-hashtag"></i> Số lượng:</label>
                        <input type="number" class="created-tree-quantity" min="1" value="1" required>
                    </div>
                ` : ''}
                
                ${type === 'supplies' ? `
                    <div class="form-group">
                        <label><i class="fas fa-box"></i> Loại vật tư:</label>
                        <select class="created-supplies-type" required>
                            <option value="">-- Chọn vật tư --</option>
                            <option value="Đất trồng">Đất trồng</option>
                            <option value="Phân bón">Phân bón</option>
                            <option value="Xẻng, cuốc">Xẻng, cuốc</option>
                            <option value="Bình tưới">Bình tưới</option>
                            <option value="Ủng, găng tay">Ủng, găng tay</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-hashtag"></i> Số lượng:</label>
                        <input type="text" class="created-supplies-quantity" placeholder="Ví dụ: 10 bao, 5 bộ..." required>
                    </div>
                ` : ''}
                
                ${type === 'volunteer' ? `
                    <div class="form-group">
                        <label><i class="fas fa-clock"></i> Thời gian tham gia:</label>
                        <select class="created-volunteer-time" required>
                            <option value="">-- Chọn thời gian --</option>
                            <option value="Sáng thứ 7">Sáng thứ 7</option>
                            <option value="Chiều thứ 7">Chiều thứ 7</option>
                            <option value="Sáng chủ nhật">Sáng chủ nhật</option>
                            <option value="Chiều chủ nhật">Chiều chủ nhật</option>
                            <option value="Linh hoạt">Linh hoạt theo lịch dự án</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-user-tag"></i> Kỹ năng đóng góp:</label>
                        <input type="text" class="created-volunteer-skills" placeholder="Ví dụ: Trồng cây, chăm sóc cây, tổ chức...">
                    </div>
                ` : ''}
                
                <div class="created-row">
                    <div class="form-group">
                        <label><i class="fas fa-user"></i> Họ và tên:</label>
                        <input type="text" class="created-name" required>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-envelope"></i> Email:</label>
                        <input type="email" class="created-email" required>
                    </div>
                </div>
                
                <div class="created-row">
                    <div class="form-group">
                        <label><i class="fas fa-phone"></i> Số điện thoại:</label>
                        <input type="tel" class="created-phone" required>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-building"></i> Khoa/Đơn vị:</label>
                        <input type="text" class="created-department" placeholder="Ví dụ: Khoa CNTT">
                    </div>
                </div>
                
                ${type === 'money' ? `
                    <div class="form-group">
                        <label><i class="fas fa-credit-card"></i> Hình thức thanh toán:</label>
                        <select class="created-payment-method" id="payment-method" required>
                            <option value="">-- Chọn hình thức --</option>
                            <option value="bank-transfer">Chuyển khoản ngân hàng</option>
                            <option value="e-wallet">Ví điện tử</option>
                            <option value="cash">Tiền mặt (khi gặp mặt)</option>
                        </select>
                    </div>
                    
                    <!-- Bank Transfer Section (Hidden by default) -->
                    <div id="bank-transfer-section" class="bank-transfer-section" style="display: none;">
                        <div class="bank-info-header">
                            <h4><i class="fas fa-university"></i> Thông tin tài khoản ngân hàng</h4>
                            <p>Chọn ngân hàng và chuyển khoản theo thông tin dưới đây</p>
                        </div>
                        
                        <div class="form-group">
                            <label><i class="fas fa-bank"></i> Chọn ngân hàng:</label>
                            <select class="form-input" id="bank-select">
                                <option value="">-- Chọn ngân hàng --</option>
                                <option value="vietcombank">Vietcombank (VCB)</option>
                                <option value="bidv">BIDV</option>
                                <option value="agribank">Agribank</option>
                                <option value="techcombank">Techcombank</option>
                                <option value="mbbank">MB Bank</option>
                                <option value="vietinbank">VietinBank</option>
                                <option value="acb">ACB</option>
                                <option value="sacombank">Sacombank</option>
                                <option value="vpbank">VPBank</option>
                                <option value="tpb">TPBank</option>
                            </select>
                        </div>
                        
                        <div class="bank-accounts-list">
                            <div class="bank-account-card active" data-bank="vietcombank">
                                <div class="bank-logo">
                                    <i class="fas fa-university"></i>
                                    <span class="bank-name">Vietcombank (VCB)</span>
                                </div>
                                <div class="bank-details">
                                    <p><strong>Số tài khoản:</strong> <span class="account-number">123456789012</span></p>
                                    <p><strong>Chủ tài khoản:</strong> <span class="account-holder">DỰ ÁN GREENLIFE</span></p>
                                    <p><strong>Chi nhánh:</strong> <span class="bank-branch">Hội sở Hà Nội</span></p>
                                    <p><strong>Nội dung chuyển khoản:</strong> <code class="transfer-content">GREENLIFE_[SỐ ĐIỆN THOẠI]</code></p>
                                </div>
                            </div>
                            
                            <div class="bank-account-card" data-bank="bidv" style="display: none;">
                                <div class="bank-logo">
                                    <i class="fas fa-university"></i>
                                    <span class="bank-name">BIDV</span>
                                </div>
                                <div class="bank-details">
                                    <p><strong>Số tài khoản:</strong> <span class="account-number">234567890123</span></p>
                                    <p><strong>Chủ tài khoản:</strong> <span class="account-holder">DỰ ÁN GREENLIFE</span></p>
                                    <p><strong>Chi nhánh:</strong> <span class="bank-branch">Trần Đại Nghĩa - Hà Nội</span></p>
                                    <p><strong>Nội dung chuyển khoản:</strong> <code class="transfer-content">GREENLIFE_[SỐ ĐIỆN THOẠI]</code></p>
                                </div>
                            </div>
                            
                            <div class="bank-account-card" data-bank="agribank" style="display: none;">
                                <div class="bank-logo">
                                    <i class="fas fa-university"></i>
                                    <span class="bank-name">Agribank</span>
                                </div>
                                <div class="bank-details">
                                    <p><strong>Số tài khoản:</strong> <span class="account-number">345678901234</span></p>
                                    <p><strong>Chủ tài khoản:</strong> <span class="account-holder">DỰ ÁN GREENLIFE</span></p>
                                    <p><strong>Chi nhánh:</strong> <span class="bank-branch">Chi nhánh Đống Đa</span></p>
                                    <p><strong>Nội dung chuyển khoản:</strong> <code class="transfer-content">GREENLIFE_[SỐ ĐIỆN THOẠI]</code></p>
                                </div>
                            </div>
                            
                            <!-- Các ngân hàng khác tương tự -->
                        </div>
                        
                        <div class="transfer-steps">
                            <h5><i class="fas fa-list-ol"></i> Hướng dẫn chuyển khoản</h5>
                            <ol class="steps-list">
                                <li>Chọn ngân hàng bạn muốn chuyển tiền</li>
                                <li>Sao chép thông tin tài khoản ngân hàng</li>
                                <li>Mở ứng dụng ngân hàng của bạn</li>
                                <li>Nhập thông tin chuyển khoản như trên</li>
                                <li>Nội dung chuyển khoản: <strong>GREENLIFE_[SỐ ĐIỆN THOẠI CỦA BẠN]</strong></li>
                                <li>Xác nhận và hoàn tất giao dịch</li>
                                <li>Quay lại đây để xác nhận đã chuyển khoản</li>
                            </ol>
                        </div>
                    </div>
                    
                    <!-- E-Wallet Section (Hidden by default) -->
                    <div id="e-wallet-section" class="e-wallet-section" style="display: none;">
                        <div class="form-group">
                            <label><i class="fas fa-mobile-alt"></i> Chọn ví điện tử:</label>
                            <select class="form-input" id="wallet-select">
                                <option value="">-- Chọn ví điện tử --</option>
                                <option value="momo">MoMo</option>
                                <option value="zalo">ZaloPay</option>
                                <option value="vnpay">VNPAY</option>
                                <option value="shopee">ShopeePay</option>
                            </select>
                        </div>
                        
                        <div class="wallet-info">
                            <div class="wallet-card" data-wallet="momo" style="display: none;">
                                <div class="wallet-logo">
                                    <i class="fas fa-wallet" style="color: #A50064;"></i>
                                    <span class="wallet-name">Ví MoMo</span>
                                </div>
                                <div class="wallet-details">
                                    <p><strong>Số điện thoại:</strong> <span class="wallet-number">0901 234 567</span></p>
                                    <p><strong>Tên tài khoản:</strong> <span class="wallet-holder">DỰ ÁN GREENLIFE</span></p>
                                    <p><strong>QR Code:</strong> <span class="qr-code">Quét mã QR trong ứng dụng MoMo</span></p>
                                </div>
                            </div>
                            
                            <div class="wallet-card" data-wallet="zalo" style="display: none;">
                                <div class="wallet-logo">
                                    <i class="fas fa-wallet" style="color: #0068FF;"></i>
                                    <span class="wallet-name">ZaloPay</span>
                                </div>
                                <div class="wallet-details">
                                    <p><strong>Số điện thoại:</strong> <span class="wallet-number">0901 234 567</span></p>
                                    <p><strong>Tên tài khoản:</strong> <span class="wallet-holder">DỰ ÁN GREENLIFE</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Cash Section (Hidden by default) -->
                    <div id="cash-section" class="cash-section" style="display: none;">
                        <div class="cash-info">
                            <p><i class="fas fa-handshake"></i> Quyên góp tiền mặt khi gặp mặt đội ngũ dự án GreenLife tại:</p>
                            <ul>
                                <li><strong>Địa điểm:</strong> Khoa Công nghệ Thông tin, Trường Đại học Phạm Văn Đồng</li>
                                <li><strong>Thời gian:</strong> Thứ 2 - Thứ 6: 8:00 - 17:00</li>
                                <li><strong>Liên hệ:</strong> 0123 456 789 (Mr. Trưởng dự án)</li>
                            </ul>
                            <p class="note"><i class="fas fa-info-circle"></i> Vui lòng liên hệ trước để hẹn lịch gặp mặt.</p>
                        </div>
                    </div>
                ` : ''}
                
                <div class="form-group">
                    <label><i class="fas fa-sticky-note"></i> Ghi chú (tuỳ chọn):</label>
                    <textarea class="created-note" rows="2" placeholder="Lời nhắn hoặc yêu cầu thêm..."></textarea>
                </div>
                
                ${type === 'money' ? `
                    <div class="form-group">
                        <label class="confirm-transfer">
                            <input type="checkbox" id="confirm-transfer" required>
                            <span>Tôi đã chuyển khoản thành công và đồng ý với các điều khoản quyên góp</span>
                        </label>
                    </div>
                ` : ''}
                
                <div class="created-thank">
                    <i class="fas fa-check-circle"></i>
                    <div style="font-weight: 600; margin-bottom: 0.5rem;">Cảm ơn bạn đã đóng góp!</div>
                    <div style="font-size: 0.9rem;">Thông tin của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.</div>
                    <button type="button" class="btn btn-secondary" style="margin-top: 1rem; width: 100%;">
                        <i class="fas fa-times"></i> Đóng
                    </button>
                </div>
                
                <button class="created-submit" type="submit">
                    <i class="fas fa-paper-plane"></i>
                    ${type === 'money' ? 'Xác nhận đã chuyển khoản' : 'Gửi thông tin đóng góp'}
                </button>
            </form>
        `;

        // Add event listeners
        const closeBtn = card.querySelector('.created-close');
        const form = card.querySelector('.created-form');
        const thankMsg = card.querySelector('.created-thank');
        const thankCloseBtn = thankMsg.querySelector('.btn-secondary');
        const amountInput = card.querySelector('.created-amount');
        const treeCountElement = card.querySelector('.created-tree-count');
        const paymentMethodSelect = card.querySelector('#payment-method');
        const bankSelect = card.querySelector('#bank-select');
        const walletSelect = card.querySelector('#wallet-select');

        closeBtn.addEventListener('click', () => this.closeDonationCard(card));
        thankCloseBtn.addEventListener('click', () => this.closeDonationCard(card));
        
        if (amountInput && treeCountElement) {
            amountInput.addEventListener('input', () => {
                const amount = parseInt(amountInput.value) || 0;
                const trees = Math.floor(amount / 25000);
                treeCountElement.textContent = trees + ' cây';
                
                // Cập nhật nội dung chuyển khoản
                const phoneInput = form.querySelector('.created-phone');
                if (phoneInput && phoneInput.value) {
                    this.updateTransferContent(form, phoneInput.value);
                }
            });
        }
        
        // Payment method change handler
        if (paymentMethodSelect) {
            paymentMethodSelect.addEventListener('change', (e) => {
                this.handlePaymentMethodChange(e.target.value, card);
            });
        }
        
        // Bank selection handler
        if (bankSelect) {
            bankSelect.addEventListener('change', (e) => {
                this.handleBankSelection(e.target.value, card);
            });
        }
        
        // Wallet selection handler
        if (walletSelect) {
            walletSelect.addEventListener('change', (e) => {
                this.handleWalletSelection(e.target.value, card);
            });
        }
        
        // Update transfer content when phone number changes
        const phoneInput = form.querySelector('.created-phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', () => {
                this.updateTransferContent(form, phoneInput.value);
            });
        }

        form.addEventListener('submit', (e) => this.handleDonationSubmit(e, form, thankMsg, type));

        // Add real-time validation
        this.addDonationFormValidation(card);

        container.prepend(card);
        
        // Animate in
        setTimeout(() => {
            card.classList.remove('enter');
            card.classList.add('enter-active');
        }, 10);
        
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }

    static handlePaymentMethodChange(method, card) {
        const bankSection = card.querySelector('#bank-transfer-section');
        const walletSection = card.querySelector('#e-wallet-section');
        const cashSection = card.querySelector('#cash-section');
        
        // Hide all sections first
        if (bankSection) bankSection.style.display = 'none';
        if (walletSection) walletSection.style.display = 'none';
        if (cashSection) cashSection.style.display = 'none';
        
        // Show selected section
        switch(method) {
            case 'bank-transfer':
                if (bankSection) bankSection.style.display = 'block';
                break;
            case 'e-wallet':
                if (walletSection) walletSection.style.display = 'block';
                break;
            case 'cash':
                if (cashSection) cashSection.style.display = 'block';
                break;
        }
    }

    static handleBankSelection(bank, card) {
        // Hide all bank cards
        const bankCards = card.querySelectorAll('.bank-account-card');
        bankCards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('active');
        });
        
        // Show selected bank card
        const selectedCard = card.querySelector(`.bank-account-card[data-bank="${bank}"]`);
        if (selectedCard) {
            selectedCard.style.display = 'block';
            selectedCard.classList.add('active');
        }
    }

    static handleWalletSelection(wallet, card) {
        // Hide all wallet cards
        const walletCards = card.querySelectorAll('.wallet-card');
        walletCards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('active');
        });
        
        // Show selected wallet card
        const selectedCard = card.querySelector(`.wallet-card[data-wallet="${wallet}"]`);
        if (selectedCard) {
            selectedCard.style.display = 'block';
            selectedCard.classList.add('active');
        }
    }

    static updateTransferContent(form, phone) {
        const transferContents = form.querySelectorAll('.transfer-content');
        transferContents.forEach(element => {
            element.textContent = `GREENLIFE_${phone}`;
        });
    }

    static closeDonationCard(card) {
        card.classList.remove('enter-active');
        card.classList.add('enter');
        setTimeout(() => card.remove(), 300);
    }

    static handleDonationSubmit(event, form, thankMsg, type) {
        event.preventDefault();
        
        const submitBtn = form.querySelector('.created-submit');
        
        // Validation
        const requiredInputs = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (!input.checked) {
                    isValid = false;
                    input.parentElement.style.color = '#dc2626';
                    input.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        input.style.animation = '';
                    }, 500);
                } else {
                    input.parentElement.style.color = '';
                }
            } else if (!input.value.trim()) {
                input.style.borderColor = '#dc2626';
                isValid = false;
                input.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    input.style.animation = '';
                }, 500);
            } else {
                input.style.borderColor = '#16a34a';
            }
        });
        
        if (!isValid) {
            NotificationManager.showNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
            return;
        }
        
        // Email validation
        const emailInput = form.querySelector('.created-email');
        if (emailInput && !this.validateEmail(emailInput.value)) {
            emailInput.style.borderColor = '#dc2626';
            emailInput.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                emailInput.style.animation = '';
            }, 500);
            NotificationManager.showNotification('Email không hợp lệ', 'error');
            return;
        }
        
        // Phone validation
        const phoneInput = form.querySelector('.created-phone');
        if (phoneInput && !this.validatePhone(phoneInput.value)) {
            phoneInput.style.borderColor = '#dc2626';
            phoneInput.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                phoneInput.style.animation = '';
            }, 500);
            NotificationManager.showNotification('Số điện thoại không hợp lệ (10-11 số)', 'error');
            return;
        }
        
        // Submit
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
        
        setTimeout(() => {
            form.style.display = 'none';
            thankMsg.style.display = 'block';
            
            const message = type === 'money' 
                ? '✓ Cảm ơn bạn đã quyên góp! Chúng tôi sẽ xác nhận khi nhận được chuyển khoản.' 
                : '✓ Cảm ơn bạn đã quyên góp! Thông tin đã được ghi nhận.';
            
            NotificationManager.showNotification(message, 'success');
            
            setTimeout(() => {
                this.closeDonationCard(form.closest('.created-card'));
            }, 5000);
        }, 500);
    }

    static addDonationFormValidation(card) {
        const inputs = card.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.style.borderColor = '#16a34a';
                } else {
                    input.style.borderColor = '#e5e7eb';
                }
            });
            
            if (input.type === 'email') {
                input.addEventListener('blur', () => {
                    if (input.value && !this.validateEmail(input.value)) {
                        input.style.borderColor = '#dc2626';
                    }
                });
            }
            
            if (input.type === 'tel') {
                input.addEventListener('blur', () => {
                    if (input.value && !this.validatePhone(input.value)) {
                        input.style.borderColor = '#dc2626';
                    }
                });
            }
        });
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePhone(phone) {
        const re = /^[0-9]{10,11}$/;
        return re.test(phone);
    }

    static initDonationCards() {
        // Project cards
        document.querySelectorAll('.popular-card').forEach(card => {
            card.addEventListener('click', () => {
                const projectName = card.getAttribute('data-project');
                ModalManager.openProjectDetail(projectName);
            });
        });

        // Donation cards
        document.querySelectorAll('.donate-card').forEach(card => {
            card.addEventListener('click', () => {
                const type = card.getAttribute('data-type');
                const amount = card.getAttribute('data-amount');
                this.createDonationCard(type, amount ? parseInt(amount) : null);
            });
        });

        // Footer donation links
        document.querySelectorAll('a[data-type]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const type = link.getAttribute('data-type');
                const amount = link.getAttribute('data-amount');
                this.createDonationCard(type, amount ? parseInt(amount) : null);
            });
        });
    }
}

// Khởi tạo donation manager
DonationManager.initDonationCards();