import nvt from "node-virustotal";
import { vtapikey } from "./config.js";
const api = nvt.makeAPI();
api.setDelay(15000);
api.setKey(vtapikey);
export const vtapi = new class VirusTotalAPI {
    exec(link) {
        return new Promise((resolve, reject) => {
            api.initialScanURL(link, (err, res) => {
                if (err) {
                    console.log('Well, crap.');
                    return reject(err)
                }
                res = JSON.parse(res);
                api.getAnalysisInfo(res.data.id, (err, res) => {
                    if (err) {
                        console.log('Well, crap.');
                        return reject(err)
                    }
                    resolve(JSON.parse(res));
                });
            })
        });
    }
}