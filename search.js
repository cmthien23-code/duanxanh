// ========== SEARCH FUNCTIONALITY ==========
class SearchHandler {
    constructor() {
        this.searchInput = document.getElementById('header-search');
        this.searchResults = document.getElementById('search-results');
        this.init();
    }

    init() {
        this.searchInput.addEventListener('input', () => this.handleSearch());
        document.addEventListener('click', (e) => this.handleClickOutside(e));
    }

    handleSearch() {
        const query = this.searchInput.value.toLowerCase().trim();
        
        if (query.length === 0) {
            this.searchResults.classList.remove('active');
            return;
        }
        
        const filteredResults = searchData.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.type.toLowerCase().includes(query)
        );
        
        this.displaySearchResults(filteredResults);
    }

    displaySearchResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="no-results">Không tìm thấy kết quả</div>';
            this.searchResults.classList.add('active');
            return;
        }
        
        this.searchResults.innerHTML = results.map(item => `
            <div class="search-result-item" data-action="${item.action}" data-name="${item.name}">
                <i class="${item.icon}"></i>
                <div>
                    <div style="font-weight: 500;">${item.name}</div>
                    <div style="font-size: 0.8rem; color: #6b7280;">${item.type}</div>
                </div>
            </div>
        `).join('');
        
        this.searchResults.classList.add('active');
        
        // Add click handlers to search results
        this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => this.handleSearchResultClick(item));
        });
    }

    handleSearchResultClick(item) {
        const action = item.getAttribute('data-action');
        const name = item.getAttribute('data-name');
        
        switch(action) {
            case 'projectDetail':
                this.openProjectDetail(name);
                break;
            case 'donationCard':
                this.createDonationCard(name);
                break;
            case 'transparencyModal':
                ModalManager.openTransparencyModal();
                break;
            case 'progressModal':
                ModalManager.openModal('progress-modal');
                break;
        }
        
        this.searchResults.classList.remove('active');
        this.searchInput.value = '';
    }

    openProjectDetail(projectName) {
        ModalManager.openProjectDetail(projectName);
    }

    createDonationCard(itemName) {
        let type, amount;
        
        switch(itemName) {
            case 'Quyên góp tiền':
                type = 'money';
                amount = 50000;
                break;
            case 'Quyên góp cây giống':
                type = 'tree';
                break;
            case 'Tham gia tình nguyện':
                type = 'volunteer';
                break;
            default:
                type = 'money';
                amount = 25000;
        }
        
        DonationManager.createDonationCard(type, amount);
    }

    handleClickOutside(e) {
        if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
            this.searchResults.classList.remove('active');
        }
    }
}

// Khởi tạo search handler
const searchHandler = new SearchHandler();