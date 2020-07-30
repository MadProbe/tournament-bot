// @ts-check
import { Command } from "../command.js";
import fetch from "node-fetch";
import { URLSearchParams } from "url";
import { oowkey } from "../config.js";
import { MessageEmbed } from "discord.js";
import { stripIndents } from "../util/common-tags.js";

const toMMHG = n => n * 0.75006;
const toCelsius = n => (n - 273.15).toFixed(2);
const url = 'https://api.openweathermap.org/data/2.5/weather';
export default class WeatherCommand extends Command {
	/**
	 * @param {import("../client.js").TournamentBotClient} client
	 */
	constructor(client) {
		super(client, {
			name: 'weather',
			description: "Get today's weather"
		})
	}
	/**
	 * @param {import("../command").CommandMessage} msg
	 * @param {any} args
	 */
	async run(msg, args) {
		try {
			console.log(`--weather ${args}`)
			const fetched = await fetch(`${url}?${new URLSearchParams({
				appid: oowkey,
				q: args
			})}`);
			const body = await fetched.json();
			console.log(body);
			if (body.cod !== 200) {
				return await msg.channel.send(`Cannot get weather for ${args}`);
			}
			return await msg.channel.send(new MessageEmbed()
				.setTitle(`Weather for ${body.name} (${body.sys.country})`)
				.addField("Sky", body.weather[0].description, true)
				.addField("Pressure", `${toMMHG(body.main.pressure)} mm HG`, true)
				.addField("Temperature", stripIndents`
					Current: ${toCelsius(body.main.temp)}°C
					Min: ${toCelsius(body.main.temp_min)}°C
					Max: ${toCelsius(body.main.temp_max)}°C
					Feels like: ${toCelsius(body.main.feels_like)}°C
				`));
		} catch (error) {
			console.error(error);
			return await msg.channel.send(`Cannot get weather for ${args}`);
		}
	}
}