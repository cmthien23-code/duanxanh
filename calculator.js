// ========== TEAM CALCULATOR ==========
class TeamCalculator {
    constructor() {
        this.participantInput = document.getElementById('participant-count');
        this.calculateBtn = document.getElementById('calculate-team-btn');
        this.errorElement = document.getElementById('count-error');
        this.resultsElement = document.getElementById('team-results');
        this.init();
    }

    init() {
        this.calculateBtn.addEventListener('click', () => this.calculateTeam());
        this.participantInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.calculateTeam();
                e.preventDefault();
            }
        });
        
        // Auto-calculate on load
        setTimeout(() => this.calculateTeam(), 500);
    }

    calculateTeam() {
        this.participantInput.classList.remove('error');
        this.errorElement.classList.remove('show');
        
        const participantCount = parseInt(this.participantInput.value);
        
        if (isNaN(participantCount) || participantCount < 1) {
            this.participantInput.classList.add('error');
            this.errorElement.classList.add('show');
            return;
        }
        
        const hauluc = Math.ceil(participantCount / 20);
        const giamSat = Math.ceil(participantCount / 30);
        const truyenThong = Math.ceil(participantCount / 50);
        const keToan = 1;
        
        const html = `
            <div class='team-card'>
                <div style='font-weight:600;color:#166534;margin-bottom:12px;font-size:1.1rem'>
                    <i class="fas fa-users"></i> Đề xuất đội hỗ trợ cho ${participantCount.toLocaleString()} người tham gia
                </div>
                <ul style='list-style:none;padding:0;margin:0;color:#374151;font-size:0.95rem'>
                    <li style='padding:8px 0;border-bottom:1px solid #f0f4f8'>
                        <i class="fas fa-people-carry" style="color:#16a34a; width: 20px;"></i>
                        Hậu cần: <strong style='color:#16a34a'>${hauluc} người</strong>
                        <div style="font-size:0.8rem;color:#6b7280">(1 người / 20 người tham gia)</div>
                    </li>
                    <li style='padding:8px 0;border-bottom:1px solid #f0f4f8'>
                        <i class="fas fa-clipboard-check" style="color:#16a34a; width: 20px;"></i>
                        Giám sát kỹ thuật: <strong style='color:#16a34a'>${giamSat} người</strong>
                        <div style="font-size:0.8rem;color:#6b7280">(1 người / 30 người tham gia)</div>
                    </li>
                    <li style='padding:8px 0;border-bottom:1px solid #f0f4f8'>
                        <i class="fas fa-bullhorn" style="color:#16a34a; width: 20px;"></i>
                        Truyền thông: <strong style='color:#16a34a'>${truyenThong} người</strong>
                        <div style="font-size:0.8rem;color:#6b7280">(1 người / 50 người tham gia)</div>
                    </li>
                    <li style='padding:8px 0'>
                        <i class="fas fa-calculator" style="color:#16a34a; width: 20px;"></i>
                        Kế toán: <strong style='color:#16a34a'>${keToan} người</strong>
                        <div style="font-size:0.8rem;color:#6b7280">(1 người / dự án)</div>
                    </li>
                </ul>
                <div style='margin-top:12px;padding:12px;background:#f0fdf4;border-radius:6px;font-size:0.9rem;color:#166534'>
                    <strong><i class="fas fa-user-friends"></i> Tổng số thành viên đội hỗ trợ: ${hauluc + giamSat + truyenThong + keToan} người</strong>
                </div>
            </div>
        `;
        
        this.resultsElement.innerHTML = html;
    }
}

// Khởi tạo team calculator
const teamCalculator = new TeamCalculator();