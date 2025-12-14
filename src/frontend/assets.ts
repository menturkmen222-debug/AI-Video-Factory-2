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
                                <div class="platform-list">
                                    <div class="platform-item">
                                        <div class="platform-icon youtube">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                            </svg>
                                        </div>
                                        <div class="platform-info">
                                            <span class="platform-name">YouTube</span>
                                            <span class="platform-status" id="youtubeStatus" data-i18n="dashboard.ready">Tayyor</span>
                                        </div>
                                    </div>
                                    <div class="platform-item">
                                        <div class="platform-icon tiktok">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                            </svg>
                                        </div>
                                        <div class="platform-info">
                                            <span class="platform-name">TikTok</span>
                                            <span class="platform-status" id="tiktokStatus" data-i18n="dashboard.ready">Tayyor</span>
                                        </div>
                                    </div>
                                    <div class="platform-item">
                                        <div class="platform-icon instagram">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                            </svg>
                                        </div>
                                        <div class="platform-info">
                                            <span class="platform-name">Instagram</span>
                                            <span class="platform-status" id="instagramStatus" data-i18n="dashboard.ready">Tayyor</span>
                                        </div>
                                    </div>
                                    <div class="platform-item">
                                        <div class="platform-icon facebook">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                        </div>
                                        <div class="platform-info">
                                            <span class="platform-name">Facebook</span>
                                            <span class="platform-status" id="facebookStatus" data-i18n="dashboard.ready">Tayyor</span>
                                        </div>
                                    </div>
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
                    <div class="card">
                        <div class="card-header">
                            <h2 data-i18n="queue.videoQueue">Video navbati</h2>
                            <div class="card-actions">
                                <button class="btn btn-secondary btn-sm" id="refreshQueueBtn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="23 4 23 10 17 10"></polyline>
                                        <path d="M20.49 15C19.9828 16.4332 19.1209 17.7146 17.9845 18.7246C16.8482 19.7346 15.4745 20.4402 13.9917 20.7757C12.5089 21.1112 10.9652 21.0657 9.50481 20.6432C8.04437 20.2208 6.71475 19.4353 5.64 18.36L1 14"></path>
                                    </svg>
                                    <span data-i18n="queue.refresh">Yangilash</span>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="queue-list" id="queueList">
                                <div class="loading-placeholder">
                                    <div class="spinner"></div>
                                    <span data-i18n="queue.noVideos">Navbatda video yo'q</span>
                                </div>
                            </div>
                            <div class="empty-state" id="queueEmpty" hidden>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15"></path>
                                    <path d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5C15 5.53043 14.7893 6.03914 14.4142 6.41421C14.0391 6.78929 13.5304 7 13 7H11C10.4696 7 9.96086 6.78929 9.58579 6.41421C9.21071 6.03914 9 5.53043 9 5Z"></path>
                                </svg>
                                <h3 data-i18n="queue.noVideos">Navbatda video yo'q</h3>
                                <p data-i18n="queue.uploadVideo">Video yuklash</p>
                                <button class="btn btn-primary" id="goToUpload" data-i18n="queue.uploadVideo">Video yuklash</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section" id="section-logs">
                    <div class="card logs-card">
                        <div class="card-header">
                            <h2 data-i18n="logs.systemLogs">Tizim jurnallari</h2>
                            <div class="card-actions">
                                <div class="log-filters">
                                    <select id="logLevelFilter" class="form-select">
                                        <option value="all" data-i18n="logs.allLevels">Barcha darajalar</option>
                                        <option value="info" data-i18n="logs.info">Ma'lumot</option>
                                        <option value="warn" data-i18n="logs.warning">Ogohlantirish</option>
                                        <option value="error" data-i18n="logs.error">Xato</option>
                                        <option value="debug" data-i18n="logs.debug">Nosozliklarni tuzatish</option>
                                    </select>
                                    <input type="text" id="logSearch" class="form-input" data-i18n-placeholder="logs.searchLogs" placeholder="Jurnallarni qidirish...">
                                </div>
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
                            <div class="logs-container" id="logsContainer">
                                <div class="loading-placeholder">
                                    <div class="spinner"></div>
                                    <span data-i18n="logs.noLogs">Jurnallar mavjud emas</span>
                                </div>
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
                                <button class="btn btn-primary" id="saveSettings" data-i18n="settings.saveSettings">Sozlamalarni saqlash</button>
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
    margin-right: 16px;
    flex-shrink: 0;
    min-width: 100px;
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
        const queueList = document.getElementById('queueList');
        const queueEmpty = document.getElementById('queueEmpty');
        const videos = data.videos || [];

        if (videos.length === 0) {
            queueList.innerHTML = '';
            queueEmpty.hidden = false;
            return;
        }

        queueEmpty.hidden = true;
        queueList.innerHTML = videos.map(video => {
            const statusKey = video.status || 'pending';
            const statusText = i18n.t(\`queue.\${statusKey}\`) || statusKey;
            return \`
            <div class="queue-item">
                <div class="queue-thumbnail">
                    <video src="\${video.videoUrl || ''}" muted></video>
                </div>
                <div class="queue-info">
                    <div class="queue-title">\${this.escapeHtml(video.channelId || video.id || i18n.t('queue.untitled'))}</div>
                    <div class="queue-meta">
                        \${video.platforms ? video.platforms.join(', ') : i18n.t('queue.allPlatforms')} 
                        \${video.createdAt ? '• ' + this.formatDate(video.createdAt) : ''}
                    </div>
                </div>
                <span class="queue-status \${statusKey}">\${statusText}</span>
            </div>
        \`;}).join('');
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
            container.innerHTML = \`<div class="loading-placeholder"><span>\${i18n.t('logs.noMatch')}</span></div>\`;
            return;
        }

        container.innerHTML = filteredLogs.slice(0, 200).map(log => \`
            <div class="log-entry">
                <span class="log-timestamp">\${this.formatDate(log.timestamp)}</span>
                <span class="log-level \${log.level || 'info'}">\${log.level ? log.level.toUpperCase() : i18n.t('logs.infoLevel')}</span>
                <span class="log-source">[\${this.escapeHtml(log.source || i18n.t('logs.system'))}]</span>
                <span class="log-message">\${this.escapeHtml(log.message || '')}</span>
                \${log.data ? \`<span class="log-data">\${this.escapeHtml(JSON.stringify(log.data))}</span>\` : ''}
            </div>
        \`).join('');
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
    "allPlatforms": "Barcha platformalar"
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
    "infoLevel": "MA'LUMOT"
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
    "allPlatforms": "Ähli platformalar"
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
    "infoLevel": "MAGLUMAT"
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
