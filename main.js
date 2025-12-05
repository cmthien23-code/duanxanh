// ========== DỮ LIỆU GLOBAL ==========
const projects = {
    'Vườn cây sân trường': {
        description: 'Trồng cây bóng mát xung quanh sân trường, tạo không gian xanh cho sinh viên vui chơi và học tập.',
        target: '50 cây xanh',
        current: '15 cây (30%)',
        participants: '150 người',
        startDate: '01/12/2024',
        endDate: '30/06/2025',
        budget: '25,000,000 VNĐ'
    },
    'Vườn sinh thái học đường': {
        description: 'Xây dựng vườn sinh thái với đa dạng loài cây, phục vụ học tập và nghiên cứu cho sinh viên ngành Môi trường và Sinh học.',
        target: '30 cây các loại',
        current: '6 cây (20%)',
        participants: '100 người',
        startDate: '15/12/2024',
        endDate: '15/08/2025',
        budget: '15,000,000 VNĐ'
    },
    'Hành lang xanh lớp học': {
        description: 'Trồng cây cảnh và cây leo dọc hành lang các lớp học, tạo môi trường học tập trong lành, giảm tiếng ồn.',
        target: '20 cây cảnh',
        current: '3 cây (15%)',
        participants: '80 người',
        startDate: '01/01/2025',
        endDate: '30/09/2025',
        budget: '10,000,000 VNĐ'
    }
};

const searchData = [
    { name: "Vườn cây sân trường", type: "Dự án", icon: "fas fa-tree", action: "projectDetail" },
    { name: "Vườn sinh thái học đường", type: "Dự án", icon: "fas fa-leaf", action: "projectDetail" },
    { name: "Hành lang xanh lớp học", type: "Dự án", icon: "fas fa-school", action: "projectDetail" },
    { name: "Quyên góp tiền", type: "Hình thức", icon: "fas fa-money-bill-wave", action: "donationCard" },
    { name: "Quyên góp cây giống", type: "Hình thức", icon: "fas fa-seedling", action: "donationCard" },
    { name: "Tham gia tình nguyện", type: "Hình thức", icon: "fas fa-hands-helping", action: "donationCard" },
    { name: "Minh bạch tài chính", type: "Thông tin", icon: "fas fa-chart-line", action: "transparencyModal" },
    { name: "Tiến độ dự án", type: "Thông tin", icon: "fas fa-chart-bar", action: "progressModal" }
];

// ========== KHỞI TẠO ỨNG DỤNG ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('GreenLife đã sẵn sàng!');
    
    // Tạo thêm style cho animation
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #16a34a, #15803d);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 400px;
            min-width: 300px;
        }
        
        .notification.notification-error {
            background: linear-gradient(135deg, #dc2626, #b91c1c);
        }
        
        .notification.notification-info {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        }
    `;
    document.head.appendChild(style);
});