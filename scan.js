/** @param {NS} ns **/
export function scanNetwork(ns, start = "home") {

    const visited = new Set();
    const servers = [];

    function scan(host) {

        visited.add(host);
        servers.push(host);

        for (const next of ns.scan(host)) {
            if (!visited.has(next)) {
                scan(next);
            }
        }
    }

    scan(start);

    return servers;
}