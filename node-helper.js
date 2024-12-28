/* MagicMirror²
 * Node Helper: MMM-WeatherEffects
 * 
 * By Christian Gillinger
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const fs = require("fs");
const path = require("path");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
        this.loadWeatherKeywords();
    },

    loadWeatherKeywords: function() {
        const keywordsPath = path.join(__dirname, "weatherKeywords.json");
        
        try {
            // Initial load of keywords
            this.readAndSendKeywords(keywordsPath);
            
            // Watch for file changes
            fs.watch(keywordsPath, (eventType) => {
                if (eventType === "change") {
                    console.log("MMM-WeatherEffects: weatherKeywords.json changed, reloading...");
                    this.readAndSendKeywords(keywordsPath);
                }
            });
        } catch (err) {
            console.error("MMM-WeatherEffects: Error setting up keyword monitoring:", err);
            // Send default keywords if file operations fail
            this.sendSocketNotification("WEATHER_KEYWORDS_LOADED", {
                rain: ["rain", "showers", "drizzle", "precipitation"],
                snow: ["snow", "sleet", "blizzard", "flurries"]
            });
        }
    },

    readAndSendKeywords: function(filePath) {
        try {
            const data = fs.readFileSync(filePath, "utf8");
            const keywords = JSON.parse(data);
            
            if (keywords.effects && keywords.effects.rain && keywords.effects.snow) {
                this.sendSocketNotification("WEATHER_KEYWORDS_LOADED", {
                    rain: keywords.effects.rain,
                    snow: keywords.effects.snow
                });
                console.log("MMM-WeatherEffects: Successfully loaded keywords:", keywords.effects);
            } else {
                throw new Error("Invalid keywords format");
            }
        } catch (err) {
            console.error("MMM-WeatherEffects: Error reading keywords:", err);
            // Send default keywords on error
            this.sendSocketNotification("WEATHER_KEYWORDS_LOADED", {
                rain: ["rain", "showers", "drizzle", "precipitation"],
                snow: ["snow", "sleet", "blizzard", "flurries"]
            });
        }
    },
    
    socketNotificationReceived: function(notification, payload) {
        if (notification === "REQUEST_KEYWORDS") {
            this.loadWeatherKeywords();
        }
    }
});
