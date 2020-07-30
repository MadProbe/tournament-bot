// @ts-check
import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import { Command } from "../command.js";
import { cwkey } from "../config.js";

export default class CodeWarsProfileCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'code-wars',
            aliases: ['profile', "cw"],
            description: "Shows your or given user code-wars profile"
        })
    }
    /**
     * @param {import("../command").CommandMessage} msg
     * @param {string} args
     */
    async run(msg, args) {
        let profile = this.client.profiles.get(msg.author.id);
        if (args) {
            try {
                const fetched = await fetch("https://www.codewars.com/api/v1/users/" + encodeURI(args), {
                    headers: {
                        Authorization: cwkey
                    }
                });
                const body = await fetched.json();
                console.log(body);
                if (body) {
                    profile = body;
                }
            } catch (error) {
                console.error(error);
                return await msg.channel.send(`An error has occured when getting "${args}" profile`);
            }
        }
        return await msg.channel.send(profile ? new MessageEmbed()
            .setTitle(`${profile.username} Profile`)
            .addFields([
                {
                    name: "Honor",
                    value: profile.honor
                },
                {
                    name: "Skills",
                    value: profile.skills ? profile.skills.join(',\n') : `${profile.username} is too lazy to write their skills`
                },
                {
                    name: "Ranks",
                    value: Object.entries(profile.ranks.overall)
                        .map(a => a.join(': ')).join('\n')
                },
                {
                    name: "Languages",
                    value: Object.entries(profile.ranks.languages).slice(0, 8).map(([n, l]) => `*${n}*:\n${Object.entries(l)
                        .map(a => a.join(': ')).join('\n')}`).join('\n')
                }
            ])
            : `You must run --sync-profile command first`);
    }
}