class I18n {
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
            const response = await fetch(`/i18n/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${lang} translations`);
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
            console.warn(`Language ${lang} is not supported`);
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
                console.warn(`Translation key not found: ${key}`);
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
