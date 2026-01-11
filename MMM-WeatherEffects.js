/* MagicMirror²
 * Module: MMM-WeatherEffects
 * 
 * By Christian Gillinger
 * MIT Licensed.
 * 
 * Version: 1.0.1 (2026-01-11)
 * 
 * Description:
 * This module creates dynamic weather effects for MagicMirror², automatically
 * displaying rain or snow based on current weather conditions. Effects include
 * directional rain with optional splashes and multi-colored snowflakes with
 * sparkle effects.
 * 
 * Features:
 * - Automatic weather condition detection
 * - Rain effects with wind direction
 * - Multi-colored snow particles
 * - Smooth transitions between states
 * - Performance optimized animations
 * - Portrait and landscape mode support
 * 
 * Changelog:
 * v1.0.1 (2026-01-11)
 * - Fixed: Portrait mode coverage - particles now distributed across full screen height
 * - Added: Random vertical start positions for particles
 * - Added: Staggered animation delays for natural flow
 * 
 * v1.0.0 (2024-12-28)
 * - Initial release
 * - Added rain effects with wind direction support
 * - Added multi-color snow variations
 * - Integrated smooth state transitions
 * - Added weather condition detection
 * - Implemented performance management
 * - Added comprehensive documentation
 */

Module.register("MMM-WeatherEffects", {
    defaults: {
        enabled: true,
        intensity: "auto",    // auto, light, medium, heavy
        
        // Rain settings
        rainConfig: {
            dropletCount: 50,
            dropletSpeed: 2.0,
            windDirection: "none",  // none, left-to-right, right-to-left
            enableSplashes: false
        },
        
        // Snow settings
        snowConfig: {
            flakeCount: 25,
            characters: ['*', '+'],
            sparkleEnabled: false,
            minSize: 0.8,
            maxSize: 1.5,
            speed: 1.0
        },

        // Transition timing (ms)
        transitionDuration: 1000
    },

    // Internal state
    currentEffect: null,
    weatherKeywords: {
        rain: ["rain", "showers", "drizzle", "precipitation"],
        snow: ["snow", "sleet", "blizzard", "flurries"]
    },
    effectContainers: {},
    snowColorClasses: ['', 'blue-light', 'blue-medium', 'blue-dark', 'crystal'],

    start: function() {
        Log.info("Starting module: " + this.name);
        this.loadEffectKeywords();
        this.validateConfig();
    },

    loadEffectKeywords: function() {
        this.sendSocketNotification("REQUEST_KEYWORDS");
    },

    getStyles: function() {
        return ["MMM-WeatherEffects.css"];
    },

    validateConfig: function() {
        // Validate rain settings
        const rc = this.config.rainConfig;
        if (typeof rc.dropletCount !== "number" || rc.dropletCount < 1) {
            rc.dropletCount = 50;
        }
        if (typeof rc.dropletSpeed !== "number" || rc.dropletSpeed <= 0) {
            rc.dropletSpeed = 2.0;
        }

        // Validate snow settings
        const sc = this.config.snowConfig;
        if (typeof sc.flakeCount !== "number" || sc.flakeCount < 1) {
            sc.flakeCount = 25;
        }
        if (typeof sc.speed !== "number" || sc.speed <= 0) {
            sc.speed = 1.0;
        }
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "WEATHER_KEYWORDS_LOADED") {
            this.weatherKeywords = payload;
            Log.info("MMM-WeatherEffects: Updated weather keywords:", this.weatherKeywords);
        }
    },

    notificationReceived: function(notification, payload) {
        if (notification === "CURRENTWEATHER_TYPE" && payload && payload.type) {
            const weatherType = payload.type.toLowerCase();
            Log.info(`MMM-WeatherEffects: Received weather type: ${weatherType}`);
            this.handleWeatherChange(weatherType);
        }
    },

    handleWeatherChange: function(weatherType) {
        if (!this.config.enabled) return;

        if (this.isRainCondition(weatherType)) {
            this.transitionTo('rain');
        } else if (this.isSnowCondition(weatherType)) {
            this.transitionTo('snow');
        } else {
            this.clearEffects();
        }
    },

    isRainCondition: function(weatherType) {
        return this.weatherKeywords.rain.some(keyword => 
            weatherType.includes(keyword.toLowerCase())
        );
    },

    isSnowCondition: function(weatherType) {
        return this.weatherKeywords.snow.some(keyword => 
            weatherType.includes(keyword.toLowerCase())
        );
    },

    transitionTo: function(effectType) {
        if (this.currentEffect === effectType) return;
        
        // Fade out current effect if exists
        if (this.currentEffect && this.effectContainers[this.currentEffect]) {
            const oldContainer = this.effectContainers[this.currentEffect];
            oldContainer.style.opacity = '0';
            setTimeout(() => {
                oldContainer.remove();
                delete this.effectContainers[this.currentEffect];
            }, this.config.transitionDuration);
        }
        
        // Start new effect
        this.currentEffect = effectType;
        this.startEffect(effectType);
    },

    startEffect: function(effectType) {
        const container = document.createElement("div");
        container.className = `weather-effect-wrapper ${effectType}-effect`;
        container.style.opacity = '0';

        if (effectType === 'rain') {
            this.createRainEffect(container);
        } else if (effectType === 'snow') {
            this.createSnowEffect(container);
        }

        document.body.appendChild(container);
        this.effectContainers[effectType] = container;

        // Trigger reflow for smooth transition
        container.offsetHeight;
        container.style.opacity = '1';
    },

    createRainEffect: function(container) {
        const { dropletCount, dropletSpeed, windDirection, enableSplashes } = this.config.rainConfig;
        
        for (let i = 0; i < dropletCount; i++) {
            const droplet = document.createElement("div");
            droplet.className = `rain-particle ${windDirection}`;
            droplet.style.animationDuration = `${dropletSpeed + Math.random()}s`;
            // Random vertical start position above viewport for portrait/landscape support
            droplet.style.top = `${Math.random() * -190 - 10}px`; // -200px to -10px
            droplet.style.left = `${Math.random() * 100}%`;
            // Staggered start for natural flow
            droplet.style.animationDelay = `${Math.random() * 5}s`;

            if (enableSplashes) {
                const splash = document.createElement("div");
                splash.className = "rain-splash";
                droplet.appendChild(splash);
            }

            container.appendChild(droplet);
        }
    },

    getRandomSnowColor: function() {
        return this.snowColorClasses[Math.floor(Math.random() * this.snowColorClasses.length)];
    },

    createSnowEffect: function(container) {
        const { flakeCount, characters, sparkleEnabled, minSize, maxSize, speed } = this.config.snowConfig;
        
        for (let i = 0; i < flakeCount; i++) {
            const flake = document.createElement("div");
            const colorClass = this.getRandomSnowColor();
            flake.className = `snow-particle ${sparkleEnabled ? 'sparkle' : ''} ${colorClass}`;
            flake.innerHTML = characters[Math.floor(Math.random() * characters.length)];
            flake.style.animationDuration = `${(Math.random() * 2 + 3) / speed}s`;
            flake.style.fontSize = `${Math.random() * (maxSize - minSize) + minSize}em`;
            // Random vertical start position above viewport for portrait/landscape support
            flake.style.top = `${Math.random() * -190 - 10}px`; // -200px to -10px
            flake.style.left = `${Math.random() * 100}%`;
            // Staggered start for natural flow
            flake.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(flake);
        }
    },

    clearEffects: function() {
        Object.values(this.effectContainers).forEach(container => {
            container.style.opacity = '0';
            setTimeout(() => container.remove(), this.config.transitionDuration);
        });
        this.effectContainers = {};
        this.currentEffect = null;
    },

    getDom: function() {
        const wrapper = document.createElement("div");
        wrapper.style.display = "none";
        return wrapper;
    }
});
