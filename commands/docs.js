import { MessageEmbed } from "discord.js";
// @ts-check
import Doc from "discord.js-docs";
import { Command } from "../command.js";

const docs = await Doc.fetch("master");

export class DocsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "docs",
            description: "lol"
        })
    }
    /**
     * @param {import("../command").CommandMessage} msg
     * @param {string} args
     */
    run(msg, args) {
        const d = docs.resolveEmbed(args.trim());
        return msg.channel.send(new MessageEmbed()
            .setTitle(d.author.name)
            .setDescription(d.description)
            .setColor(d.color));
    }
}