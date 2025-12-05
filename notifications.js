// ========== NOTIFICATION MANAGER ==========
class NotificationManager {
    static showNotification(message, type = 'success') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' :
                    type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}" style="font-size: 1.2rem;"></i>
            <span style="flex: 1; white-space: pre-line;">${message}</span>
            <button style="background:none; border:none; color:white; cursor:pointer; padding: 0 0 0 1rem;">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Close button
        const closeBtn = notification.querySelector('button');
        closeBtn.addEventListener('click', () => this.removeNotification(notification));
        
        // Auto-remove
        setTimeout(() => {
            this.removeNotification(notification);
        }, 4000);
    }

    static removeNotification(notification) {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }
}