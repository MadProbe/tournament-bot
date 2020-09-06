// // @ts-check
// import { Command } from "../command.js";

// const linkregexp = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/i
// export class DocsCommand extends Command {
//     constructor(client) {
//         super(client, {
//             name: "youtube",
//             description: "lol"
//         })
//     }
//     /**
//      * @param {import("../command").CommandMessage} msg
//      * @param {string} args
//      */
//     run(msg, args) {
//         const d = docs.resolveEmbed(args.trim());
//         return msg.channel.send(JSON.stringify(d));
//     }
//     /**
//      * @param {string} term
//      * @todo Make non link parse premium feature and
//      * include playlists for youtube api searching
//      */
//     async parse(term, results = 1) {
//         const link = linkregexp.exec(term);
//         if (link?.[0]) return link[0]
//         /**@type {string}*/
//         const key = yt['youtube-api-key']
//         if (typeof key !== "string") {
//             Function(`throw new Error('Youtube API key must be a string, got \\"${key === null ? "null" : typeof key}\\"!'`)()
//             process.exit(1)
//         } else if (typeof results !== "number") {
//             Function(`throw new Error('Results count must be a number, got "${results === null ? "null" : typeof results}"!'`)()
//             process.exit(1)
//         }
//         const d = await fetch(`https://www.googleapis.com/youtube/v3/search?${new URLSearchParams({
//             q: term,
//             key,
//             type: 'video,playlist',
//             part: 'snippet',
//             maxResults: String(results)
//         })}`).catch(console.error)
//         if (!d) return null
//         /**@type {any[]}*/
//         const data = (await d.json()).data?.items
//         if (!data?.length) return null
//         const id = data[0].id
//         return `https://www.youtube.com/${id.kind === "youtube#video" ? `watch?v=${id.videoId}` : `playlist?list=${id.playlistId}`}`
//     }
// }