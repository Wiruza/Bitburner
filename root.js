import { openPorts } from "ports.js";

/** @param {NS} ns **/
export function rootServer(ns, server) {

    openPorts(ns, server);

    if (ns.hasRootAccess(server))
        return true;

    try {
        ns.nuke(server);
    }
    catch {
    }

    return ns.hasRootAccess(server);
}