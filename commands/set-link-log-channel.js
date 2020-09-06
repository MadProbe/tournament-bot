// @ts-check
import { db } from "../client.js";
import { Command } from "../command.js";

//const set_link_ch = db.prepare("INSERT OR REPLACE link_logs VALUES(?, ?)");
export class LinkLogChannelCommand extends Command {
    /**
     * @param {import("../client.js").TournamentBotClient} client
     */
    constructor(client) {
        super(client, {
            name: "link-log-channel",
            description: "Reminds given channel and bot will post there virus-total scan result",
            guildOnly: true
        });
    }
    /**
     * @param {import("../command").CommandMessage} msg
     * @param {string} args
     */
    run(msg, args) {
        if (!msg.mentions.channels.size) {
            return msg.channel.send("Specify a valid channel first");
        }
        const channel = msg.mentions.channels.array()[0];
        set_link_ch.run(msg.guild.id, channel.id);
        return msg.channel.send(`Successfully bound to ${channel}`);
    }
}