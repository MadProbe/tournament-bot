import { db } from "../client.js";
import { Command } from "../command.js";
import * as os from "os";
import { MessageEmbed } from "discord.js";


//const set_link_ch = db.prepare("INSERT OR REPLACE link_logs VALUES(?, ?)");
export class OSCommand extends Command {
    /**
     * @param {import("../client.js").TournamentBotClient} client
     */
    constructor(client) {
        super(client, {
            name: "os",
            description: "Provides bot cpu, memory comsumption"
        });
    }
    /**
     * @param {import("../command").CommandMessage} msg
     * @param {string} args
     */
    run(msg, args) {
        const cpus = os.cpus();
        const totalmem = os.totalmem();
        return msg.channel.send(new MessageEmbed()
            .addField("OS", os.version(), true)
            .addField("CPU", `X${cpus.length} ${cpus[0].model}`)
            .addField("Memory", `${((totalmem - os.freemem()) / 1024 ** 3).toFixed(2)}GB used (${(totalmem / 1024 ** 3).toFixed(2)}GB memory installed)`))
    }
}