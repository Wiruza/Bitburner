/** @param {NS} ns **/
export async function deploy(ns, server, script) {

    const ram = ns.getServerMaxRam(server);

    if (ram == 0)
        return;

    await ns.scp(script, server);

    ns.killall(server);

    const threads =
        Math.floor(ram / ns.getScriptRam(script));

    if (threads > 0)
        ns.exec(script, server, threads);
}