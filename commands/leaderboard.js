import { Command } from "../command.js";

export class LeaderBoardCommand extends Command {
    constructor(client) {
        super(client, {
            name: "leaderboard",
            description: "Leaderboard"
        })
    }
    run() {

    }
}