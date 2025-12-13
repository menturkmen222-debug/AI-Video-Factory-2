// Frontend assets embedded directly
// These are the raw file contents as template strings

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AutoOZ - AI Video Uploader Dashboard</title>
    <link rel="stylesheet" href="/css/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div id="app">
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="logo">
                    <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="logo-text">AutoOZ</span>
                </div>
            </div>
            <nav class="sidebar-nav">
                <a href="#" class="nav-item active" data-section="dashboard">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    <span>Dashboard</span>
                </a>
                <a href="#" class="nav-item" data-section="upload">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span>Upload Video</span>
                </a>
                <a href="#" class="nav-item" data-section="queue">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                    <span>Queue</span>
                </a>
                <a href="#" class="nav-item" data-section="logs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span>Logs</span>
                </a>
                <a href="#" class="nav-item" data-section="settings">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M12 1v6m0 6v10M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m6 0h10M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24"></path>
                    </svg>
                    <span>Settings</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="health-status" id="healthStatus">
                    <span class="health-indicator"></span>
                    <span class="health-text">Checking...</span>
                </div>
            </div>
        </aside>

        <main class="main-content">
            <header class="main-header">
                <div class="header-left">
                    <button class="menu-toggle" id="menuToggle">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <h1 class="page-title" id="pageTitle">Dashboard</h1>
                </div>
                <div class="header-right">
                    <button class="btn btn-icon" id="refreshBtn" title="Refresh Data">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <polyline points="1 20 1 14 7 14"></polyline>
                            <path d="M3.51 9C4.01717 7.56678 4.87913 6.2854 6.01547 5.27542C7.15182 4.26543 8.52547 3.55976 10.0083 3.22426C11.4911 2.88875 13.0348 2.93434 14.4952 3.35677C15.9556 3.77921 17.2853 4.56471 18.36 5.64L23 10M1 14L5.64 18.36C6.71475 19.4353 8.04437 20.2208 9.50481 20.6432C10.9652 21.0657 12.5089 21.1112 13.9917 20.7757C15.4745 20.4402 16.8482 19.7346 17.9845 18.7246C19.1209 17.7146 19.9828 16.4332 20.49 15"></path>
                        </svg>
                    </button>
                    <div class="notifications-dropdown">
                        <button class="btn btn-icon" id="notificationsBtn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"></path>
                                <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"></path>
                            </svg>
                            <span class="notification-badge" id="notificationBadge">0</span>
                        </button>
                    </div>
                </div>
            </header>

            <div class="content-wrapper">
                <section class="section active" id="section-dashboard">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon pending">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <div class="stat-info">
                                <span class="stat-value" id="statPending">-</span>
                                <span class="stat-label">Pending Videos</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon processing">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 8V12L15 15"/>
                                </svg>
                            </div>
                            <div class="stat-info">
                                <span class="stat-value" id="statProcessing">-</span>
                                <span class="stat-label">Processing</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon completed">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <div class="stat-info">
                                <span class="stat-value" id="statCompleted">-</span>
                                <span class="stat-label">Completed</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon error">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                            </div>
                            <div class="stat-info">
                                <span class="stat-value" id="statFailed">-</span>
                                <span class="stat-label">Failed</span>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-grid">
                        <div class="card activity-card">
                            <div class="card-header">
                                <h2>Recent Activity</h2>
                                <button class="btn btn-text" id="viewAllLogs">View All</button>
                            </div>
                            <div class="card-body">
                                <div class="activity-list" id="recentActivity">
                                    <div class="loading-placeholder">
                                        <div class="spinner"></div>
                                        <span>Loading activity...</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card platforms-card">
                            <div class="card-header">
                                <h2>Platform Status</h2>
                            </div>
                            <div class="card-body">
                                <div class="platform-list">
                                    <div class="platform-item">
                                        <div class="platform-icon youtube">YT</div>
                                        <div class="platform-info">
                                            <span class="platform-name">YouTube</span>
                                            <span class="platform-status" id="youtubeStatus">Ready</span>
                                        </div>
                                    </div>
                                    <div class="platform-item">
                                        <div class="platform-icon tiktok">TT</div>
                                        <div class="platform-info">
                                            <span class="platform-name">TikTok</span>
                                            <span class="platform-status" id="tiktokStatus">Ready</span>
                                        </div>
                                    </div>
                                    <div class="platform-item">
                                        <div class="platform-icon instagram">IG</div>
                                        <div class="platform-info">
                                            <span class="platform-name">Instagram</span>
                                            <span class="platform-status" id="instagramStatus">Ready</span>
                                        </div>
                                    </div>
                                    <div class="platform-item">
                                        <div class="platform-icon facebook">FB</div>
                                        <div class="platform-info">
                                            <span class="platform-name">Facebook</span>
                                            <span class="platform-status" id="facebookStatus">Ready</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card quick-actions-card">
                        <div class="card-header">
                            <h2>Quick Actions</h2>
                        </div>
                        <div class="card-body">
                            <div class="quick-actions">
                                <button class="btn btn-primary" id="runScheduleBtn">Run Scheduler</button>
                                <button class="btn btn-secondary" id="clearQueueBtn">Clear Queue</button>
                                <button class="btn btn-outline" id="clearLogsBtn">Clear Logs</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section" id="section-upload">
                    <div class="card upload-card">
                        <div class="card-header">
                            <h2>Upload New Video</h2>
                        </div>
                        <div class="card-body">
                            <form id="uploadForm" class="upload-form">
                                <div class="upload-zone" id="uploadZone">
                                    <div class="upload-zone-content">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="48" height="48">
                                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" y1="3" x2="12" y2="15"></line>
                                        </svg>
                                        <p class="upload-text">Drag and drop your video here or</p>
                                        <button type="button" class="btn btn-primary" id="browseBtn">Browse Files</button>
                                        <input type="file" id="videoFile" accept="video/*" hidden>
                                        <p class="upload-hint">Supports MP4, MOV, AVI up to 100MB</p>
                                    </div>
                                    <div class="upload-preview" id="uploadPreview" hidden>
                                        <video id="previewVideo" controls></video>
                                        <div class="preview-info">
                                            <span class="preview-name" id="previewName"></span>
                                            <button type="button" class="btn btn-icon btn-remove" id="removeVideo">X</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="channelName">Channel Name</label>
                                    <input type="text" id="channelName" class="form-input" placeholder="Enter your channel name" required>
                                </div>

                                <div class="form-group">
                                    <label for="videoPrompt">Video Context / Prompt</label>
                                    <textarea id="videoPrompt" class="form-input" rows="4" placeholder="Describe your video content..." required></textarea>
                                </div>

                                <div class="form-group">
                                    <label>Target Platforms</label>
                                    <div class="platform-checkboxes">
                                        <label class="checkbox-label">
                                            <input type="checkbox" name="platforms" value="youtube" checked>
                                            <span class="checkbox-custom"></span>
                                            <span>YouTube</span>
                                        </label>
                                        <label class="checkbox-label">
                                            <input type="checkbox" name="platforms" value="tiktok" checked>
                                            <span class="checkbox-custom"></span>
                                            <span>TikTok</span>
                                        </label>
                                        <label class="checkbox-label">
                                            <input type="checkbox" name="platforms" value="instagram" checked>
                                            <span class="checkbox-custom"></span>
                                            <span>Instagram</span>
                                        </label>
                                        <label class="checkbox-label">
                                            <input type="checkbox" name="platforms" value="facebook" checked>
                                            <span class="checkbox-custom"></span>
                                            <span>Facebook</span>
                                        </label>
                                    </div>
                                </div>

                                <div class="form-actions">
                                    <button type="submit" class="btn btn-primary btn-lg" id="submitUpload">Upload Video</button>
                                </div>

                                <div class="upload-progress" id="uploadProgress" hidden>
                                    <div class="progress-bar">
                                        <div class="progress-fill" id="progressFill"></div>
                                    </div>
                                    <span class="progress-text" id="progressText">Uploading...</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section class="section" id="section-queue">
                    <div class="card queue-card">
                        <div class="card-header">
                            <h2>Video Queue</h2>
                            <div class="card-actions">
                                <button class="btn btn-secondary btn-sm" id="refreshQueueBtn">Refresh</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="queue-list" id="queueList"></div>
                            <div class="empty-state" id="queueEmpty">
                                <p>No videos in queue</p>
                                <button class="btn btn-primary" id="goToUpload">Upload Video</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section" id="section-logs">
                    <div class="card logs-card">
                        <div class="card-header">
                            <h2>System Logs</h2>
                            <div class="card-actions">
                                <div class="log-filters">
                                    <select class="form-select" id="logLevelFilter">
                                        <option value="all">All Levels</option>
                                        <option value="info">Info</option>
                                        <option value="warn">Warning</option>
                                        <option value="error">Error</option>
                                        <option value="debug">Debug</option>
                                    </select>
                                    <input type="text" class="form-input" id="logSearch" placeholder="Search logs...">
                                </div>
                                <button class="btn btn-secondary btn-sm" id="refreshLogsBtn">Refresh</button>
                                <button class="btn btn-outline btn-sm" id="exportLogsBtn">Export</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="logs-container" id="logsContainer"></div>
                            <div class="empty-state" id="logsEmpty" hidden>
                                <p>No logs available</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section" id="section-settings">
                    <div class="card settings-card">
                        <div class="card-header">
                            <h2>Settings</h2>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="apiEndpoint">API Endpoint (optional)</label>
                                <input type="text" id="apiEndpoint" class="form-input" placeholder="Leave empty for same-origin">
                                <p class="form-hint">Only set if using a different API server</p>
                            </div>
                            <div class="form-actions">
                                <button class="btn btn-primary" id="saveSettings">Save Settings</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>

    <div class="toast-container" id="toastContainer"></div>

    <div class="modal" id="confirmModal" hidden>
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="confirmModalTitle">Confirm Action</h3>
                <button class="btn btn-icon modal-close">X</button>
            </div>
            <div class="modal-body">
                <p id="confirmModalMessage"></p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" id="confirmModalCancel">Cancel</button>
                <button class="btn btn-primary" id="confirmModalConfirm">Confirm</button>
            </div>
        </div>
    </div>

    <script src="/js/api.js"></script>
    <script src="/js/app.js"></script>
</body>
</html>`;

const cssContent = `:root {
    --primary-50: #eff6ff;
    --primary-100: #dbeafe;
    --primary-200: #bfdbfe;
    --primary-300: #93c5fd;
    --primary-400: #60a5fa;
    --primary-500: #3b82f6;
    --primary-600: #2563eb;
    --primary-700: #1d4ed8;
    --primary-800: #1e40af;
    --primary-900: #1e3a8a;
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    --success-50: #ecfdf5;
    --success-500: #10b981;
    --success-600: #059669;
    --warning-50: #fffbeb;
    --warning-500: #f59e0b;
    --warning-600: #d97706;
    --error-50: #fef2f2;
    --error-500: #ef4444;
    --error-600: #dc2626;
    --info-50: #eff6ff;
    --info-500: #3b82f6;
    --info-600: #2563eb;
    --sidebar-width: 260px;
    --header-height: 64px;
    --border-radius: 12px;
    --border-radius-sm: 8px;
    --transition-fast: 150ms ease;
    --transition-base: 200ms ease;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--gray-50);
    color: var(--gray-900);
    line-height: 1.5;
    min-height: 100vh;
}

#app { display: flex; min-height: 100vh; }

.sidebar {
    width: var(--sidebar-width);
    background: var(--gray-900);
    color: white;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 100;
}

.sidebar-header { padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.1); }
.logo { display: flex; align-items: center; gap: 12px; }
.logo-icon { width: 32px; height: 32px; color: var(--primary-400); }
.logo-text { font-size: 1.25rem; font-weight: 700; }

.sidebar-nav { flex: 1; padding: 16px 12px; display: flex; flex-direction: column; gap: 4px; }

.nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    color: var(--gray-400);
    text-decoration: none;
    border-radius: var(--border-radius-sm);
    transition: all var(--transition-fast);
    font-size: 0.9375rem;
    font-weight: 500;
}

.nav-item svg { width: 20px; height: 20px; flex-shrink: 0; }
.nav-item:hover { color: white; background: rgba(255,255,255,0.08); }
.nav-item.active { color: white; background: var(--primary-600); }

.sidebar-footer { padding: 16px 24px; border-top: 1px solid rgba(255,255,255,0.1); }

.health-status { display: flex; align-items: center; gap: 8px; font-size: 0.875rem; color: var(--gray-400); }
.health-indicator { width: 8px; height: 8px; border-radius: 50%; background: var(--gray-500); }
.health-indicator.healthy { background: var(--success-500); }
.health-indicator.unhealthy { background: var(--error-500); }

.main-content {
    flex: 1;
    margin-left: var(--sidebar-width);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-header {
    height: var(--header-height);
    background: white;
    border-bottom: 1px solid var(--gray-200);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    position: sticky;
    top: 0;
    z-index: 50;
}

.header-left { display: flex; align-items: center; gap: 16px; }
.menu-toggle { display: none; background: none; border: none; padding: 8px; cursor: pointer; color: var(--gray-600); }
.menu-toggle svg { width: 24px; height: 24px; }
.page-title { font-size: 1.25rem; font-weight: 600; color: var(--gray-900); }
.header-right { display: flex; align-items: center; gap: 8px; }

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: var(--border-radius-sm);
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.btn svg { width: 18px; height: 18px; }
.btn-primary { background: var(--primary-600); color: white; }
.btn-primary:hover { background: var(--primary-700); }
.btn-secondary { background: var(--gray-100); color: var(--gray-700); }
.btn-secondary:hover { background: var(--gray-200); }
.btn-outline { background: transparent; border: 1px solid var(--gray-300); color: var(--gray-700); }
.btn-outline:hover { background: var(--gray-50); }
.btn-text { background: transparent; color: var(--primary-600); padding: 8px 12px; }
.btn-text:hover { background: var(--primary-50); }
.btn-icon { padding: 8px; background: transparent; color: var(--gray-500); }
.btn-icon:hover { background: var(--gray-100); color: var(--gray-700); }
.btn-sm { padding: 6px 12px; font-size: 0.8125rem; }
.btn-lg { padding: 14px 28px; font-size: 1rem; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

.notification-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    font-size: 0.6875rem;
    font-weight: 600;
    color: white;
    background: var(--error-500);
    border-radius: 9px;
}

.notifications-dropdown { position: relative; }
.content-wrapper { flex: 1; padding: 24px; max-width: 1400px; margin: 0 auto; width: 100%; }
.section { display: none; }
.section.active { display: block; }

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 24px;
}

.stat-card {
    background: white;
    border-radius: var(--border-radius);
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--gray-100);
}

.stat-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }

.stat-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--border-radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
}

.stat-icon svg { width: 24px; height: 24px; }
.stat-icon.pending { background: var(--warning-50); color: var(--warning-600); }
.stat-icon.processing { background: var(--info-50); color: var(--info-600); }
.stat-icon.completed { background: var(--success-50); color: var(--success-600); }
.stat-icon.error { background: var(--error-50); color: var(--error-600); }

.stat-info { display: flex; flex-direction: column; }
.stat-value { font-size: 1.75rem; font-weight: 700; color: var(--gray-900); }
.stat-label { font-size: 0.875rem; color: var(--gray-500); }

.dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }

.card {
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--gray-100);
    overflow: hidden;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid var(--gray-100);
}

.card-header h2 { font-size: 1rem; font-weight: 600; color: var(--gray-900); }
.card-actions { display: flex; align-items: center; gap: 12px; }
.card-body { padding: 24px; }

.activity-list { display: flex; flex-direction: column; gap: 12px; max-height: 300px; overflow-y: auto; }

.activity-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px;
    background: var(--gray-50);
    border-radius: var(--border-radius-sm);
}

.activity-item:hover { background: var(--gray-100); }

.activity-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.activity-icon svg { width: 16px; height: 16px; }
.activity-icon.info { background: var(--info-50); color: var(--info-600); }
.activity-icon.success { background: var(--success-50); color: var(--success-600); }
.activity-icon.warning { background: var(--warning-50); color: var(--warning-600); }
.activity-icon.error { background: var(--error-50); color: var(--error-600); }

.activity-content { flex: 1; min-width: 0; }
.activity-message { font-size: 0.875rem; color: var(--gray-900); margin-bottom: 4px; }
.activity-meta { font-size: 0.75rem; color: var(--gray-500); display: flex; gap: 8px; }

.platform-list { display: flex; flex-direction: column; gap: 12px; }

.platform-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: var(--gray-50);
    border-radius: var(--border-radius-sm);
}

.platform-icon {
    width: 40px;
    height: 40px;
    border-radius: var(--border-radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.75rem;
}

.platform-icon.youtube { background: #fee2e2; color: #dc2626; }
.platform-icon.tiktok { background: var(--gray-100); color: var(--gray-900); }
.platform-icon.instagram { background: linear-gradient(45deg, #f09433, #dc2743); color: white; }
.platform-icon.facebook { background: #dbeafe; color: #2563eb; }

.platform-info { flex: 1; display: flex; flex-direction: column; }
.platform-name { font-size: 0.875rem; font-weight: 500; color: var(--gray-900); }
.platform-status { font-size: 0.75rem; color: var(--success-600); }

.quick-actions { display: flex; gap: 12px; flex-wrap: wrap; }

.upload-card .card-body { padding: 32px; }
.upload-form { max-width: 600px; margin: 0 auto; }

.upload-zone {
    border: 2px dashed var(--gray-300);
    border-radius: var(--border-radius);
    padding: 48px 24px;
    text-align: center;
    background: var(--gray-50);
    margin-bottom: 24px;
}

.upload-zone:hover, .upload-zone.dragover { border-color: var(--primary-500); background: var(--primary-50); }
.upload-zone-content svg { color: var(--gray-400); margin-bottom: 16px; }
.upload-text { font-size: 1rem; color: var(--gray-600); margin-bottom: 12px; }
.upload-hint { font-size: 0.75rem; color: var(--gray-500); margin-top: 12px; }

.upload-preview { display: flex; flex-direction: column; gap: 12px; }
.upload-preview video { width: 100%; max-height: 300px; border-radius: var(--border-radius-sm); background: black; }
.preview-info { display: flex; align-items: center; justify-content: space-between; }
.preview-name { font-size: 0.875rem; color: var(--gray-700); font-weight: 500; }

.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-size: 0.875rem; font-weight: 500; color: var(--gray-700); margin-bottom: 8px; }

.form-input, .form-select {
    width: 100%;
    padding: 12px 16px;
    font-size: 0.9375rem;
    border: 1px solid var(--gray-300);
    border-radius: var(--border-radius-sm);
    background: white;
    color: var(--gray-900);
    font-family: inherit;
}

.form-input:focus, .form-select:focus { outline: none; border-color: var(--primary-500); box-shadow: 0 0 0 3px var(--primary-100); }
.form-input::placeholder { color: var(--gray-400); }
textarea.form-input { resize: vertical; min-height: 100px; }
.form-hint { font-size: 0.75rem; color: var(--gray-500); margin-top: 6px; }

.platform-checkboxes { display: flex; flex-wrap: wrap; gap: 16px; }

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 0.875rem;
    color: var(--gray-700);
}

.checkbox-label input { display: none; }

.checkbox-custom {
    width: 20px;
    height: 20px;
    border: 2px solid var(--gray-300);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.checkbox-label input:checked + .checkbox-custom { background: var(--primary-600); border-color: var(--primary-600); }
.checkbox-label input:checked + .checkbox-custom::after { content: ''; width: 6px; height: 10px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }

.form-actions { display: flex; justify-content: center; padding-top: 12px; }

.upload-progress { margin-top: 24px; text-align: center; }
.progress-bar { height: 8px; background: var(--gray-200); border-radius: 4px; overflow: hidden; margin-bottom: 8px; }
.progress-fill { height: 100%; background: var(--primary-600); border-radius: 4px; width: 0%; transition: width 0.2s; }
.progress-text { font-size: 0.875rem; color: var(--gray-600); }

.queue-list { display: flex; flex-direction: column; gap: 12px; }

.queue-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: var(--gray-50);
    border-radius: var(--border-radius-sm);
}

.queue-item:hover { background: var(--gray-100); }
.queue-thumbnail { width: 80px; height: 60px; background: var(--gray-200); border-radius: var(--border-radius-sm); overflow: hidden; }
.queue-thumbnail img, .queue-thumbnail video { width: 100%; height: 100%; object-fit: cover; }
.queue-info { flex: 1; min-width: 0; }
.queue-title { font-size: 0.9375rem; font-weight: 500; color: var(--gray-900); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.queue-meta { font-size: 0.75rem; color: var(--gray-500); }

.queue-status { padding: 6px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 500; }
.queue-status.pending { background: var(--warning-50); color: var(--warning-600); }
.queue-status.processing { background: var(--info-50); color: var(--info-600); }
.queue-status.completed { background: var(--success-50); color: var(--success-600); }
.queue-status.failed { background: var(--error-50); color: var(--error-600); }

.logs-card .card-body { padding: 0; }
.log-filters { display: flex; gap: 12px; }
.log-filters .form-select, .log-filters .form-input { width: auto; padding: 8px 12px; font-size: 0.8125rem; }
.log-filters .form-input { width: 200px; }

.logs-container { max-height: 500px; overflow-y: auto; font-family: 'Monaco', monospace; font-size: 0.8125rem; line-height: 1.6; }

.log-entry { display: flex; padding: 8px 24px; border-bottom: 1px solid var(--gray-100); }
.log-entry:hover { background: var(--gray-50); }
.log-timestamp { color: var(--gray-500); margin-right: 16px; width: 180px; }
.log-level { font-weight: 600; margin-right: 16px; width: 60px; text-transform: uppercase; }
.log-level.info { color: var(--info-600); }
.log-level.warn { color: var(--warning-600); }
.log-level.error { color: var(--error-600); }
.log-level.debug { color: var(--gray-500); }
.log-source { color: var(--primary-600); margin-right: 16px; min-width: 100px; }
.log-message { color: var(--gray-800); flex: 1; word-break: break-word; }

.empty-state { text-align: center; padding: 48px 24px; color: var(--gray-500); }
.empty-state p { margin-bottom: 16px; }

.loading-placeholder { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 24px; color: var(--gray-500); }
.spinner { width: 20px; height: 20px; border: 2px solid var(--gray-200); border-top-color: var(--primary-500); border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.toast-container { position: fixed; top: 24px; right: 24px; display: flex; flex-direction: column; gap: 12px; z-index: 1000; }

.toast {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    background: white;
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-md);
    min-width: 300px;
    max-width: 400px;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

.toast-icon { width: 24px; height: 24px; }
.toast-icon svg { width: 100%; height: 100%; }
.toast.success .toast-icon { color: var(--success-500); }
.toast.error .toast-icon { color: var(--error-500); }
.toast.warning .toast-icon { color: var(--warning-500); }
.toast.info .toast-icon { color: var(--info-500); }

.toast-content { flex: 1; }
.toast-title { font-weight: 600; color: var(--gray-900); margin-bottom: 2px; }
.toast-message { font-size: 0.875rem; color: var(--gray-600); }
.toast-close { background: none; border: none; cursor: pointer; color: var(--gray-400); padding: 4px; }
.toast-close:hover { color: var(--gray-600); }

.modal { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1001; }
.modal[hidden] { display: none; }
.modal-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); }
.modal-content { position: relative; background: white; border-radius: var(--border-radius); box-shadow: var(--shadow-md); width: 100%; max-width: 400px; margin: 24px; }
.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid var(--gray-100); }
.modal-header h3 { font-size: 1.125rem; font-weight: 600; }
.modal-body { padding: 24px; }
.modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding: 16px 24px; border-top: 1px solid var(--gray-100); }

@media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .sidebar.open { transform: translateX(0); }
    .main-content { margin-left: 0; }
    .menu-toggle { display: block; }
    .dashboard-grid { grid-template-columns: 1fr; }
    .card-header { flex-wrap: wrap; gap: 12px; }
    .log-filters { flex-wrap: wrap; }
    .log-filters .form-input { width: 100%; }
}`;

const apiJsContent = `class API {
    constructor() {
        this.baseUrl = localStorage.getItem('apiEndpoint') || '';
    }

    setBaseUrl(url) {
        this.baseUrl = url;
        localStorage.setItem('apiEndpoint', url);
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    async request(endpoint, options = {}) {
        const url = this.baseUrl + endpoint;
        const defaultHeaders = { 'Content-Type': 'application/json' };
        const config = { ...options, headers: { ...defaultHeaders, ...options.headers } };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            if (!response.ok) {
                throw new APIError(data.message || data.error || 'Request failed', response.status, data);
            }
            return data;
        } catch (error) {
            if (error instanceof APIError) throw error;
            throw new APIError(error.message || 'Network error', 0, { originalError: error });
        }
    }

    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    async post(endpoint, data) {
        return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) });
    }

    async postFormData(endpoint, formData) {
        const url = this.baseUrl + endpoint;
        try {
            const response = await fetch(url, { method: 'POST', body: formData });
            const data = await response.json();
            if (!response.ok) {
                throw new APIError(data.message || data.error || 'Request failed', response.status, data);
            }
            return data;
        } catch (error) {
            if (error instanceof APIError) throw error;
            throw new APIError(error.message || 'Network error', 0, { originalError: error });
        }
    }

    async checkHealth() { return this.get('/health'); }
    async getStats() { return this.get('/api/stats'); }
    async getLogs() { return this.get('/api/logs'); }
    async clearLogs() { return this.get('/api/clear-logs'); }
    async clearQueue() { return this.get('/api/clear-queue'); }
    async runSchedule() { return this.post('/run-schedule', {}); }
    async uploadVideo(formData) { return this.postFormData('/upload-video', formData); }
}

class APIError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.data = data;
    }
}

const api = new API();`;

const appJsContent = `class App {
    constructor() {
        this.currentSection = 'dashboard';
        this.logs = [];
        this.stats = null;
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
                this.loadSection(item.dataset.section);
            });
        });

        document.getElementById('menuToggle').addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
        });

        document.getElementById('refreshBtn').addEventListener('click', () => this.refreshAll());
        document.getElementById('viewAllLogs').addEventListener('click', () => this.loadSection('logs'));
        document.getElementById('runScheduleBtn').addEventListener('click', () => this.runSchedule());
        document.getElementById('clearQueueBtn').addEventListener('click', () => this.confirmAction('Clear Queue', 'Clear all videos from queue?', () => this.clearQueue()));
        document.getElementById('clearLogsBtn').addEventListener('click', () => this.confirmAction('Clear Logs', 'Clear all logs?', () => this.clearLogs()));
        document.getElementById('goToUpload').addEventListener('click', () => this.loadSection('upload'));

        this.bindUploadEvents();
        this.bindLogEvents();
        this.bindSettingsEvents();
        this.bindModalEvents();
    }

    bindUploadEvents() {
        const uploadZone = document.getElementById('uploadZone');
        const videoInput = document.getElementById('videoFile');
        const browseBtn = document.getElementById('browseBtn');
        const removeBtn = document.getElementById('removeVideo');
        const uploadForm = document.getElementById('uploadForm');

        browseBtn.addEventListener('click', () => videoInput.click());
        uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); uploadZone.classList.add('dragover'); });
        uploadZone.addEventListener('dragleave', (e) => { e.preventDefault(); uploadZone.classList.remove('dragover'); });
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0 && e.dataTransfer.files[0].type.startsWith('video/')) {
                this.handleVideoSelect(e.dataTransfer.files[0]);
            }
        });
        videoInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) this.handleVideoSelect(e.target.files[0]);
        });
        removeBtn.addEventListener('click', () => this.clearVideoPreview());
        uploadForm.addEventListener('submit', (e) => { e.preventDefault(); this.handleUpload(); });
    }

    bindLogEvents() {
        document.getElementById('logLevelFilter').addEventListener('change', () => this.filterLogs());
        document.getElementById('logSearch').addEventListener('input', () => this.filterLogs());
        document.getElementById('refreshLogsBtn').addEventListener('click', () => this.loadLogs());
        document.getElementById('exportLogsBtn').addEventListener('click', () => this.exportLogs());
        document.getElementById('refreshQueueBtn').addEventListener('click', () => this.loadStats());
    }

    bindSettingsEvents() {
        document.getElementById('saveSettings').addEventListener('click', () => this.saveSettings());
    }

    bindModalEvents() {
        const modal = document.getElementById('confirmModal');
        const overlay = modal.querySelector('.modal-overlay');
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = document.getElementById('confirmModalCancel');
        [overlay, closeBtn, cancelBtn].forEach(el => el.addEventListener('click', () => this.hideModal()));
    }

    loadSection(section) {
        document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.section === section));
        document.querySelectorAll('.section').forEach(sec => sec.classList.toggle('active', sec.id === 'section-' + section));
        const titles = { dashboard: 'Dashboard', upload: 'Upload Video', queue: 'Video Queue', logs: 'System Logs', settings: 'Settings' };
        document.getElementById('pageTitle').textContent = titles[section] || section;
        this.currentSection = section;
        document.querySelector('.sidebar').classList.remove('open');
        if (section === 'logs') this.loadLogs();
        else if (section === 'queue') this.loadStats();
    }

    async checkHealth() {
        const healthStatus = document.getElementById('healthStatus');
        const indicator = healthStatus.querySelector('.health-indicator');
        const text = healthStatus.querySelector('.health-text');
        try {
            await api.checkHealth();
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
        if (videos.length === 0) { queueList.innerHTML = ''; queueEmpty.hidden = false; return; }
        queueEmpty.hidden = true;
        queueList.innerHTML = videos.map(video => '<div class="queue-item"><div class="queue-thumbnail"></div><div class="queue-info"><div class="queue-title">' + this.escapeHtml(video.channelName || video.id || 'Untitled') + '</div><div class="queue-meta">' + (video.platforms ? video.platforms.join(', ') : 'All platforms') + '</div></div><span class="queue-status ' + (video.status || 'pending') + '">' + (video.status || 'pending') + '</span></div>').join('');
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
        if (this.logs.length === 0) { container.innerHTML = ''; logsEmpty.hidden = false; return; }
        logsEmpty.hidden = true;
        this.filterLogs();
    }

    filterLogs() {
        const levelFilter = document.getElementById('logLevelFilter').value;
        const searchTerm = document.getElementById('logSearch').value.toLowerCase();
        const container = document.getElementById('logsContainer');
        let filteredLogs = this.logs;
        if (levelFilter !== 'all') filteredLogs = filteredLogs.filter(log => log.level === levelFilter);
        if (searchTerm) filteredLogs = filteredLogs.filter(log => (log.message && log.message.toLowerCase().includes(searchTerm)) || (log.source && log.source.toLowerCase().includes(searchTerm)));
        if (filteredLogs.length === 0) { container.innerHTML = '<div class="loading-placeholder"><span>No logs match filters</span></div>'; return; }
        container.innerHTML = filteredLogs.slice(0, 200).map(log => '<div class="log-entry"><span class="log-timestamp">' + this.formatDate(log.timestamp) + '</span><span class="log-level ' + (log.level || 'info') + '">' + (log.level || 'INFO') + '</span><span class="log-source">[' + this.escapeHtml(log.source || 'system') + ']</span><span class="log-message">' + this.escapeHtml(log.message || '') + '</span></div>').join('');
    }

    updateRecentActivity() {
        const activityList = document.getElementById('recentActivity');
        const recentLogs = this.logs.slice(0, 10);
        if (recentLogs.length === 0) { activityList.innerHTML = '<div class="loading-placeholder"><span>No recent activity</span></div>'; return; }
        activityList.innerHTML = recentLogs.map(log => '<div class="activity-item"><div class="activity-icon ' + (log.level || 'info') + '">i</div><div class="activity-content"><div class="activity-message">' + this.escapeHtml(log.message || '') + '</div><div class="activity-meta"><span>' + this.escapeHtml(log.source || 'system') + '</span><span>' + this.formatTimeAgo(log.timestamp) + '</span></div></div></div>').join('');
    }

    handleVideoSelect(file) {
        if (file.size > 100 * 1024 * 1024) { this.showToast('error', 'File Too Large', 'Maximum 100MB'); return; }
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
        const channelName = document.getElementById('channelName').value.trim();
        const videoPrompt = document.getElementById('videoPrompt').value.trim();
        const platforms = Array.from(document.querySelectorAll('input[name="platforms"]:checked')).map(cb => cb.value);
        const file = videoInput.files[0] || videoInput.file;
        if (!file) { this.showToast('error', 'Missing Video', 'Please select a video'); return; }
        if (!channelName) { this.showToast('error', 'Missing Channel', 'Enter channel name'); return; }
        if (!videoPrompt) { this.showToast('error', 'Missing Context', 'Provide video context'); return; }
        if (platforms.length === 0) { this.showToast('error', 'No Platforms', 'Select at least one platform'); return; }

        const formData = new FormData();
        formData.append('video', file);
        formData.append('channelName', channelName);
        formData.append('prompt', videoPrompt);
        formData.append('platforms', JSON.stringify(platforms));

        const progressEl = document.getElementById('uploadProgress');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const submitBtn = document.getElementById('submitUpload');
        progressEl.hidden = false;
        submitBtn.disabled = true;

        try {
            let progress = 0;
            const interval = setInterval(() => { if (progress < 90) { progress += Math.random() * 10; progressFill.style.width = Math.min(progress, 90) + '%'; progressText.textContent = 'Uploading... ' + Math.round(Math.min(progress, 90)) + '%'; } }, 300);
            await api.uploadVideo(formData);
            clearInterval(interval);
            progressFill.style.width = '100%';
            progressText.textContent = 'Upload Complete!';
            this.showToast('success', 'Upload Successful', 'Video added to queue');
            setTimeout(() => { this.clearVideoPreview(); document.getElementById('channelName').value = ''; document.getElementById('videoPrompt').value = ''; progressEl.hidden = true; progressFill.style.width = '0%'; submitBtn.disabled = false; this.loadStats(); }, 1500);
        } catch (error) {
            progressEl.hidden = true;
            progressFill.style.width = '0%';
            submitBtn.disabled = false;
            this.showToast('error', 'Upload Failed', error.message);
        }
    }

    async runSchedule() {
        try {
            this.showToast('info', 'Running Scheduler', 'Processing queued videos...');
            const result = await api.runSchedule();
            this.showToast('success', 'Scheduler Complete', result.message || 'Videos processed');
            this.loadStats();
            this.loadLogs();
        } catch (error) {
            this.showToast('error', 'Scheduler Failed', error.message);
        }
    }

    async clearQueue() {
        try {
            await api.clearQueue();
            this.showToast('success', 'Queue Cleared', 'All videos removed');
            this.loadStats();
        } catch (error) {
            this.showToast('error', 'Failed', error.message);
        }
    }

    async clearLogs() {
        try {
            await api.clearLogs();
            this.logs = [];
            this.updateLogsUI();
            this.updateRecentActivity();
            this.showToast('success', 'Logs Cleared', 'All logs removed');
        } catch (error) {
            this.showToast('error', 'Failed', error.message);
        }
    }

    exportLogs() {
        if (this.logs.length === 0) { this.showToast('warning', 'No Logs', 'Nothing to export'); return; }
        const logText = this.logs.map(log => '[' + this.formatDate(log.timestamp) + '] ' + (log.level || 'INFO').toUpperCase() + ' [' + (log.source || 'system') + '] ' + (log.message || '')).join('\\n');
        const blob = new Blob([logText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'autooz-logs-' + new Date().toISOString().split('T')[0] + '.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showToast('success', 'Export Complete', 'Logs downloaded');
    }

    refreshAll() {
        this.checkHealth();
        this.loadStats();
        this.loadLogs();
        this.showToast('info', 'Refreshed', 'Data updated');
    }

    startAutoRefresh() {
        setInterval(() => {
            this.checkHealth();
            if (this.currentSection === 'dashboard' || this.currentSection === 'queue') this.loadStats();
            if (this.currentSection === 'logs') this.loadLogs();
        }, 30000);
    }

    loadSettings() {
        document.getElementById('apiEndpoint').value = localStorage.getItem('apiEndpoint') || '';
    }

    saveSettings() {
        api.setBaseUrl(document.getElementById('apiEndpoint').value.trim());
        this.showToast('success', 'Settings Saved', 'Settings updated');
        this.checkHealth();
    }

    confirmAction(title, message, callback) {
        const modal = document.getElementById('confirmModal');
        document.getElementById('confirmModalTitle').textContent = title;
        document.getElementById('confirmModalMessage').textContent = message;
        modal.hidden = false;
        const confirmBtn = document.getElementById('confirmModalConfirm');
        const newBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
        newBtn.addEventListener('click', () => { this.hideModal(); callback(); });
    }

    hideModal() {
        document.getElementById('confirmModal').hidden = true;
    }

    showToast(type, title, message) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.innerHTML = '<div class="toast-icon">' + (type === 'success' ? '✓' : type === 'error' ? '✗' : type === 'warning' ? '!' : 'i') + '</div><div class="toast-content"><div class="toast-title">' + title + '</div><div class="toast-message">' + message + '</div></div><button class="toast-close" onclick="this.parentElement.remove()">×</button>';
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    formatTimeAgo(timestamp) {
        if (!timestamp) return '';
        const seconds = Math.floor((Date.now() - new Date(timestamp)) / 1000);
        if (seconds < 60) return seconds + 's ago';
        if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
        return Math.floor(seconds / 86400) + 'd ago';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});`;

export function getHTML(): string {
    return htmlContent;
}

export function getCSS(): string {
    return cssContent;
}

export function getAPIJS(): string {
    return apiJsContent;
}

export function getAppJS(): string {
    return appJsContent;
}
