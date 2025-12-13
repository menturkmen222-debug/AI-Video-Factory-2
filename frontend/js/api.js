class API {
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
        const url = `${this.baseUrl}${endpoint}`;
        
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
        const url = `${this.baseUrl}${endpoint}`;
        
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

const api = new API();