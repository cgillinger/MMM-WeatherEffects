# MMM-WeatherEffects

A MagicMirror² module that adds dynamic weather effects based on current weather conditions. This module automatically displays snow or rain effects when appropriate weather conditions are detected.

## Features
- Automatic weather effect detection and display
- Smooth transitions between effects
- Configurable rain and snow effects
- Wind direction support for rain
- Customizable appearance and intensity
- Real-time weather condition monitoring

## Installation

1. Navigate to your MagicMirror's modules directory:
```bash
cd ~/MagicMirror/modules
```

2. Clone this repository:
```bash
git clone https://github.com/cgillinger/MMM-WeatherEffects.git
```

3. Add the module to your `config/config.js` file:
```javascript
{
    module: "MMM-WeatherEffects",
    position: "fullscreen_above",
    config: {
        enabled: true,
        intensity: "auto",
        rainConfig: {
            dropletCount: 50,
            dropletSpeed: 2.0,
            windDirection: "none",
            enableSplashes: false
        },
        snowConfig: {
            flakeCount: 25,
            characters: ['*', '+'],
            sparkleEnabled: false,
            minSize: 0.8,
            maxSize: 1.5,
            speed: 1.0
        }
    }
}
```

## Configuration Options

### General Settings

| Option | Description | Default | Notes |
|--------|-------------|---------|--------|
| `enabled` | Enable/disable module | `true` | Master switch |
| `intensity` | Effect intensity | `"auto"` | Options: "auto", "light", "medium", "heavy" |
| `transitionDuration` | Effect transition time | `1000` | In milliseconds |

### Rain Settings (`rainConfig`)

| Option | Description | Default | Notes |
|--------|-------------|---------|--------|
| `dropletCount` | Number of raindrops | `50` | Range: 1-200 |
| `dropletSpeed` | Rain falling speed | `2.0` | Range: 0.1-5.0 |
| `windDirection` | Rain angle | `"none"` | Options: "none", "left-to-right", "right-to-left" |
| `enableSplashes` | Show splash effects | `false` | Visual enhancement |

### Snow Settings (`snowConfig`)

| Option | Description | Default | Notes |
|--------|-------------|---------|--------|
| `flakeCount` | Number of snowflakes | `25` | Range: 1-100 |
| `characters` | Snowflake characters | `['*', '+']` | Array of characters |
| `sparkleEnabled` | Enable sparkle effect | `false` | Visual enhancement |
| `minSize` | Minimum flake size | `0.8` | In em units |
| `maxSize` | Maximum flake size | `1.5` | In em units |
| `speed` | Snow falling speed | `1.0` | Range: 0.1-5.0 |

## Customizing Weather Detection

The module includes a `weatherKeywords.json` file that defines which weather conditions trigger different effects. You can customize this file to match your weather provider's terminology:

```json
{
    "effects": {
        "rain": [
            "rain",
            "showers",
            "drizzle",
            "precipitation"
        ],
        "snow": [
            "snow",
            "sleet",
            "blizzard",
            "flurries"
        ]
    }
}
```

### Performance Recommendations

#### For Low-Power Devices (e.g., Raspberry Pi)
```javascript
{
    module: "MMM-WeatherEffects",
    config: {
        rainConfig: {
            dropletCount: 30,
            enableSplashes: false
        },
        snowConfig: {
            flakeCount: 15,
            sparkleEnabled: false,
            maxSize: 1.2
        }
    }
}
```

#### For Powerful Devices
```javascript
{
    module: "MMM-WeatherEffects",
    config: {
        rainConfig: {
            dropletCount: 100,
            enableSplashes: true
        },
        snowConfig: {
            flakeCount: 50,
            characters: ['❄', '❆', '*'],
            sparkleEnabled: true,
            maxSize: 2.0
        }
    }
}
```

## Dependencies
- MagicMirror² (>= 2.20.0)
- A weather module that emits weather type notifications

## Troubleshooting

1. **No effects showing:**
   - Verify your weather module is properly configured
   - Check the weather type notifications in the console
   - Try setting `enabled: true` explicitly
   - Check if weatherKeywords.json matches your weather provider's terms

2. **Performance issues:**
   - Reduce `dropletCount`/`flakeCount`
   - Disable special effects (splashes, sparkle)
   - Use simpler characters for snow
   - Reduce max sizes

3. **Weather detection issues:**
   - Check weather module configuration
   - Verify weather data includes condition types
   - Update weatherKeywords.json with your provider's terms
   - Check console for weather notifications

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Credits
- Original snow effect code from MMM-DynamicSnow
- Rain effect inspiration from MMM-RainEffects
- Weather integration improvements by Christian Gillinger

## License
[MIT](LICENSE)
