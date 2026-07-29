import { scanNetwork } from "scan.js"; //scans the network
import { rootServer } from "root.js"; //presists root acccess on server
import { deploy } from "deploy.js"; //deploys the script to hack, grow or weaken the server

/** @param {NS} ns **/
export async function main(ns) {

    const servers = scanNetwork(ns);

    for (const server of servers) {

        if (server == "home")
            continue;
//about:blank#blocked$0
        if (!rootServer(ns, server))
            continue;

        await deploy(ns, server, "server-tool.js");
    }
}
