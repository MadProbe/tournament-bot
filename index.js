import './iterators.js';
import { client, db } from "./client.js";
import { prefix } from "./config.js";
import { vtapi } from "./virus-total.js";
import { MessageEmbed } from "discord.js";

//const get_link_ch = db.prepare("SELECT * FROM link_logs WHERE guildid = ?").pluck();
const link_regex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/i;
client.on("message", async msg => {
    let content = msg.content;
    if (content.startsWith(prefix)) {
        content = msg.content.slice(prefix.length);
        const command = client.commands.sort((command1, command2) => command1.name.length - command2.name.length).find(command => {
            const names = command.aliases.concat(command.name);
            for (const name of names) {
                if (content.startsWith(name)) {
                    content = content.slice(name.length);
                    return true;
                }
            }
            return false;
        })
        if (command) {
            msg.command = command;
            command.run(msg, content.trim());
        }
    }
    const matched = content.match(link_regex);
    if (msg.guild && matched) {
        const channel = client.channels.cache.get("736843564654264380"); // get_link_ch(msg.guild.id).chid
        if (channel) {
            console.log(matched[0])
            const data = await vtapi.exec(matched[0]);
            const { meta } = data;
            console.log(JSON.stringify(data));
            channel.send(new MessageEmbed()
                .setTitle(`URL Scan for ${meta.url_info.url}`)
                .addField("Harmless", data.data.attributes.stats.harmless + "", true)
                .addField("Suspicious", data.data.attributes.stats.suspicious + "", true)
                .addField("Malicious", data.data.attributes.stats.malicious + "", true));
        }
    }
});
client.login().then(() => {
    console.log(client.user.tag, 'is ready!')
});
