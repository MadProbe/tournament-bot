// @ts-check
import Database from "better-sqlite3";
import { Client, Collection } from "discord.js";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Command } from "./command.js";
import { readdir, Util } from "./util.js";

// @ts-ignore
const importMeta = import.meta;
const _dirname = dirname(fileURLToPath(importMeta.url));
export const db = new Database(join(_dirname, 'database.db'));
db.pragma('journal_mode = WAL');
db.pragma('secure_delete=FAST');

export class TournamentBotClient extends Client {
    /**
     * @type {Collection<string, Command>}
     */
    commands = new Collection;
    owners = ["515059684214964237"];
    profiles = new Collection;
    async login() {
        const files = await readdir(join(_dirname, 'commands'));
        for (const file of files) {
            // @ts-ignore
            const module = await import(pathToFileURL(file))
            for (const name of Object.getOwnPropertyNames(module)) {
                const klass = module[name];
                if (Util.doesExtend(klass, Command)) {
                    const command = new klass(client);
                    this.commands.set(command.name, command);
                }
            }
        }
        db.exec("CREATE TABLE IF NOT EXISTS board(id TEXT PRIMARY KEY, name TEXT, exp TEXT, level INTEGER)");
        return await super.login(readFileSync(join(_dirname, 'token'), "utf-8"));
    }
}

export const client = new TournamentBotClient();
