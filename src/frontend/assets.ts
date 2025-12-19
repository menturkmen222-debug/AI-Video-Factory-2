// Frontend assets embedded directly
// These are the raw file contents as template strings

const htmlContent = `<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AutoOZ - AI Video Yuklash Paneli</title>
    <link rel="stylesheet" href="css/styles.css">
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
                    <span data-i18n="nav.dashboard">Boshqaruv paneli</span>
                </a>
                <a href="#" class="nav-item" data-section="upload">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span data-i18n="nav.upload">Video yuklash</span>
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
                    <span data-i18n="nav.queue">Navbat</span>
                </a>
                <a href="#" class="nav-item" data-section="logs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span data-i18n="nav.logs">Jurnallar</span>
                </a>
                <a href="#" class="nav-item" data-section="prompts">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"></path>
                        <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"></path>
                    </svg>
                    <span data-i18n="nav.prompts">Promptlar</span>
                </a>
                <a href="#" class="nav-item" data-section="settings">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"></path>
                    </svg>
                    <span data-i18n="nav.settings">Sozlamalar</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="language-switcher">
                    <select id="languageSwitcher" class="form-select form-select-sm">
                        <option value="uz">O'zbekcha</option>
                        <option value="tk">Türkmençe</option>
                    </select>
                </div>
                <div class="health-status" id="healthStatus">
                    <span class="health-indicator"></span>
                    <span class="health-text" data-i18n="health.checking">Tekshirilmoqda...</span>
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
                    <h1 class="page-title" id="pageTitle" data-i18n="dashboard.title">Boshqaruv paneli</h1>
                </div>
                <div class="header-right">
                    <button class="btn btn-icon" id="refreshBtn" data-i18n-title="toast.refreshed">
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
                                <span class="stat-label" data-i18n="dashboard.pendingVideos">Kutilayotgan videolar</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon processing">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
                                    <path d="M12 8V12L15 15"/>
                                </svg>
                            </div>
                            <div class="stat-info">
                                <span class="stat-value" id="statProcessing">-</span>
                                <span class="stat-label" data-i18n="dashboard.processing">Qayta ishlanmoqda</span>
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
                                <span class="stat-label" data-i18n="dashboard.completed">Bajarilgan</span>
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
                                <span class="stat-label" data-i18n="dashboard.failed">Muvaffaqiyatsiz</span>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-grid">
                        <div class="card activity-card">
                            <div class="card-header">
                                <h2 data-i18n="dashboard.recentActivity">So'nggi faoliyat</h2>
                                <button class="btn btn-text" id="viewAllLogs" data-i18n="dashboard.viewAll">Hammasini ko'rish</button>
                            </div>
                            <div class="card-body">
                                <div class="activity-list" id="recentActivity">
                                    <div class="loading-placeholder">
                                        <div class="spinner"></div>
                                        <span data-i18n="dashboard.loadingActivity">Faoliyat yuklanmoqda...</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card platforms-card">
                            <div class="card-header">
                                <h2 data-i18n="dashboard.platformStatus">Platforma holati</h2>
                            </div>
                            <div class="card-body">
                                <div class="platform-list" id="platformsList">
                                    <div class="platform-item" data-platform="youtube"><div class="platform-icon youtube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></div><div class="platform-info"><span class="platform-name">YouTube</span><span class="platform-status" id="youtubeStatus">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="tiktok"><div class="platform-icon tiktok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></div><div class="platform-info"><span class="platform-name">TikTok</span><span class="platform-status" id="tiktokStatus">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="instagram"><div class="platform-icon instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></div><div class="platform-info"><span class="platform-name">Instagram</span><span class="platform-status" id="instagramStatus">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="facebook"><div class="platform-icon facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div><div class="platform-info"><span class="platform-name">Facebook</span><span class="platform-status" id="facebookStatus">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="snapchat"><div class="platform-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c6.617 0 10.243 5.366 10.243 11.128 0 3.078-.844 5.752-2.465 7.352-1.195 1.142-2.598 1.633-3.658 1.633.618 0 1.42.275 1.42 1.342 0 .987-.88 1.72-1.68 2.112-1.28.63-2.75.855-4.86.855-2.108 0-3.58-.226-4.859-.855-.8-.392-1.68-1.125-1.68-2.112 0-1.067.8-1.342 1.42-1.342-1.06 0-2.463-.492-3.658-1.633C1.556 17.177.712 14.504.712 11.425.712 5.663 4.338.297 12 .297zm4.5 6.5c1.375 0 2.5-1.16 2.5-2.586 0-1.427-1.125-2.586-2.5-2.586-1.376 0-2.5 1.16-2.5 2.586 0 1.426 1.124 2.586 2.5 2.586zm-9 0c1.375 0 2.5-1.16 2.5-2.586 0-1.427-1.125-2.586-2.5-2.586C5.125 1.625 4 2.785 4 4.211c0 1.426 1.124 2.586 2.5 2.586z"/></svg></div><div class="platform-info"><span class="platform-name">Snapchat</span><span class="platform-status">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="pinterest"><div class="platform-icon"><svg viewBox="0 0 24 24" fill="#BD081C"><path d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.107-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.652 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.177 0 1.025.394 2.122.889 2.722.098.12.119.224.089.345-.098.519-.314 1.304-.356 1.486-.057.244-.187.296-.424.177-1.56-.728-2.527-3.021-2.527-4.86 0-3.946 2.882-7.573 8.302-7.573 4.361 0 7.745 3.107 7.745 7.273 0 4.341-2.745 7.83-6.556 7.83-1.28 0-2.486-.664-2.896-1.45.799 2.644 2.369 5.537 2.369 5.537 1.021-.314 3.122-1.451 4.243-3.053.609-.948 1.173-1.976 1.173-3.016 0-1.904-.987-3.626-2.869-4.624 1.162-.034 2.261-.404 3.087-1.132 1.107-.959 1.793-2.373 1.793-4.012 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.177 0 1.025.394 2.122.889 2.722.098.12.119.224.089.345-.098.519-.314 1.304-.356 1.486-.057.244-.187.296-.424.177-1.56-.728-2.527-3.021-2.527-4.86 0-3.946 2.882-7.573 8.302-7.573 4.361 0 7.745 3.107 7.745 7.273 0 4.341-2.745 7.83-6.556 7.83-1.28 0-2.486-.664-2.896-1.45"/></svg></div><div class="platform-info"><span class="platform-name">Pinterest</span><span class="platform-status">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="x"><div class="platform-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.165-6.75-5.946 6.75h-3.308l7.73-8.835L.424 2.25h6.7l4.759 6.236L17.427 2.25h.817zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg></div><div class="platform-info"><span class="platform-name">X (Twitter)</span><span class="platform-status">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="reddit"><div class="platform-icon"><svg viewBox="0 0 24 24" fill="#FF4500"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.385 4.859-7.181 4.859-3.796 0-7.182-2.165-7.182-4.859a3.5 3.5 0 0 1 .476-1.565 1.75 1.75 0 1 0 2.516-2.556.75.75 0 1 1 1.042-1.075 3.26 3.26 0 0 1 5.06 0c.555.598 1.307.974 2.127.974.968 0 1.754-.786 1.754-1.754 0-.96-.786-1.746-1.754-1.746-.34 0-.646.101-.92.28-1.181-.934-2.747-1.55-4.59-1.55-.633 0-1.242.066-1.827.179l-.789-3.686a1.25 1.25 0 0 1 .456-1.415l.744-.452 1.41 2.513a3.5 3.5 0 0 1 1.993-.585zM3.75 12.75a1.75 1.75 0 0 0 0 3.5 1.75 1.75 0 0 0 0-3.5zm13.5 0a1.75 1.75 0 0 0 0 3.5 1.75 1.75 0 0 0 0-3.5z"/></svg></div><div class="platform-info"><span class="platform-name">Reddit</span><span class="platform-status">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="linkedin"><div class="platform-icon"><svg viewBox="0 0 24 24" fill="#0077B5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.42-.103.249-.129.597-.129.946v5.439h-3.554s.05-8.81 0-9.728h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.586zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.955.77-1.71 1.954-1.71 1.188 0 1.915.75 1.94 1.71 0 .951-.752 1.71-1.979 1.71zm1.58 11.597H3.635V9.58h3.282v10.872zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg></div><div class="platform-info"><span class="platform-name">LinkedIn</span><span class="platform-status">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="twitch"><div class="platform-icon"><svg viewBox="0 0 24 24" fill="#9146FF"><path d="M11.571 4.714h1.429v4.286h-1.429V4.714zM17.143 4.714h1.429v4.286h-1.429V4.714zM6.857 7.429H8.286v7.715H6.857V7.429zm5.714 0h1.429v7.715h-1.429V7.429zm5.714 0h1.429v4.286h-1.429V7.429zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.857 16.286c-1.714 0-3.429.857-4.286 1.714-.857-.857-2.571-1.714-4.286-1.714-3.428 0-6.428 2.857-6.428 6.429v1.285h17.143v-1.285c0-3.572-3-6.429-6.143-6.429z"/></svg></div><div class="platform-info"><span class="platform-name">Twitch</span><span class="platform-status">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="kwai"><div class="platform-icon"><svg viewBox="0 0 24 24" fill="#FF0000"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8m3.5 6a1.5 1.5 0 0 1 0 3 1.5 1.5 0 0 1 0-3m-7 0a1.5 1.5 0 0 1 0 3 1.5 1.5 0 0 1 0-3z"/></svg></div><div class="platform-info"><span class="platform-name">Kwai</span><span class="platform-status">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="likee"><div class="platform-icon"><svg viewBox="0 0 24 24" fill="#FF206E"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m5.5 11c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5m-9 0c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5m7-5H8.5v2h6.5V8z"/></svg></div><div class="platform-info"><span class="platform-name">Likee</span><span class="platform-status">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="dzen"><div class="platform-icon"><svg viewBox="0 0 24 24" fill="#3366FF"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0 0 5.373 0 12m5.5-3h3v6h-3v-6m5.5 0h3v6h-3v-6m5.5 0h3v6h-3v-6"/></svg></div><div class="platform-info"><span class="platform-name">Dzen</span><span class="platform-status">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="rumble"><div class="platform-icon"><svg viewBox="0 0 24 24" fill="#24A451"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z"/></svg></div><div class="platform-info"><span class="platform-name">Rumble</span><span class="platform-status">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="odysee"><div class="platform-icon"><svg viewBox="0 0 24 24" fill="#FF2000"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8m3.5 6c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5m-7 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg></div><div class="platform-info"><span class="platform-name">Odysee</span><span class="platform-status">Tayyor</span></div></div>
                                    <div class="platform-item" data-platform="dailymotion"><div class="platform-icon"><svg viewBox="0 0 24 24" fill="#0066FF"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m5.5 11c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5m-9 0c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5"/></svg></div><div class="platform-info"><span class="platform-name">Dailymotion</span><span class="platform-status">Tayyor</span></div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card quick-actions-card">
                        <div class="card-header">
                            <h2 data-i18n="dashboard.quickActions">Tezkor harakatlar</h2>
                        </div>
                        <div class="card-body">
                            <div class="quick-actions">
                                <button class="btn btn-primary" id="runScheduleBtn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                    <span data-i18n="dashboard.runScheduler">Rejalashtiruvchini ishga tushirish</span>
                                </button>
                                <button class="btn btn-secondary" id="clearQueueBtn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"></path>
                                    </svg>
                                    <span data-i18n="dashboard.clearQueue">Navbatni tozalash</span>
                                </button>
                                <button class="btn btn-outline" id="clearLogsBtn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"></path>
                                        <line x1="9" y1="9" x2="15" y2="15"></line>
                                        <line x1="15" y1="9" x2="9" y2="15"></line>
                                    </svg>
                                    <span data-i18n="dashboard.clearLogs">Jurnallarni tozalash</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section" id="section-upload">
                    <div class="card upload-card">
                        <div class="card-header">
                            <h2 data-i18n="upload.newVideo">Yangi video yuklash</h2>
                        </div>
                        <div class="card-body">
                            <form id="uploadForm" class="upload-form">
                                <div class="form-group">
                                    <label for="channelSelect" data-i18n="upload.selectChannel">Kanalni tanlang</label>
                                    <select id="channelSelect" class="form-select" required>
                                        <option value="" data-i18n="upload.selectChannelPlaceholder">-- Kanalni tanlang --</option>
                                        <option value="channel1" data-i18n="upload.channel1">Kanal 1</option>
                                        <option value="channel2" data-i18n="upload.channel2">Kanal 2</option>
                                        <option value="channel3" data-i18n="upload.channel3">Kanal 3</option>
                                        <option value="channel4" data-i18n="upload.channel4">Kanal 4</option>
                                        <option value="channel5" data-i18n="upload.channel5">Kanal 5</option>
                                    </select>
                                    <p class="form-hint" data-i18n="upload.channelHint">Video ushbu kanal uchun YouTube, TikTok, Instagram va Facebook'ga yuklanadi</p>
                                </div>

                                <div class="video-input-tabs">
                                    <div class="tab-buttons">
                                        <button type="button" class="tab-btn active" data-tab="file" data-i18n="upload.uploadFile">Fayl yuklash</button>
                                        <button type="button" class="tab-btn" data-tab="url" data-i18n="upload.videoUrl">Video URL</button>
                                    </div>
                                    
                                    <div class="tab-content active" id="tab-file">
                                        <div class="upload-zone" id="uploadZone">
                                            <div class="upload-zone-content">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"></path>
                                                    <polyline points="17 8 12 3 7 8"></polyline>
                                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                                </svg>
                                                <p class="upload-text" data-i18n="upload.dragDrop">Videoni bu yerga torting yoki</p>
                                                <button type="button" class="btn btn-primary" id="browseBtn" data-i18n="upload.browseFiles">Fayllarni ko'rish</button>
                                                <input type="file" id="videoFile" accept="video/*" hidden>
                                                <p class="upload-hint" data-i18n="upload.fileHint">MP4, MOV, AVI 100MB gacha qo'llab-quvvatlanadi</p>
                                            </div>
                                            <div class="upload-preview" id="uploadPreview" hidden>
                                                <video id="previewVideo" controls></video>
                                                <div class="preview-info">
                                                    <span class="preview-name" id="previewName"></span>
                                                    <button type="button" class="btn btn-icon btn-remove" id="removeVideo">
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="tab-content" id="tab-url">
                                        <div class="form-group">
                                            <label for="videoUrl" data-i18n="upload.videoUrl">Video URL</label>
                                            <input type="url" id="videoUrl" class="form-input" data-i18n-placeholder="upload.enterVideoUrl" placeholder="Video URL manzilini kiriting">
                                            <p class="form-hint" data-i18n="upload.urlHint">To'g'ridan-to'g'ri video URL yoki platforma havolasi</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="videoPrompt" data-i18n="upload.videoContext">Video konteksti / Prompt</label>
                                    <textarea id="videoPrompt" class="form-input" rows="4" data-i18n-placeholder="upload.videoContextPlaceholder" placeholder="Video mazmunini tasvirlab bering..." required></textarea>
                                </div>

                                <div class="form-group">
                                    <label data-i18n="upload.targetPlatforms">Maqsadli platformalar</label>
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
                                    <button type="submit" class="btn btn-primary btn-lg" id="submitUpload">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" y1="3" x2="12" y2="15"></line>
                                        </svg>
                                        <span data-i18n="upload.submitUpload">Video yuklash</span>
                                    </button>
                                </div>

                                <div class="upload-progress" id="uploadProgress" hidden>
                                    <div class="progress-bar">
                                        <div class="progress-fill" id="progressFill"></div>
                                    </div>
                                    <span class="progress-text" id="progressText" data-i18n="upload.uploading">Yuklanmoqda...</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section class="section" id="section-queue">
                    <div class="queue-management">
                        <div class="queue-header">
                            <h2 data-i18n="queue.videoQueue">Video navbati</h2>
                            <div class="queue-actions">
                                <button class="btn btn-secondary btn-sm" id="refreshQueueBtn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="23 4 23 10 17 10"></polyline>
                                        <path d="M20.49 15C19.9828 16.4332 19.1209 17.7146 17.9845 18.7246C16.8482 19.7346 15.4745 20.4402 13.9917 20.7757C12.5089 21.1112 10.9652 21.0657 9.50481 20.6432C8.04437 20.2208 6.71475 19.4353 5.64 18.36L1 14"></path>
                                    </svg>
                                    <span data-i18n="queue.refresh">Yangilash</span>
                                </button>
                            </div>
                        </div>
                        
                        <div class="platform-tabs" id="platformTabs">
                            <button class="platform-tab active" data-platform="all">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                                <span>All</span>
                            </button>
                            <button class="platform-tab youtube" data-platform="youtube">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                <span>YouTube</span>
                            </button>
                            <button class="platform-tab tiktok" data-platform="tiktok">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                </svg>
                                <span>TikTok</span>
                            </button>
                            <button class="platform-tab instagram" data-platform="instagram">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                                <span>Instagram</span>
                            </button>
                            <button class="platform-tab facebook" data-platform="facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span>Facebook</span>
                            </button>
                        </div>

                        <div class="queue-content" id="queueContent">
                            <div class="queue-loading" id="queueLoading">
                                <div class="spinner"></div>
                                <span>Loading queue...</span>
                            </div>
                        </div>

                        <div class="queue-empty" id="queueEmpty" hidden>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15"></path>
                                <path d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5C15 5.53043 14.7893 6.03914 14.4142 6.41421C14.0391 6.78929 13.5304 7 13 7H11C10.4696 7 9.96086 6.78929 9.58579 6.41421C9.21071 6.03914 9 5.53043 9 5Z"></path>
                            </svg>
                            <h3 data-i18n="queue.noVideos">Navbatda video yo'q</h3>
                            <p data-i18n="queue.uploadVideo">Video yuklash</p>
                            <button class="btn btn-primary" id="goToUpload" data-i18n="queue.uploadVideo">Video yuklash</button>
                        </div>

                        <div class="queue-error" id="queueError" hidden>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                            <h3>Error loading queue</h3>
                            <p id="queueErrorMessage">An error occurred while loading the queue.</p>
                            <button class="btn btn-primary" id="retryLoadQueue">Retry</button>
                        </div>
                    </div>
                </section>

                <section class="section" id="section-logs">
                    <div class="card logs-card">
                        <div class="card-header">
                            <h2 data-i18n="logs.systemLogs">Tizim jurnallari</h2>
                            <div class="card-actions">
                                <button class="btn btn-secondary btn-sm" id="refreshLogsBtn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="23 4 23 10 17 10"></polyline>
                                        <path d="M20.49 15C19.9828 16.4332 19.1209 17.7146 17.9845 18.7246C16.8482 19.7346 15.4745 20.4402 13.9917 20.7757C12.5089 21.1112 10.9652 21.0657 9.50481 20.6432C8.04437 20.2208 6.71475 19.4353 5.64 18.36L1 14"></path>
                                    </svg>
                                    <span data-i18n="logs.refresh">Yangilash</span>
                                </button>
                                <button class="btn btn-outline btn-sm" id="exportLogsBtn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    <span data-i18n="logs.export">Eksport</span>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="logs-filters-row">
                                <div class="log-filters">
                                    <select id="logLevelFilter" class="form-select">
                                        <option value="all" data-i18n="logs.allLevels">Barcha darajalar</option>
                                        <option value="info" data-i18n="logs.info">Ma'lumot</option>
                                        <option value="warn" data-i18n="logs.warning">Ogohlantirish</option>
                                        <option value="error" data-i18n="logs.error">Xato</option>
                                        <option value="debug" data-i18n="logs.debug">Nosozliklarni tuzatish</option>
                                    </select>
                                    <select id="logSourceFilter" class="form-select">
                                        <option value="all" data-i18n="logs.allSources">Barcha manbalar</option>
                                        <option value="system" data-i18n="logs.sourceSystem">Tizim</option>
                                        <option value="platform" data-i18n="logs.sourcePlatform">Platforma</option>
                                        <option value="service" data-i18n="logs.sourceService">Xizmat</option>
                                    </select>
                                    <input type="date" id="logStartDate" class="form-input log-date-input" data-i18n-placeholder="logs.startDate">
                                    <input type="date" id="logEndDate" class="form-input log-date-input" data-i18n-placeholder="logs.endDate">
                                    <input type="text" id="logSearch" class="form-input" data-i18n-placeholder="logs.searchLogs" placeholder="Jurnallarni qidirish...">
                                </div>
                            </div>
                            <div class="logs-container" id="logsContainer">
                                <div class="loading-placeholder">
                                    <div class="spinner"></div>
                                    <span data-i18n="logs.noLogs">Jurnallar mavjud emas</span>
                                </div>
                            </div>
                            <div class="logs-loading" id="logsLoading" hidden>
                                <div class="spinner"></div>
                                <span data-i18n="logs.loading">Yuklanmoqda...</span>
                            </div>
                            <div class="logs-error" id="logsError" hidden>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                                <span id="logsErrorMessage" data-i18n="logs.errorLoading">Jurnallarni yuklashda xato</span>
                                <button class="btn btn-primary btn-sm" id="retryLogsBtn" data-i18n="logs.retry">Qayta urinish</button>
                            </div>
                            <div class="logs-load-more" id="logsLoadMore" hidden>
                                <button class="btn btn-secondary" id="loadMoreLogsBtn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="7 13 12 18 17 13"></polyline>
                                        <polyline points="7 6 12 11 17 6"></polyline>
                                    </svg>
                                    <span data-i18n="logs.loadMore">Ko'proq yuklash</span>
                                </button>
                            </div>
                            <div class="empty-state" id="logsEmpty" hidden>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                                <h3 data-i18n="logs.noLogs">Jurnallar mavjud emas</h3>
                                <p data-i18n="logs.noMatch">Filtrlaringizga mos jurnallar yo'q</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section" id="section-prompts">
                    <div class="prompts-header">
                        <div class="prompts-stats-grid">
                            <div class="stat-card">
                                <div class="stat-icon pending">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                    </svg>
                                </div>
                                <div class="stat-info">
                                    <span class="stat-value" id="promptsTotal">-</span>
                                    <span class="stat-label" data-i18n="prompts.totalPrompts">Jami promptlar</span>
                                </div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon completed">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <div class="stat-info">
                                    <span class="stat-value" id="promptsValidated">-</span>
                                    <span class="stat-label" data-i18n="prompts.validated">Tasdiqlangan</span>
                                </div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon processing">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                        <line x1="12" y1="9" x2="12" y2="13"></line>
                                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                    </svg>
                                </div>
                                <div class="stat-info">
                                    <span class="stat-value" id="promptsNeedsImprovement">-</span>
                                    <span class="stat-label" data-i18n="prompts.needsImprovement">Yaxshilash kerak</span>
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
                                    <span class="stat-value" id="promptsErrors">-</span>
                                    <span class="stat-label" data-i18n="prompts.errors">Xatolar</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card prompts-card">
                        <div class="card-header">
                            <h2 data-i18n="prompts.title">Video Promptlari</h2>
                            <div class="prompts-controls">
                                <select id="promptsChannelFilter" class="form-select">
                                    <option value="all" data-i18n="prompts.allChannels">Barcha kanallar</option>
                                </select>
                                <button class="btn btn-primary" id="validateAllPromptsBtn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    <span data-i18n="prompts.validateAll">Barchasini tasdiqlash</span>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="prompts-grid" id="promptsGrid">
                                <div class="loading-placeholder">
                                    <div class="spinner"></div>
                                    <span data-i18n="prompts.loading">Promptlar yuklanmoqda...</span>
                                </div>
                            </div>
                            <div class="prompts-loading" id="promptsLoading" hidden>
                                <div class="spinner"></div>
                                <span data-i18n="prompts.loading">Yuklanmoqda...</span>
                            </div>
                            <div class="prompts-empty" id="promptsEmpty" hidden>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"></path>
                                    <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"></path>
                                </svg>
                                <h3 data-i18n="prompts.noPrompts">Promptlar mavjud emas</h3>
                                <p data-i18n="prompts.noPromptsHint">Hozircha hech qanday prompt yo'q</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section" id="section-settings">
                    <div class="card">
                        <div class="card-header">
                            <h2 data-i18n="settings.title">Sozlamalar</h2>
                        </div>
                        <div class="card-body">
                            <div class="settings-section">
                                <h3 data-i18n="settings.apiEndpoint">API manzili (ixtiyoriy)</h3>
                                <div class="form-group">
                                    <label for="apiEndpoint" data-i18n="settings.apiEndpoint">API manzili (ixtiyoriy)</label>
                                    <input type="url" id="apiEndpoint" class="form-input" data-i18n-placeholder="settings.apiEndpointPlaceholder" placeholder="Bir xil origin uchun bo'sh qoldiring">
                                    <p class="form-hint" data-i18n="settings.apiEndpointHint">Faqat boshqa API serveridan foydalanayotgan bo'lsangiz o'rnating</p>
                                </div>
                            </div>
                            <div class="settings-section">
                                <h3>AI Sozlamalari</h3>
                                <div class="form-group">
                                    <label for="aiProvider">AI Provider</label>
                                    <select id="aiProvider" class="form-select">
                                        <option value="auto">Avtomatik (Groq, OpenRouter, Static)</option>
                                        <option value="groq">Groq</option>
                                        <option value="openrouter">OpenRouter</option>
                                        <option value="static">Static</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="aiModel">AI Model</label>
                                    <input type="text" id="aiModel" class="form-input" placeholder="Jeong korlayotgan model nomi">
                                    <p class="form-hint">Joriy model: <span id="currentAiModel">-</span></p>
                                </div>
                            </div>
                            <button class="btn btn-primary" id="saveSettings" data-i18n="settings.saveSettings">Sozlamalarni saqlash</button>
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
                <h3 id="confirmModalTitle" data-i18n="modal.confirmAction">Harakatni tasdiqlash</h3>
                <button class="btn btn-icon modal-close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <p id="confirmModalMessage"></p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" id="confirmModalCancel" data-i18n="modal.cancel">Bekor qilish</button>
                <button class="btn btn-primary" id="confirmModalConfirm" data-i18n="modal.confirm">Tasdiqlash</button>
            </div>
        </div>
    </div>

    <script src="js/i18n.js"></script>
    <script src="js/api.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
`;

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
    --border-radius-lg: 16px;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --transition-fast: 150ms ease;
    --transition-base: 200ms ease;
    --transition-slow: 300ms ease;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: var(--gray-50);
    color: var(--gray-900);
    line-height: 1.5;
    min-height: 100vh;
}

#app {
    display: flex;
    min-height: 100vh;
}

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
    transition: transform var(--transition-slow);
}

.sidebar-header {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo-icon {
    width: 32px;
    height: 32px;
    color: var(--primary-400);
}

.logo-text {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.025em;
}

.sidebar-nav {
    flex: 1;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

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

.nav-item svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
}

.nav-item:hover {
    color: white;
    background: rgba(255, 255, 255, 0.08);
}

.nav-item.active {
    color: white;
    background: var(--primary-600);
}

.sidebar-footer {
    padding: 16px 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.language-switcher {
    margin-bottom: 12px;
}

.language-switcher .form-select {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 8px 12px;
    font-size: 0.8125rem;
    border-radius: var(--border-radius-sm);
    width: 100%;
}

.language-switcher .form-select:focus {
    border-color: var(--primary-400);
    outline: none;
}

.language-switcher .form-select option {
    background: var(--gray-800);
    color: white;
}

.health-status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    color: var(--gray-400);
}

.health-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--gray-500);
    animation: pulse 2s infinite;
}

.health-indicator.healthy {
    background: var(--success-500);
}

.health-indicator.unhealthy {
    background: var(--error-500);
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

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

.header-left {
    display: flex;
    align-items: center;
    gap: 16px;
}

.menu-toggle {
    display: none;
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    color: var(--gray-600);
    border-radius: var(--border-radius-sm);
    transition: all var(--transition-fast);
}

.menu-toggle:hover {
    background: var(--gray-100);
}

.menu-toggle svg {
    width: 24px;
    height: 24px;
}

.page-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--gray-900);
}

.header-right {
    display: flex;
    align-items: center;
    gap: 8px;
}

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
    text-decoration: none;
    white-space: nowrap;
}

.btn svg {
    width: 18px;
    height: 18px;
}

.btn-primary {
    background: var(--primary-600);
    color: white;
}

.btn-primary:hover {
    background: var(--primary-700);
}

.btn-secondary {
    background: var(--gray-100);
    color: var(--gray-700);
}

.btn-secondary:hover {
    background: var(--gray-200);
}

.btn-outline {
    background: transparent;
    border: 1px solid var(--gray-300);
    color: var(--gray-700);
}

.btn-outline:hover {
    background: var(--gray-50);
    border-color: var(--gray-400);
}

.btn-text {
    background: transparent;
    color: var(--primary-600);
    padding: 8px 12px;
}

.btn-text:hover {
    background: var(--primary-50);
}

.btn-icon {
    padding: 8px;
    background: transparent;
    color: var(--gray-500);
}

.btn-icon:hover {
    background: var(--gray-100);
    color: var(--gray-700);
}

.btn-sm {
    padding: 6px 12px;
    font-size: 0.8125rem;
}

.btn-lg {
    padding: 14px 28px;
    font-size: 1rem;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

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
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification-badge:empty,
.notification-badge[data-count="0"] {
    display: none;
}

.notifications-dropdown {
    position: relative;
}

.content-wrapper {
    flex: 1;
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
}

.section {
    display: none;
}

.section.active {
    display: block;
}

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
    transition: all var(--transition-base);
}

.stat-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.stat-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--border-radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
}

.stat-icon svg {
    width: 24px;
    height: 24px;
}

.stat-icon.pending {
    background: var(--warning-50);
    color: var(--warning-600);
}

.stat-icon.processing {
    background: var(--info-50);
    color: var(--info-600);
}

.stat-icon.completed {
    background: var(--success-50);
    color: var(--success-600);
}

.stat-icon.error {
    background: var(--error-50);
    color: var(--error-600);
}

.stat-info {
    display: flex;
    flex-direction: column;
}

.stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--gray-900);
    line-height: 1.2;
}

.stat-label {
    font-size: 0.875rem;
    color: var(--gray-500);
}

.dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
}

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

.card-header h2 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--gray-900);
}

.card-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.card-body {
    padding: 24px;
}

.activity-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 300px;
    overflow-y: auto;
}

.activity-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px;
    background: var(--gray-50);
    border-radius: var(--border-radius-sm);
    transition: all var(--transition-fast);
}

.activity-item:hover {
    background: var(--gray-100);
}

.activity-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.activity-icon svg {
    width: 16px;
    height: 16px;
}

.activity-icon.info {
    background: var(--info-50);
    color: var(--info-600);
}

.activity-icon.success {
    background: var(--success-50);
    color: var(--success-600);
}

.activity-icon.warning {
    background: var(--warning-50);
    color: var(--warning-600);
}

.activity-icon.error {
    background: var(--error-50);
    color: var(--error-600);
}

.activity-content {
    flex: 1;
    min-width: 0;
}

.activity-message {
    font-size: 0.875rem;
    color: var(--gray-900);
    margin-bottom: 4px;
    word-break: break-word;
}

.activity-meta {
    font-size: 0.75rem;
    color: var(--gray-500);
    display: flex;
    gap: 8px;
}

.platform-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

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
}

.platform-icon svg {
    width: 20px;
    height: 20px;
}

.platform-icon.youtube {
    background: #fee2e2;
    color: #dc2626;
}

.platform-icon.tiktok {
    background: var(--gray-100);
    color: var(--gray-900);
}

.platform-icon.instagram {
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    color: white;
}

.platform-icon.facebook {
    background: #dbeafe;
    color: #2563eb;
}

.platform-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.platform-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--gray-900);
}

.platform-status {
    font-size: 0.75rem;
    color: var(--success-600);
}

.platform-status.inactive {
    color: var(--gray-500);
}

.quick-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.upload-card .card-body {
    padding: 32px;
}

.upload-form {
    max-width: 600px;
    margin: 0 auto;
}

.upload-zone {
    border: 2px dashed var(--gray-300);
    border-radius: var(--border-radius);
    padding: 48px 24px;
    text-align: center;
    background: var(--gray-50);
    transition: all var(--transition-base);
    margin-bottom: 24px;
}

.upload-zone:hover,
.upload-zone.dragover {
    border-color: var(--primary-500);
    background: var(--primary-50);
}

.upload-zone-content svg {
    width: 48px;
    height: 48px;
    color: var(--gray-400);
    margin-bottom: 16px;
}

.upload-text {
    font-size: 1rem;
    color: var(--gray-600);
    margin-bottom: 12px;
}

.upload-hint {
    font-size: 0.75rem;
    color: var(--gray-500);
    margin-top: 12px;
}

.upload-preview {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.upload-preview video {
    width: 100%;
    max-height: 300px;
    border-radius: var(--border-radius-sm);
    background: black;
}

.preview-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.preview-name {
    font-size: 0.875rem;
    color: var(--gray-700);
    font-weight: 500;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--gray-700);
    margin-bottom: 8px;
}

.form-input,
.form-select {
    width: 100%;
    padding: 12px 16px;
    font-size: 0.9375rem;
    border: 1px solid var(--gray-300);
    border-radius: var(--border-radius-sm);
    background: white;
    color: var(--gray-900);
    transition: all var(--transition-fast);
    font-family: inherit;
}

.form-input:focus,
.form-select:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px var(--primary-100);
}

.form-input::placeholder {
    color: var(--gray-400);
}

textarea.form-input {
    resize: vertical;
    min-height: 100px;
}

.form-hint {
    font-size: 0.75rem;
    color: var(--gray-500);
    margin-top: 6px;
}

.platform-checkboxes {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 0.875rem;
    color: var(--gray-700);
}

.checkbox-label input {
    display: none;
}

.checkbox-custom {
    width: 20px;
    height: 20px;
    border: 2px solid var(--gray-300);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.checkbox-label input:checked + .checkbox-custom {
    background: var(--primary-600);
    border-color: var(--primary-600);
}

.checkbox-label input:checked + .checkbox-custom::after {
    content: '';
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.form-actions {
    display: flex;
    justify-content: center;
    padding-top: 12px;
}

.upload-progress {
    margin-top: 24px;
    text-align: center;
}

.progress-bar {
    height: 8px;
    background: var(--gray-200);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 8px;
}

.progress-fill {
    height: 100%;
    background: var(--primary-600);
    border-radius: 4px;
    width: 0%;
    transition: width var(--transition-base);
}

.progress-text {
    font-size: 0.875rem;
    color: var(--gray-600);
}

.queue-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.queue-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: var(--gray-50);
    border-radius: var(--border-radius-sm);
    transition: all var(--transition-fast);
}

.queue-item:hover {
    background: var(--gray-100);
}

.queue-thumbnail {
    width: 80px;
    height: 60px;
    background: var(--gray-200);
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    flex-shrink: 0;
}

.queue-thumbnail img,
.queue-thumbnail video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.queue-info {
    flex: 1;
    min-width: 0;
}

.queue-title {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--gray-900);
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.queue-meta {
    font-size: 0.75rem;
    color: var(--gray-500);
}

.queue-status {
    padding: 6px 12px;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: capitalize;
}

.queue-status.pending {
    background: var(--warning-50);
    color: var(--warning-600);
}

.queue-status.processing {
    background: var(--info-50);
    color: var(--info-600);
}

.queue-status.completed {
    background: var(--success-50);
    color: var(--success-600);
}

.queue-status.failed {
    background: var(--error-50);
    color: var(--error-600);
}

.logs-card .card-body {
    padding: 0;
}

.log-filters {
    display: flex;
    gap: 12px;
}

.log-filters .form-select {
    width: auto;
    padding: 8px 12px;
    font-size: 0.8125rem;
}

.log-filters .form-input {
    width: 200px;
    padding: 8px 12px;
    font-size: 0.8125rem;
}

.logs-container {
    max-height: 500px;
    overflow-y: auto;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 0.8125rem;
    line-height: 1.6;
}

.log-entry {
    display: flex;
    padding: 8px 24px;
    border-bottom: 1px solid var(--gray-100);
    transition: background var(--transition-fast);
}

.log-entry:hover {
    background: var(--gray-50);
}

.log-entry:last-child {
    border-bottom: none;
}

.log-timestamp {
    color: var(--gray-500);
    margin-right: 16px;
    flex-shrink: 0;
    width: 180px;
}

.log-level {
    font-weight: 600;
    margin-right: 16px;
    width: 60px;
    flex-shrink: 0;
    text-transform: uppercase;
}

.log-level.info {
    color: var(--info-600);
}

.log-level.warn {
    color: var(--warning-600);
}

.log-level.error {
    color: var(--error-600);
}

.log-level.debug {
    color: var(--gray-500);
}

.log-source {
    color: var(--primary-600);
    margin-right: 8px;
    flex-shrink: 0;
    min-width: 80px;
}

.log-step {
    color: var(--gray-500);
    margin-right: 12px;
    flex-shrink: 0;
    font-size: 0.8125rem;
}

.log-message {
    color: var(--gray-800);
    flex: 1;
    word-break: break-word;
}

.log-data {
    color: var(--gray-500);
    margin-left: 16px;
    font-size: 0.75rem;
}

.logs-filters-row {
    padding: 0 24px 16px 24px;
    border-bottom: 1px solid var(--gray-100);
    margin-bottom: 0;
}

.logs-filters-row .log-filters {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
}

.log-date-input {
    width: 140px;
    padding: 8px 12px;
    font-size: 0.8125rem;
}

.log-entry-expandable {
    cursor: pointer;
    transition: all var(--transition-fast);
}

.log-entry-expandable:hover {
    background: var(--gray-100);
}

.log-entry-expanded {
    background: var(--gray-50);
}

.log-entry-expanded .log-expand-icon {
    transform: rotate(180deg);
}

.log-expand-icon {
    width: 16px;
    height: 16px;
    color: var(--gray-400);
    flex-shrink: 0;
    transition: transform var(--transition-fast);
    margin-left: 8px;
}

.log-details {
    display: none;
    padding: 12px 24px 12px 280px;
    background: var(--gray-50);
    border-top: 1px solid var(--gray-100);
    font-size: 0.8125rem;
}

.log-entry-expanded + .log-details,
.log-entry-expandable.expanded + .log-details {
    display: block;
}

.log-details-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.log-details-row {
    display: flex;
    gap: 8px;
}

.log-details-label {
    font-weight: 600;
    color: var(--gray-600);
    min-width: 80px;
}

.log-details-value {
    color: var(--gray-800);
    word-break: break-word;
}

.log-stack-trace {
    background: var(--gray-900);
    color: var(--error-300);
    padding: 12px;
    border-radius: var(--border-radius-sm);
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 0.75rem;
    line-height: 1.5;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
    margin-top: 8px;
}

.log-full-data {
    background: var(--gray-100);
    padding: 12px;
    border-radius: var(--border-radius-sm);
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 0.75rem;
    line-height: 1.5;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
    margin-top: 8px;
    max-height: 200px;
    overflow-y: auto;
}

.logs-load-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 24px;
    border-top: 1px solid var(--gray-100);
    gap: 8px;
}

.logs-load-more .btn {
    min-width: 220px;
    transition: all var(--transition-fast);
}

.logs-load-more .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.logs-load-more .btn.loading {
    pointer-events: none;
    opacity: 0.8;
}

.logs-load-more .btn.loading svg {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.logs-count-info {
    font-size: 0.8125rem;
    color: var(--gray-500);
}

.logs-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    gap: 12px;
    color: var(--gray-500);
}

.logs-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    gap: 12px;
    color: var(--error-600);
    background: var(--error-50);
    border-radius: var(--border-radius-sm);
    margin: 16px 24px;
}

.logs-error svg {
    width: 32px;
    height: 32px;
}

.logs-error span {
    font-size: 0.875rem;
}

.log-entry .log-main-row {
    display: flex;
    align-items: flex-start;
    width: 100%;
}

.settings-section {
    padding: 24px 0;
    border-bottom: 1px solid var(--gray-100);
}

.settings-section:first-child {
    padding-top: 0;
}

.settings-section:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.settings-section h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--gray-900);
    margin-bottom: 8px;
}

.settings-description {
    font-size: 0.875rem;
    color: var(--gray-500);
    margin-bottom: 16px;
}

.system-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.info-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid var(--gray-100);
}

.info-row:last-child {
    border-bottom: none;
}

.info-label {
    font-size: 0.875rem;
    color: var(--gray-500);
}

.info-value {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--gray-900);
}

.empty-state {
    text-align: center;
    padding: 48px 24px;
    color: var(--gray-500);
}

.empty-state svg {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    color: var(--gray-300);
}

.empty-state h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--gray-700);
    margin-bottom: 8px;
}

.empty-state p {
    font-size: 0.875rem;
    margin-bottom: 24px;
}

.loading-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px;
    color: var(--gray-500);
    gap: 16px;
}

.spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--gray-200);
    border-top-color: var(--primary-600);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.toast-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 1000;
}

.toast {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: white;
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-lg);
    border-left: 4px solid;
    min-width: 300px;
    max-width: 400px;
    animation: slideIn var(--transition-slow) ease;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.toast.info {
    border-color: var(--info-500);
}

.toast.success {
    border-color: var(--success-500);
}

.toast.warning {
    border-color: var(--warning-500);
}

.toast.error {
    border-color: var(--error-500);
}

.toast-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}

.toast.info .toast-icon {
    color: var(--info-500);
}

.toast.success .toast-icon {
    color: var(--success-500);
}

.toast.warning .toast-icon {
    color: var(--warning-500);
}

.toast.error .toast-icon {
    color: var(--error-500);
}

.toast-content {
    flex: 1;
}

.toast-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--gray-900);
    margin-bottom: 2px;
}

.toast-message {
    font-size: 0.8125rem;
    color: var(--gray-600);
}

.toast-close {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: var(--gray-400);
    transition: color var(--transition-fast);
}

.toast-close:hover {
    color: var(--gray-600);
}

.toast-close svg {
    width: 18px;
    height: 18px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal[hidden] {
    display: none;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
}

.modal-content {
    position: relative;
    background: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-xl);
    max-width: 400px;
    width: 90%;
    animation: modalIn var(--transition-slow) ease;
}

@keyframes modalIn {
    from {
        transform: scale(0.95);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid var(--gray-100);
}

.modal-header h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--gray-900);
}

.modal-close {
    color: var(--gray-400);
}

.modal-close:hover {
    color: var(--gray-600);
    background: var(--gray-100);
}

.modal-body {
    padding: 24px;
}

.modal-body p {
    font-size: 0.9375rem;
    color: var(--gray-600);
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px 24px;
    border-top: 1px solid var(--gray-100);
}

@media (max-width: 1024px) {
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .sidebar {
        transform: translateX(-100%);
    }

    .sidebar.open {
        transform: translateX(0);
    }

    .main-content {
        margin-left: 0;
    }

    .menu-toggle {
        display: flex;
    }

    .content-wrapper {
        padding: 16px;
    }

    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    .stat-card {
        padding: 16px;
    }

    .stat-value {
        font-size: 1.5rem;
    }

    .card-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    .card-actions {
        width: 100%;
        flex-wrap: wrap;
    }

    .log-filters {
        flex-direction: column;
        width: 100%;
    }

    .log-filters .form-input {
        width: 100%;
    }

    .quick-actions {
        flex-direction: column;
    }

    .quick-actions .btn {
        width: 100%;
    }

    .toast-container {
        left: 16px;
        right: 16px;
        bottom: 16px;
    }

    .toast {
        min-width: auto;
        max-width: none;
    }
}

.video-input-tabs {
    margin-bottom: 24px;
}

.tab-buttons {
    display: flex;
    gap: 0;
    border-bottom: 2px solid var(--gray-200);
    margin-bottom: 20px;
}

.tab-btn {
    flex: 1;
    padding: 12px 20px;
    background: none;
    border: none;
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--gray-500);
    cursor: pointer;
    position: relative;
    transition: all var(--transition-fast);
}

.tab-btn:hover {
    color: var(--gray-700);
}

.tab-btn.active {
    color: var(--primary-600);
}

.tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--primary-600);
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

.upload-zone {
    margin-bottom: 0;
}

@media (max-width: 480px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }

    .platform-checkboxes {
        flex-direction: column;
    }
}

.queue-management {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.queue-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
}

.queue-header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
}

.platform-tabs {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow-x: auto;
}

.platform-tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border: none;
    background: var(--gray-100);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--gray-600);
    white-space: nowrap;
}

.platform-tab svg {
    width: 18px;
    height: 18px;
}

.platform-tab:hover {
    background: var(--gray-200);
}

.platform-tab.active {
    background: var(--primary-600);
    color: var(--white);
}

.platform-tab.youtube.active {
    background: #FF0000;
}

.platform-tab.tiktok.active {
    background: #000000;
}

.platform-tab.instagram.active {
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
}

.platform-tab.facebook.active {
    background: #1877F2;
}

.queue-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.queue-loading,
.queue-empty,
.queue-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    text-align: center;
}

.queue-loading svg,
.queue-empty svg,
.queue-error svg {
    width: 64px;
    height: 64px;
    color: var(--gray-400);
    margin-bottom: 1rem;
}

.queue-empty h3,
.queue-error h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    color: var(--gray-700);
}

.queue-empty p,
.queue-error p {
    margin: 0 0 1.5rem 0;
    color: var(--gray-500);
}

.platform-section {
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
}

.platform-section-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: var(--gray-50);
    border-bottom: 1px solid var(--gray-200);
}

.platform-section-header svg {
    width: 24px;
    height: 24px;
}

.platform-section-header.youtube svg { color: #FF0000; }
.platform-section-header.tiktok svg { color: #000000; }
.platform-section-header.instagram svg { color: #E4405F; }
.platform-section-header.facebook svg { color: #1877F2; }

.platform-section-header h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
}

.platform-section-header .video-count {
    margin-left: auto;
    padding: 0.25rem 0.75rem;
    background: var(--gray-200);
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--gray-600);
}

.channel-group {
    border-bottom: 1px solid var(--gray-100);
}

.channel-group:last-child {
    border-bottom: none;
}

.channel-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: var(--gray-50);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--gray-700);
}

.channel-header svg {
    width: 16px;
    height: 16px;
    color: var(--gray-400);
}

.video-queue-item {
    border-bottom: 1px solid var(--gray-100);
}

.video-queue-item:last-child {
    border-bottom: none;
}

.video-queue-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    cursor: pointer;
    transition: background var(--transition-fast);
}

.video-queue-row:hover {
    background: var(--gray-50);
}

.video-thumbnail {
    width: 80px;
    height: 45px;
    border-radius: var(--radius-sm);
    overflow: hidden;
    background: var(--gray-200);
    flex-shrink: 0;
}

.video-thumbnail video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.video-info {
    flex: 1;
    min-width: 0;
}

.video-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--gray-800);
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.video-meta {
    font-size: 0.75rem;
    color: var(--gray-500);
}

.video-status-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-full);
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
}

.status-badge svg {
    width: 12px;
    height: 12px;
}

.status-badge.pending {
    background: #FEF3C7;
    color: #92400E;
}

.status-badge.uploading {
    background: #DBEAFE;
    color: #1E40AF;
}

.status-badge.completed {
    background: #D1FAE5;
    color: #065F46;
}

.status-badge.failed {
    background: #FEE2E2;
    color: #991B1B;
}

.status-badge.skipped {
    background: var(--gray-200);
    color: var(--gray-600);
}

.expand-icon {
    width: 20px;
    height: 20px;
    color: var(--gray-400);
    transition: transform var(--transition-fast);
}

.video-queue-item.expanded .expand-icon {
    transform: rotate(180deg);
}

.video-details {
    display: none;
    padding: 1rem 1.25rem;
    background: var(--gray-50);
    border-top: 1px solid var(--gray-200);
}

.video-queue-item.expanded .video-details {
    display: block;
}

.platform-statuses {
    display: grid;
    gap: 1rem;
}

.platform-status-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--white);
    border-radius: var(--radius-md);
    border: 1px solid var(--gray-200);
}

.platform-status-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.platform-status-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.platform-status-info svg {
    width: 20px;
    height: 20px;
}

.platform-status-info.youtube svg { color: #FF0000; }
.platform-status-info.tiktok svg { color: #000000; }
.platform-status-info.instagram svg { color: #E4405F; }
.platform-status-info.facebook svg { color: #1877F2; }

.platform-status-name {
    font-weight: 500;
    font-size: 0.875rem;
}

.error-details {
    padding: 0.75rem;
    background: #FEF2F2;
    border-radius: var(--radius-sm);
    border-left: 3px solid #EF4444;
}

.error-message {
    font-size: 0.8125rem;
    color: #991B1B;
    margin-bottom: 0.25rem;
}

.error-code {
    font-size: 0.75rem;
    color: #7F1D1D;
    font-family: monospace;
}

.btn-retry {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background: var(--primary-600);
    color: var(--white);
    border: none;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: background var(--transition-fast);
}

.btn-retry:hover {
    background: var(--primary-700);
}

.btn-retry svg {
    width: 14px;
    height: 14px;
}

.analytics-section {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--gray-200);
}

.analytics-title {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--gray-500);
    text-transform: uppercase;
    margin-bottom: 0.5rem;
}

.analytics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 0.5rem;
}

.analytics-card {
    padding: 0.5rem;
    background: var(--gray-50);
    border-radius: var(--radius-sm);
    text-align: center;
}

.analytics-value {
    font-size: 1rem;
    font-weight: 600;
    color: var(--gray-800);
}

.analytics-label {
    font-size: 0.6875rem;
    color: var(--gray-500);
    text-transform: uppercase;
}

.analytics-unavailable {
    font-size: 0.8125rem;
    color: var(--gray-500);
    font-style: italic;
    padding: 0.5rem;
    background: var(--gray-50);
    border-radius: var(--radius-sm);
}

.platform-link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: var(--primary-600);
    text-decoration: none;
    margin-top: 0.5rem;
}

.platform-link:hover {
    text-decoration: underline;
}

.platform-link svg {
    width: 12px;
    height: 12px;
}

@media (max-width: 768px) {
    .platform-tabs {
        flex-wrap: nowrap;
        padding: 0.375rem;
    }
    
    .platform-tab {
        padding: 0.5rem 0.75rem;
        font-size: 0.75rem;
    }
    
    .platform-tab span {
        display: none;
    }
    
    .video-queue-row {
        flex-wrap: wrap;
        padding: 0.75rem;
    }
    
    .video-thumbnail {
        width: 60px;
        height: 34px;
    }
    
    .video-status-badges {
        width: 100%;
        margin-top: 0.5rem;
    }
    
    .analytics-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.scheduled-time {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    color: var(--primary-600);
    background: var(--primary-50);
    padding: 2px 8px;
    border-radius: 4px;
    margin-top: 4px;
    font-weight: 500;
}

.error-details {
    background: var(--error-50);
    border: 1px solid var(--error-500);
    border-radius: var(--border-radius-sm);
    padding: 12px;
    margin-top: 12px;
}

.error-details .error-header {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--error-600);
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 8px;
}

.error-details .error-header svg {
    width: 16px;
    height: 16px;
    stroke: var(--error-500);
}

.error-details .error-message {
    color: var(--error-600);
    font-size: 0.875rem;
    line-height: 1.5;
    word-break: break-word;
}

.error-details .error-code {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid rgba(239, 68, 68, 0.2);
    font-size: 0.75rem;
    color: var(--gray-600);
    font-family: monospace;
}

.error-details .error-code-label {
    font-weight: 600;
    color: var(--gray-700);
}

.target-channel-info {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--gray-50);
    border-radius: var(--border-radius-sm);
    margin-top: 8px;
    font-size: 0.875rem;
}

.target-channel-info .target-label {
    color: var(--gray-500);
    font-weight: 500;
}

.target-channel-info .target-value {
    color: var(--gray-800);
    font-weight: 600;
}

.btn-retry {
    transition: all var(--transition-fast);
}

.btn-retry:hover {
    background: var(--primary-600);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.platform-link {
    transition: all var(--transition-fast);
}

.platform-link:hover {
    background: var(--gray-100);
    transform: translateY(-1px);
}

.platform-status-card {
    transition: all var(--transition-fast);
}

.platform-status-card:hover {
    box-shadow: var(--shadow-md);
}

.analytics-card {
    transition: all var(--transition-fast);
}

.analytics-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
}

.revenue-unavailable {
    margin-top: 0.5rem;
    font-size: 0.75rem;
}

.revenue-card {
    background: linear-gradient(135deg, var(--success-50), var(--primary-50));
    border: 1px solid var(--success-500);
}

.video-queue-item {
    transition: all var(--transition-fast);
}

.video-queue-item:hover {
    box-shadow: var(--shadow-md);
}

.prompts-header {
    margin-bottom: 24px;
}

.prompts-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
}

@media (max-width: 1024px) {
    .prompts-stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .prompts-stats-grid {
        grid-template-columns: 1fr;
    }
}

.prompts-card .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
}

.prompts-controls {
    display: flex;
    align-items: center;
    gap: 12px;
}

.prompts-controls .form-select {
    min-width: 180px;
}

.prompts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
}

@media (max-width: 640px) {
    .prompts-grid {
        grid-template-columns: 1fr;
    }
}

.prompt-card {
    position: relative;
    background: white;
    border-radius: var(--border-radius);
    padding: 20px;
    box-shadow: var(--shadow);
    transition: all var(--transition-base);
    border: 1px solid transparent;
    background-image: linear-gradient(white, white), linear-gradient(135deg, var(--primary-200), var(--primary-400));
    background-origin: border-box;
    background-clip: padding-box, border-box;
}

.prompt-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.prompt-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    gap: 12px;
}

.prompt-channel-info {
    flex: 1;
}

.prompt-channel-name {
    font-weight: 600;
    color: var(--gray-900);
    font-size: 0.9375rem;
    margin-bottom: 4px;
}

.prompt-topic {
    font-size: 0.8125rem;
    color: var(--gray-500);
    display: flex;
    align-items: center;
    gap: 6px;
}

.prompt-topic svg {
    width: 14px;
    height: 14px;
}

.prompt-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
}

.prompt-status-badge svg {
    width: 14px;
    height: 14px;
}

.prompt-status-badge.validated {
    background: var(--success-50);
    color: var(--success-600);
}

.prompt-status-badge.needs_improvement {
    background: var(--warning-50);
    color: var(--warning-600);
}

.prompt-status-badge.error {
    background: var(--error-50);
    color: var(--error-600);
}

.prompt-status-badge.pending {
    background: var(--gray-100);
    color: var(--gray-600);
}

.prompt-text {
    background: var(--gray-50);
    border: 1px solid var(--gray-200);
    border-radius: var(--border-radius-sm);
    padding: 12px;
    font-size: 0.875rem;
    color: var(--gray-700);
    line-height: 1.6;
    margin-bottom: 12px;
    max-height: 120px;
    overflow-y: auto;
}

.prompt-text-editable {
    width: 100%;
    min-height: 100px;
    resize: vertical;
    font-family: inherit;
    font-size: 0.875rem;
    line-height: 1.6;
    padding: 12px;
    border: 1px solid var(--gray-300);
    border-radius: var(--border-radius-sm);
    transition: border-color var(--transition-fast);
}

.prompt-text-editable:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px var(--primary-100);
}

.prompt-suggestion {
    background: linear-gradient(135deg, var(--info-50), var(--primary-50));
    border-left: 3px solid var(--info-500);
    padding: 10px 12px;
    border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
    margin-bottom: 12px;
    font-size: 0.8125rem;
    color: var(--gray-700);
}

.prompt-suggestion-label {
    font-weight: 600;
    color: var(--info-600);
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.prompt-suggestion-label svg {
    width: 14px;
    height: 14px;
}

.prompt-actions {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--gray-100);
}

.prompt-actions .btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 12px;
    font-size: 0.8125rem;
    font-weight: 500;
    border-radius: var(--border-radius-sm);
    transition: all var(--transition-fast);
}

.prompt-actions .btn svg {
    width: 16px;
    height: 16px;
}

.btn-improve {
    background: linear-gradient(135deg, var(--warning-500), var(--warning-600));
    color: white;
    border: none;
}

.btn-improve:hover {
    background: linear-gradient(135deg, var(--warning-600), var(--warning-600));
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.btn-improve:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.btn-update {
    background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
    color: white;
    border: none;
}

.btn-update:hover {
    background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.btn-update:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.btn-validate {
    background: linear-gradient(135deg, var(--success-500), var(--success-600));
    color: white;
    border: none;
}

.btn-validate:hover {
    background: linear-gradient(135deg, var(--success-600), var(--success-600));
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.btn-validate:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.prompts-loading,
.prompts-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    color: var(--gray-500);
    text-align: center;
}

.prompts-empty svg {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    color: var(--gray-300);
}

.prompts-empty h3 {
    margin-bottom: 8px;
    color: var(--gray-700);
}

.prompt-card.editing .prompt-text {
    display: none;
}

.prompt-card:not(.editing) .prompt-text-editable {
    display: none;
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
        const url = \`\${this.baseUrl}\${endpoint}\`;
        
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const config = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new APIError(
                    data.message || data.error || 'Request failed',
                    response.status,
                    data
                );
            }

            return data;
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            throw new APIError(
                error.message || 'Network error',
                0,
                { originalError: error }
            );
        }
    }

    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async postFormData(endpoint, formData) {
        const url = \`\${this.baseUrl}\${endpoint}\`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new APIError(
                    data.message || data.error || 'Request failed',
                    response.status,
                    data
                );
            }

            return data;
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            throw new APIError(
                error.message || 'Network error',
                0,
                { originalError: error }
            );
        }
    }

    async checkHealth() {
        return this.get('/health');
    }

    async getStats() {
        return this.get('/api/stats');
    }

    async getLogs() {
        return this.get('/api/logs');
    }

    async clearLogs() {
        return this.get('/api/clear-logs');
    }

    async clearQueue() {
        return this.get('/api/clear-queue');
    }

    async runSchedule() {
        return this.post('/run-schedule', {});
    }

    async uploadVideo(formData) {
        return this.postFormData('/upload-video', formData);
    }

    async getApiInfo() {
        return this.get('/');
    }

    async getQueueGrouped() {
        return this.get('/api/queue/grouped');
    }

    async retryPlatformUpload(videoId, platform) {
        return this.post('/api/queue/retry', { videoId, platform });
    }

    async retryPlatformUploadImmediate(videoId, platform) {
        return this.post('/api/queue/retry-immediate', { videoId, platform });
    }

    async getLogsPaginated(cursor = null, level = null, source = null, startDate = null, endDate = null) {
        const params = new URLSearchParams();
        params.append('limit', '100');
        if (cursor) params.append('cursor', cursor);
        if (level && level !== 'all') params.append('level', level);
        if (source && source !== 'all') params.append('source', source);
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        return this.get(\`/api/logs/paginated?\${params.toString()}\`);
    }

    async getPrompts() {
        return this.get('/api/prompts');
    }

    async getPromptsByChannel(channelId) {
        return this.get(\`/api/prompts/channel?channelId=\${channelId}\`);
    }

    async validatePrompt(promptId) {
        return this.post('/api/prompts/validate', { promptId });
    }

    async improvePrompt(promptId) {
        return this.post('/api/prompts/improve', { promptId });
    }

    async updatePrompt(promptId, promptText) {
        return this.post('/api/prompts/update', { promptId, promptText });
    }

    async validateAllPrompts() {
        return this.post('/api/prompts/validate-all', {});
    }

    async getPromptsStats() {
        return this.get('/api/prompts/stats');
    }

    async getAISettings() {
        return this.get('/api/ai-settings');
    }

    async setAIProvider(provider) {
        return this.post('/api/ai-settings/provider', { provider });
    }

    async getPlatforms() {
        return this.get('/api/platforms');
    }
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
        this.isLoading = false;
        this.refreshInterval = null;
        this.notifications = [];
        this.activeInputTab = 'file';
        
        this.logsCursor = null;
        this.logsHasMore = true;
        this.logsIsLoading = false;
        this.logsError = null;
        this.logsFilters = {
            level: 'all',
            source: 'all',
            startDate: null,
            endDate: null,
            search: ''
        };
        
        this.prompts = [];
        this.promptsStats = null;
        this.promptsChannelFilter = 'all';
        this.promptsLoading = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleInitialRoute();
        this.checkHealth();
        this.loadStats();
        this.loadLogs();
        this.startAutoRefresh();
        this.loadSettings();
        
        window.addEventListener('popstate', () => {
            this.handleInitialRoute();
        });
    }

    handleInitialRoute() {
        const path = window.location.pathname;
        const routeMap = {
            '/': 'dashboard',
            '/dashboard': 'dashboard',
            '/upload': 'upload',
            '/queue': 'queue',
            '/logs': 'logs',
            '/prompts': 'prompts',
            '/settings': 'settings'
        };
        const section = routeMap[path] || 'dashboard';
        this.loadSection(section, false);
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
                i18n.t('modal.clearQueueTitle'),
                i18n.t('modal.clearQueueMessage'),
                () => this.clearQueue()
            );
        });

        document.getElementById('clearLogsBtn').addEventListener('click', () => {
            this.confirmAction(
                i18n.t('modal.clearLogsTitle'),
                i18n.t('modal.clearLogsMessage'),
                () => this.clearLogs()
            );
        });

        document.getElementById('goToUpload').addEventListener('click', () => {
            this.loadSection('upload');
        });

        document.querySelectorAll('.platform-item').forEach(item => {
            item.addEventListener('click', () => {
                const platform = item.dataset.platform;
                this.refreshPlatform(platform);
            });
        });

        this.bindUploadEvents();
        this.bindTabEvents();
        this.bindLogEvents();
        this.bindSettingsEvents();
        this.bindModalEvents();
        this.setupNotificationIcon();
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
            content.classList.toggle('active', content.id === \`tab-\${tab}\`);
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
        document.getElementById('logLevelFilter').addEventListener('change', (e) => {
            this.logsFilters.level = e.target.value;
            this.resetLogsAndReload();
        });

        document.getElementById('logSourceFilter').addEventListener('change', (e) => {
            this.logsFilters.source = e.target.value;
            this.resetLogsAndReload();
        });

        document.getElementById('logStartDate').addEventListener('change', (e) => {
            this.logsFilters.startDate = e.target.value || null;
            this.resetLogsAndReload();
        });

        document.getElementById('logEndDate').addEventListener('change', (e) => {
            this.logsFilters.endDate = e.target.value || null;
            this.resetLogsAndReload();
        });

        document.getElementById('logSearch').addEventListener('input', (e) => {
            this.logsFilters.search = e.target.value.toLowerCase();
            this.filterLogs();
        });

        document.getElementById('refreshLogsBtn').addEventListener('click', () => {
            this.resetLogsAndReload();
        });

        document.getElementById('exportLogsBtn').addEventListener('click', () => {
            this.exportLogs();
        });

        document.getElementById('loadMoreLogsBtn').addEventListener('click', () => {
            this.loadMoreLogs();
        });

        document.getElementById('retryLogsBtn').addEventListener('click', () => {
            this.resetLogsAndReload();
        });

        document.getElementById('refreshQueueBtn').addEventListener('click', () => {
            this.loadStats();
        });
    }

    bindSettingsEvents() {
        document.getElementById('saveSettings').addEventListener('click', () => {
            this.saveSettings();
        });
        this.loadAISettings();
    }

    async loadAISettings() {
        try {
            const settings = await api.getAISettings();
            document.getElementById('aiProvider').value = settings.provider || 'auto';
            document.getElementById('aiModel').value = settings.model || '';
            document.getElementById('currentAiModel').textContent = settings.model || 'Auto';
        } catch (err) {
            this.logEvent('AI sozlamalarni yuklash xatosi: ' + err.message, 'error');
        }
    }

    async saveSettings() {
        const apiEndpoint = document.getElementById('apiEndpoint').value;
        const aiProvider = document.getElementById('aiProvider').value;
        const aiModel = document.getElementById('aiModel').value;

        try {
            if (aiProvider) {
                await api.setAIProvider(aiProvider);
            }
            if (apiEndpoint) {
                localStorage.setItem('apiEndpoint', apiEndpoint);
            }
            this.showToast('success', 'Muvaffaqiyat', 'Sozlamalar saqlandi');
            this.logEvent('Sozlamalar yangilandi');
        } catch (err) {
            this.showToast('error', 'Xato', 'Sozlamalarni saqlab bo\'lmadi');
            this.logEvent('Sozlamalar xatosi: ' + err.message, 'error');
        }
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

    loadSection(section, updateUrl = true) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.section === section);
        });

        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.toggle('active', sec.id === \`section-\${section}\`);
        });

        const titleKeys = {
            dashboard: 'dashboard.title',
            upload: 'upload.title',
            queue: 'queue.title',
            logs: 'logs.title',
            prompts: 'prompts.title',
            settings: 'settings.title'
        };

        document.getElementById('pageTitle').textContent = i18n.t(titleKeys[section]) || section;
        this.currentSection = section;

        document.querySelector('.sidebar').classList.remove('open');

        if (updateUrl && window.history && window.history.pushState) {
            const path = section === 'dashboard' ? '/' : \`/\${section}\`;
            if (window.location.pathname !== path) {
                window.history.pushState({ section }, i18n.t(titleKeys[section]) || section, path);
            }
        }

        if (section === 'logs') {
            this.loadLogs();
        } else if (section === 'queue') {
            this.loadQueueGrouped();
        } else if (section === 'prompts') {
            this.loadPrompts();
        }
    }

    async checkHealth() {
        const healthStatus = document.getElementById('healthStatus');
        const indicator = healthStatus.querySelector('.health-indicator');
        const text = healthStatus.querySelector('.health-text');

        try {
            const data = await api.checkHealth();
            indicator.className = 'health-indicator healthy';
            text.textContent = i18n.t('health.healthy');
        } catch (error) {
            indicator.className = 'health-indicator unhealthy';
            text.textContent = i18n.t('health.offline');
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
            this.showToast('error', i18n.t('toast.error'), i18n.t('toast.error'));
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
        // Queue is now managed by loadQueueGrouped - this function only updates notification badge
        const videos = data.videos || [];
        const failedCount = videos.filter(v => v.status === 'failed').length;
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            badge.textContent = failedCount > 0 ? failedCount.toString() : '0';
            badge.setAttribute('data-count', failedCount.toString());
        }
    }

    async loadQueueGrouped() {
        const queueContent = document.getElementById('queueContent');
        const queueLoading = document.getElementById('queueLoading');
        const queueEmpty = document.getElementById('queueEmpty');
        const queueError = document.getElementById('queueError');

        queueLoading.hidden = false;
        queueEmpty.hidden = true;
        queueError.hidden = true;
        queueContent.innerHTML = '';
        queueContent.appendChild(queueLoading);

        try {
            const data = await api.getQueueGrouped();
            queueLoading.hidden = true;

            if (!data.data || Object.keys(data.data).length === 0) {
                queueEmpty.hidden = false;
                return;
            }

            this.currentQueueData = data.data;
            this.currentPlatformFilter = 'all';
            this.renderQueueByPlatform(data.data);
            this.bindQueueEvents();
        } catch (error) {
            console.error('Failed to load queue:', error);
            queueLoading.hidden = true;
            queueError.hidden = false;
            document.getElementById('queueErrorMessage').textContent = error.message || 'An error occurred while loading the queue.';
        }
    }

    renderQueueByPlatform(groupedData) {
        const queueContent = document.getElementById('queueContent');
        const platforms = ['youtube', 'tiktok', 'instagram', 'facebook'];
        let html = '';

        for (const platform of platforms) {
            if (this.currentPlatformFilter !== 'all' && this.currentPlatformFilter !== platform) {
                continue;
            }
            
            const channelData = groupedData[platform];
            if (!channelData || Object.keys(channelData).length === 0) continue;
            
            html += this.renderPlatformSection(platform, channelData);
        }

        if (!html) {
            document.getElementById('queueEmpty').hidden = false;
        } else {
            document.getElementById('queueEmpty').hidden = true;
        }

        queueContent.innerHTML = html;
    }

    renderPlatformSection(platform, channelData) {
        const platformNames = { youtube: 'YouTube', tiktok: 'TikTok', instagram: 'Instagram', facebook: 'Facebook' };
        const platformName = platformNames[platform] || platform;
        
        let totalVideos = 0;
        for (const channelId in channelData) {
            totalVideos += channelData[channelId].length;
        }

        let channelsHtml = '';
        for (const channelId in channelData) {
            const videos = channelData[channelId];
            channelsHtml += \`
                <div class="channel-group">
                    <div class="channel-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        <span>\${this.escapeHtml(channelId)}</span>
                    </div>
                    \${videos.map(video => this.renderQueueVideo(video, platform)).join('')}
                </div>
            \`;
        }

        return \`
            <div class="platform-section" data-platform="\${platform}">
                <div class="platform-section-header \${platform}">
                    \${this.getPlatformIcon(platform)}
                    <h3>\${platformName}</h3>
                    <span class="video-count">\${totalVideos} video\${totalVideos !== 1 ? 's' : ''}</span>
                </div>
                \${channelsHtml}
            </div>
        \`;
    }

    renderQueueVideo(video, currentPlatform) {
        const platformStatus = video.platformStatuses ? video.platformStatuses[currentPlatform] : null;
        const status = platformStatus ? platformStatus.status : 'pending';
        const statusInfo = this.formatPlatformStatus(status);

        let scheduledTimeHtml = '';
        if (video.scheduledAt) {
            scheduledTimeHtml = \`<div class="scheduled-time">\${i18n.t('queue.scheduledFor')}: \${this.formatDate(video.scheduledAt)}</div>\`;
        }

        return \`
            <div class="video-queue-item" data-video-id="\${video.id}">
                <div class="video-queue-row" onclick="app.toggleVideoDetails('\${video.id}')">
                    <div class="video-thumbnail">
                        <video src="\${video.cloudinaryUrl || video.videoUrl || ''}" muted></video>
                    </div>
                    <div class="video-info">
                        <div class="video-title">\${this.escapeHtml(video.metadata?.title || video.id)}</div>
                        <div class="video-meta">\${video.createdAt ? this.formatDate(video.createdAt) : ''}</div>
                        \${scheduledTimeHtml}
                    </div>
                    <div class="video-status-badges">
                        <span class="status-badge \${statusInfo.className}">
                            \${this.getPlatformStatusIcon(status)}
                            \${statusInfo.text}
                        </span>
                    </div>
                    <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                <div class="video-details">
                    \${this.renderVideoDetails(video)}
                </div>
            </div>
        \`;
    }

    renderVideoDetails(video) {
        const platforms = video.platforms || [];
        let platformsHtml = '';

        for (const platform of platforms) {
            const status = video.platformStatuses ? video.platformStatuses[platform] : null;
            platformsHtml += this.renderPlatformStatusCard(video.id, platform, status);
        }

        return \`
            <div class="platform-statuses">
                \${platformsHtml}
            </div>
        \`;
    }

    renderPlatformStatusCard(videoId, platform, status) {
        const platformNames = { youtube: 'YouTube', tiktok: 'TikTok', instagram: 'Instagram', facebook: 'Facebook' };
        const platformName = platformNames[platform] || platform;
        const statusData = status || { status: 'pending' };
        const statusInfo = this.formatPlatformStatus(statusData.status);

        let targetChannelHtml = '';
        if (statusData.channelId) {
            targetChannelHtml = \`
                <div class="target-channel-info">
                    <span class="target-label">\${i18n.t('queue.targetChannel')}:</span>
                    <span class="target-value">\${this.escapeHtml(statusData.channelId)}</span>
                </div>
            \`;
        }

        let errorHtml = '';
        if (statusData.status === 'failed' && statusData.error) {
            errorHtml = \`
                <div class="error-details">
                    <div class="error-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        <span>\${i18n.t('queue.errorReason')}</span>
                    </div>
                    <div class="error-message">\${this.escapeHtml(statusData.error)}</div>
                    \${statusData.errorCode ? \`<div class="error-code"><span class="error-code-label">\${i18n.t('queue.errorCode')}:</span> \${this.escapeHtml(statusData.errorCode)}</div>\` : ''}
                </div>
            \`;
        }

        let retryBtn = '';
        if (statusData.status === 'failed') {
            retryBtn = \`
                <button class="btn-retry" data-retry-video="\${videoId}" data-retry-platform="\${platform}" onclick="app.handleRetryUpload('\${videoId}', '\${platform}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <path d="M20.49 15C19.9828 16.4332 19.1209 17.7146 17.9845 18.7246C16.8482 19.7346 15.4745 20.4402 13.9917 20.7757C12.5089 21.1112 10.9652 21.0657 9.50481 20.6432C8.04437 20.2208 6.71475 19.4353 5.64 18.36L1 14"></path>
                    </svg>
                    \${i18n.t('queue.retryUpload')}
                </button>
            \`;
        }

        let linkHtml = '';
        if (statusData.platformUrl) {
            const viewOnText = i18n.t('queue.viewOnPlatform').replace('{platform}', platformName);
            linkHtml = \`
                <a href="\${statusData.platformUrl}" target="_blank" class="platform-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    \${viewOnText}
                </a>
            \`;
        }

        let analyticsHtml = this.renderAnalytics(statusData.analytics);

        return \`
            <div class="platform-status-card">
                <div class="platform-status-header">
                    <div class="platform-status-info \${platform}">
                        \${this.getPlatformIcon(platform)}
                        <span class="platform-status-name">\${platformName}</span>
                    </div>
                    <span class="status-badge \${statusInfo.className}">
                        \${this.getPlatformStatusIcon(statusData.status)}
                        \${statusInfo.text}
                    </span>
                </div>
                \${targetChannelHtml}
                \${errorHtml}
                \${retryBtn}
                \${linkHtml}
                \${analyticsHtml}
            </div>
        \`;
    }

    renderAnalytics(analytics) {
        if (!analytics) {
            return \`
                <div class="analytics-section">
                    <div class="analytics-title">\${i18n.t('queue.analytics')}</div>
                    <div class="analytics-unavailable">\${i18n.t('queue.analyticsNotAvailable')}</div>
                </div>
            \`;
        }

        let revenueHtml = '';
        if (analytics.revenue === null || analytics.revenue === undefined) {
            revenueHtml = \`<div class="analytics-unavailable revenue-unavailable">\${i18n.t('queue.revenueNotSupported')}</div>\`;
        } else {
            revenueHtml = \`
                <div class="analytics-card revenue-card">
                    <div class="analytics-value">$\${(analytics.revenue || 0).toFixed(2)}</div>
                    <div class="analytics-label">\${i18n.t('queue.revenue')}</div>
                </div>
            \`;
        }

        return \`
            <div class="analytics-section">
                <div class="analytics-title">\${i18n.t('queue.analytics')}</div>
                <div class="analytics-grid">
                    <div class="analytics-card">
                        <div class="analytics-value">\${this.formatNumber(analytics.views || 0)}</div>
                        <div class="analytics-label">\${i18n.t('queue.views')}</div>
                    </div>
                    <div class="analytics-card">
                        <div class="analytics-value">\${this.formatNumber(analytics.likes || 0)}</div>
                        <div class="analytics-label">\${i18n.t('queue.likes')}</div>
                    </div>
                    <div class="analytics-card">
                        <div class="analytics-value">\${this.formatNumber(analytics.comments || 0)}</div>
                        <div class="analytics-label">\${i18n.t('queue.comments')}</div>
                    </div>
                    <div class="analytics-card">
                        <div class="analytics-value">\${this.formatNumber(analytics.shares || 0)}</div>
                        <div class="analytics-label">\${i18n.t('queue.shares')}</div>
                    </div>
                </div>
                \${revenueHtml}
            </div>
        \`;
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    toggleVideoDetails(videoId) {
        const item = document.querySelector(\`[data-video-id="\${videoId}"]\`);
        if (item) {
            item.classList.toggle('expanded');
        }
    }

    async handleRetryUpload(videoId, platform) {
        const retryBtn = document.querySelector(\`[data-retry-video="\${videoId}"][data-retry-platform="\${platform}"]\`);
        
        if (retryBtn) {
            retryBtn.disabled = true;
            retryBtn.classList.add('loading');
            retryBtn.innerHTML = \`
                <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
                Uploading...
            \`;
        }

        try {
            this.showToast('info', 'Uploading', \`Starting \${platform} upload immediately...\`);
            
            const result = await api.retryPlatformUploadImmediate(videoId, platform);
            
            if (result.success) {
                this.showToast('success', 'Upload Complete', \`\${platform} upload completed successfully!\`);
            } else {
                this.showToast('error', 'Upload Failed', result.error || \`\${platform} upload failed.\`);
            }
            
            await this.loadQueueGrouped();
        } catch (error) {
            console.error('Retry failed:', error);
            this.showToast('error', 'Retry Failed', error.message || 'Could not retry upload.');
            await this.loadQueueGrouped();
        }
    }

    getPlatformIcon(platform) {
        const icons = {
            youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
            tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
            instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
            facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'
        };
        return icons[platform] || '';
    }

    getPlatformStatusIcon(status) {
        const icons = {
            pending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
            uploading: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',
            completed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
            failed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
            skipped: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l4 8-4 8H5l4-8-4-8z"></path><path d="M15 4h4l-4 8 4 8h-4l-4-8 4-8z"></path></svg>'
        };
        return icons[status] || icons.pending;
    }

    formatPlatformStatus(status) {
        const statusMap = {
            pending: { className: 'pending', text: 'Pending' },
            uploading: { className: 'uploading', text: 'Uploading' },
            completed: { className: 'completed', text: 'Completed' },
            failed: { className: 'failed', text: 'Failed' },
            skipped: { className: 'skipped', text: 'Skipped' }
        };
        return statusMap[status] || statusMap.pending;
    }

    bindQueueEvents() {
        const platformTabs = document.querySelectorAll('.platform-tab');
        platformTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                platformTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentPlatformFilter = tab.dataset.platform;
                if (this.currentQueueData) {
                    this.renderQueueByPlatform(this.currentQueueData);
                }
            });
        });

        const retryLoadBtn = document.getElementById('retryLoadQueue');
        if (retryLoadBtn) {
            retryLoadBtn.addEventListener('click', () => {
                this.loadQueueGrouped();
            });
        }
    }

    async loadLogs() {
        if (this.logsIsLoading) return;
        
        this.logsIsLoading = true;
        this.logsError = null;
        
        const container = document.getElementById('logsContainer');
        const logsLoading = document.getElementById('logsLoading');
        const logsError = document.getElementById('logsError');
        const loadMoreContainer = document.getElementById('logsLoadMore');
        const loadMoreBtn = document.getElementById('loadMoreLogsBtn');
        const loadMoreBtnText = loadMoreBtn.querySelector('span');
        
        const isInitialLoad = this.logs.length === 0;
        
        if (isInitialLoad) {
            container.innerHTML = '';
            logsLoading.hidden = false;
        } else {
            loadMoreBtn.disabled = true;
            loadMoreBtn.classList.add('loading');
            if (loadMoreBtnText) {
                loadMoreBtnText.textContent = i18n.t('logs.loading') || 'Loading...';
            }
        }
        logsError.hidden = true;

        try {
            const data = await api.getLogsPaginated(
                this.logsCursor,
                this.logsFilters.level,
                this.logsFilters.source,
                this.logsFilters.startDate,
                this.logsFilters.endDate
            );
            
            const newLogs = data.logs || [];
            const loadedCount = newLogs.length;
            
            if (this.logsCursor === null) {
                this.logs = newLogs;
            } else {
                const existingIds = new Set(this.logs.map(l => l.id || l.timestamp));
                const uniqueNewLogs = newLogs.filter(l => !existingIds.has(l.id || l.timestamp));
                this.logs = [...this.logs, ...uniqueNewLogs];
            }
            
            this.logsCursor = data.nextCursor || null;
            this.logsHasMore = !!data.nextCursor;
            
            this.updateLogsUI();
            
            if (this.currentSection === 'dashboard' || isInitialLoad) {
                this.updateRecentActivity();
            }
        } catch (error) {
            console.error('Failed to load logs:', error);
            this.logsError = error.message || 'Failed to load logs';
            logsError.hidden = false;
            document.getElementById('logsErrorMessage').textContent = this.logsError;
        } finally {
            this.logsIsLoading = false;
            logsLoading.hidden = true;
            loadMoreBtn.classList.remove('loading');
            loadMoreBtn.disabled = !this.logsHasMore;
            if (loadMoreBtnText) {
                loadMoreBtnText.textContent = i18n.t('logs.loadMore') || 'Load More';
            }
        }
    }

    async loadMoreLogs() {
        if (this.logsIsLoading || !this.logsHasMore) return;
        await this.loadLogs();
    }

    resetLogsAndReload() {
        this.logs = [];
        this.logsCursor = null;
        this.logsHasMore = true;
        this.logsError = null;
        
        const logsLoading = document.getElementById('logsLoading');
        const loadMoreContainer = document.getElementById('logsLoadMore');
        logsLoading.hidden = false;
        loadMoreContainer.hidden = true;
        
        this.loadLogs();
    }

    updateLogsUI() {
        const container = document.getElementById('logsContainer');
        const logsEmpty = document.getElementById('logsEmpty');
        const loadMoreContainer = document.getElementById('logsLoadMore');
        const loadMoreBtn = document.getElementById('loadMoreLogsBtn');
        const logsError = document.getElementById('logsError');

        logsError.hidden = true;

        if (this.logs.length === 0 && !this.logsIsLoading) {
            container.innerHTML = '';
            logsEmpty.hidden = false;
            loadMoreContainer.hidden = true;
            return;
        }

        logsEmpty.hidden = true;
        loadMoreContainer.hidden = !this.logsHasMore;
        
        const loadMoreBtnText = loadMoreBtn.querySelector('span');
        if (loadMoreBtnText && this.logsHasMore) {
            const loadMoreText = i18n.t('logs.loadMore') || 'Load More';
            loadMoreBtnText.textContent = \`\${loadMoreText} (\${this.logs.length} \${i18n.t('logs.loaded') || 'loaded'})\`;
        }
        
        this.filterLogs();
    }

    filterLogs() {
        const searchTerm = this.logsFilters.search || '';
        const container = document.getElementById('logsContainer');

        let filteredLogs = this.logs;

        if (searchTerm) {
            filteredLogs = filteredLogs.filter(log => 
                (log.message && log.message.toLowerCase().includes(searchTerm)) ||
                (log.source && log.source.toLowerCase().includes(searchTerm))
            );
        }

        if (filteredLogs.length === 0 && this.logs.length > 0) {
            container.innerHTML = \`<div class="loading-placeholder"><span>\${i18n.t('logs.noMatch')}</span></div>\`;
            return;
        }

        if (filteredLogs.length === 0) {
            container.innerHTML = '';
            return;
        }

        const sortedLogs = [...filteredLogs].sort((a, b) => {
            const dateA = new Date(a.timestamp || 0);
            const dateB = new Date(b.timestamp || 0);
            return dateB - dateA;
        });

        container.innerHTML = sortedLogs.map((log, index) => this.renderLogEntry(log, index)).join('');
        
        container.querySelectorAll('.log-entry-expandable').forEach(entry => {
            entry.addEventListener('click', () => {
                entry.classList.toggle('expanded');
            });
        });
    }

    renderLogEntry(log, index) {
        const stackTrace = log.stack || log.stackTrace;
        const hasData = log.data && Object.keys(log.data).length > 0;
        const hasDetails = hasData || stackTrace;
        const entryClass = hasDetails ? 'log-entry log-entry-expandable' : 'log-entry';
        const logId = log.id || \`log-\${index}\`;
        
        let detailsHtml = '';
        if (hasDetails) {
            detailsHtml = \`
                <div class="log-details" id="details-\${logId}">
                    <div class="log-details-content">
                        \${hasData ? \`
                            <div class="log-details-row">
                                <span class="log-details-label">\${i18n.t('logs.data')}:</span>
                            </div>
                            <pre class="log-full-data">\${this.escapeHtml(JSON.stringify(log.data, null, 2))}</pre>
                        \` : ''}
                        \${stackTrace ? \`
                            <div class="log-details-row">
                                <span class="log-details-label">\${i18n.t('logs.stackTrace')}:</span>
                            </div>
                            <pre class="log-stack-trace">\${this.escapeHtml(stackTrace)}</pre>
                        \` : ''}
                    </div>
                </div>
            \`;
        }

        const levelClass = log.level || 'info';
        const levelText = log.level ? log.level.toUpperCase() : 'INFO';

        return \`
            <div class="\${entryClass}" data-log-index="\${index}" data-log-id="\${logId}">
                <span class="log-timestamp">\${this.formatDate(log.timestamp)}</span>
                <span class="log-level \${levelClass}">\${levelText}</span>
                <span class="log-source">[\${this.escapeHtml(log.source || 'system')}]</span>
                <span class="log-step">[\${this.escapeHtml(log.step || '')}]</span>
                <span class="log-message">\${this.escapeHtml(log.message || '')}</span>
                \${hasDetails ? \`
                    <svg class="log-expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                \` : ''}
            </div>
            \${detailsHtml}
        \`;
    }

    updateRecentActivity() {
        const activityList = document.getElementById('recentActivity');
        const recentLogs = this.logs.slice(0, 10);

        if (recentLogs.length === 0) {
            activityList.innerHTML = \`<div class="loading-placeholder"><span>\${i18n.t('dashboard.noRecentActivity')}</span></div>\`;
            return;
        }

        activityList.innerHTML = recentLogs.map(log => \`
            <div class="activity-item">
                <div class="activity-icon \${log.level || 'info'}">
                    \${this.getActivityIcon(log.level)}
                </div>
                <div class="activity-content">
                    <div class="activity-message">\${this.escapeHtml(log.message || '')}</div>
                    <div class="activity-meta">
                        <span>\${this.escapeHtml(log.source || i18n.t('logs.system'))}</span>
                        <span>\${this.formatTimeAgo(log.timestamp)}</span>
                    </div>
                </div>
            </div>
        \`).join('');
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
            this.showToast('error', i18n.t('toast.fileTooLarge'), i18n.t('toast.maxFileSize'));
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
            this.showToast('error', i18n.t('toast.missingChannel'), i18n.t('toast.pleaseSelectChannel'));
            return;
        }

        if (this.activeInputTab === 'file' && !file) {
            this.showToast('error', i18n.t('toast.missingVideo'), i18n.t('toast.pleaseSelectVideo'));
            return;
        }

        if (this.activeInputTab === 'url' && !videoUrl) {
            this.showToast('error', i18n.t('toast.missingVideoUrl'), i18n.t('toast.pleaseEnterUrl'));
            return;
        }

        if (!videoPrompt) {
            this.showToast('error', i18n.t('toast.missingContext'), i18n.t('toast.pleaseProvideContext'));
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
                    progressFill.style.width = \`\${Math.min(progress, 90)}%\`;
                    progressText.textContent = \`\${i18n.t('upload.uploading')} \${Math.round(Math.min(progress, 90))}%\`;
                }
            }, 300);

            const result = await api.uploadVideo(formData);

            clearInterval(progressInterval);
            progressFill.style.width = '100%';
            progressText.textContent = i18n.t('upload.uploadComplete');

            this.showToast('success', i18n.t('toast.uploadSuccess'), i18n.t('toast.videoQueued'));

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
            this.showToast('error', i18n.t('toast.uploadFailed'), error.message || i18n.t('toast.tryAgain'));
        }
    }

    async runSchedule() {
        try {
            this.showToast('info', i18n.t('toast.schedulerRunning'), i18n.t('toast.processingVideos'));
            const result = await api.runSchedule();
            this.showToast('success', i18n.t('toast.schedulerComplete'), result.message || i18n.t('toast.videosProcessed'));
            this.loadStats();
            this.loadLogs();
        } catch (error) {
            console.error('Schedule failed:', error);
            this.showToast('error', i18n.t('toast.schedulerFailed'), error.message || i18n.t('toast.tryAgain'));
        }
    }

    async clearQueue() {
        try {
            await api.clearQueue();
            this.showToast('success', i18n.t('toast.queueCleared'), i18n.t('toast.videosRemoved'));
            this.loadStats();
        } catch (error) {
            console.error('Clear queue failed:', error);
            this.showToast('error', i18n.t('toast.clearQueueFailed'), error.message || i18n.t('toast.couldNotClearQueue'));
        }
    }

    async clearLogs() {
        try {
            await api.clearLogs();
            this.logs = [];
            this.updateLogsUI();
            this.updateRecentActivity();
            this.showToast('success', i18n.t('toast.logsCleared'), i18n.t('toast.logsRemoved'));
        } catch (error) {
            console.error('Clear logs failed:', error);
            this.showToast('error', i18n.t('toast.clearLogsFailed'), error.message || i18n.t('toast.couldNotClearLogs'));
        }
    }

    exportLogs() {
        if (this.logs.length === 0) {
            this.showToast('warning', i18n.t('toast.noLogsExport'), i18n.t('toast.noLogsToExport'));
            return;
        }

        const logText = this.logs.map(log => 
            \`[\${this.formatDate(log.timestamp)}] \${log.level ? log.level.toUpperCase() : i18n.t('logs.infoLevel')} [\${log.source || i18n.t('logs.system')}] \${log.message || ''} \${log.data ? JSON.stringify(log.data) : ''}\`
        ).join('\\n');

        const blob = new Blob([logText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = \`autooz-logs-\${new Date().toISOString().split('T')[0]}.txt\`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast('success', i18n.t('toast.exportComplete'), i18n.t('toast.logsDownloaded'));
    }

    async refreshAll() {
        this.checkHealth();
        this.loadStats();
        this.loadLogs();
        this.showToast('info', i18n.t('toast.refreshed'), i18n.t('toast.dataUpdated'));
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
        this.showToast('success', i18n.t('toast.settingsSaved'), i18n.t('toast.settingsUpdated'));
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
        toast.className = \`toast \${type}\`;
        toast.innerHTML = \`
            <div class="toast-icon">\${icons[type]}</div>
            <div class="toast-content">
                <div class="toast-title">\${this.escapeHtml(title)}</div>
                <div class="toast-message">\${this.escapeHtml(message)}</div>
            </div>
            <button class="toast-close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        \`;

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

        if (diff < 60) return i18n.t('time.justNow');
        if (diff < 3600) return i18n.t('time.minutesAgo').replace('{n}', Math.floor(diff / 60));
        if (diff < 86400) return i18n.t('time.hoursAgo').replace('{n}', Math.floor(diff / 3600));
        return i18n.t('time.daysAgo').replace('{n}', Math.floor(diff / 86400));
    }

    async loadPrompts() {
        const promptsGrid = document.getElementById('promptsGrid');
        const promptsLoading = document.getElementById('promptsLoading');
        const promptsEmpty = document.getElementById('promptsEmpty');

        promptsLoading.hidden = false;
        promptsEmpty.hidden = true;
        promptsGrid.innerHTML = '';
        this.promptsLoading = true;

        try {
            const [promptsData, statsData] = await Promise.all([
                api.getPrompts(),
                api.getPromptsStats()
            ]);

            promptsLoading.hidden = true;
            this.promptsLoading = false;

            this.prompts = promptsData.prompts || [];
            this.promptsStats = statsData.stats || null;

            this.updatePromptsStatsUI();
            this.populateChannelFilter();

            if (this.prompts.length === 0) {
                promptsEmpty.hidden = false;
                return;
            }

            this.renderPrompts();
            this.bindPromptsEvents();
        } catch (error) {
            console.error('Failed to load prompts:', error);
            promptsLoading.hidden = true;
            this.promptsLoading = false;
            this.showToast('error', i18n.t('toast.error'), error.message || i18n.t('prompts.loadError'));
        }
    }

    updatePromptsStatsUI() {
        if (!this.promptsStats) return;

        document.getElementById('promptsTotal').textContent = this.promptsStats.total || 0;
        document.getElementById('promptsValidated').textContent = this.promptsStats.byStatus?.validated || 0;
        document.getElementById('promptsNeedsImprovement').textContent = this.promptsStats.byStatus?.needsImprovement || 0;
        document.getElementById('promptsErrors').textContent = this.promptsStats.byStatus?.error || 0;
    }

    populateChannelFilter() {
        const filter = document.getElementById('promptsChannelFilter');
        const channels = [...new Set(this.prompts.map(p => p.channelId))];
        
        filter.innerHTML = \`<option value="all">\${i18n.t('prompts.allChannels')}</option>\`;
        channels.forEach(channelId => {
            const prompt = this.prompts.find(p => p.channelId === channelId);
            filter.innerHTML += \`<option value="\${channelId}">\${this.escapeHtml(prompt?.channelName || channelId)}</option>\`;
        });

        filter.addEventListener('change', (e) => {
            this.promptsChannelFilter = e.target.value;
            this.renderPrompts();
            this.bindPromptsEvents();
        });
    }

    renderPrompts() {
        const promptsGrid = document.getElementById('promptsGrid');
        const promptsEmpty = document.getElementById('promptsEmpty');

        let filteredPrompts = this.prompts;
        if (this.promptsChannelFilter !== 'all') {
            filteredPrompts = this.prompts.filter(p => p.channelId === this.promptsChannelFilter);
        }

        if (filteredPrompts.length === 0) {
            promptsGrid.innerHTML = '';
            promptsEmpty.hidden = false;
            return;
        }

        promptsEmpty.hidden = true;
        promptsGrid.innerHTML = filteredPrompts.map(prompt => this.renderPromptCard(prompt)).join('');
    }

    renderPromptCard(prompt) {
        const statusBadge = this.getPromptStatusBadge(prompt.validationStatus);
        const suggestionHtml = prompt.aiSuggestion ? \`
            <div class="prompt-suggestion">
                <div class="prompt-suggestion-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    \${i18n.t('prompts.aiSuggestion')}
                </div>
                <div class="prompt-suggestion-text">\${this.escapeHtml(prompt.aiSuggestion)}</div>
            </div>
        \` : '';

        return \`
            <div class="prompt-card" data-prompt-id="\${prompt.id}">
                <div class="prompt-card-header">
                    <div class="prompt-channel-info">
                        <div class="prompt-channel-name">\${this.escapeHtml(prompt.channelName)}</div>
                        <div class="prompt-topic">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            </svg>
                            \${this.escapeHtml(prompt.channelTopic)}
                        </div>
                    </div>
                    \${statusBadge}
                </div>
                <div class="prompt-text">\${this.escapeHtml(prompt.promptText)}</div>
                <textarea class="prompt-text-editable" data-prompt-id="\${prompt.id}">\${this.escapeHtml(prompt.promptText)}</textarea>
                \${suggestionHtml}
                <div class="prompt-actions">
                    <button class="btn btn-improve" data-action="improve" data-prompt-id="\${prompt.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                        </svg>
                        <span>Takomlashtirish</span>
                    </button>
                    <button class="btn btn-update" data-action="copy" data-prompt-id="\${prompt.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                        <span>Copy Prompt</span>
                    </button>
                    <button class="btn btn-validate" data-action="validate" data-prompt-id="\${prompt.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>\${i18n.t('prompts.validate')}</span>
                    </button>
                </div>
            </div>
        \`;
    }

    getPromptStatusBadge(status) {
        const icons = {
            validated: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
            needs_improvement: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
            error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
            pending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>'
        };

        const labels = {
            validated: i18n.t('prompts.statusValidated'),
            needs_improvement: i18n.t('prompts.statusNeedsImprovement'),
            error: i18n.t('prompts.statusError'),
            pending: i18n.t('prompts.statusPending')
        };

        const icon = icons[status] || icons.pending;
        const label = labels[status] || labels.pending;

        return \`<span class="prompt-status-badge \${status}">\${icon} \${label}</span>\`;
    }

    bindPromptsEvents() {
        document.querySelectorAll('[data-action="improve"]').forEach(btn => {
            btn.addEventListener('click', () => this.handleImprovePrompt(btn.dataset.promptId, btn));
        });

        document.querySelectorAll('[data-action="copy"]').forEach(btn => {
            btn.addEventListener('click', () => this.handleCopyPrompt(btn.dataset.promptId, btn));
        });

        document.querySelectorAll('[data-action="edit"]').forEach(btn => {
            btn.addEventListener('click', () => this.handleEditPrompt(btn.dataset.promptId, btn));
        });

        document.querySelectorAll('[data-action="validate"]').forEach(btn => {
            btn.addEventListener('click', () => this.handleValidatePrompt(btn.dataset.promptId, btn));
        });

        document.querySelectorAll('[data-action="save"]').forEach(btn => {
            btn.addEventListener('click', () => this.handleSavePrompt(btn.dataset.promptId, btn));
        });

        const validateAllBtn = document.getElementById('validateAllPromptsBtn');
        if (validateAllBtn) {
            validateAllBtn.addEventListener('click', () => this.handleValidateAllPrompts(validateAllBtn));
        }
    }

    async handleCopyPrompt(promptId, btn) {
        const card = document.querySelector(\`[data-prompt-id="\${promptId}"]\`);
        const textarea = card.querySelector('.prompt-text-editable');
        const promptText = textarea.value || textarea.textContent;
        
        try {
            await navigator.clipboard.writeText(promptText);
            this.showToast('success', 'Muvaffaqiyat', 'Prompt clipboard ga nusxalandi');
            this.logEvent(\`Prompt nusxalandi: \${promptId}\`);
        } catch (err) {
            this.showToast('error', 'Xato', 'Prompt nusxalashtira olmadi');
            this.logEvent(\`Prompt nusxalash xatosi: \${err.message}\`, 'error');
        }
    }

    async handleImprovePrompt(promptId, btn) {
        const originalHtml = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = \`<svg class="spinner-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle></svg> \${i18n.t('prompts.improving')}\`;

        try {
            const result = await api.improvePrompt(promptId);
            this.showToast('success', i18n.t('toast.success'), i18n.t('prompts.improveSuccess'));
            await this.loadPrompts();
        } catch (error) {
            console.error('Failed to improve prompt:', error);
            this.showToast('error', i18n.t('toast.error'), error.message || i18n.t('prompts.improveFailed'));
            btn.disabled = false;
            btn.innerHTML = originalHtml;
        }
    }

    handleEditPrompt(promptId, btn) {
        const card = document.querySelector(\`[data-prompt-id="\${promptId}"].prompt-card\`);
        if (!card) return;

        const isEditing = card.classList.contains('editing');
        
        if (isEditing) {
            card.classList.remove('editing');
            btn.innerHTML = \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"></path><path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"></path></svg> <span>\${i18n.t('prompts.update')}</span>\`;
            btn.dataset.action = 'edit';
        } else {
            card.classList.add('editing');
            btn.innerHTML = \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> <span>\${i18n.t('prompts.save')}</span>\`;
            btn.dataset.action = 'save';
            
            const textarea = card.querySelector('.prompt-text-editable');
            if (textarea) textarea.focus();
        }
    }

    async handleSavePrompt(promptId, btn) {
        const card = document.querySelector(\`[data-prompt-id="\${promptId}"].prompt-card\`);
        if (!card) return;

        const textarea = card.querySelector('.prompt-text-editable');
        const newText = textarea?.value?.trim();

        if (!newText) {
            this.showToast('error', i18n.t('toast.error'), i18n.t('prompts.emptyPrompt'));
            return;
        }

        const originalHtml = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = \`<svg class="spinner-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle></svg> \${i18n.t('prompts.saving')}\`;

        try {
            await api.updatePrompt(promptId, newText);
            this.showToast('success', i18n.t('toast.success'), i18n.t('prompts.updateSuccess'));
            await this.loadPrompts();
        } catch (error) {
            console.error('Failed to update prompt:', error);
            this.showToast('error', i18n.t('toast.error'), error.message || i18n.t('prompts.updateFailed'));
            btn.disabled = false;
            btn.innerHTML = originalHtml;
        }
    }

    async handleValidatePrompt(promptId, btn) {
        const originalHtml = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = \`<svg class="spinner-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle></svg> \${i18n.t('prompts.validating')}\`;

        try {
            await api.validatePrompt(promptId);
            this.showToast('success', i18n.t('toast.success'), i18n.t('prompts.validateSuccess'));
            await this.loadPrompts();
        } catch (error) {
            console.error('Failed to validate prompt:', error);
            this.showToast('error', i18n.t('toast.error'), error.message || i18n.t('prompts.validateFailed'));
            btn.disabled = false;
            btn.innerHTML = originalHtml;
        }
    }

    async handleValidateAllPrompts(btn) {
        const originalHtml = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = \`<svg class="spinner-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle></svg> \${i18n.t('prompts.validatingAll')}\`;

        try {
            await api.validateAllPrompts();
            this.showToast('success', i18n.t('toast.success'), i18n.t('prompts.validateAllSuccess'));
            await this.loadPrompts();
        } catch (error) {
            console.error('Failed to validate all prompts:', error);
            this.showToast('error', i18n.t('toast.error'), error.message || i18n.t('prompts.validateAllFailed'));
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalHtml;
        }
    }

    setupNotificationIcon() {
        const notificationBtn = document.getElementById('notificationBtn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                this.loadSection('logs');
            });
        }
    }

    updateNotificationIcon(hasError = false) {
        const icon = document.getElementById('notificationIcon');
        if (icon) {
            if (hasError) {
                icon.classList.add('error');
                icon.style.color = '#ef4444';
            } else {
                icon.classList.remove('error');
                icon.style.color = '#3b82f6';
            }
        }
    }

    async refreshPlatform(platform) {
        this.logEvent(\`\${platform} platformasi yangilanmoqda...\`);
        try {
            const result = await api.post(\`/api/platforms/\${platform}/refresh\`, {});
            this.showToast('success', 'Muvaffaqiyat', \`\${platform} yangilandi\`);
            this.logEvent(\`\${platform} muaffaqiyatli yangilandi\`);
        } catch (err) {
            this.showToast('error', 'Xato', \`\${platform} yangilanishi xatosi\`);
            this.logEvent(\`\${platform} yangilash xatosi: \${err.message}\`, 'error');
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await i18n.init();
    window.app = new App();
    
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        languageSwitcher.value = i18n.getCurrentLang();
        languageSwitcher.addEventListener('change', async (e) => {
            await i18n.setLanguage(e.target.value);
        });
    }
});`;

const i18nJsContent = `class I18n {
    constructor() {
        this.translations = {};
        this.currentLang = localStorage.getItem('language') || 'uz';
        this.defaultLang = 'uz';
        this.supportedLangs = ['uz', 'tk'];
    }

    async init() {
        await this.loadTranslations(this.currentLang);
        this.applyTranslations();
        this.updateDocumentLang();
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(\`/i18n/\${lang}.json\`);
            if (!response.ok) {
                throw new Error(\`Failed to load \${lang} translations\`);
            }
            this.translations = await response.json();
            this.currentLang = lang;
            localStorage.setItem('language', lang);
        } catch (error) {
            console.error('Error loading translations:', error);
            if (lang !== this.defaultLang) {
                await this.loadTranslations(this.defaultLang);
            }
        }
    }

    async setLanguage(lang) {
        if (!this.supportedLangs.includes(lang)) {
            console.warn(\`Language \${lang} is not supported\`);
            return;
        }
        await this.loadTranslations(lang);
        this.applyTranslations();
        this.updateDocumentLang();
        this.updateLanguageSwitcher();
    }

    updateDocumentLang() {
        document.documentElement.lang = this.currentLang;
    }

    updateLanguageSwitcher() {
        const switcher = document.getElementById('languageSwitcher');
        if (switcher) {
            switcher.value = this.currentLang;
        }
    }

    t(key) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(\`Translation key not found: \${key}\`);
                return key;
            }
        }
        
        return value;
    }

    applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation !== key) {
                element.textContent = translation;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            if (translation !== key) {
                element.placeholder = translation;
            }
        });

        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.t(key);
            if (translation !== key) {
                element.title = translation;
            }
        });

        const titleEl = document.querySelector('title');
        if (titleEl && this.translations.appTitle) {
            titleEl.textContent = this.translations.appTitle;
        }
    }

    getCurrentLang() {
        return this.currentLang;
    }

    getSupportedLangs() {
        return this.supportedLangs;
    }
}

const i18n = new I18n();
`;

const uzTranslations = `{
  "appTitle": "AutoOZ - AI Video Yuklash Paneli",
  "nav": {
    "dashboard": "Boshqaruv paneli",
    "upload": "Video yuklash",
    "queue": "Navbat",
    "logs": "Jurnallar",
    "prompts": "Promptlar",
    "settings": "Sozlamalar"
  },
  "health": {
    "checking": "Tekshirilmoqda...",
    "healthy": "Tizim sog'lom",
    "offline": "Tizim oflayn"
  },
  "dashboard": {
    "title": "Boshqaruv paneli",
    "pendingVideos": "Kutilayotgan videolar",
    "processing": "Qayta ishlanmoqda",
    "completed": "Bajarilgan",
    "failed": "Muvaffaqiyatsiz",
    "recentActivity": "So'nggi faoliyat",
    "viewAll": "Hammasini ko'rish",
    "platformStatus": "Platforma holati",
    "quickActions": "Tezkor harakatlar",
    "runScheduler": "Rejalashtiruvchini ishga tushirish",
    "clearQueue": "Navbatni tozalash",
    "clearLogs": "Jurnallarni tozalash",
    "loadingActivity": "Faoliyat yuklanmoqda...",
    "noRecentActivity": "So'nggi faoliyat yo'q",
    "ready": "Tayyor"
  },
  "upload": {
    "title": "Video yuklash",
    "newVideo": "Yangi video yuklash",
    "selectChannel": "Kanalni tanlang",
    "selectChannelPlaceholder": "-- Kanalni tanlang --",
    "channelHint": "Video ushbu kanal uchun YouTube, TikTok, Instagram va Facebook'ga yuklanadi",
    "uploadFile": "Fayl yuklash",
    "videoUrl": "Video URL",
    "dragDrop": "Videoni bu yerga torting yoki",
    "browseFiles": "Fayllarni ko'rish",
    "fileHint": "MP4, MOV, AVI 100MB gacha qo'llab-quvvatlanadi",
    "enterVideoUrl": "Video URL manzilini kiriting",
    "urlHint": "To'g'ridan-to'g'ri video URL yoki platforma havolasi",
    "videoContext": "Video konteksti / Prompt",
    "videoContextPlaceholder": "Video mazmunini tasvirlab bering...",
    "targetPlatforms": "Maqsadli platformalar",
    "submitUpload": "Video yuklash",
    "uploading": "Yuklanmoqda...",
    "uploadComplete": "Yuklash tugadi!",
    "channel1": "Kanal 1",
    "channel2": "Kanal 2",
    "channel3": "Kanal 3",
    "channel4": "Kanal 4",
    "channel5": "Kanal 5"
  },
  "queue": {
    "title": "Video navbati",
    "videoQueue": "Video navbati",
    "refresh": "Yangilash",
    "noVideos": "Navbatda video yo'q",
    "uploadVideo": "Video yuklash",
    "pending": "Kutilmoqda",
    "processing": "Qayta ishlanmoqda",
    "completed": "Bajarilgan",
    "failed": "Muvaffaqiyatsiz",
    "untitled": "Nomsiz",
    "allPlatforms": "Barcha platformalar",
    "scheduledFor": "Scheduled for",
    "uploading": "Uploading",
    "skipped": "Skipped",
    "retryUpload": "Retry Upload",
    "errorReason": "Error Reason",
    "errorCode": "Error Code",
    "analytics": "Analytics",
    "views": "Views",
    "likes": "Likes",
    "comments": "Comments",
    "shares": "Shares",
    "revenue": "Revenue",
    "revenueNotSupported": "Revenue data not supported by platform API",
    "analyticsNotAvailable": "Analytics not yet available from platform API",
    "viewOnPlatform": "View on {platform}",
    "channel": "Channel",
    "targetPlatform": "Target Platform",
    "targetChannel": "Target Channel"
  },
  "logs": {
    "title": "Tizim jurnallari",
    "systemLogs": "Tizim jurnallari",
    "allLevels": "Barcha darajalar",
    "info": "Ma'lumot",
    "warning": "Ogohlantirish",
    "error": "Xato",
    "debug": "Nosozliklarni tuzatish",
    "searchLogs": "Jurnallarni qidirish...",
    "refresh": "Yangilash",
    "export": "Eksport",
    "noLogs": "Jurnallar mavjud emas",
    "noMatch": "Filtrlaringizga mos jurnallar yo'q",
    "system": "tizim",
    "infoLevel": "MA'LUMOT",
    "loadMore": "Ko'proq yuklash",
    "loading": "Yuklanmoqda...",
    "loaded": "yuklandi",
    "retry": "Qayta urinish",
    "errorLoading": "Jurnallarni yuklashda xato",
    "allSources": "Barcha manbalar",
    "sourceSystem": "Tizim",
    "sourcePlatform": "Platforma",
    "sourceService": "Xizmat",
    "data": "Ma'lumotlar",
    "stackTrace": "Xato tafsilotlari",
    "startDate": "Boshlanish sanasi",
    "endDate": "Tugash sanasi"
  },
  "prompts": {
    "title": "Video Promptlari",
    "totalPrompts": "Jami promptlar",
    "validated": "Tasdiqlangan",
    "needsImprovement": "Yaxshilash kerak",
    "errors": "Xatolar",
    "filterByChannel": "Kanal bo'yicha filtrlash",
    "allChannels": "Barcha kanallar",
    "validateAll": "Barchasini tasdiqlash",
    "improve": "Yaxshilash",
    "update": "Yangilash",
    "save": "Saqlash",
    "validate": "Tasdiqlash",
    "validating": "Tasdiqlanmoqda...",
    "improving": "Yaxshilanmoqda...",
    "updating": "Yangilanmoqda...",
    "saving": "Saqlanmoqda...",
    "validatingAll": "Hammasi tasdiqlanmoqda...",
    "loading": "Promptlar yuklanmoqda...",
    "noPrompts": "Promptlar mavjud emas",
    "noPromptsHint": "Hozircha hech qanday prompt yo'q",
    "statusValidated": "Tasdiqlangan",
    "statusNeedsImprovement": "Yaxshilash kerak",
    "statusError": "Xato",
    "statusPending": "Kutilmoqda",
    "aiSuggestion": "AI tavsiyasi",
    "improveSuccess": "Prompt muvaffaqiyatli yaxshilandi",
    "improveFailed": "Promptni yaxshilab bo'lmadi",
    "updateSuccess": "Prompt muvaffaqiyatli yangilandi",
    "updateFailed": "Promptni yangilab bo'lmadi",
    "validateSuccess": "Prompt muvaffaqiyatli tasdiqlandi",
    "validateFailed": "Promptni tasdiqlab bo'lmadi",
    "validateAllSuccess": "Barcha promptlar tasdiqlandi",
    "validateAllFailed": "Promptlarni tasdiqlab bo'lmadi",
    "loadError": "Promptlarni yuklab bo'lmadi",
    "emptyPrompt": "Prompt bo'sh bo'lmasligi kerak"
  },
  "settings": {
    "title": "Sozlamalar",
    "apiEndpoint": "API manzili (ixtiyoriy)",
    "apiEndpointPlaceholder": "Bir xil origin uchun bo'sh qoldiring",
    "apiEndpointHint": "Faqat boshqa API serveridan foydalanayotgan bo'lsangiz o'rnating",
    "saveSettings": "Sozlamalarni saqlash"
  },
  "modal": {
    "confirmAction": "Harakatni tasdiqlash",
    "cancel": "Bekor qilish",
    "confirm": "Tasdiqlash",
    "clearQueueTitle": "Navbatni tozalash",
    "clearQueueMessage": "Navbatdagi barcha videolarni o'chirishni xohlaysizmi? Bu harakatni ortga qaytarib bo'lmaydi.",
    "clearLogsTitle": "Jurnallarni tozalash",
    "clearLogsMessage": "Barcha jurnallarni o'chirishni xohlaysizmi? Bu harakatni ortga qaytarib bo'lmaydi."
  },
  "toast": {
    "success": "Muvaffaqiyat",
    "error": "Xato",
    "warning": "Ogohlantirish",
    "info": "Ma'lumot",
    "refreshed": "Yangilandi",
    "dataUpdated": "Ma'lumotlar yangilandi",
    "settingsSaved": "Sozlamalar saqlandi",
    "settingsUpdated": "Sozlamalaringiz yangilandi",
    "uploadSuccess": "Yuklash muvaffaqiyatli",
    "videoQueued": "Videongiz navbatga qo'shildi",
    "uploadFailed": "Yuklash muvaffaqiyatsiz",
    "tryAgain": "Iltimos, qaytadan urinib ko'ring",
    "schedulerRunning": "Rejalashtiruvchi ishlamoqda",
    "processingVideos": "Navbatdagi videolar qayta ishlanmoqda...",
    "schedulerComplete": "Rejalashtiruvchi tugadi",
    "videosProcessed": "Videolar muvaffaqiyatli qayta ishlandi",
    "schedulerFailed": "Rejalashtiruvchi muvaffaqiyatsiz",
    "queueCleared": "Navbat tozalandi",
    "videosRemoved": "Navbatdagi barcha videolar o'chirildi",
    "clearQueueFailed": "Muvaffaqiyatsiz",
    "couldNotClearQueue": "Navbatni tozalab bo'lmadi",
    "logsCleared": "Jurnallar tozalandi",
    "logsRemoved": "Barcha jurnallar o'chirildi",
    "clearLogsFailed": "Muvaffaqiyatsiz",
    "couldNotClearLogs": "Jurnallarni tozalab bo'lmadi",
    "exportComplete": "Eksport tugadi",
    "logsDownloaded": "Jurnallar yuklab olindi",
    "noLogsExport": "Jurnallar yo'q",
    "noLogsToExport": "Eksport qilish uchun jurnallar yo'q",
    "missingChannel": "Kanal tanlanmagan",
    "pleaseSelectChannel": "Iltimos, kanalni tanlang",
    "missingVideo": "Video tanlanmagan",
    "pleaseSelectVideo": "Iltimos, video faylini tanlang",
    "missingVideoUrl": "Video URL yo'q",
    "pleaseEnterUrl": "Iltimos, video URL manzilini kiriting",
    "missingContext": "Kontekst yo'q",
    "pleaseProvideContext": "Iltimos, video konteksti/promptni kiriting",
    "fileTooLarge": "Fayl juda katta",
    "maxFileSize": "Maksimal fayl hajmi 100MB"
  },
  "language": {
    "uz": "O'zbekcha",
    "tk": "Türkmençe"
  },
  "time": {
    "justNow": "Hozirgina",
    "minutesAgo": "{n} daqiqa oldin",
    "hoursAgo": "{n} soat oldin",
    "daysAgo": "{n} kun oldin"
  }
}
`;

const tkTranslations = `{
  "appTitle": "AutoOZ - AI Wideo Ýükleýji Paneli",
  "nav": {
    "dashboard": "Dolandyryş paneli",
    "upload": "Wideo ýüklemek",
    "queue": "Nobat",
    "logs": "Ýazgylar",
    "prompts": "Promptlar",
    "settings": "Sazlamalar"
  },
  "health": {
    "checking": "Barlanýar...",
    "healthy": "Ulgam sagdyn",
    "offline": "Ulgam oflaýn"
  },
  "dashboard": {
    "title": "Dolandyryş paneli",
    "pendingVideos": "Garaşylýan wideolar",
    "processing": "Işlenilýär",
    "completed": "Tamamlandy",
    "failed": "Şowsuz",
    "recentActivity": "Soňky işjeňlik",
    "viewAll": "Hemmesini görmek",
    "platformStatus": "Platforma ýagdaýy",
    "quickActions": "Çalt hereketler",
    "runScheduler": "Meýilleşdirijini işletmek",
    "clearQueue": "Nobaty arassalamak",
    "clearLogs": "Ýazgylary arassalamak",
    "loadingActivity": "Işjeňlik ýüklenýär...",
    "noRecentActivity": "Soňky işjeňlik ýok",
    "ready": "Taýýar"
  },
  "upload": {
    "title": "Wideo ýüklemek",
    "newVideo": "Täze wideo ýüklemek",
    "selectChannel": "Kanaly saýlaň",
    "selectChannelPlaceholder": "-- Kanaly saýlaň --",
    "channelHint": "Wideo bu kanal üçin YouTube, TikTok, Instagram we Facebook-a ýüklener",
    "uploadFile": "Faýl ýüklemek",
    "videoUrl": "Wideo URL",
    "dragDrop": "Wideoňyzy bu ýere süýräň ýa-da",
    "browseFiles": "Faýllary görmek",
    "fileHint": "MP4, MOV, AVI 100MB çenli goldanýar",
    "enterVideoUrl": "Wideo URL salgysyny giriziň",
    "urlHint": "Göni wideo URL ýa-da platforma salgysy",
    "videoContext": "Wideo konteksti / Prompt",
    "videoContextPlaceholder": "Wideo mazmunyny suratlandyryň...",
    "targetPlatforms": "Maksat platformalar",
    "submitUpload": "Wideo ýüklemek",
    "uploading": "Ýüklenýär...",
    "uploadComplete": "Ýüklemek tamamlandy!",
    "channel1": "Kanal 1",
    "channel2": "Kanal 2",
    "channel3": "Kanal 3",
    "channel4": "Kanal 4",
    "channel5": "Kanal 5"
  },
  "queue": {
    "title": "Wideo nobaty",
    "videoQueue": "Wideo nobaty",
    "refresh": "Täzelemek",
    "noVideos": "Nobatda wideo ýok",
    "uploadVideo": "Wideo ýüklemek",
    "pending": "Garaşylýar",
    "processing": "Işlenilýär",
    "completed": "Tamamlandy",
    "failed": "Şowsuz",
    "untitled": "Atsyz",
    "allPlatforms": "Ähli platformalar",
    "scheduledFor": "Meýilleşdirilen wagt",
    "uploading": "Ýüklenýär",
    "skipped": "Geçildi",
    "retryUpload": "Täzeden ýüklemek",
    "errorReason": "Ýalňyşlyk sebäbi",
    "errorCode": "Ýalňyşlyk kody",
    "analytics": "Analitika",
    "views": "Görmeler",
    "likes": "Halanlar",
    "comments": "Teswirler",
    "shares": "Paýlaşmalar",
    "revenue": "Girdeji",
    "revenueNotSupported": "Girdeji maglumatlary platforma API tarapyndan goldanmaýar",
    "analyticsNotAvailable": "Analitika platformadan heniz elýeter däl",
    "viewOnPlatform": "{platform}-da görmek",
    "channel": "Kanal",
    "targetPlatform": "Maksat platforma",
    "targetChannel": "Maksat kanal"
  },
  "logs": {
    "title": "Ulgam ýazgylary",
    "systemLogs": "Ulgam ýazgylary",
    "allLevels": "Ähli derejeler",
    "info": "Maglumat",
    "warning": "Duýduryş",
    "error": "Ýalňyşlyk",
    "debug": "Düzetmek",
    "searchLogs": "Ýazgylary gözlemek...",
    "refresh": "Täzelemek",
    "export": "Eksport",
    "noLogs": "Ýazgylar ýok",
    "noMatch": "Süzgüçleriňize gabat gelýän ýazgylar ýok",
    "system": "ulgam",
    "infoLevel": "MAGLUMAT",
    "loadMore": "Köpräk ýüklemek",
    "loading": "Ýüklenýär...",
    "loaded": "ýüklendi",
    "retry": "Täzeden synanyşmak",
    "errorLoading": "Ýazgylary ýüklemekde ýalňyşlyk",
    "allSources": "Ähli çeşmeler",
    "sourceSystem": "Ulgam",
    "sourcePlatform": "Platforma",
    "sourceService": "Hyzmat",
    "data": "Maglumatlar",
    "stackTrace": "Ýalňyşlyk jikme-jiklikleri",
    "startDate": "Başlangyç senesi",
    "endDate": "Gutaryş senesi"
  },
  "prompts": {
    "title": "Wideo Promptlary",
    "totalPrompts": "Jemi promptlar",
    "validated": "Tassyklanan",
    "needsImprovement": "Gowulandyrmak gerek",
    "errors": "Ýalňyşlyklar",
    "filterByChannel": "Kanal boýunça süzmek",
    "allChannels": "Ähli kanallar",
    "validateAll": "Hemmesini tassyklamak",
    "improve": "Gowulandyrmak",
    "update": "Täzelemek",
    "save": "Ýatda saklamak",
    "validate": "Tassyklamak",
    "validating": "Tassyklanýar...",
    "improving": "Gowulandyrylýar...",
    "updating": "Täzelenýär...",
    "saving": "Ýatda saklanýar...",
    "validatingAll": "Hemmesi tassyklanýar...",
    "loading": "Promptlar ýüklenýär...",
    "noPrompts": "Promptlar ýok",
    "noPromptsHint": "Häzirlikçe hiç hili prompt ýok",
    "statusValidated": "Tassyklanan",
    "statusNeedsImprovement": "Gowulandyrmak gerek",
    "statusError": "Ýalňyşlyk",
    "statusPending": "Garaşylýar",
    "aiSuggestion": "AI teklibi",
    "improveSuccess": "Prompt üstünlikli gowulandyryldy",
    "improveFailed": "Prompty gowulandyryp bolmady",
    "updateSuccess": "Prompt üstünlikli täzelendi",
    "updateFailed": "Prompty täzeläp bolmady",
    "validateSuccess": "Prompt üstünlikli tassyklandy",
    "validateFailed": "Prompty tassyklap bolmady",
    "validateAllSuccess": "Ähli promptlar tassyklandy",
    "validateAllFailed": "Promptlary tassyklap bolmady",
    "loadError": "Promptlary ýükläp bolmady",
    "emptyPrompt": "Prompt boş bolmaly däl"
  },
  "settings": {
    "title": "Sazlamalar",
    "apiEndpoint": "API salgysy (hökmany däl)",
    "apiEndpointPlaceholder": "Şol bir origin üçin boş goýuň",
    "apiEndpointHint": "Diňe başga API serwer ulanýan bolsaňyz belläň",
    "saveSettings": "Sazlamalary ýatda saklamak"
  },
  "modal": {
    "confirmAction": "Hereketi tassyklamak",
    "cancel": "Ýatyrmak",
    "confirm": "Tassyklamak",
    "clearQueueTitle": "Nobaty arassalamak",
    "clearQueueMessage": "Nobatdaky ähli wideolary pozmak isleýärsiňizmi? Bu hereket yzyna gaýtarylyp bilinmez.",
    "clearLogsTitle": "Ýazgylary arassalamak",
    "clearLogsMessage": "Ähli ýazgylary pozmak isleýärsiňizmi? Bu hereket yzyna gaýtarylyp bilinmez."
  },
  "toast": {
    "success": "Üstünlik",
    "error": "Ýalňyşlyk",
    "warning": "Duýduryş",
    "info": "Maglumat",
    "refreshed": "Täzelendi",
    "dataUpdated": "Maglumatlar täzelendi",
    "settingsSaved": "Sazlamalar ýatda saklandy",
    "settingsUpdated": "Sazlamalaryňyz täzelendi",
    "uploadSuccess": "Ýüklemek üstünlikli",
    "videoQueued": "Wideoňyz nobata goşuldy",
    "uploadFailed": "Ýüklemek şowsuz",
    "tryAgain": "Täzeden synanyşyň",
    "schedulerRunning": "Meýilleşdiriji işleýär",
    "processingVideos": "Nobatdaky wideolar işlenilýär...",
    "schedulerComplete": "Meýilleşdiriji tamamlandy",
    "videosProcessed": "Wideolar üstünlikli işlendi",
    "schedulerFailed": "Meýilleşdiriji şowsuz",
    "queueCleared": "Nobat arassalandy",
    "videosRemoved": "Nobatdaky ähli wideolar pozuldy",
    "clearQueueFailed": "Şowsuz",
    "couldNotClearQueue": "Nobaty arassalap bolmady",
    "logsCleared": "Ýazgylar arassalandy",
    "logsRemoved": "Ähli ýazgylar pozuldy",
    "clearLogsFailed": "Şowsuz",
    "couldNotClearLogs": "Ýazgylary arassalap bolmady",
    "exportComplete": "Eksport tamamlandy",
    "logsDownloaded": "Ýazgylar göçürilip alyndy",
    "noLogsExport": "Ýazgylar ýok",
    "noLogsToExport": "Eksport etmek üçin ýazgylar ýok",
    "missingChannel": "Kanal saýlanmady",
    "pleaseSelectChannel": "Kanaly saýlaň",
    "missingVideo": "Wideo saýlanmady",
    "pleaseSelectVideo": "Wideo faýlyny saýlaň",
    "missingVideoUrl": "Wideo URL ýok",
    "pleaseEnterUrl": "Wideo URL salgysyny giriziň",
    "missingContext": "Kontekst ýok",
    "pleaseProvideContext": "Wideo kontekstini/prompty giriziň",
    "fileTooLarge": "Faýl gaty uly",
    "maxFileSize": "Iň uly faýl ölçegi 100MB"
  },
  "language": {
    "uz": "O'zbekcha",
    "tk": "Türkmençe"
  },
  "time": {
    "justNow": "Şu wagt",
    "minutesAgo": "{n} minut ozal",
    "hoursAgo": "{n} sagat ozal",
    "daysAgo": "{n} gün ozal"
  }
}
`;

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

export function getI18nJS(): string {
    return i18nJsContent;
}

export function getUzTranslations(): string {
    return uzTranslations;
}

export function getTkTranslations(): string {
    return tkTranslations;
}
