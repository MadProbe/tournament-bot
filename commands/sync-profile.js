// @ts-check
import { Command } from "../command.js";
import fetch from "node-fetch";
import { cwkey } from "../config.js";
import { stripIndents } from "../util/common-tags.js";

export class SyncCodeWarsProfileCommand extends Command {
    /**
     * @param {import("../client.js").TournamentBotClient} client
     */
    constructor(client) {
        super(client, {
            name: "sync-profile",
            aliases: ["sync profile", "syncProfile"],
            description: "Synchronize your codewars profile"
        })
    }
    /**
     * @param {import("../command").CommandMessage} msg
     * @param {string} args
     */
    async run(msg, args) {
        const { client } = this;
        try {
            const fetched = await fetch("https://www.codewars.com/api/v1/users/" + encodeURI(args), {
                headers: {
                    Authorization: cwkey
                }
            });
            const body = await fetched.json();
            console.log(body);
            client.profiles.set(msg.author.id, body);
            return await msg.channel.send(stripIndents`
                Synced your Code-Wars profile successfully.
                You can get information by --profile command
            `);
        } catch (error) {
            console.error(error);
            return msg.channel.send(`Profile "${args}" is not found!`);
        }
    }
}