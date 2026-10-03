// Run in the module directory: node --test
const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const moduleDirectory = path.resolve(__dirname, "..");

function loadModule() {
	let definition;
	vm.runInNewContext(fs.readFileSync(path.join(moduleDirectory, "MMM-WeatherEffects.js"), "utf8"), {
		Module: { register (name, value) { definition = value; } },
		Log: { info () {} }
	});
	const keywords = JSON.parse(fs.readFileSync(path.join(moduleDirectory, "weather-keywords.json"), "utf8")).effects;
	const effects = [];
	const module = Object.assign(Object.create(definition), {
		config: { ...definition.defaults },
		weatherKeywords: keywords,
		transitionTo (effect) { effects.push(effect); },
		clearEffects () { effects.push(null); }
	});
	return { module, effects };
}

test("uses the most specific keyword", () => {
	const { module } = loadModule();
	assert.equal(module.getEffectForWeather("snow_showers"), "snow");
	assert.equal(module.getEffectForWeather("rain_showers"), "rain");
	assert.equal(module.getEffectForWeather("day_showers"), "rain");
	assert.equal(module.getEffectForWeather("light_snow"), "snow");
	assert.equal(module.getEffectForWeather("day_sleet"), "snow");
	assert.equal(module.getEffectForWeather("day_sunny"), null);
});

test("prefers snow when rain and snow keywords are equally specific", () => {
	const { module } = loadModule();
	assert.equal(module.getEffectForWeather("rain_and_snow"), "snow");
});

test("handles CURRENTWEATHER_TYPE notifications", () => {
	const { module, effects } = loadModule();
	module.notificationReceived("CURRENTWEATHER_TYPE", { type: "snow_showers" });
	module.notificationReceived("CURRENTWEATHER_TYPE", { type: "day_sunny" });
	assert.deepEqual(effects, ["snow", null]);
});

test("handles OPENWEATHER_FORECAST_WEATHER_UPDATE notifications", () => {
	const { module, effects } = loadModule();
	module.notificationReceived("OPENWEATHER_FORECAST_WEATHER_UPDATE", { current: { weather: [{ main: "Snow", description: "light shower snow" }] } });
	module.notificationReceived("OPENWEATHER_FORECAST_WEATHER_UPDATE", { current: { weather: [{ main: "Rain", description: "Leichter Regen" }] } });
	module.notificationReceived("OPENWEATHER_FORECAST_WEATHER_UPDATE", { current: { weather: [{ main: "Clouds", description: "overcast clouds" }] } });
	assert.deepEqual(effects, ["snow", "rain", null]);
});

test("ignores OpenWeather updates without weather conditions", () => {
	const { module, effects } = loadModule();
	for (const payload of [null, {}, { current: {} }, { current: { weather: [] } }]) {
		assert.doesNotThrow(() => module.notificationReceived("OPENWEATHER_FORECAST_WEATHER_UPDATE", payload));
	}
	assert.deepEqual(effects, []);
});
