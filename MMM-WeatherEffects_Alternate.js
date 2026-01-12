# MMM-WeatherEffects

A MagicMirror² module that adds dynamic weather effects (rain and snow) based on current weather conditions. This module automatically displays appropriate weather effects based on real-time weather conditions.

Version: 1.0.2

## Quick Start

Add this minimal configuration to your `config/config.js` to get started:
```javascript
{
    module: "MMM-WeatherEffects",
    position: "fullscreen_above"  // This position is required
}
```

That's it! The module will work with all default settings. See the Configuration section below for customization options.

## Features
- Automatic weather effect detection and display
- Dynamic rain effects with wind direction support
- Customizable snow effects with multiple styles
- Smooth transitions between weather states
- Performance-optimized animations
- Real-time weather condition monitoring
- Support for standard and CSS-rotated displays

## Visual Examples

The module supports various weather effects with different styles and intensities:

### Rain Effect
![Rain effect example](screenshots/rain.png)
*Rain effect with configurable intensity and wind direction*

### Simple Snow Effect (Light Mode)
![Simple snow effect](screenshots/light.png)
*Using simple ASCII characters (`*` and `+`) - ideal for lower-powered devices*

### Decorative Snow Effect (Rich Mode)
![Decorative snow effect](screenshots/rich.png)
*Using snowflake characters (❄) - more visually appealing for powerful devices*

## Installation

### Step 1: Clone the Module
```bash
cd ~/MagicMirror/modules
git clone https://github.com/cgillinger/MMM-WeatherEffects.git
```

### Step 2: Configure Module
After the minimal setup shown in Quick Start, you can customize the module using this full configuration example:
```javascript
{
    module: "MMM-WeatherEffects",
    position: "fullscreen_above",
    config: {
        enabled: true,
        intensity: "auto",
        rotationCompensation: false,  // Set to true for CSS-rotated displays
        rainConfig: {
            dropletCount: 50,
            dropletSpeed: 2.0,
            windDirection: "none"  // none, left-to-right, right-to-left
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

| Option | Description | Default | Required | Notes |
|--------|-------------|---------|----------|--------|
| `enabled` | Enable/disable module | `true` | No | Master switch |
| `intensity` | Effect intensity | `"auto"` | No | Options: "auto", "light", "medium", "heavy" |
| `rotationCompensation` | Enable for CSS-rotated displays | `false` | No | See "CSS Rotated Displays" section below |
| `transitionDuration` | Effect transition time | `1000` | No | In milliseconds |

### Rain Settings (`rainConfig`)

| Option | Description | Default | Required | Notes |
|--------|-------------|---------|----------|--------|
| `dropletCount` | Number of raindrops | `50` | No | Range: 1-200 |
| `dropletSpeed` | Rain falling speed | `2.0` | No | Range: 0.1-5.0 |
| `windDirection` | Rain angle | `"none"` | No | Options: "none", "left-to-right", "right-to-left" |

### Snow Settings (`snowConfig`)

| Option | Description | Default | Required | Notes |
|--------|-------------|---------|----------|--------|
| `flakeCount` | Number of snowflakes | `25` | No | Range: 1-100 |
| `characters` | Snowflake characters | `['*', '+']` | No | Array of characters |
| `sparkleEnabled` | Enable sparkle effect | `false` | No | Visual enhancement |
| `minSize` | Minimum flake size | `0.8` | No | In em units |
| `maxSize` | Maximum flake size | `1.5` | No | In em units |
| `speed` | Snow falling speed | `1.0` | No | Range: 0.1-5.0 |

## CSS Rotated Displays

If you use CSS transforms to rotate your display (e.g., `body { transform: rotate(-90deg); }`), you'll need to enable rotation compensation:
```javascript
{
    module: "MMM-WeatherEffects",
    position: "fullscreen_above",
    config: {
        rotationCompensation: true  // Enable for CSS-rotated displays
    }
}
```

**When to use this:**
- You rotate your display using CSS transforms (e.g., `transform: rotate()`)
- Weather effects only cover part of your screen
- You run your desktop in landscape mode but display the browser rotated

**When NOT to use this:**
- Standard landscape displays (horizontal monitor)
- Standard portrait displays (vertical monitor)
- Displays rotated with `xrandr` or system settings (not CSS)

## CSS Customization

The module comes with default styling that you can customize by modifying the CSS. Here are some common customizations you might want to make:

### Rain Customization
You can modify the rain appearance in your custom CSS:
```css
/* Make rain more visible */
.rain-particle {
    width: 4px;          /* Thickness of raindrops */
    height: 16px;        /* Length of raindrops */
    opacity: 0.8;        /* Transparency (0.0 to 1.0) */
    background: linear-gradient(to bottom, #00aaff, transparent); /* Color of rain */
}
```

### Snow Customization
For snow effects, you can adjust:
```css
/* Change snow appearance */
.snow-particle {
    color: white;        /* Default color of snowflakes */
    opacity: 0.8;        /* Transparency (0.0 to 1.0) */
}

/* Color variations for snowflakes */
.snow-particle.blue-light {
    color: #BDE3FF !important;  /* Light blue */
}
.snow-particle.blue-medium {
    color: #99CCFF !important;  /* Medium blue */
}
.snow-particle.blue-dark {
    color: #66A3FF !important;  /* Darker blue */
}
.snow-particle.crystal {
    color: #F0F8FF !important;  /* Almost white */
}

/* Enhance sparkle effect */
.snow-particle.sparkle {
    text-shadow: 0 0 8px rgba(255,255,255,0.8); /* Glow effect */
}
```

### Animation Speed
You can adjust the speed of effects in your CSS:
```css
/* Slow down rain */
.rain-particle {
    animation-duration: 2s !important; /* Higher number = slower */
}

/* Adjust snow fall speed */
.snow-particle {
    animation-duration: 5s !important; /* Higher number = slower */
}
```

To apply these customizations:

1. Create a file named `custom.css` in your MagicMirror's `css` directory
2. Add your desired CSS modifications
3. Restart your MagicMirror

Remember: Small changes can have a big impact on appearance. Start with small adjustments and test each change.

## Performance Recommendations

### For Low-Power Devices (e.g., Raspberry Pi)
```javascript
{
    module: "MMM-WeatherEffects",
    config: {
        rainConfig: {
            dropletCount: 30
        },
        snowConfig: {
            flakeCount: 15,
            sparkleEnabled: false,
            maxSize: 1.2
        }
    }
}
```

### For Powerful Devices
```javascript
{
    module: "MMM-WeatherEffects",
    config: {
        rainConfig: {
            dropletCount: 100
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

## Customizing Weather Detection

The module includes a `weatherKeywords.json` file for customizing weather condition triggers. You can modify this to match your weather provider's terminology:
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

## Troubleshooting

1. **No effects showing:**
   - Verify your weather module is properly configured
   - Check the weather type notifications in the console
   - Try setting `enabled: true` explicitly
   - Check if weatherKeywords.json matches your weather provider's terms

2. **Effects only cover part of the screen:**
   - **Standard displays:** Should work automatically (portrait and landscape)
   - **CSS-rotated displays:** Set `rotationCompensation: true` in config
   - Check browser console (F12) for errors

3. **Performance issues:**
   - Reduce `dropletCount`/`flakeCount`
   - Disable special effects like sparkle
   - Use simpler characters for snow
   - Reduce max sizes

4. **Weather detection issues:**
   - Check weather module configuration
   - Verify weather data includes condition types
   - Update weatherKeywords.json with your provider's terms
   - Check console for weather notifications

## Compatibility
- MagicMirror²: >= 2.20.0
- Weather Module: Any that emits weather type notifications
- Browsers: All modern browsers supported
- Display modes: Standard landscape, portrait, and CSS-rotated displays

## Contributing
Issues and pull requests are welcome at [GitHub Issues](https://github.com/cgillinger/MMM-WeatherEffects/issues)

## Changelog

### v1.0.2 (2026-01-12)
- Added: `rotationCompensation` config option for CSS-rotated displays
- Fixed: Particle coverage for displays using CSS transform rotation
- Default behavior unchanged - fully backward compatible

### v1.0.1 (2026-01-11)
- Fixed: Portrait mode coverage - particles now distributed across full screen height
- Added: Random vertical start positions for particles
- Added: Staggered animation delays for natural flow

### v1.0.0 (2024-12-28)
- Initial release
- Rain effects with wind direction support
- Multi-color snow variations
- Smooth state transitions
- Weather condition detection
- Performance management

## Credits
- Created by Christian Gillinger
- Based on MagicMirror² by Michael Teeuw

## License
MIT Licensed - See LICENSE file for details
