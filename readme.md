# MMM-WeatherEffects

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/cgillinger/MMM-WeatherEffects)
[![MagicMirror²](https://img.shields.io/badge/MagicMirror²-%3E%3D2.20.0-brightgreen.svg)](https://magicmirror.builders)
[![Platform](https://img.shields.io/badge/platform-Raspberry%20Pi%20%7C%20Desktop-lightgrey.svg)](https://github.com/cgillinger/MMM-WeatherEffects)
[![GitHub Issues](https://img.shields.io/github/issues/cgillinger/MMM-WeatherEffects.svg)](https://github.com/cgillinger/MMM-WeatherEffects/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/cgillinger/MMM-WeatherEffects/pulls)

**A MagicMirror² module that adds immersive, dynamic weather effects — rain and snow — based on real-time weather conditions.**

_Automatically detects your current weather and renders stunning fullscreen animations on your Magic Mirror display._

[Quick Start](#quick-start) · [Configuration](#configuration-options) · [Screenshots](#visual-examples) · [Troubleshooting](#troubleshooting) · [Contributing](#contributing)

</div>

---

> This is a personal hobby project I build for my own use and publish in case it's useful to someone else. I work on it in my spare time, so issues and PRs are welcome but replies may be slow. Use at your own risk.

---

## Features

- **Automatic weather detection** — triggers effects based on live weather notifications
- **Dynamic rain effects** — configurable intensity, droplet count, and wind direction
- **Beautiful snow effects** — supports both lightweight ASCII and rich Unicode snowflakes (❄)
- **Smooth transitions** — animated fade between weather states
- **Performance-optimized** — tunable for Raspberry Pi and high-powered displays alike
- **Flexible configuration** — fine-grained control over every visual parameter
- **Custom keyword support** — adapt to any weather provider's terminology

---

## Visual Examples

The module renders fullscreen weather overlays with configurable styles and intensities:

### Rain Effect
![Rain effect example](screenshots/rain.png)
*Rain with configurable droplet count, speed, and wind direction*

### Snow Effect — Light Mode
![Simple snow effect](screenshots/light.png)
*ASCII characters (`*`, `+`) — recommended for Raspberry Pi and low-power devices*

### Snow Effect — Rich Mode
![Decorative snow effect](screenshots/rich.png)
*Unicode snowflakes (❄) — visually stunning on powerful displays*

---

## Quick Start

Add the following to your `config/config.js` to get started immediately:

```javascript
{
    module: "MMM-WeatherEffects",
    position: "fullscreen_above"  // Required position
}
```

That's all! The module works out of the box with sensible defaults. See [Configuration Options](#configuration-options) for full customization.

---

## Installation

### Step 1: Clone the Repository

```bash
cd ~/MagicMirror/modules
git clone https://github.com/cgillinger/MMM-WeatherEffects.git
```

### Step 2: Add to Your Config

Add a full configuration block to `config/config.js`:

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
            windDirection: "none"  // "none" | "left-to-right" | "right-to-left"
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

---

## Configuration Options

### General Settings

| Option | Description | Default | Options |
|--------|-------------|---------|---------|
| `enabled` | Master on/off switch | `true` | `true` / `false` |
| `intensity` | Effect intensity level | `"auto"` | `"auto"` `"light"` `"medium"` `"heavy"` |
| `transitionDuration` | Transition time (ms) | `1000` | Any integer |

### Rain Settings (`rainConfig`)

| Option | Description | Default | Range |
|--------|-------------|---------|-------|
| `dropletCount` | Number of raindrops | `50` | 1–200 |
| `dropletSpeed` | Falling speed multiplier | `2.0` | 0.1–5.0 |
| `windDirection` | Rain angle / wind effect | `"none"` | `"none"` `"left-to-right"` `"right-to-left"` |

### Snow Settings (`snowConfig`)

| Option | Description | Default | Range / Notes |
|--------|-------------|---------|---------------|
| `flakeCount` | Number of snowflakes | `25` | 1–100 |
| `characters` | Snowflake characters | `['*', '+']` | Any character array |
| `sparkleEnabled` | Glow/sparkle effect | `false` | `true` / `false` |
| `minSize` | Minimum flake size (em) | `0.8` | Floating point |
| `maxSize` | Maximum flake size (em) | `1.5` | Floating point |
| `speed` | Falling speed multiplier | `1.0` | 0.1–5.0 |

---

## Performance Recommendations

### Raspberry Pi and Low-Power Devices

Reduce particle counts and disable visual enhancements:

```javascript
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
```

### Powerful Displays (Desktop / High-End SBC)

Enable rich snowflakes and sparkle for maximum visual impact:

```javascript
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
```

---

## CSS Customization

Override default styles by creating a `custom.css` file in your MagicMirror `css/` directory.

### Rain Appearance

```css
.rain-particle {
    width: 4px;
    height: 16px;
    opacity: 0.8;
    background: linear-gradient(to bottom, #00aaff, transparent);
}
```

### Snow Appearance

```css
/* Base snowflake style */
.snow-particle {
    color: white;
    opacity: 0.8;
}

/* Color variants */
.snow-particle.blue-light  { color: #BDE3FF !important; }
.snow-particle.blue-medium { color: #99CCFF !important; }
.snow-particle.blue-dark   { color: #66A3FF !important; }
.snow-particle.crystal     { color: #F0F8FF !important; }

/* Sparkle glow */
.snow-particle.sparkle {
    text-shadow: 0 0 8px rgba(255,255,255,0.8);
}
```

### Animation Speed

```css
/* Slow down rain (higher = slower) */
.rain-particle  { animation-duration: 2s !important; }

/* Slow down snow */
.snow-particle  { animation-duration: 5s !important; }
```

> **Tip:** Start with small adjustments and test each change before applying more.

---

## Customizing Weather Detection

The file `weather-keywords.json` maps weather condition strings to effects. Edit this to match your weather provider's terminology:

```json
{
    "effects": {
        "rain": ["rain", "showers", "drizzle", "precipitation"],
        "snow": ["snow", "sleet", "blizzard", "flurries"]
    }
}
```

---

## Troubleshooting

### No effects are showing
- Verify your weather module is correctly configured and running
- Open the browser console and check for incoming weather notifications
- Explicitly set `enabled: true` in your config
- Confirm that `weather-keywords.json` includes your provider's condition strings

### Poor performance / lag
- Lower `dropletCount` and `flakeCount`
- Disable `sparkleEnabled`
- Switch to ASCII characters instead of Unicode snowflakes
- Reduce `maxSize` values

### Weather conditions not triggering effects
- Check the browser console for notification payloads from your weather module
- Verify the condition text matches entries in `weather-keywords.json`
- Add any missing terms to the keywords file

---

## Compatibility

| Component | Requirement |
|-----------|-------------|
| MagicMirror² | `>= 2.20.0` |
| Weather Module | Any module that emits weather type notifications |
| Browser | All modern browsers (Chrome, Firefox, Safari, Edge) |
| Hardware | Raspberry Pi, desktop, or any device running MagicMirror² |

---

## Contributing

Contributions, bug reports, and feature requests are welcome!

- Open an issue: [GitHub Issues](https://github.com/cgillinger/MMM-WeatherEffects/issues)
- Submit a pull request: [GitHub PRs](https://github.com/cgillinger/MMM-WeatherEffects/pulls)

---

## Credits

- Created by **Christian Gillinger**
- Built on [MagicMirror²](https://magicmirror.builders) by Michael Teeuw

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for full details.
