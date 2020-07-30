import { MessageEmbed } from "discord.js";
import { Command } from "../../command.js";
import { stripIndents } from "../../util/common-tags.js";


export default class HelpCommand extends Command {
	/**
	 * @param {import("../../client").TournamentBotClient} client
	 */
	constructor(client) {
		super(client, {
			name: 'help',
			description: 'Displays a list of available commands, or detailed information for a specified command.'
		});
	}
	/**
	 * @param {import("../../command").CommandMessage} msg
	 * @param {any} args
	 */
	run(msg, args) {
		if (!args || args === "all") {
			return msg.channel.send(stripIndents`
				__Commands available to you__
				${
					msg.client.commands.filter(command => {
						if (command.guildOnly && !msg.guild || command.ownerOnly && !msg.client.owners.includes(msg.author.id)) {
							return false;
						}
						return true
					}).map(command => `**${command.name}**${command.aliases?.length ? ` (${command.aliases.join(', ')})` : ''}`).join(', ')
				}
			`);
		} else {
			const command = msg.client.commands.sort((command1, command2) => command1.name.length - command2.name.length).find(command => {
				const names = command.aliases.concat(command.name);
				for (const name of names) {
					if (args.startsWith(name)) {
						return true;
					}
				}
				return false;
			});
			return msg.channel.send(!command ? `"${args}" command does not exist!` : new MessageEmbed()
				.setTitle(command.name)
				.addField('aliases', command.aliases.join(', ') || "none")
				.addField("description", command.description));
		}
	}
}