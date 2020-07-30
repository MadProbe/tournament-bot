import { Client } from 'discord.js';
import { inspect } from "util";

export class Command {
    /**
     * @param {import('../typing/index').ESClient} client 
     * @param {import('../typing/index').CommandOptions} options 
     */
    constructor(client, options) {
        if (!client || !(client instanceof Client)) {
            throw new TypeError(`A valid client must be provided, not ${inspect(client, { colors: false })}`)
        }
        this.client = client;
        Command.prototype._validateOptions.call(this, options);
        this.name = options.name;
        this.description = options.description;
        this.cooldown = options.cooldown;
        this.aliases = typeof options.aliases === "string" ? [options.aliases] : options.aliases || [];
        /**
         * Indicates that command can be executed only in guild.
         * @type {boolean}
         */
        this.guildOnly = !!options.guildOnly;
        /**
         * Indicates that command can be executed only by bot owner(s).
         * @type {boolean}
         */
        this.ownerOnly = options.ownerOnly == null ? client.preserveOwnerOnly : !!options.ownerOnly;
    }
    hasPermission(msg) {
        if (this.guildOnly && !msg.guild) {
            return `${this.name} command must be executed in a guild channel!`;
        }
        if (this.ownerOnly && !this.client.isOwner(msg.author)) {
            return `This command is not for you`;
        }
        return true;
    }
    /**
     * @static
     * @protected
     * @param {import('../typing/index').Maybe<import('../typing/index').CommandOptions>} [options]
     * @returns {asserts options is import('../typing/index').CommandOptions}
     */
    _validateOptions(options) {
        if (!options || typeof options !== "object") {
            throw new TypeError(`Options must be a object, not ${options === null ? "null" : typeof options}!`);
        }
        if (!options.name || typeof options.name !== "string") {
            throw new TypeError("Command name must be non-empty string!");
        }
        if (!options.description || typeof options.description !== "string") {
            throw new TypeError("Command description must be non-empty string!")
        }
        if (options.cooldown == null || options.cooldown < 1) {
            options.cooldown = -1;
        } else if (typeof options.cooldown !== "number") {
            throw new TypeError("If provided, command cooldown must be a number!");
        }
    }
}