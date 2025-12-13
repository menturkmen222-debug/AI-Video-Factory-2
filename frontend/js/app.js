class App {
    constructor() {
        this.currentSection = 'dashboard';
        this.logs = [];
        this.stats = null;
        this.isLoading = false;
        this.refreshInterval = null;
        this.notifications = [];
        this.activeInputTab = 'file';
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSection('dashboard');
        this.checkHealth();
        this.loadStats();
        this.loadLogs();
        this.startAutoRefresh();
        this.loadSettings();
    }

    bindEvents() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.loadSection(section);
            });
        });

        document.getElementById('menuToggle').addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
        });

        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshAll();
        });

        document.getElementById('viewAllLogs').addEventListener('click', () => {
            this.loadSection('logs');
        });

        document.getElementById('runScheduleBtn').addEventListener('click', () => {
            this.runSchedule();
        });

        document.getElementById('clearQueueBtn').addEventListener('click', () => {
            this.confirmAction(
                'Clear Queue',
                'Are you sure you want to clear all videos from the queue? This action cannot be undone.',
                () => this.clearQueue()
            );
        });

        document.getElementById('clearLogsBtn').addEventListener('click', () => {
            this.confirmAction(
                'Clear Logs',
                'Are you sure you want to clear all logs? This action cannot be undone.',
                () => this.clearLogs()
            );
        });

        document.getElementById('goToUpload').addEventListener('click', () => {
            this.loadSection('upload');
        });

        this.bindUploadEvents();
        this.bindTabEvents();
        this.bindLogEvents();
        this.bindSettingsEvents();
        this.bindModalEvents();
    }

    bindTabEvents() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.switchTab(tab);
            });
        });
    }

    switchTab(tab) {
        this.activeInputTab = tab;
        
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `tab-${tab}`);
        });

        if (tab === 'url') {
            this.clearVideoPreview();
        } else {
            document.getElementById('videoUrl').value = '';
        }
    }

    bindUploadEvents() {
        const uploadZone = document.getElementById('uploadZone');
        const videoInput = document.getElementById('videoFile');
        const browseBtn = document.getElementById('browseBtn');
        const removeBtn = document.getElementById('removeVideo');
        const uploadForm = document.getElementById('uploadForm');

        browseBtn.addEventListener('click', () => videoInput.click());

        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });

        uploadZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
        });

        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('video/')) {
                this.handleVideoSelect(files[0]);
            }
        });

        videoInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleVideoSelect(e.target.files[0]);
            }
        });

        removeBtn.addEventListener('click', () => {
            this.clearVideoPreview();
        });

        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUpload();
        });
    }

    bindLogEvents() {
        document.getElementById('logLevelFilter').addEventListener('change', () => {
            this.filterLogs();
        });

        document.getElementById('logSearch').addEventListener('input', () => {
            this.filterLogs();
        });

        document.getElementById('refreshLogsBtn').addEventListener('click', () => {
            this.loadLogs();
        });

        document.getElementById('exportLogsBtn').addEventListener('click', () => {
            this.exportLogs();
        });

        document.getElementById('refreshQueueBtn').addEventListener('click', () => {
            this.loadStats();
        });
    }

    bindSettingsEvents() {
        document.getElementById('saveSettings').addEventListener('click', () => {
            this.saveSettings();
        });
    }

    bindModalEvents() {
        const modal = document.getElementById('confirmModal');
        const overlay = modal.querySelector('.modal-overlay');
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = document.getElementById('confirmModalCancel');

        [overlay, closeBtn, cancelBtn].forEach(el => {
            el.addEventListener('click', () => this.hideModal());
        });
    }

    loadSection(section) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.section === section);
        });

        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.toggle('active', sec.id === `section-${section}`);
        });

        const titles = {
            dashboard: 'Dashboard',
            upload: 'Upload Video',
            queue: 'Video Queue',
            logs: 'System Logs',
            settings: 'Settings'
        };

        document.getElementById('pageTitle').textContent = titles[section] || section;
        this.currentSection = section;

        document.querySelector('.sidebar').classList.remove('open');

        if (section === 'logs') {
            this.loadLogs();
        } else if (section === 'queue') {
            this.loadStats();
        }
    }

    async checkHealth() {
        const healthStatus = document.getElementById('healthStatus');
        const indicator = healthStatus.querySelector('.health-indicator');
        const text = healthStatus.querySelector('.health-text');

        try {
            const data = await api.checkHealth();
            indicator.className = 'health-indicator healthy';
            text.textContent = 'System Healthy';
        } catch (error) {
            indicator.className = 'health-indicator unhealthy';
            text.textContent = 'System Offline';
        }
    }

    async loadStats() {
        try {
            const data = await api.getStats();
            this.stats = data;
            this.updateStatsUI(data);
            this.updateQueueUI(data);
        } catch (error) {
            console.error('Failed to load stats:', error);
            this.showToast('error', 'Error', 'Failed to load statistics');
        }
    }

    updateStatsUI(data) {
        const stats = data.stats || {};
        document.getElementById('statPending').textContent = stats.pending || 0;
        document.getElementById('statProcessing').textContent = stats.processing || 0;
        document.getElementById('statCompleted').textContent = stats.completed || 0;
        document.getElementById('statFailed').textContent = stats.failed || 0;
    }

    updateQueueUI(data) {
        const queueList = document.getElementById('queueList');
        const queueEmpty = document.getElementById('queueEmpty');
        const videos = data.videos || [];

        if (videos.length === 0) {
            queueList.innerHTML = '';
            queueEmpty.hidden = false;
            return;
        }

        queueEmpty.hidden = true;
        queueList.innerHTML = videos.map(video => `
            <div class="queue-item">
                <div class="queue-thumbnail">
                    <video src="${video.videoUrl || ''}" muted></video>
                </div>
                <div class="queue-info">
                    <div class="queue-title">${this.escapeHtml(video.channelId || video.id || 'Untitled')}</div>
                    <div class="queue-meta">
                        ${video.platforms ? video.platforms.join(', ') : 'All platforms'} 
                        ${video.createdAt ? '• ' + this.formatDate(video.createdAt) : ''}
                    </div>
                </div>
                <span class="queue-status ${video.status || 'pending'}">${video.status || 'pending'}</span>
            </div>
        `).join('');
    }

    async loadLogs() {
        try {
            const data = await api.getLogs();
            this.logs = data.logs || [];
            this.updateLogsUI();
            this.updateRecentActivity();
        } catch (error) {
            console.error('Failed to load logs:', error);
        }
    }

    updateLogsUI() {
        const container = document.getElementById('logsContainer');
        const logsEmpty = document.getElementById('logsEmpty');

        if (this.logs.length === 0) {
            container.innerHTML = '';
            logsEmpty.hidden = false;
            return;
        }

        logsEmpty.hidden = true;
        this.filterLogs();
    }

    filterLogs() {
        const levelFilter = document.getElementById('logLevelFilter').value;
        const searchTerm = document.getElementById('logSearch').value.toLowerCase();
        const container = document.getElementById('logsContainer');

        let filteredLogs = this.logs;

        if (levelFilter !== 'all') {
            filteredLogs = filteredLogs.filter(log => log.level === levelFilter);
        }

        if (searchTerm) {
            filteredLogs = filteredLogs.filter(log => 
                (log.message && log.message.toLowerCase().includes(searchTerm)) ||
                (log.source && log.source.toLowerCase().includes(searchTerm))
            );
        }

        if (filteredLogs.length === 0) {
            container.innerHTML = '<div class="loading-placeholder"><span>No logs match your filters</span></div>';
            return;
        }

        container.innerHTML = filteredLogs.slice(0, 200).map(log => `
            <div class="log-entry">
                <span class="log-timestamp">${this.formatDate(log.timestamp)}</span>
                <span class="log-level ${log.level || 'info'}">${log.level || 'INFO'}</span>
                <span class="log-source">[${this.escapeHtml(log.source || 'system')}]</span>
                <span class="log-message">${this.escapeHtml(log.message || '')}</span>
                ${log.data ? `<span class="log-data">${this.escapeHtml(JSON.stringify(log.data))}</span>` : ''}
            </div>
        `).join('');
    }

    updateRecentActivity() {
        const activityList = document.getElementById('recentActivity');
        const recentLogs = this.logs.slice(0, 10);

        if (recentLogs.length === 0) {
            activityList.innerHTML = '<div class="loading-placeholder"><span>No recent activity</span></div>';
            return;
        }

        activityList.innerHTML = recentLogs.map(log => `
            <div class="activity-item">
                <div class="activity-icon ${log.level || 'info'}">
                    ${this.getActivityIcon(log.level)}
                </div>
                <div class="activity-content">
                    <div class="activity-message">${this.escapeHtml(log.message || '')}</div>
                    <div class="activity-meta">
                        <span>${this.escapeHtml(log.source || 'system')}</span>
                        <span>${this.formatTimeAgo(log.timestamp)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getActivityIcon(level) {
        const icons = {
            info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
            warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18C1.64 18.3 1.56 18.65 1.58 19C1.6 19.35 1.73 19.68 1.95 19.95C2.17 20.22 2.46 20.42 2.79 20.52C3.12 20.62 3.47 20.62 3.81 20.52H20.19C20.53 20.62 20.88 20.62 21.21 20.52C21.54 20.42 21.83 20.22 22.05 19.95C22.27 19.68 22.4 19.35 22.42 19C22.44 18.65 22.36 18.3 22.18 18L13.71 3.86C13.52 3.56 13.26 3.32 12.95 3.15C12.64 2.98 12.3 2.9 11.96 2.9C11.62 2.9 11.28 2.98 10.97 3.15C10.66 3.32 10.4 3.56 10.21 3.86L10.29 3.86Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
            error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
            success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
            debug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>'
        };
        return icons[level] || icons.info;
    }

    handleVideoSelect(file) {
        if (file.size > 100 * 1024 * 1024) {
            this.showToast('error', 'File Too Large', 'Maximum file size is 100MB');
            return;
        }

        const preview = document.getElementById('uploadPreview');
        const content = document.querySelector('.upload-zone-content');
        const video = document.getElementById('previewVideo');
        const nameSpan = document.getElementById('previewName');

        video.src = URL.createObjectURL(file);
        nameSpan.textContent = file.name;
        
        content.hidden = true;
        preview.hidden = false;

        document.getElementById('videoFile').file = file;
    }

    clearVideoPreview() {
        const preview = document.getElementById('uploadPreview');
        const content = document.querySelector('.upload-zone-content');
        const video = document.getElementById('previewVideo');
        const input = document.getElementById('videoFile');

        URL.revokeObjectURL(video.src);
        video.src = '';
        input.value = '';
        input.file = null;
        
        preview.hidden = true;
        content.hidden = false;
    }

    async handleUpload() {
        const videoInput = document.getElementById('videoFile');
        const videoUrlInput = document.getElementById('videoUrl');
        const channelSelect = document.getElementById('channelSelect');
        const videoPrompt = document.getElementById('videoPrompt').value.trim();
        const platforms = ['youtube', 'tiktok', 'instagram', 'facebook'];

        const file = videoInput.files[0] || videoInput.file;
        const videoUrl = videoUrlInput.value.trim();
        const channelId = channelSelect.value;

        if (!channelId) {
            this.showToast('error', 'Missing Channel', 'Please select a channel');
            return;
        }

        if (this.activeInputTab === 'file' && !file) {
            this.showToast('error', 'Missing Video', 'Please select a video file');
            return;
        }

        if (this.activeInputTab === 'url' && !videoUrl) {
            this.showToast('error', 'Missing Video URL', 'Please enter a video URL');
            return;
        }

        if (!videoPrompt) {
            this.showToast('error', 'Missing Context', 'Please provide video context/prompt');
            return;
        }

        const formData = new FormData();
        
        if (this.activeInputTab === 'file' && file) {
            formData.append('video', file);
        } else if (this.activeInputTab === 'url' && videoUrl) {
            formData.append('videoUrl', videoUrl);
        }
        
        formData.append('channelId', channelId);
        formData.append('videoContext', videoPrompt);
        formData.append('platforms', JSON.stringify(platforms));

        const progressEl = document.getElementById('uploadProgress');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const submitBtn = document.getElementById('submitUpload');

        progressEl.hidden = false;
        submitBtn.disabled = true;

        try {
            let progress = 0;
            const progressInterval = setInterval(() => {
                if (progress < 90) {
                    progress += Math.random() * 10;
                    progressFill.style.width = `${Math.min(progress, 90)}%`;
                    progressText.textContent = `Uploading... ${Math.round(Math.min(progress, 90))}%`;
                }
            }, 300);

            const result = await api.uploadVideo(formData);

            clearInterval(progressInterval);
            progressFill.style.width = '100%';
            progressText.textContent = 'Upload Complete!';

            this.showToast('success', 'Upload Successful', 'Your video has been added to the queue');

            setTimeout(() => {
                this.clearVideoPreview();
                channelSelect.value = '';
                document.getElementById('videoPrompt').value = '';
                document.getElementById('videoUrl').value = '';
                progressEl.hidden = true;
                progressFill.style.width = '0%';
                submitBtn.disabled = false;
                this.loadStats();
            }, 1500);

        } catch (error) {
            console.error('Upload failed:', error);
            progressEl.hidden = true;
            progressFill.style.width = '0%';
            submitBtn.disabled = false;
            this.showToast('error', 'Upload Failed', error.message || 'Please try again');
        }
    }

    async runSchedule() {
        try {
            this.showToast('info', 'Running Scheduler', 'Processing queued videos...');
            const result = await api.runSchedule();
            this.showToast('success', 'Scheduler Complete', result.message || 'Videos processed successfully');
            this.loadStats();
            this.loadLogs();
        } catch (error) {
            console.error('Schedule failed:', error);
            this.showToast('error', 'Scheduler Failed', error.message || 'Please try again');
        }
    }

    async clearQueue() {
        try {
            await api.clearQueue();
            this.showToast('success', 'Queue Cleared', 'All videos have been removed from the queue');
            this.loadStats();
        } catch (error) {
            console.error('Clear queue failed:', error);
            this.showToast('error', 'Failed', error.message || 'Could not clear queue');
        }
    }

    async clearLogs() {
        try {
            await api.clearLogs();
            this.logs = [];
            this.updateLogsUI();
            this.updateRecentActivity();
            this.showToast('success', 'Logs Cleared', 'All logs have been removed');
        } catch (error) {
            console.error('Clear logs failed:', error);
            this.showToast('error', 'Failed', error.message || 'Could not clear logs');
        }
    }

    exportLogs() {
        if (this.logs.length === 0) {
            this.showToast('warning', 'No Logs', 'There are no logs to export');
            return;
        }

        const logText = this.logs.map(log => 
            `[${this.formatDate(log.timestamp)}] ${(log.level || 'INFO').toUpperCase()} [${log.source || 'system'}] ${log.message || ''} ${log.data ? JSON.stringify(log.data) : ''}`
        ).join('\n');

        const blob = new Blob([logText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `autooz-logs-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast('success', 'Export Complete', 'Logs have been downloaded');
    }

    async refreshAll() {
        this.checkHealth();
        this.loadStats();
        this.loadLogs();
        this.showToast('info', 'Refreshed', 'Data has been updated');
    }

    startAutoRefresh() {
        this.refreshInterval = setInterval(() => {
            this.checkHealth();
            if (this.currentSection === 'dashboard' || this.currentSection === 'queue') {
                this.loadStats();
            }
            if (this.currentSection === 'logs') {
                this.loadLogs();
            }
        }, 30000);
    }

    loadSettings() {
        const apiEndpoint = localStorage.getItem('apiEndpoint') || '';
        document.getElementById('apiEndpoint').value = apiEndpoint;
    }

    saveSettings() {
        const apiEndpoint = document.getElementById('apiEndpoint').value.trim();
        api.setBaseUrl(apiEndpoint);
        this.showToast('success', 'Settings Saved', 'Your settings have been updated');
        this.checkHealth();
    }

    confirmAction(title, message, callback) {
        const modal = document.getElementById('confirmModal');
        document.getElementById('confirmModalTitle').textContent = title;
        document.getElementById('confirmModalMessage').textContent = message;

        modal.hidden = false;

        const confirmBtn = document.getElementById('confirmModalConfirm');
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

        newConfirmBtn.addEventListener('click', () => {
            this.hideModal();
            callback();
        });
    }

    hideModal() {
        document.getElementById('confirmModal').hidden = true;
    }

    showToast(type, title, message) {
        const container = document.getElementById('toastContainer');
        
        const icons = {
            info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
            success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
            warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18C1.64 18.3 1.56 18.65 1.58 19C1.6 19.35 1.73 19.68 1.95 19.95C2.17 20.22 2.46 20.42 2.79 20.52C3.12 20.62 3.47 20.62 3.81 20.52H20.19C20.53 20.62 20.88 20.62 21.21 20.52C21.54 20.42 21.83 20.22 22.05 19.95C22.27 19.68 22.4 19.35 22.42 19C22.44 18.65 22.36 18.3 22.18 18L13.71 3.86C13.52 3.56 13.26 3.32 12.95 3.15C12.64 2.98 12.3 2.9 11.96 2.9C11.62 2.9 11.28 2.98 10.97 3.15C10.66 3.32 10.4 3.56 10.21 3.86L10.29 3.86Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
            error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                <div class="toast-title">${this.escapeHtml(title)}</div>
                <div class="toast-message">${this.escapeHtml(message)}</div>
            </div>
            <button class="toast-close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;

        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });

        container.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 5000);
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    formatTimeAgo(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});