/**
 * Secure API Key Manager
 * Handles multiple API keys with rotation, failover, and rate limiting
 */

class ApiKeyManager {
    constructor() {
        this.keys = {
            openrouter: this.loadOpenRouterKeys(),
            openai: process.env.OPENAI_API_KEY,
            google: process.env.GOOGLE_AI_API_KEY,
            anthropic: process.env.ANTHROPIC_API_KEY
        };
        
        this.usage = new Map();
        this.lastRotation = Date.now();
        this.rotationInterval = parseInt(process.env.API_KEY_ROTATION_INTERVAL) || 3600000; // 1 hour default
    }

    /**
     * Load OpenRouter API keys from environment variables
     */
    loadOpenRouterKeys() {
        const keys = [];
        let i = 1;
        
        while (process.env[`OPENROUTER_KEY_${i}`]) {
            keys.push({
                key: process.env[`OPENROUTER_KEY_${i}`],
                label: `OpenRouter Key ${i}`,
                usage: 0,
                lastUsed: 0,
                errors: 0
            });
            i++;
        }
        
        return keys;
    }

    /**
     * Get the best available API key for a service
     */
    getKey(service = 'openrouter') {
        if (service === 'openrouter') {
            return this.getBestOpenRouterKey();
        }
        
        return this.keys[service] || null;
    }

    /**
     * Get the best OpenRouter key based on usage and errors
     */
    getBestOpenRouterKey() {
        if (!this.keys.openrouter || this.keys.openrouter.length === 0) {
            throw new Error('No OpenRouter API keys configured');
        }

        // Sort by errors (ascending) then by usage (ascending)
        const sortedKeys = [...this.keys.openrouter].sort((a, b) => {
            if (a.errors !== b.errors) {
                return a.errors - b.errors;
            }
            return a.usage - b.usage;
        });

        return sortedKeys[0];
    }

    /**
     * Record API key usage
     */
    recordUsage(service, key, success = true) {
        if (service === 'openrouter') {
            const keyObj = this.keys.openrouter.find(k => k.key === key);
            if (keyObj) {
                keyObj.usage++;
                keyObj.lastUsed = Date.now();
                if (!success) {
                    keyObj.errors++;
                }
            }
        }
    }

    /**
     * Rotate API keys (called periodically)
     */
    rotateKeys() {
        const now = Date.now();
        if (now - this.lastRotation > this.rotationInterval) {
            // Reset usage counters
            this.keys.openrouter.forEach(key => {
                key.usage = 0;
                key.errors = 0;
            });
            this.lastRotation = now;
        }
    }

    /**
     * Get API key statistics
     */
    getStats() {
        return {
            openrouter: this.keys.openrouter.map(k => ({
                label: k.label,
                usage: k.usage,
                errors: k.errors,
                lastUsed: k.lastUsed
            })),
            totalKeys: this.keys.openrouter.length,
            lastRotation: this.lastRotation
        };
    }

    /**
     * Validate API key format
     */
    validateKey(key, service = 'openrouter') {
        if (service === 'openrouter') {
            return key && key.startsWith('sk-or-v1-') && key.length > 50;
        }
        if (service === 'openai') {
            return key && key.startsWith('sk-') && key.length > 20;
        }
        return key && key.length > 10;
    }
}

module.exports = new ApiKeyManager(); 