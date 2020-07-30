import { Client, Message } from "discord.js";
import { TournamentBotClient } from "./client";

export class Command<T extends TournamentBotClient = TournamentBotClient> {
    constructor(client: T, options: CommandOptions);
    client: T;
    aliases: string[];
    /**
     * Name of the command
     */
    name: string;
    /**
     * Description of the command
     */
    description: string;
    /**
     * Cooldown of the command, 
     * @note values below or equal to 0 means there won't be any cooldown
     */
    cooldown: number;
    /**
     * Indicates that command can be executed only in guilds
     * @emits commandBlock event if message is sent outside of a guild
     */
    guildOnly: boolean;
    /**
     * Indicates that command can be executed only by bot owner(s)
     * @emits commandBlock event if message was sent not by bot owner(s)
     */
    ownerOnly: boolean;
    run(message: CommandMessage, args: any): Nullable<void> | Promise<Nullable<void> | Message | Message[]>;
    _validateOptions(options: Maybe<CommandOptions>): asserts options is CommandOptions;
}
export interface CommandOptions {
    aliases?: string | string[];
    /**
     * Name of the command
     */
    name: string;
    /**
     * Description of the command
     */
    description: string;
    /**
     * Cooldown of the command, 
     * @note values below or equal to 0 means there won't be any cooldown
     * @default -1
     */
    cooldown?: number;
    /**
     * Indicates that command can be executed only in guilds
     * @emits commandBlock event if message is sent outside of a guild
     * @default false
     */
    guildOnly?: boolean;
    /**
     * Indicates that command can be executed only by bot owner(s)
     * @emits commandBlock event if message was sent not by bot owner(s)
     * @default false
     */
    ownerOnly?: boolean;
    /**
     * Arguments for command
     * @default []
     */
    args?: ArgumentInfo[];
}
export interface ArgumentInfo {
    /**
     * Name of the argument
     */
    name: string;
    /**
     * Type of an argument
     * Union types must be separeted by '|' or ','
     */
    type: string;
    /**
     * This message is sent 
     */
    message: string;
    /**
     * Indicates, that this argument is optional
     * @default false
     */
    optional?: boolean;
}
export interface CommandMessage<T extends TournamentBotClient = TournamentBotClient> extends Message {
    client: TournamentBotClient;
    command: Command<T>;
}