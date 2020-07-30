import { client } from "./client.js";
import { prefix } from "./config.js";

client.on("message", msg => {
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
});
client.login().then(() => {
    console.log(client.user.tag, 'is ready!')
});
